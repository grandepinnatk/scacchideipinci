# Changelog — Scacchi dei Pinci

---

## [1.3.2] — 2026-03-26

### Nuove funzionalità
- **Classifica** — estesa a 15 giocatori. Se l'utente non è nei top 15, la sua riga appare in fondo separata da `···` con la posizione reale
- **Statistiche personali** — aggiunta card **POSIZIONE** (`#N`) calcolata su tutti i giocatori registrati; griglia statistiche passa da 3 a 4 colonne

---

## [1.3.1] — 2026-03-26

### Correzioni
- **Classifica lobby** — aggiunto logging in console e gestione errori con messaggio visivo

---

## [1.3.0] — 2026-03-26

### Modifiche UI
- **Lobby** — classifica spostata sotto i pulsanti Partita rapida, Invita amico e Gioca in locale

---

## [1.2.9] — 2026-03-25

### Correzioni
- **Classifica lobby** — mostrava solo un giocatore. La query `orderByChild('elo').limitToLast(10)` richiedeva che tutti gli utenti avessero `elo` come numero. Riscritta per leggere tutti gli utenti e ordinarli lato client, prendendo i top 10

---

## [1.2.8] — 2026-03-25

### Correzioni
- **Carte e pesi admin non applicati** — `applyAdminConfig` mutava `ALL_PIECES` ma `buildPool` usa `getEffectivePiece()` che legge prima `PIECE_OVERRIDES`. Corretto: ora popola `PIECE_OVERRIDES` e riassegna `POOL = buildPool()`

---

## [1.2.7] — 2026-03-25

### Correzioni
- **Punteggio vittoria in multiplayer** — `winPts` non veniva applicato alle partite online. P1 ora salva `winPts` nel nodo della partita su Firebase; entrambi i giocatori lo leggono in `startOnlineGame`

---

## [1.2.6] — 2026-03-25

### Nuove funzionalità
- **Console admin — Pesi rarità** — nel pannello Impostazioni sono configurabili i pesi per rarità (0–30). Default: Leggendario 1, Epico 3, Raro 6, Comune 12. Salvati su Firebase e applicati al login

---

## [1.2.5] — 2026-03-25

### Nuove funzionalità
- **Console di amministrazione** (`admin.html`) — pannello accessibile solo agli amministratori con tre sezioni:
  - **Carte** — modifica C/R/V e forza di ogni carta; rarità aggiornata automaticamente
  - **Impostazioni** — imposta punteggio vittoria (10–200) e pesi rarità
  - **Amministratori** — aggiungi/rimuovi email admin. Super admin: `grandepinna.tk@gmail.com`
- Al login il gioco carica la configurazione admin da Firebase sovrascrivendo i valori di default

---

## [1.2.4] — 2026-03-25

### Modifiche regole
- **Punteggio vittoria** — portato a 50 punti. Slider impostazioni aggiornato con default 50

---

## [1.2.3] — 2026-03-25

### Correzioni
- **Matchmaking cross-provider** — risolto deadlock tra utenti Google e utenti email/password causato dal meccanismo "claim". Sostituito con verifica diretta che l'avversario sia ancora in coda prima di procedere

---

## [1.2.2] — 2026-03-25

### Correzioni
- **Multiplayer — turno non passava** — il click handler chiamava `doInsert()` da `game.js` invece di quella intercettata da `matchmaking.js`. Corretto con `window.doInsert` impostato in `startOnlineGame`

---

## [1.2.1] — 2026-03-20

### Correzioni
- **Doppio click (PC)** — due `onclick` prima del `dblclick` causavano doppio toggle. Sostituito con listener unico con timer 220ms

---

## [1.2.0] — 2026-03-20

### Nuove funzionalità
- **Animazione scorrimento carte** — inserimento carta anima i chip nella direzione di spinta (G1 → destra, G2 → sinistra) con curva `cubic-bezier` elastica
- **Doppio click (PC)** — seleziona e gioca immediatamente la carta
- **Swipe verso l'alto (mobile/tablet)** — seleziona e gioca. Soglia: 40px verticali, max 60px orizzontali
- Animazione `.playing` sulla carta giocata

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — `onAuthStateChanged` si ri-attiva ad ogni rinnovo token Firebase riportando al login. Aggiunto guard: ignorato se `MP.isInQueue` o `MP.isOnline`

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — basket mostrava carte della partita precedente. Aggiunto `initGame()` all'inizio di `startOnlineGame`

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — confronto vale 2 punti invece di 1. Log mostra `+1` o `+2`

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — G1 inserisce 1 carta, G2 inserisce 2 carte. Dal turno 2 entrambi 2 carte

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — barra separatrice verticale tra gli indicatori Online / In gioco

---

## [1.1.3] — 2026-03-19

### Correzioni
- **Partita rapida** — `Cannot read properties of null (reading 'uid')`. Introdotta `getCurrentUser()` in `shared.js` per eliminare il problema di binding statico dei moduli ES

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
- Lane G1/G2 con altezza fissa (280px cella, 50% per corsia)
- Illustrazioni a pieno campo con overlay semitrasparente per nome e valori
- CSS estratto in `style.css` separato
- Corretti nomi file `illetterato.png` e `limpiccato.png`

---

## [1.0.0] — 2026-03-17 🎉 Prima release pubblica

### Gioco
- Campo 5 caselle, 3 zone: Castello (1-2), Sala del Re (3, 2pt), Villaggio (4-5)
- Turno 1: G1 inserisce 1 carta, G2 inserisce 2; dal turno 2 entrambi 2 carte
- 40 pezzi con illustrazioni, 4 fasce di rarità, basket comune da 10 pezzi, punteggio vittoria 50pt

### Multiplayer
- Login email/password, Google, Microsoft
- Lobby con ELO, classifica e statistiche personali
- Partita rapida (matchmaking) e Invita amico (codice 6 caratteri)
- Timer 45s per mossa, heartbeat presenza, reconnect dopo refresh, sistema ELO

### Architettura
- Moduli ES: `firebase.js`, `shared.js`, `game.js`, `matchmaking.js`, `auth.js`, `style.css`
- Cache busting `?v=x.x.x`, layout responsive mobile/desktop, font Burbank Big Condensed
