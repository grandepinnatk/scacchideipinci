# Scacchi dei Pinci

Un gioco di strategia per 2 giocatori ispirato ai racconti di Jorge Luis Borges.

🎮 **[Gioca ora](https://grandepinnatk.github.io/scacchideipinci/)**

---

## Come si gioca

Il campo è una linea di 5 caselle divise in 3 zone: **Castello** (caselle 1-2), **Sala del Re** (casella 3) e **Villaggio** (caselle 4-5).

I due giocatori inseriscono i pezzi da lati opposti del campo, uno alla volta. Ogni nuovo pezzo inserito spinge quelli esistenti verso l'avversario. Quando due pezzi si trovano nella stessa casella, si confrontano i valori per quella zona — chi ha il valore più alto guadagna 1 punto. Il primo a **30 punti** vince.

**Primo turno speciale:** ogni giocatore inserisce solo 1 pezzo. Dal secondo turno in poi, 2 pezzi a testa.

---

## I Pezzi

Il gioco include **40 pezzi** ispirati ai personaggi borgesiani, ognuno con valori diversi per le tre zone del campo. I pezzi sono divisi in 4 fasce di rarità:

| Rarità | Colore |
|--------|--------|
| 🟡 Leggendario | Oro |
| 🟣 Epico | Viola |
| 🔵 Raro | Blu |
| ⚫ Comune | Grigio |

---

## Basket Comune

All'inizio della partita si forma un basket di 10 pezzi estratti casualmente. Ogni volta che scegli un pezzo, viene immediatamente rimpiazzato da uno nuovo. La frequenza di apparizione di ogni rarità è configurabile nel menu impostazioni.

---

## Impostazioni

Il pulsante ⚙ in alto a destra apre il menu impostazioni dove puoi:

- Regolare il **peso di estrazione** di ogni fascia di rarità
- Modificare i **valori C/R/V** di ogni singolo pezzo
- Impostare il **punteggio di vittoria** (10–100 punti)

---

## Struttura del Progetto

```
scacchideipinci/
├── index.html        # Il gioco completo (HTML + CSS + JS + font)
└── img/              # Illustrazioni dei 40 pezzi (stile Magic the Gathering)
    ├── spalacacca.png
    ├── sentinella_sicula.png
    └── ...
```

Il gioco è un singolo file HTML senza dipendenze esterne. Il font **Burbank Big Condensed** è incorporato direttamente nel file.

---

## Compatibilità

Il layout si adatta automaticamente al dispositivo:

- **Mobile** — basket in riga orizzontale scrollabile
- **PC / Tablet** (≥ 768px) — campo a sinistra (55%) e basket nella sidebar destra (45%)

---

## Ispirazione

Ogni pezzo è associato a un racconto di **Jorge Luis Borges**: dall'Aleph alla Biblioteca di Babele, dal Giardino dei sentieri che si biforcano alla Casa di Asterione. Le illustrazioni seguono l'estetica delle carte Magic the Gathering.
