# Changelog — Scacchi dei Pinci

---

## [1.3.5] — 2026-03-26

### Nuove funzionalità
- **Pagina classifica completa** (`leaderboard.html`) — mostra tutti i giocatori registrati ordinati per ELO, con medaglie per i top 3, evidenziazione della propria riga e contatore totale giocatori. Pulsante "← Lobby" per tornare indietro
- **Link in lobby** — il titolo "CLASSIFICA" nella lobby mostra un link "Vedi completa →" che apre `leaderboard.html`

---

## [1.3.4] — 2026-03-26

### Correzioni
- **Scroll pagina** — risolto bug per cui le pagine lunghe (lobby, autenticazione) venivano tagliate in alto e non era possibile scorrere. Il problema era `align-items:center` su `.screen.show` con `position:fixed`: quando il contenuto superava l'altezza della viewport, il flex center lo centrava rispetto all'altezza fissa tagliando la parte superiore. Corretto con `align-items:flex-start` e `margin:auto` sui box interni per mantenere la centratura quando c'è spazio sufficiente

---

## [1.3.3] — 2026-03-26

### Modifiche UI
- **Classifica** — ridotta a Top 10 (era 15). Se non sei nei top 10, la tua riga appare separata in fondo
- **Tabella classifica** — font ridotto a 18px su desktop (era 24px)

---

## [1.3.2] — 2026-03-26

### Nuove funzionalità
- **Classifica** — estesa a 15 giocatori. Se l'utente non è nei top 15, la sua riga appare in fondo separata da `···`
- **Statistiche personali** — aggiunta card **POSIZIONE** (`#N`) calcolata su tutti i giocatori; griglia passa da 3 a 4 colonne

---

## [1.3.1] — 2026-03-26

### Correzioni
- **Classifica lobby** — aggiunto logging in console e gestione errori con messaggio visivo

---

## [1.3.0] — 2026-03-26

### Modifiche UI
- **Lobby** — classifica spostata sotto i pulsanti di gioco

---

## [1.2.9] — 2026-03-25

### Correzioni
- **Classifica** — query `orderByChild` sostituita con lettura completa e ordinamento lato client

---

## [1.2.8] — 2026-03-25

### Correzioni
- **Carte e pesi admin** — `applyAdminConfig` ora usa `PIECE_OVERRIDES` e riassegna `POOL = buildPool()`

---

## [1.2.7] — 2026-03-25

### Correzioni
- **Punteggio vittoria multiplayer** — P1 salva `winPts` nel nodo partita; entrambi lo leggono in `startOnlineGame`

---

## [1.2.6] — 2026-03-25

### Nuove funzionalità
- **Console admin — Pesi rarità** — slider 0–30 per ogni fascia. Default: L=1, E=3, R=6, C=12

---

## [1.2.5] — 2026-03-25

### Nuove funzionalità
- **Console admin** (`admin.html`) — gestione carte, impostazioni e amministratori
- Al login viene caricata la configurazione admin da Firebase

---

## [1.2.4] — 2026-03-25

### Modifiche regole
- **Punteggio vittoria** — portato a 50 punti

---

## [1.2.3] — 2026-03-25

### Correzioni
- **Matchmaking cross-provider** — rimosso meccanismo "claim" che causava deadlock tra utenti Google ed email

---

## [1.2.2] — 2026-03-25

### Correzioni
- **Multiplayer — turno non passava** — `window.doInsert` ora punta alla versione intercettata di `matchmaking.js`

---

## [1.2.1] — 2026-03-20

### Correzioni
- **Doppio click (PC)** — sostituito con listener unico con timer 220ms per evitare doppio toggle

---

## [1.2.0] — 2026-03-20

### Nuove funzionalità
- **Animazione scorrimento carte** — chip animano nella direzione di spinta con curva elastica
- **Doppio click (PC)** — seleziona e gioca immediatamente
- **Swipe verso l'alto (mobile/tablet)** — seleziona e gioca (soglia 40px verticali)
- Animazione `.playing` sulla carta giocata

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — guard in `onAuthStateChanged` per non interrompere matchmaking durante rinnovo token

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — `initGame()` chiamato all'inizio di `startOnlineGame`

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re** — confronto vale 2 punti invece di 1

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — G1 inserisce 1 carta, G2 ne inserisce 2

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — barra separatrice tra Online / In gioco

---

## [1.1.3] — 2026-03-19

### Correzioni
- **Partita rapida** — `getCurrentUser()` introdotta in `shared.js` per eliminare binding statico ES modules

---

## [1.1.2] — 2026-03-19

### Correzioni UI
- `.mp-bar-conn`: `font-size` aumentato a `18px`

---

## [1.1.1] — 2026-03-19

### Correzioni UI
- Overlay `.pc-info`: gradiente sostituito con grigio semitrasparente `rgba(40,38,35,0.75)`

---

## [1.1.0] — 2026-03-19 🎨 Artwork definitivo

- 40 illustrazioni ridisegnate in stile pittorico fiammingo
- Lane G1/G2 con altezza fissa (280px), illustrazioni a pieno campo con overlay
- CSS estratto in `style.css`, corretti nomi file `illetterato.png` e `limpiccato.png`

---

## [1.0.0] — 2026-03-17 🎉 Prima release pubblica

- Campo 5 caselle, 3 zone, 40 pezzi, rarità a 4 fasce, punteggio vittoria 50pt
- Multiplayer Firebase: login, ELO, classifica, partita rapida, invita amico, timer 45s
- Architettura modulare ES: `firebase.js`, `shared.js`, `game.js`, `matchmaking.js`, `auth.js`, `style.css`
