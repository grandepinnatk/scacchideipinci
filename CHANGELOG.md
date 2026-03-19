# Changelog — Scacchi dei Pinci

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — risolto bug per cui uno dei due giocatori veniva riportato alla schermata di login durante il matchmaking. Il problema era causato da `onAuthStateChanged` che si ri-attiva ad ogni rinnovo del token Firebase, chiamando `loadLobby` e `showScreen('screen-lobby')` anche mentre il giocatore era in attesa. Aggiunto guard: se `MP.isInQueue` o `MP.isOnline` sono attivi, il cambio di stato auth viene ignorato

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — risolto bug per cui riavviando una partita con lo stesso avversario il basket mostrava le carte della partita precedente. Aggiunta chiamata a `initGame()` all'inizio di `startOnlineGame` per resettare completamente lo stato di gioco prima di caricare i dati Firebase della nuova partita

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — il confronto in questa casella vale ora 2 punti invece di 1. Il log di gioco mostra correttamente `+1` o `+2` in base alla casella in cui avviene il combattimento

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — nuova regola: il Giocatore 1 inserisce 1 carta, il Giocatore 2 inserisce 2 carte. Dal turno 2 in poi entrambi inseriscono 2 carte come in precedenza
- Aggiornati banner, phase indicator e log di gioco per riflettere il conteggio corretto al turno 1

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — aggiunta barra separatrice verticale tra i due indicatori di stato (Online / In gioco)

---

## [1.1.3] — 2026-03-19

### Nuove funzionalità
- **Contatore utenti in lobby** — sopra le statistiche personali vengono ora mostrati in tempo reale il numero di utenti online (punto verde) e il numero di partite in corso (punto oro), aggiornati via Firebase listener
- Al login viene scritto `lastSeen` sul profilo utente per rilevare la presenza attiva

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — risolto bug per cui uno dei due giocatori veniva riportato alla schermata di login durante il matchmaking. Il problema era causato da `onAuthStateChanged` che si ri-attiva ad ogni rinnovo del token Firebase, chiamando `loadLobby` e `showScreen('screen-lobby')` anche mentre il giocatore era in attesa. Aggiunto guard: se `MP.isInQueue` o `MP.isOnline` sono attivi, il cambio di stato auth viene ignorato

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — risolto bug per cui riavviando una partita con lo stesso avversario il basket mostrava le carte della partita precedente. Aggiunta chiamata a `initGame()` all'inizio di `startOnlineGame` per resettare completamente lo stato di gioco prima di caricare i dati Firebase della nuova partita

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — il confronto in questa casella vale ora 2 punti invece di 1. Il log di gioco mostra correttamente `+1` o `+2` in base alla casella in cui avviene il combattimento

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — nuova regola: il Giocatore 1 inserisce 1 carta, il Giocatore 2 inserisce 2 carte. Dal turno 2 in poi entrambi inseriscono 2 carte come in precedenza
- Aggiornati banner, phase indicator e log di gioco per riflettere il conteggio corretto al turno 1

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — aggiunta barra separatrice verticale tra i due indicatori di stato (Online / In gioco)

---

## [1.1.3] — 2026-03-19

### Correzioni
- **Partita rapida** — risolto errore `Cannot read properties of null (reading 'uid')`: `currentUser` veniva letto prima che Firebase completasse l'autenticazione. Introdotta la funzione `getCurrentUser()` in `shared.js` che legge sempre il valore aggiornato al momento della chiamata, eliminando il problema di binding statico dei moduli ES

---

## [1.1.2] — 2026-03-19

### Correzioni UI
- Barra di connessione multiplayer (`.mp-bar-conn`): `font-size` aumentato da `11px` a `18px`

---

## [1.1.1] — 2026-03-19

### Correzioni UI
- **Overlay carte campo** — sfondo dell'overlay `.pc-info` cambiato da gradiente nero a grigio piatto semitrasparente `rgba(40,38,35,0.75)`, più coerente con la palette del gioco

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — risolto bug per cui uno dei due giocatori veniva riportato alla schermata di login durante il matchmaking. Il problema era causato da `onAuthStateChanged` che si ri-attiva ad ogni rinnovo del token Firebase, chiamando `loadLobby` e `showScreen('screen-lobby')` anche mentre il giocatore era in attesa. Aggiunto guard: se `MP.isInQueue` o `MP.isOnline` sono attivi, il cambio di stato auth viene ignorato

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — risolto bug per cui riavviando una partita con lo stesso avversario il basket mostrava le carte della partita precedente. Aggiunta chiamata a `initGame()` all'inizio di `startOnlineGame` per resettare completamente lo stato di gioco prima di caricare i dati Firebase della nuova partita

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — il confronto in questa casella vale ora 2 punti invece di 1. Il log di gioco mostra correttamente `+1` o `+2` in base alla casella in cui avviene il combattimento

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — nuova regola: il Giocatore 1 inserisce 1 carta, il Giocatore 2 inserisce 2 carte. Dal turno 2 in poi entrambi inseriscono 2 carte come in precedenza
- Aggiornati banner, phase indicator e log di gioco per riflettere il conteggio corretto al turno 1

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — aggiunta barra separatrice verticale tra i due indicatori di stato (Online / In gioco)

---

## [1.1.3] — 2026-03-19

### Nuove funzionalità
- **Contatore utenti in lobby** — sopra le statistiche personali vengono ora mostrati in tempo reale il numero di utenti online (punto verde) e il numero di partite in corso (punto oro), aggiornati via Firebase listener
- Al login viene scritto `lastSeen` sul profilo utente per rilevare la presenza attiva

---

## [1.1.8] — 2026-03-20

### Correzioni
- **Partita rapida** — risolto bug per cui uno dei due giocatori veniva riportato alla schermata di login durante il matchmaking. Il problema era causato da `onAuthStateChanged` che si ri-attiva ad ogni rinnovo del token Firebase, chiamando `loadLobby` e `showScreen('screen-lobby')` anche mentre il giocatore era in attesa. Aggiunto guard: se `MP.isInQueue` o `MP.isOnline` sono attivi, il cambio di stato auth viene ignorato

---

## [1.1.7] — 2026-03-19

### Correzioni
- **Nuova partita dopo abbandono** — risolto bug per cui riavviando una partita con lo stesso avversario il basket mostrava le carte della partita precedente. Aggiunta chiamata a `initGame()` all'inizio di `startOnlineGame` per resettare completamente lo stato di gioco prima di caricare i dati Firebase della nuova partita

---

## [1.1.6] — 2026-03-19

### Modifiche regole
- **Sala del Re (casella 3)** — il confronto in questa casella vale ora 2 punti invece di 1. Il log di gioco mostra correttamente `+1` o `+2` in base alla casella in cui avviene il combattimento

---

## [1.1.5] — 2026-03-19

### Modifiche regole
- **Turno 1** — nuova regola: il Giocatore 1 inserisce 1 carta, il Giocatore 2 inserisce 2 carte. Dal turno 2 in poi entrambi inseriscono 2 carte come in precedenza
- Aggiornati banner, phase indicator e log di gioco per riflettere il conteggio corretto al turno 1

---

## [1.1.4] — 2026-03-19

### Correzioni UI
- **Lobby** — aggiunta barra separatrice verticale tra i due indicatori di stato (Online / In gioco)

---

## [1.1.3] — 2026-03-19

### Correzioni
- **Partita rapida** — risolto errore `Cannot read properties of null (reading 'uid')`: `currentUser` veniva letto prima che Firebase completasse l'autenticazione. Introdotta la funzione `getCurrentUser()` in `shared.js` che legge sempre il valore aggiornato al momento della chiamata, eliminando il problema di binding statico dei moduli ES

---

## [1.1.2] — 2026-03-19

### Correzioni UI
- Barra di connessione multiplayer (`.mp-bar-conn`): `font-size` aumentato da `11px` a `18px`

---

## [1.1.1] — 2026-03-19

### Correzioni UI
- Overlay `.pc-info` nel campo di gioco: sostituito il gradiente nero con un grigio piatto semitrasparente (`rgba(40,38,35,0.75)`) per un aspetto più pulito e coerente con la palette del gioco

---

## [1.1.0] — 2026-03-19 🎨 Artwork definitivo

### Release notes

Questa release completa il corredo visivo del gioco. Tutte e 40 le illustrazioni dei pezzi sono state ridisegnate e sostituite con l'artwork definitivo, realizzato in uno stile pittorico ispirato ai maestri fiamminghi del XV e XVI secolo — Bruegel, Bosch, van Eyck. Ogni carta è ora accompagnata da una scena originale che evoca il personaggio e il suo ruolo nell'universo dei Pinci, con ambientazioni grottesche, popolate di creature ibride, scheletri, corvi e paesaggi in fiamme.

Le illustrazioni coprono l'intera gamma dei 40 pezzi: dall'**Accenditorce** che illumina la notte con la torcia tra folla di fantasmi, al **Vendistracci** carico di cianfrusaglie che vaga per un paesaggio desolato; dal **Boia Tagliateste** che brandisce la lama insanguinata davanti a una folla urlante, alla **Sentinella Sicula** in armatura con simboli dell'isola; dal **Ratto di Fogna** — creatura metà uomo metà roditore nelle fognature medievali — al **Reggitrono**, portantina grottesca su cui siede un re sghignazzante.

Le quattro carte completate in questa release — **Bevipozioni**, **Mangiapane**, **Srotolatappeti** e **Vendistracci** — chiudono il ciclo visivo avviato nella v1.0.0.

### Correzioni UI
- **Campo di gioco** — le due lane (G1/G2) ora hanno altezza fissa e garantita: ogni cella è alta 280px, ogni corsia esattamente il 50%. Illustrazione, nome e valori sono sempre visibili in tutte e 5 le caselle, incluse quelle del Villaggio
- **CSS estratto** in file separato `style.css` (24KB); i `@font-face` con i dati embedded restano inline in `index.html`

### Modifiche tecniche
- Aggiornate tutte e 40 le immagini PNG nella cartella `img/`
- Corretti i nomi file di `Illetterato` (`illetterato.png`) e `L'impiccato` (`limpiccato.png`) che non corrispondevano alla convenzione di naming del codice
- Versione aggiornata a `1.1.0` in tutti i moduli

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
