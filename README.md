# Scacchi dei Pinci — v1.2.0

Un gioco di strategia per 2 giocatori ispirato ai racconti di Jorge Luis Borges.

🎮 **[Gioca ora](https://grandepinnatk.github.io/scacchideipinci/)**

---

## Come si gioca

Il campo è una linea di 5 caselle divise in 3 zone: **Castello** (1-2), **Sala del Re** (3) e **Villaggio** (4-5).

I due giocatori inseriscono i pezzi da lati opposti, uno alla volta. Ogni nuovo pezzo spinge quelli esistenti verso l'avversario. Quando due pezzi si trovano nella stessa casella, si confrontano i valori per quella zona — chi ha il valore più alto guadagna punti. Il primo a **30 punti** vince.

**Turno 1 speciale:** il Giocatore 1 inserisce 1 sola carta; il Giocatore 2 ne inserisce 2. Dal secondo turno in poi entrambi inseriscono 2 carte a testa.

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
└─────────────┬───────────────┘  │ auto: carta peg. │   │
              │         ·······► └──────────────────┘   │
┌─────────────▼───────────────┐                          │
│   Gioca Carta → pipe        │                          │
│  (swipe / doppio click / btn)│                         │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐                          │
│   Confronto automatico      │                          │
│  Castello/Villaggio: +1pt   │                          │
│  Sala del Re: +2pt          │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐                          │
│      Punteggio ≥ 30?        │──── No ─────────────────►┘
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

> Il diagramma completo in PDF è disponibile nel file `scacchi_dei_pinci_flusso_v1.0.0.pdf`.

---

## I 40 Pezzi

Ogni pezzo ha valori specifici per le tre zone e un'illustrazione ispirata ai racconti di Borges, in stile pittura fiamminga.

| Rarità | Colore |
|--------|--------|
| 🟡 Leggendario | Oro |
| 🟣 Epico | Viola |
| 🔵 Raro | Blu |
| ⚫ Comune | Grigio |

---

## Struttura del Progetto

```
index.html        — HTML + @font-face embedded
style.css         — tutti gli stili del gioco
firebase.js       — inizializzazione Firebase SDK
shared.js         — stato condiviso (MP, getCurrentUser, showScreen)
game.js           — logica di gioco, render, animazioni, settings
matchmaking.js    — quick match, invite, sync online, timer, forfeit
auth.js           — autenticazione, lobby, ELO, bootstrap
img/              — 40 illustrazioni PNG dei pezzi
CHANGELOG.md      — storia delle versioni
```

---

## Firebase Setup

Il gioco usa Firebase Realtime Database e Authentication. La configurazione è in `firebase.js`.

**Regole database:**
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
    "invites": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

---

## Ispirazione

Ogni pezzo è associato a un racconto di **Jorge Luis Borges** — dall'Aleph alla Biblioteca di Babele. Le illustrazioni seguono l'estetica della pittura fiamminga del XV-XVI secolo.
