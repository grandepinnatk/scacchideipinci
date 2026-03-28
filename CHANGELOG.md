# Changelog — Scacchi dei Pinci

---

<<<<<<< HEAD
## [1.4.0] — 2026-03-28

Questa release consolida tutte le funzionalità introdotte nelle versioni 1.3.8 e 1.3.9 e segna il passaggio a una versione major minore per la presenza di un motore di gioco completamente nuovo.

### Motore AI — Gioca vs CPU (`ai.js`)

Nuovo modulo `ai.js` (zero dipendenze Firebase) che implementa tre livelli di difficoltà. Il giocatore umano è sempre G1; il CPU è sempre G2 e pianifica le proprie mosse automaticamente dopo un ritardo variabile (500–1300 ms) che simula il pensiero.

- **🎲 Facile** — weighted random proporzionale al valore `val` di ogni carta nel basket. Non valuta il campo né simula combattimenti. Adatto per imparare le meccaniche.
- **⚔ Medio** — greedy a 1 passo: simula ogni possibile inserimento (fino a 10 carte), sceglie il delta `pts[1]−pts[0]` più favorevole. 10% di probabilità di optare per la seconda scelta migliore per simulare l'imperfezione umana.
- **💀 Difficile** — ottimizzazione sulla coppia: testa tutte le coppie ordinate di carte (fino a 90 combinazioni per il doppio inserimento del turno) e aggiunge un bonus posizionale che valuta la forza di ogni carta in campo nella propria zona corrente. Raramente sbaglia.

Il pulsante "Gioca in locale" è stato rinominato in **"🤖 Gioca vs CPU"** e reindirizzato a una nuova schermata di selezione difficoltà (`screen-ai-difficulty`) con tre pulsanti descrittivi. Al termine della partita il giocatore torna automaticamente alla selezione difficoltà.

**Integrazione tecnica:** `game.js` chiama `window._aiModule.scheduleMove()` dopo ogni `doInsert()` quando `G.turn === 1` e `AI.active`; `auth.js` carica `ai.js` con `import()` dinamico e lo registra su `window._aiModule` / `window.playVsAI`; `matchmaking.js`: `playLocal()` reindirizza a `showAIDifficultyScreen()`. L'accesso tramite `window._aiModule` evita dipendenze circolari tra moduli ES.

**UX:** badge `CPU Facile / Medio / Difficile` nel turn banner durante il turno del CPU; overlay finale con "Hai vinto! 🏆" o "Il CPU ha vinto! 🤖" invece del generico "Giocatore 2 vince!".

### Partite vs CPU escluse dalle statistiche

Le partite contro il motore AI **non modificano ELO, vittorie, sconfitte né partite giocate**. Solo le partite multiplayer online contano per la classifica. Aggiunto guard esplicito all'inizio di `updateEloStats` in `matchmaking.js`: se `window._aiModule.AI.active` è `true` la funzione ritorna immediatamente senza toccare Firebase.

### Stato giocatore in classifica

Ogni riga della classifica — sia nella tabella in lobby che nella pagina `leaderboard.html` — mostra un **pallino colorato** come seconda colonna, subito dopo il numero di posizione:

- 🟢 **Verde** — online (`lastSeen` negli ultimi 5 minuti)
- 🟠 **Arancio** — in gioco (`inGame: true` su Firebase)
- ⚫ **Grigio scuro** — offline

**Scritture su Firebase:** `matchmaking.js` scrive `inGame: true` su `/users/{uid}` all'avvio di ogni partita online (`startOnlineGame`) e `inGame: false` alla fine (`cleanupMP`). Il campo viene anche resettato a `false` in `ensureUserProfile` al login o ricaricamento pagina, per evitare stati bloccati in caso di crash.

**Heartbeat presenza:** `auth.js` aggiorna `lastSeen` ogni 90 secondi tramite `setInterval` mentre il giocatore è in lobby, così il pallino verde rimane acceso per tutta la sessione e si spegne entro 5 minuti dalla chiusura della tab.

**CSS:** `.lb-dot`, `.lb-dot-online`, `.lb-dot-ingame`, `.lb-dot-offline`, `.lb-dot-cell` aggiunti sia in `index.html` che in `leaderboard.html`. Colspan di tutte le tabelle classifica aggiornato da 5 a 6.

---

## [1.3.7] — 2026-03-27

### Modifiche UI
- **Leaderboard — paginazione completa** — la tabella mostra tutti i giocatori registrati con navigazione a pagine. Menu a tendina per scegliere 10, 20 o 50 righe per pagina. Barra di navigazione con prima/ultima pagina sempre visibili, finestra di 3 pagine intorno alla corrente, ellissi (`…`) per i salti. Indicatore testuale "X–Y di N". Al caricamento la vista si apre sulla pagina che contiene la propria riga
=======
## [1.3.7] — 2026-03-27

### Modifiche UI
- **Leaderboard — paginazione completa** — la tabella mostra ora tutti i giocatori registrati con navigazione a pagine. Menu a tendina nella barra "CLASSIFICA COMPLETA" per scegliere tra 10, 20 o 50 righe per pagina. La barra di navigazione mostra sempre la prima e l'ultima pagina, una finestra di 3 pagine intorno a quella corrente, e ellissi (`…`) per i salti. Indicatore testuale "X–Y di N" per orientamento immediato. Al caricamento, se l'utente è loggato, la vista si apre direttamente sulla pagina che contiene la propria riga. Le medaglie 🥇🥈🥉 per i top 3 sono mantenute indipendentemente dalla pagina visualizzata
>>>>>>> ca9653a161d236c1c4ab82e11771244aa0b066c3

---

## [1.3.6] — 2026-03-27

### Modifiche UI
<<<<<<< HEAD
- **Leaderboard — restyling completo** — `leaderboard.html` ridisegnata con lo stesso sistema visivo della lobby: font `BurbankBig` embedded, palette CSS identica, layout `.lobby-box`
- **Leaderboard — podio top 3** — sezione "PODIO" con `.stat-card` a griglia 3 colonne; primo posto evidenziato con `--goldbg` e bordo `--gold`
- **Leaderboard — taglio intelligente** — primi 10 giocatori con separatore `· · ·` e riga utente contestuale
=======
- **Leaderboard — restyling completo** — `leaderboard.html` ridisegnata con lo stesso sistema visivo della lobby: font `BurbankBig` embedded, palette CSS identica (`--bg`, `--gold #e8a020`, `--p1`, `--p2`), layout `.lobby-box` con `border-radius-lg` e bordo `--border2`. Header con `.lobby-header` / `.lobby-title`, pulsante "← Lobby" nello stesso stile dei controlli di navigazione esistenti, sezioni con `.lobby-section` uppercase
- **Leaderboard — podio top 3** — nuova sezione "PODIO" sopra la tabella, resa con le `.stat-card` a griglia 3 colonne della lobby; la card del primo posto è evidenziata con `--goldbg` e bordo `--gold`
- **Leaderboard — taglio intelligente** — mostra i primi 10 giocatori; se l'utente è oltre la top 10, la sua riga appare dopo un separatore `· · ·` con i 3 giocatori adiacenti in classifica
>>>>>>> ca9653a161d236c1c4ab82e11771244aa0b066c3

---

## [1.3.5] — 2026-03-26

### Nuove funzionalità
- **Pagina classifica completa** (`leaderboard.html`) — tutti i giocatori ordinati per ELO, medaglie top 3, evidenziazione propria riga, contatore totale, pulsante "← Lobby"
- **Link in lobby** — titolo "CLASSIFICA" con link "Vedi completa →"

---

## [1.3.4] — 2026-03-26

### Correzioni
- **Scroll pagina** — risolto bug `align-items:center` su `.screen.show` con `position:fixed` che tagliava il contenuto in alto su viewport piccole

---

## [1.3.3] — 2026-03-26

### Modifiche UI
- **Classifica** — ridotta a Top 10; font tabella 18px su desktop

---

## [1.3.2] — 2026-03-26

### Nuove funzionalità
- **Classifica** — estesa a 15 giocatori con riga utente separata da `···`
- **Statistiche personali** — card POSIZIONE (`#N`), griglia 4 colonne

---

## [1.3.1] — 2026-03-26

### Correzioni
- **Classifica lobby** — gestione errori con messaggio visivo

---

## [1.3.0] — 2026-03-26

### Modifiche UI
- **Lobby** — classifica spostata sotto i pulsanti di gioco

---

## [1.2.9] — 2026-03-25

### Correzioni
- **Classifica** — ordinamento lato client invece di `orderByChild`

---

## [1.2.8] — 2026-03-25

### Correzioni
- **Carte e pesi admin** — `applyAdminConfig` usa `PIECE_OVERRIDES` e rigenera `POOL`

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
