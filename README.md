# Scacchi dei Pinci — v1.0.0

Un gioco di strategia per 2 giocatori ispirato ai racconti di Jorge Luis Borges.

🎮 **[Gioca ora](https://grandepinnatk.github.io/scacchideipinci/)**

---

## Come si gioca

Il campo è una linea di 5 caselle divise in 3 zone: **Castello** (1-2), **Sala del Re** (3) e **Villaggio** (4-5).

I due giocatori inseriscono i pezzi da lati opposti, uno alla volta. Ogni nuovo pezzo spinge quelli esistenti verso l'avversario. Quando due pezzi si trovano nella stessa casella, si confrontano i valori per quella zona — chi ha il valore più alto guadagna 1 punto. Il primo a **30 punti** vince.

**Primo turno speciale:** ogni giocatore inserisce 1 solo pezzo. Dal secondo turno in poi, 2 pezzi a testa.

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
│  G1: 1 pezzo · G2: 1 pezzo  │
└─────────────┬───────────────┘
              │
┌─────────────▼───────────────┐  ◄──────────────────────┐
│       Turno N ≥ 2           │                          │
│   ogni giocatore: 2 pezzi   │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐  ┌──────────────────┐   │
│  Seleziona carta dal basket │  │    Timer 45s     │   │
└─────────────┬───────────────┘  │ auto: carta peg. │   │
              │         - - - -► └──────────────────┘   │
┌─────────────▼───────────────┐                          │
│   Gioca Carta → pipe        │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐                          │
│   Confronto automatico      │                          │
│  valore zona · +1 punto     │                          │
└─────────────┬───────────────┘                          │
              │                                          │
┌─────────────▼───────────────┐  ┌──────────────────┐   │
│      Punteggio ≥ 30?        │  │ Termina partita  │   │
└──┬──────────────────────────┘  │ sconfitta immed. │   │
   │ No              │ Sì - - -► └──────────────────┘   │
   └─────────────────┘                                   │
   │                 │                                   │
   └─────────────────┴──── No ──────────────────────────►┘
                     │ Sì
        ┌────────────▼─────────────┐  ┌──────────────────┐
        │      Fine partita        │  │  Disconnessione  │
        │ HAI VINTO/PERSO · ELO    │  │ vittoria 2 min   │
        └────────────┬─────────────┘  └──────────────────┘
                     │
        ┌────────────▼─────────────┐
        │     Torna alla lobby     │
        └──────────────────────────┘
```

> Il diagramma completo in PDF è disponibile nel file `scacchi_dei_pinci_flusso_v1.0.0.pdf`.

---

## I 40 Pezzi

Ogni pezzo ha valori specifici per le tre zone e un'illustrazione ispirata a un racconto di Borges.

| Rarità | Colore |
|--------|--------|
| 🟡 Leggendario | Oro |
| 🟣 Epico | Viola |
| 🔵 Raro | Blu |
| ⚫ Comune | Grigio |

---

## Struttura del Progetto

```
index.html        — HTML + CSS + font embedded
firebase.js       — Inizializzazione Firebase SDK
shared.js         — Stato condiviso tra moduli (MP, currentUser, showScreen)
game.js           — Logica di gioco, render, settings
matchmaking.js    — Quick match, invite, sync online, timer, forfeit
auth.js           — Autenticazione, lobby, ELO, bootstrap
img/              — 40 illustrazioni PNG dei pezzi
CHANGELOG.md      — Storia delle versioni
```

---

## Firebase Setup

Il gioco usa Firebase Realtime Database e Authentication. La configurazione è in `firebase.js`.

**Regole database consigliate:**
```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
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

Ogni pezzo è associato a un racconto di **Jorge Luis Borges** — dall'Aleph alla Biblioteca di Babele. Le illustrazioni seguono l'estetica delle carte Magic: The Gathering.
