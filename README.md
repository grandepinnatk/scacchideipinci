# Scacchi dei Pinci — v1.3.2

Un gioco di strategia per 2 giocatori ispirato ai racconti di Jorge Luis Borges.

🎮 **[Gioca ora](https://grandepinnatk.github.io/scacchideipinci/)**

---

## Come si gioca

Il campo è una linea di 5 caselle divise in 3 zone: **Castello** (1-2), **Sala del Re** (3) e **Villaggio** (4-5).

I due giocatori inseriscono i pezzi da lati opposti, uno alla volta. Ogni nuovo pezzo spinge quelli esistenti verso l'avversario. Quando due pezzi si trovano nella stessa casella, si confrontano i valori per quella zona. Il primo a **50 punti** vince.

**Turno 1:** il Giocatore 1 inserisce 1 carta, il Giocatore 2 ne inserisce 2. Dal turno 2 in poi entrambi inseriscono 2 carte a testa.

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

Ogni mossa ha un timer di **45 secondi**. Allo scadere viene giocata automaticamente la carta peggiore. Se un giocatore abbandona o si disconnette per più di 2 minuti, la vittoria è assegnata all'avversario.

---

## Lobby

La lobby mostra:
- **Statistiche personali** — Partite giocate, Vittorie, ELO e Posizione in classifica globale
- **Pulsanti di gioco** — Partita rapida, Invita amico, Gioca in locale
- **Classifica globale** — Top 15 giocatori per ELO. Se non sei nei top 15, la tua riga appare separata in fondo

---

## Schema a blocchi del flusso di gioco

```
┌─────────────────────────┐
│      Apertura app       │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│  Login / Registrazione  │
│  email · Google · MS    │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│          Lobby          │
│  statistiche · ELO      │
│  posizione · classifica │
└────────────┬────────────┘
             │
     ┌───────▼────────┐
     │ Scelta modalità│
     └──┬──────┬───┬──┘
        │      │   │
  Rapida│  Inv.│   │Locale
        │      │   │
┌───────▼┐ ┌───▼──┐ ┌▼──────┐
│ Coda   │ │Codice│ │Stesso │
│poll.2s │ │ 6chr │ │schermo│
└───┬────┘ └──┬───┘ └──┬────┘
    └─────────┼─────────┘
              │
┌─────────────▼───────────────┐
│    Partita avviata — T1     │
│  G1: 1 carta · G2: 2 carte  │
└─────────────┬───────────────┘
              │
┌─────────────▼───────────────┐  ◄──────────────────────┐
│       Turno N ≥ 2           │                          │
│   ogni giocatore: 2 carte   │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐  ┌──────────────────┐   │
│  Seleziona carta dal basket │  │    Timer 45s     │   │
│  (swipe / doppio click / btn)│  │ auto: carta peg. │   │
└─────────────┬───────────────┘  └──────────────────┘   │
              │                                          │
┌─────────────▼───────────────┐                          │
│   Gioca Carta → pipe        │                          │
│   (animazione scorrimento)  │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐                          │
│   Confronto automatico      │                          │
│  Castello/Villaggio: +1pt   │                          │
│  Sala del Re: +2pt          │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐                          │
│      Punteggio ≥ 50?        │──── No ─────────────────►┘
└─────────────┬───────────────┘
              │ Sì
┌─────────────▼─────────────┐
│      Fine partita         │
│ HAI VINTO/PERSO · ELO     │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│     Torna alla lobby      │
└───────────────────────────┘
```

---

## I 40 Pezzi

Ogni pezzo ha valori per le tre zone e un'illustrazione in stile pittura fiamminga.

| Rarità | Colore | Forza |
|--------|--------|-------|
| 🟡 Leggendario | Oro | val ≥ 20 |
| 🟣 Epico | Viola | val 15–19 |
| 🔵 Raro | Blu | val 10–14 |
| ⚫ Comune | Grigio | val < 10 |

---

## Struttura del Progetto

```
index.html        — HTML + @font-face embedded
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

Accessibile su `/admin.html`. Richiede login con un'email autorizzata.

- **Carte** — modifica C/R/V e forza di ogni carta
- **Impostazioni** — punteggio vittoria e pesi per rarità
- **Amministratori** — gestione lista email admin

Super admin fisso: `grandepinna.tk@gmail.com`

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

---

## Ispirazione

Ogni pezzo è associato a un racconto di **Jorge Luis Borges**. Le illustrazioni seguono l'estetica della pittura fiamminga del XV–XVI secolo (Bruegel, Bosch, van Eyck).
