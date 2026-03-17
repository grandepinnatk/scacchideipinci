# Changelog — Scacchi dei Pinci

---

## [1.0.0] — 2026-03-17 🎉 Prima release pubblica

### Gioco base
- Campo lineare 5 caselle divise in 3 zone: Castello (1-2), Sala del Re (3), Villaggio (4-5)
- Turno 1 speciale: 1 pezzo a testa; dal turno 2 in poi 2 pezzi per giocatore
- Giocatore 1 inserisce da sinistra, Giocatore 2 da destra; spinta dei pezzi a ogni inserimento
- Confronto automatico quando due pezzi si trovano nella stessa casella
- Vittoria al raggiungimento di 30 punti (configurabile fino a 100)
- 40 pezzi ispirati ai racconti di Jorge Luis Borges con illustrazioni stile Magic: The Gathering
- Sistema di rarità a 4 fasce: Leggendario, Epico, Raro, Comune
- Basket comune da 10 pezzi con rimpiazzo automatico dopo ogni mossa

### Multiplayer Firebase
- Login con email/password, Google, Microsoft con fallback redirect se popup bloccato
- Registrazione con scelta del nome utente
- Lobby con statistiche personali (partite, vittorie, ELO) e classifica globale top-10
- **Partita rapida**: matchmaking tramite coda Firebase con polling ogni 2 secondi
- **Invita amico**: codice di 6 caratteri condivisibile; l'amico lo inserisce per unirsi
- Sincronizzazione stato in tempo reale via Firebase Realtime Database
- Nomi reali dei giocatori nel scoreboard e nel turn banner
- Tasto "Termina Partita" con modale di conferma; vittoria assegnata all'avversario
- Timer 45 secondi per mossa; allo scadere viene giocata automaticamente la carta peggiore
- Heartbeat presenza ogni 20 secondi; abbandono rilevato dopo 2 minuti di assenza
- Reconnect dopo refresh: partita in corso ripristinabile al login
- Popup personalizzato "HAI VINTO!" / "HAI PERSO!" al termine
- Sistema ELO aggiornato automaticamente al termine di ogni partita
- Tasto "Torna alla lobby" nel popup finale

### Architettura
- Codice suddiviso in moduli ES con import/export espliciti:
  - `firebase.js` — inizializzazione Firebase SDK
  - `shared.js` — stato condiviso (MP, currentUser, showScreen, costanti)
  - `game.js` — logica di gioco pura, render, settings
  - `matchmaking.js` — quickmatch, invite, sync online, timer, forfeit
  - `auth.js` — autenticazione, lobby, ELO, event listeners, bootstrap
- Cache busting con `?v=1.0.0` su tutti gli import locali
- Serializzazione pipe come oggetto con chiavi stringa per preservare slot null su Firebase
- `normalizeState()` per ripristinare array dopo deserializzazione Firebase

### Layout responsive
- **Mobile** (< 768px): basket in riga orizzontale scrollabile, log in fondo, phase indicator nel turn banner
- **PC / Tablet** (≥ 768px): campo 55% + sidebar 45% con basket in griglia 5 colonne
- Font Burbank Big Condensed per tutti gli elementi di gioco
