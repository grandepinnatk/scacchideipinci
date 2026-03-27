# Scacchi dei Pinci — v1.3.7

Un gioco di strategia per 2 giocatori ispirato ai racconti di Jorge Luis Borges.

🎮 **[Gioca ora](https://grandepinnatk.github.io/scacchideipinci/)**

---

## Come si gioca

Il campo è una linea di 5 caselle divise in 3 zone: **Castello** (1-2), **Sala del Re** (3) e **Villaggio** (4-5).

I due giocatori inseriscono i pezzi da lati opposti. Ogni nuovo pezzo spinge quelli esistenti verso l'avversario. Quando due pezzi si trovano nella stessa casella, si confrontano i valori per quella zona. Il primo a **50 punti** vince.

**Turno 1:** G1 inserisce 1 carta, G2 ne inserisce 2. Dal turno 2 entrambi inseriscono 2 carte.

**Sala del Re:** vincere il confronto nella casella 3 vale **2 punti** invece di 1.

---

## Come giocare le carte

| Dispositivo | Azione |
|-------------|--------|
| **PC** | Click per selezionare · Doppio click per giocare subito |
| **Mobile / Tablet** | Tap per selezionare · Swipe verso l'alto per giocare |
| **Tutti** | Seleziona + bottone "Gioca Carta" |

---

## Multiplayer

Accedi con email/password, Google o Microsoft. Dalla lobby puoi:

- **Partita rapida** — il sistema trova automaticamente un avversario
- **Invita amico** — genera un codice da condividere, l'amico lo inserisce per unirsi

Timer **45 secondi** per mossa. Se un giocatore abbandona per più di 2 minuti, la vittoria va all'avversario.

---

## Lobby

- **Statistiche personali** — Partite, Vittorie, ELO e Posizione in classifica globale
- **Pulsanti di gioco** — Partita rapida, Invita amico, Gioca in locale
- **Classifica globale** — Top 10 per ELO con link "Vedi completa →" alla pagina classifica dedicata

---

## Classifica

La pagina `leaderboard.html` mostra la classifica completa di tutti i giocatori registrati. Il design riprende integralmente quello della lobby: stessi font, stessa palette colori, stesso layout `.lobby-box`. La pagina include:

- **Podio** — le prime tre posizioni evidenziate come stat-card con medaglie 🥇🥈🥉
- **Classifica paginata** — tutti i giocatori ordinati per ELO con navigazione a pagine; menu a tendina per scegliere 10, 20 o 50 righe per pagina; indicatore "X–Y di N" e pulsanti con ellissi intelligente
- **Apertura contestuale** — se l'utente è loggato, la vista si apre direttamente sulla pagina che contiene la propria riga
- **Evidenziazione** — la propria riga è sempre marcata in oro; le medaglie per i top 3 sono mantenute indipendentemente dalla pagina

---

## I 40 Pezzi

| Rarità | Forza |
|--------|-------|
| 🟡 Leggendario | val ≥ 20 |
| 🟣 Epico | val 15–19 |
| 🔵 Raro | val 10–14 |
| ⚫ Comune | val < 10 |

Ogni pezzo ha valori C/R/V per le tre zone e un'illustrazione in stile pittura fiamminga (Bruegel, Bosch, van Eyck).

---

## Struttura del Progetto

```
index.html        — HTML + @font-face embedded
leaderboard.html  — Pagina classifica completa (design lobby)
admin.html        — Console di amministrazione
style.css         — Tutti gli stili del gioco
firebase.js       — Inizializzazione Firebase SDK
shared.js         — Stato condiviso (MP, getCurrentUser, showScreen)
game.js           — Logica di gioco, render, animazioni, settings
matchmaking.js    — Quick match, invite, sync online, timer, forfeit
auth.js           — Autenticazione, lobby, ELO, classifica, bootstrap
img/              — 40 illustrazioni PNG dei pezzi
CHANGELOG.md      — Storia delle versioni
```

---

## Console Admin

Accessibile su `/admin.html`. Richiede login con email autorizzata.

Super admin fisso: `grandepinna.tk@gmail.com`

- **Carte** — modifica C/R/V e forza; rarità aggiornata automaticamente
- **Impostazioni** — punteggio vittoria (10–200) e pesi rarità per fascia (0–30)
- **Amministratori** — aggiungi/rimuovi email con ruolo admin

---

## Firebase Setup

**Regole Realtime Database:**
```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      ".indexOn": ["elo"],
      "$uid": { ".write": "auth != null && auth.uid == $uid" }
    },
    "games": { "$gameId": { ".read": "auth != null", ".write": "auth != null" } },
    "matchmaking": { ".read": "auth != null", ".write": "auth != null" },
    "activeGame": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "invites": { ".read": "auth != null", ".write": "auth != null" },
    "admin": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```
