# Changelog

Tutte le modifiche rilevanti al progetto sono documentate in questo file.

---

## [1.3.0] - 2026-03-16

### Fix Multiplayer — Turni e Lobby

- **Fix prima mossa bloccata** — `selectCard` ora blocca la selezione quando non è il turno del giocatore in modalità online; `renderBasket` non abilita più il tasto "Gioca Carta" durante il turno dell'avversario
- **Fix "Termina Partita" non tornava alla lobby** — `forfeitGame` ora chiama `cleanupMP()` dopo 1.5 secondi al termine dell'abbandono; `resetGame` a partita già conclusa va direttamente alla lobby invece di richiamare `forfeitGame`

---

## [1.2.0] - 2026-03-16

### Multiplayer Firebase — Riscrittura completa

#### Funzionalità nuove
- **Sincronizzazione turni corretta** — Firebase Realtime Database come unica fonte di verità; ogni mossa viene salvata e ricevuta via `onValue`; hash dell'ultimo stato salvato per evitare echo loop
- **Nomi giocatori reali** — scoreboard e turn banner mostrano i nomi degli utenti loggati invece di "Giocatore 1 / Giocatore 2"
- **Tasto "Termina Partita"** — sostituisce "Nuova partita" durante le partite online; alla pressione chiede conferma e assegna la vittoria all'avversario
- **Timer 45 secondi per mossa** — countdown visibile nella barra superiore; allo scadere viene selezionata automaticamente la carta con il punteggio totale più basso
- **Riconnessione dopo refresh (F5)** — lo stato della partita viene salvato in `activeGame/{uid}` su Firebase; al login viene proposto di riprendere la partita interrotta
- **Rilevamento disconnessione** — heartbeat ogni 20 secondi; se l'avversario non aggiorna la propria presenza per più di 2 minuti viene assegnata la vittoria; `beforeunload` azzera immediatamente la presenza alla chiusura della pagina
- **Blocco turno avversario** — il tasto "Gioca Carta" e la selezione delle carte sono disabilitati quando non è il turno del giocatore

#### Struttura Firebase aggiornata
- `activeGame/{uid}` — partita in corso per reconnect
- `games/{gameId}/presence` — heartbeat presenza giocatori
- `games/{gameId}/turnDeadline` — scadenza turno corrente
- `games/{gameId}/status` — stato partita (`playing` / `finished`)

---

## [1.1.0] - 2026-03-16

### Multiplayer Firebase — Prima implementazione

#### Autenticazione
- Login con email e password
- Login con Google (OAuth)
- Login con Microsoft (OAuth)
- Registrazione con scelta del nome utente
- Gestione errori Firebase in italiano

#### Lobby
- Avatar utente (foto profilo o iniziale del nome)
- Statistiche personali: partite giocate, vittorie, punteggio ELO
- Classifica globale top-10 ordinata per ELO
- Sistema ELO aggiornato automaticamente al termine di ogni partita

#### Matchmaking
- **Partita rapida** — coda automatica su Firebase; il primo giocatore attende, il secondo lo trova e avvia la partita
- **Invita un amico** — codice di 6 caratteri da condividere; cliccabile per copiare negli appunti; il secondo giocatore lo inserisce per unirsi

#### Fix event listeners
- Rimossi tutti gli `onclick` inline dall'HTML — incompatibili con `<script type="module">`
- Sostituiti con `addEventListener` dentro il modulo
- Funzioni esposte su `window` dove necessario per i pulsanti in HTML statico

---

## [1.0.0] - 2026-03-16

### Gioco base — Versione iniziale

#### Regole
- Campo lineare 5 caselle divise in 3 zone: Castello (1-2), Sala del Re (3), Villaggio (4-5)
- Turno 1 speciale: 1 pezzo a testa; dal turno 2 in poi 2 pezzi per giocatore
- Giocatore 1 inserisce da sinistra, Giocatore 2 da destra; ogni inserimento spinge i pezzi esistenti
- Confronto automatico quando due pezzi occupano la stessa casella; vince chi ha il valore più alto nella zona corrispondente
- Vittoria al primo giocatore che raggiunge 30 punti (configurabile)

#### Pezzi
- 40 pezzi ispirati ai racconti di Jorge Luis Borges
- Valori distinti per le tre zone: Castello (C), Re (R), Villaggio (V)
- Sistema di rarità a 4 fasce: Leggendario, Epico, Raro, Comune
- Illustrazioni in stile Magic: The Gathering

#### Basket comune
- 10 pezzi estratti casualmente con frequenza pesata per rarità
- Rimpiazzo automatico dopo ogni carta giocata
- Pesi di estrazione configurabili per fascia nel menu impostazioni

#### Layout responsive
- **Mobile** (< 768px): layout verticale, basket su riga orizzontale scrollabile, log in fondo alla pagina
- **PC / Tablet** (≥ 768px): campo 55% a sinistra, sidebar 45% a destra con basket in griglia 5 colonne

#### Menu impostazioni
- Tab **Rarità**: sliders per il peso di estrazione di ogni fascia (0 = mai estratta)
- Tab **Pezzi**: modifica valori C/R/V e valore totale per ogni pezzo; badge rarità aggiornato in tempo reale; ripristino ai valori default
- Tab **Regole**: punteggio di vittoria configurabile da 10 a 100 punti

#### UI/UX
- Font Burbank Big Condensed per tutti gli elementi di gioco
- Zone del campo colorate: Castello blu, Sala del Re oro, Villaggio verde
- Corsie G1 (blu) e G2 (rosso) visibili nel campo
- Carte basket colorate per rarità: oro (Leggendario), viola (Epico), blu (Raro), grigio (Comune)
- Giocatore di turno evidenziato con sfondo colorato nel scoreboard
- Indicatori Pezzo 1 / Pezzo 2 sotto il campo; su mobile nella stessa riga del turn banner
- Tasto "Gioca Carta" (sostituisce "Inserisci nel campo")
- Rimozione sottotitolo dalla testata
