# Changelog — Scacchi dei Pinci

---

## [1.2.1] — 2026-03-20

### Correzioni
- **Doppio click (PC)** — risolto bug per cui il doppio click non giocava la carta. Il problema era che `onclick` veniva chiamato due volte prima che `ondblclick` scattasse, causando un doppio toggle della selezione che resettava `G.selected` a `-1`. Sostituito con un unico listener con timer a 220ms: il primo click attende, il secondo annulla il timer e gioca direttamente

---

## [1.2.3] — 2026-03-25

### Correzioni
- **Matchmaking cross-provider** — risolto deadlock tra utenti Google e utenti email/password. Il meccanismo "claim" usato per gestire la race condition creava un nodo con chiave `A_B` uguale per entrambi i giocatori: entrambi scrivevano il claim, entrambi trovavano `creator !== myUid` nel double-check, e nessuno creava la partita. Sostituito con logica più semplice: chi fa poll rimuove prima se stesso dalla coda, poi verifica che l'avversario sia ancora presente prima di procedere — se non lo è, si reiscrive e aspetta come P2

---

## [1.2.2] — 2026-03-25

### Correzioni
- **Multiplayer — turno non passava** — risolto bug critico: il nuovo click handler con timer chiamava `doInsert()` dalla versione locale di `game.js` invece di quella intercettata di `matchmaking.js` (che salva lo stato su Firebase). Corretto impostando `window.doInsert` alla versione multiplayer all'avvio di ogni partita online e ripristinandola alla versione locale al cleanup

---

## [1.2.1] — 2026-03-20

### Correzioni
- **Doppio click (PC)** — risolto bug per cui il doppio click non giocava la carta. Il problema era il doppio toggle causato da due eventi `onclick` separati prima di `ondblclick`. Sostituito con un unico listener con timer a 220ms

---

## [1.2.0] — 2026-03-20

### Nuove funzionalità
- **Animazione scorrimento carte** — quando viene inserita una carta nel campo, i pezzi nella corsia animano nella direzione di spinta: G1 fa scorrere i chip verso destra, G2 verso sinistra. Curva `cubic-bezier` elastica per effetto naturale
- **Doppio click (PC)** — doppio click su una carta del basket: seleziona e gioca immediatamente
- **Swipe verso l'alto (mobile / tablet)** — swipe su una carta del basket: seleziona e gioca. Soglia: 40px verticali, max 60px orizzontali per non confondersi con lo scroll
- Animazione di feedback `.playing` sulla carta giocata: si solleva brevemente prima dell'inserimento

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — risolto bug per cui uno dei due giocatori veniva riportato al login durante il matchmaking. Causa: `onAuthStateChanged` si ri-attiva ad ogni rinnovo del token Firebase. Aggiunto guard: se `MP.isInQueue` o `MP.isOnline` sono attivi, il cambio di stato auth viene ignorato

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — risolto bug per cui il basket mostrava le carte della partita precedente. Aggiunta chiamata a `initGame()` all'inizio di `startOnlineGame` per resettare lo stato di gioco prima di caricare i dati Firebase

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — il confronto vale ora 2 punti invece di 1. Il log mostra `+1` o `+2` in base alla casella

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — il Giocatore 1 inserisce 1 carta, il Giocatore 2 inserisce 2 carte. Dal turno 2 entrambi inseriscono 2 carte
- Aggiornati banner, phase indicator e log per il conteggio corretto al turno 1

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — aggiunta barra separatrice verticale tra gli indicatori Online / In gioco

---

## [1.1.3] — 2026-03-19

### Correzioni
- **Partita rapida** — risolto `Cannot read properties of null (reading 'uid')`. Introdotta `getCurrentUser()` in `shared.js` che legge sempre il valore aggiornato, eliminando il problema di binding statico dei moduli ES

---

## [1.1.2] — 2026-03-19

### Correzioni UI
- `.mp-bar-conn`: `font-size` aumentato da `11px` a `18px`

---

## [1.1.1] — 2026-03-19

### Correzioni UI
- Overlay carte nel campo (`.pc-info`): gradiente nero sostituito con grigio piatto semitrasparente `rgba(40,38,35,0.75)`

---

## [1.1.0] — 2026-03-19 🎨 Artwork definitivo

Tutte e 40 le illustrazioni ridisegnate in stile pittorico fiammingo (Bruegel, Bosch, van Eyck).

### Correzioni UI
- Lane G1/G2 con altezza fissa (280px cella, 50% per corsia) — illustrazione sempre visibile in tutte le caselle
- Illustrazioni a pieno campo con nome e valori in overlay semitrasparente
- CSS estratto in `style.css` separato
- Corretti nomi file `illetterato.png` e `limpiccato.png`

---

## [1.0.0] — 2026-03-17 🎉 Prima release pubblica

### Gioco
- Campo 5 caselle, 3 zone: Castello (1-2), Sala del Re (3, vale 2pt), Villaggio (4-5)
- Turno 1: G1 inserisce 1 carta, G2 inserisce 2 carte; dal turno 2 entrambi 2 carte
- 40 pezzi con illustrazioni, 4 fasce di rarità, basket comune da 10 pezzi

### Multiplayer
- Login email/password, Google, Microsoft
- Lobby con ELO e classifica top-10
- Partita rapida (matchmaking automatico) e Invita amico (codice 6 caratteri)
- Timer 45s per mossa, heartbeat presenza, reconnect dopo refresh

### Architettura
- Moduli ES: `firebase.js`, `shared.js`, `game.js`, `matchmaking.js`, `auth.js`, `style.css`
- Cache busting `?v=x.x.x`, layout responsive mobile/desktop
