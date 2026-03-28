// ─── game.js — logica di gioco, render, settings ─────────────────────────────
// Nessuna dipendenza da Firebase — può essere testato in isolamento

import { MP, currentUser, getCurrentUser } from './shared.js?v=1.4.0';

// ─── DATI ────────────────────────────────────────────────────────────────────
export const ZONE_NAMES = ['Castello', 'Re', 'Villaggio'];

// ─── ILLUSTRAZIONI BORGES ────────────────────────────────────────────────────
const PIECE_IMG = {
  "Spalacacca": "img/spalacacca.png",
  "Sentinella Sicula": "img/sentinella_sicula.png",
  "U Porco": "img/u_porco.png",
  "Jullare": "img/jullare.png",
  "L'impiccato": "img/l_impiccato.png",
  "Scavafossati": "img/scavafossati.png",
  "Genuflesso": "img/genuflesso.png",
  "Imboscato": "img/imboscato.png",
  "Srotolatappeti": "img/srotolatappeti.png",
  "Illetterato": "img/il_letterato.png",
  "Accenditorce": "img/accenditorce.png",
  "Mangiapane": "img/mangiapane.png",
  "Catapulta Umana": "img/catapulta_umana.png",
  "Lebbroso": "img/lebbroso.png",
  "Calpestato": "img/calpestato.png",
  "Raccoglifrecce": "img/raccoglifrecce.png",
  "Gattara": "img/gattara.png",
  "Esattore": "img/esattore.png",
  "Reggitrono": "img/reggitrono.png",
  "Sventolatore": "img/sventolatore.png",
  "Ratto di Fogna": "img/ratto_di_fogna.png",
  "Spaventapasseri": "img/spaventapasseri.png",
  "Bevipozioni": "img/bevipozioni.png",
  "Portaspade": "img/portaspade.png",
  "Suonacampane": "img/suonacampane.png",
  "Alzaponte": "img/alzaponte.png",
  "Fagiano di corte": "img/fagiano_di_corte.png",
  "Vendistracci": "img/vendistracci.png",
  "Guaritore Cieco": "img/guaritore_cieco.png",
  "Boia Tagliateste": "img/boia_tagliateste.png",
  "Cellaio": "img/cellaio.png",
  "Arciere gobbo": "img/arciere_gobbo.png",
  "Spadaccino monco": "img/spadaccino_monco.png",
  "Frate Ubriaco": "img/frate_ubriaco.png",
  "Monaco Obeso": "img/monaco_obeso.png",
  "Apparecchiatavoli": "img/apparecchiatavoli.png",
  "Mangiapeccati": "img/mangiapeccati.png",
  "Seppellianimali": "img/seppellianimali.png",
  "Usuraio": "img/usuraio.png",
  "Portaneve": "img/portaneve.png",
};

function getPieceImg(name) {
  return PIECE_IMG[name] || "";
}

export const ALL_PIECES = [
  {name:"Spalacacca",         z:[1,1,2], val:20},
  {name:"Sentinella Sicula",  z:[3,2,1], val:15},
  {name:"U Porco",            z:[2,0,2], val:15},
  {name:"Jullare",            z:[3,3,1], val:15},
  {name:"L'impiccato",        z:[1,2,2], val:15},
  {name:"Scavafossati",       z:[2,1,1], val:20},
  {name:"Genuflesso",         z:[1,3,1], val:15},
  {name:"Imboscato",          z:[2,2,2], val:12},
  {name:"Srotolatappeti",     z:[2,2,1], val:12},
  {name:"Illetterato",        z:[1,1,2], val:10},
  {name:"Accenditorce",       z:[2,1,1], val:12},
  {name:"Mangiapane",         z:[1,1,2], val:10},
  {name:"Catapulta Umana",    z:[2,1,2], val:8},
  {name:"Lebbroso",           z:[0,0,3], val:8},
  {name:"Calpestato",         z:[2,1,1], val:10},
  {name:"Raccoglifrecce",     z:[2,2,1], val:15},
  {name:"Gattara",            z:[1,1,2], val:10},
  {name:"Esattore",           z:[2,3,1], val:7},
  {name:"Reggitrono",         z:[2,4,0], val:4},
  {name:"Sventolatore",       z:[2,3,1], val:7},
  {name:"Ratto di Fogna",     z:[1,1,2], val:15},
  {name:"Spaventapasseri",    z:[1,1,2], val:10},
  {name:"Bevipozioni",        z:[2,1,1], val:10},
  {name:"Portaspade",         z:[2,2,1], val:10},
  {name:"Suonacampane",       z:[1,2,2], val:8},
  {name:"Alzaponte",          z:[2,1,1], val:8},
  {name:"Fagiano di corte",   z:[1,3,0], val:8},
  {name:"Vendistracci",       z:[1,0,3], val:15},
  {name:"Guaritore Cieco",    z:[3,3,3], val:5},
  {name:"Boia Tagliateste",   z:[2,2,2], val:8},
  {name:"Cellaio",            z:[2,1,1], val:8},
  {name:"Arciere gobbo",      z:[3,1,1], val:15},
  {name:"Spadaccino monco",   z:[3,1,1], val:15},
  {name:"Frate Ubriaco",      z:[2,2,2], val:8},
  {name:"Monaco Obeso",       z:[2,3,1], val:7},
  {name:"Apparecchiatavoli",  z:[2,2,0], val:10},
  {name:"Mangiapeccati",      z:[1,0,3], val:8},
  {name:"Seppellianimali",    z:[1,1,3], val:8},
  {name:"Usuraio",            z:[1,0,4], val:5},
  {name:"Portaneve",          z:[1,1,3], val:8},
];

// ─── RARITÀ ──────────────────────────────────────────────────────────────────
// Fasce di valore → tier
// val >= 20: Leggendario, val >= 15: Epico, val >= 10: Raro, val < 10: Comune
export const TIERS = [
  { id:'l', label:'Leggendario', range:'val ≥ 20', cls:'rb-l', defaultWeight: 1 },
  { id:'e', label:'Epico',       range:'val 15–19', cls:'rb-e', defaultWeight: 3 },
  { id:'r', label:'Raro',        range:'val 10–14', cls:'rb-r', defaultWeight: 6 },
  { id:'c', label:'Comune',      range:'val < 10',  cls:'rb-c', defaultWeight:12 },
];

export function tierOf(val) {
  if (val >= 20) return 'l';
  if (val >= 15) return 'e';
  if (val >= 10) return 'r';
  return 'c';
}

// Impostazioni correnti (modificabili dal menu)
export let SETTINGS = {
  weights: { l:1, e:3, r:6, c:12 },
  winPts: 50,
};

// Sovrascritture valori pezzi (dichiarate qui, usate da buildPool)
let PIECE_OVERRIDES = {};

function getEffectivePiece(p) {
  const ov = PIECE_OVERRIDES[p.name];
  if (ov) return { name: p.name, z: [...ov.z], val: ov.val };
  return { name: p.name, z: [...p.z], val: p.val };
}

function getEffectivePieces() {
  return ALL_PIECES.map(getEffectivePiece);
}

// Costruisce la pool pesata
export function buildPool() {
  const pool = [];
  getEffectivePieces().forEach(p => {
    const t = tierOf(p.val);
    const w = SETTINGS.weights[t];
    for (let i = 0; i < w; i++) pool.push(p);
  });
  return pool;
}

export let POOL = buildPool();

let uid = 0;
export function makePiece() {
  const t = POOL[Math.floor(Math.random() * POOL.length)];
  return { name: t.name, z: [...t.z], val: t.val, tier: tierOf(t.val), id: uid++ };
}
// cella 0,1 → zona 0 ; cella 2 → zona 1 ; cella 3,4 → zona 2
export function zoneOf(c) { return c <= 1 ? 0 : c === 2 ? 1 : 2; }

export let G = {};

export function initGame() {
  G = {
    pts:       [0, 0],
    turnNum:   1,
    turn:      0,
    pieceStep: 0,
    pipe:      Array(5).fill(null).map(() => ({ p1: null, p2: null })),
    basket:    Array(10).fill(null).map(makePiece),
    selected:  -1,
    log:       [],
    over:      false,
    firstTurnDone: [false, false],
  };
  renderAll();
}

// Applica configurazione admin da Firebase (se disponibile)
// Chiamata da auth.js dopo il login
export function applyAdminConfig(config) {
  if (!config) return;
  if (config.winPts)  SETTINGS.winPts = config.winPts;
  if (config.weights) Object.assign(SETTINGS.weights, config.weights);
  if (config.pieces && Array.isArray(config.pieces)) {
    // Usa PIECE_OVERRIDES (il meccanismo già esistente) invece di mutare ALL_PIECES
    // così i valori admin prevalgono sui default senza alterare l'array sorgente
    config.pieces.forEach(p => {
      if (p && p.name) PIECE_OVERRIDES[p.name] = { z: [...p.z], val: p.val };
    });
  }
  // Rigenera il POOL con pesi e valori aggiornati
  POOL = buildPool();
}

// ─── LOGICA DI GIOCO ─────────────────────────────────────────────────────────

/**
 * Inserisce il pezzo nella pipe.
 * G1 inserisce sempre da sinistra (cella 0): tutto shift destra.
 * G2 inserisce sempre da destra (cella 4): tutto shift sinistra.
 */
function insertIntoPipe(piece) {
  const pipe = G.pipe;
  if (G.turn === 0) {
    // shift right: cella[4].p1 = cella[3].p1, ..., cella[0].p1 = pezzo
    for (let i = 4; i > 0; i--) pipe[i].p1 = pipe[i-1].p1;
    pipe[0].p1 = piece;
  } else {
    // shift left: cella[0].p2 = cella[1].p2, ..., cella[4].p2 = pezzo
    for (let i = 0; i < 4; i++) pipe[i].p2 = pipe[i+1].p2;
    pipe[4].p2 = piece;
  }
}

/**
 * Controlla tutti i combattimenti: ogni cella dove c'è sia p1 che p2.
 * Ritorna array di { cell, zone, p1, p2, winner } per animazioni/log.
 */
function resolveCombats() {
  const results = [];
  for (let c = 0; c < 5; c++) {
    const slot = G.pipe[c];
    if (!slot.p1 || !slot.p2) continue;
    const z = zoneOf(c);
    const v1 = slot.p1.z[z];
    const v2 = slot.p2.z[z];
    const pts = (c === 2) ? 2 : 1; // Sala del Re (casella 3) vale 2 punti
    let winner = 0; // 0=pareggio, 1=G1, 2=G2
    if (v1 > v2) { G.pts[0] += pts; winner = 1; }
    else if (v2 > v1) { G.pts[1] += pts; winner = 2; }
    results.push({ cell: c, zone: z, p1: slot.p1, p2: slot.p2, v1, v2, winner, pts });
  }
  return results;
}

export function checkWin() {
  if (G.pts[0] >= SETTINGS.winPts || G.pts[1] >= SETTINGS.winPts) {
    G.over = true;
  }
}

// ─── INTERAZIONE ─────────────────────────────────────────────────────────────

export function selectCard(idx) {
  if (G.over) return;
  // In online mode, block selection when it's not your turn
  if (MP.isOnline && G.turn !== MP.myIndex) return;
  G.selected = G.selected === idx ? -1 : idx;
  renderBasket();
  renderPhaseSlots();
  document.getElementById('btn-ins').disabled = G.selected < 0;
}

export function doInsert() {
  if (G.selected < 0 || G.over) return;

  const piece = G.basket[G.selected];
  const pName = G.turn === 0 ? 'G1' : 'G2';
  const pStep = G.pieceStep + 1;

  // Log inserimento
  addLog(`<span class="${G.turn===0?'lc-p1':'lc-p2'}">${pName}</span> inserisce pezzo <b>${pStep}/${G.turnNum===1?(G.turn===0?1:2):2}</b>: <b>${piece.name}</b> <span class="lc-dim">[C:${piece.z[0]} R:${piece.z[1]} V:${piece.z[2]}]</span>`);

  // Inserisci nella pipe
  insertIntoPipe(piece);

  // Classe animazione scorrimento carte sul campo
  const fieldEl = document.getElementById('field');
  const slideClass = G.turn === 0 ? 'field-push-right' : 'field-push-left';
  if (fieldEl) {
    fieldEl.classList.remove('field-push-right', 'field-push-left');
    fieldEl.classList.add(slideClass);
    setTimeout(() => fieldEl.classList.remove(slideClass), 400);
  }

  // Risolvi combattimenti
  const fights = resolveCombats();
  fights.forEach(f => {
    const zoneName = ZONE_NAMES[f.zone];
    let msg;
    if (f.winner === 1) {
      msg = `<span class="lc-gold">⚔</span> Casella ${f.cell+1} <i>${zoneName}</i>: <span class="lc-p1">${f.p1.name}</span> <b>${f.v1}</b> > <span class="lc-p2">${f.p2.name}</span> ${f.v2} → <span class="lc-gold">+${f.pts} G1</span>`;
    } else if (f.winner === 2) {
      msg = `<span class="lc-gold">⚔</span> Casella ${f.cell+1} <i>${zoneName}</i>: <span class="lc-p2">${f.p2.name}</span> <b>${f.v2}</b> > <span class="lc-p1">${f.p1.name}</span> ${f.v1} → <span class="lc-gold">+${f.pts} G2</span>`;
    } else {
      msg = `<span class="lc-dim">≈</span> Casella ${f.cell+1} <i>${zoneName}</i>: ${f.p1.name} ${f.v1} = ${f.p2.name} ${f.v2} — <span class="lc-dim">pareggio</span>`;
    }
    addLog(msg, true);
    flashCell(f.cell);
  });

  // Rimpiazza il pezzo nel basket
  G.basket[G.selected] = makePiece();
  G.selected = -1;

  // Avanza il passo del turno
  // Turno 1 speciale: G1 inserisce 1 pezzo, G2 inserisce 2 pezzi
  const isFirstTurn = G.turnNum === 1;
  const piecesThisTurn = isFirstTurn ? (G.turn === 0 ? 1 : 2) : 2;

  if (G.pieceStep < piecesThisTurn - 1) {
    G.pieceStep++;
  } else {
    G.pieceStep = 0;
    if (isFirstTurn) {
      G.firstTurnDone[G.turn] = true;
      G.turn = 1 - G.turn;
      // Se entrambi hanno completato il turno 1, inizia il turno 2
      if (G.firstTurnDone[0] && G.firstTurnDone[1]) {
        G.turnNum = 2;
        G.turn = 0;
      }
    } else {
      G.turn = 1 - G.turn;
      if (G.turn === 0) G.turnNum++;
    }
  }

  checkWin();
  renderAll();

  if (G.over) {
    setTimeout(showWinner, 600);
  } else {
    // Se è attivo un AI e adesso tocca al PC (G2 = indice 1), pianifica la mossa
    // Usiamo un accesso lazy a window._aiModule per evitare dipendenza circolare
    if (window._aiModule && window._aiModule.AI.active && G.turn === 1) {
      window._aiModule.scheduleMove();
    }
  }
}

export function showWinner() {
  const wp = Math.max(G.pts[0], G.pts[1]);
  const lp = Math.min(G.pts[0], G.pts[1]);
  const icon  = document.querySelector('#overlay .win-icon');
  const title = document.getElementById('wtitle');
  const score = document.getElementById('wscore');

  if (MP.isOnline) {
    const iWon = G.pts[MP.myIndex] > G.pts[1 - MP.myIndex];
    if (iWon) {
      if (icon)  icon.textContent  = '🏆';
      title.textContent = 'HAI VINTO!';
      title.style.color = 'var(--gold)';
    } else {
      if (icon)  icon.textContent  = '💀';
      title.textContent = 'HAI PERSO!';
      title.style.color = '#ff6b47';
    }
  } else {
    const aiActive = window._aiModule && window._aiModule.AI.active;
    const p1Won = G.pts[0] >= SETTINGS.winPts;
    if (aiActive) {
      if (p1Won) {
        if (icon) icon.textContent = '🏆';
        title.textContent = 'Hai vinto!';
        title.style.color = 'var(--gold)';
      } else {
        if (icon) icon.textContent = '🤖';
        title.textContent = 'Il CPU ha vinto!';
        title.style.color = '#ff6b47';
      }
    } else {
      const w = p1Won ? 'Giocatore 1' : 'Giocatore 2';
      if (icon) icon.textContent = '🏆';
      title.textContent = w + ' vince!';
      title.style.color = '';
    }
  }
  score.textContent = `Punteggio finale: ${wp} – ${lp}`;
  // In online mode change button label to "Torna alla lobby"
  const winBtn = document.getElementById('btn-win-action');
  if (winBtn) winBtn.textContent = MP.isOnline ? 'Torna alla lobby' : 'Nuova partita';
  document.getElementById('overlay').classList.add('show');
}

export function resetGame() {
  document.getElementById('overlay').classList.remove('show');
  // Se era una partita contro il PC, torna alla selezione difficoltà
  if (window._aiModule && window._aiModule.AI.active) {
    window._aiModule.cancelAI();
    const { showScreen } = window._sharedModule || {};
    if (showScreen) {
      document.getElementById('app').style.display = 'none';
      showScreen('screen-ai-difficulty');
      return;
    }
  }
  initGame();
}

export function flashCell(idx) {
  const cells = document.querySelectorAll('.cell');
  if (!cells[idx]) return;
  cells[idx].classList.add('combat-flash');
  setTimeout(() => cells[idx].classList.remove('combat-flash'), 700);
}

export function addLog(html, isCombat) {
  G.log.push({ html, isCombat: !!isCombat });
  if (G.log.length > 60) G.log.shift();
}

// ─── RENDER ──────────────────────────────────────────────────────────────────

export function renderAll() {
  renderScore();
  renderBanner();
  renderField();
  renderPhaseSlots();
  renderBasket();
  renderLog();
}

export function renderScore() {
  document.getElementById('pts1').textContent = G.pts[0];
  document.getElementById('pts2').textContent = G.pts[1];
  document.getElementById('bar1').style.width = Math.min(100, G.pts[0]/SETTINGS.winPts*100) + '%';
  document.getElementById('bar2').style.width = Math.min(100, G.pts[1]/SETTINGS.winPts*100) + '%';
  document.getElementById('tnum').textContent = G.turnNum;
  document.getElementById('sc1').classList.toggle('active', G.turn===0 && !G.over);
  document.getElementById('sc2').classList.toggle('active', G.turn===1 && !G.over);
  // Aggiorna nomi giocatori se in modalità online
  if (MP.isOnline && getCurrentUser()) {
    const myName = getCurrentUser().displayName || getCurrentUser().email.split('@')[0];
    const p1name = MP.myIndex === 0 ? myName : MP.opponentName;
    const p2name = MP.myIndex === 1 ? myName : MP.opponentName;
    document.getElementById('sc1').querySelector('.sc-label').textContent = p1name;
    document.getElementById('sc2').querySelector('.sc-label').textContent = p2name;
  }
}

export function renderBanner() {
  if (G.over) {
    document.getElementById('tbanner').innerHTML = '<span class="lc-gold">Partita conclusa!</span>';
    return;
  }
  let p1label, p2label;
  if (MP.isOnline) {
    const myName = getCurrentUser() ? (getCurrentUser().displayName || getCurrentUser().email.split('@')[0]) : 'Tu';
    p1label = MP.myIndex === 0 ? myName : MP.opponentName;
    p2label = MP.myIndex === 1 ? myName : MP.opponentName;
  } else {
    p1label = 'Giocatore 1';
    p2label = 'Giocatore 2';
  }
  const aiActive = window._aiModule && window._aiModule.AI.active;
  const diffLabel = aiActive ? { easy:'Facile', medium:'Medio', hard:'Difficile' }[window._aiModule.AI.difficulty] || '' : '';
  const aiBadge   = (aiActive && G.turn === 1) ? ` <span class="ai-badge">CPU ${diffLabel}</span>` : '';

  const pn = G.turn === 0
    ? `<span class="hl-p1">${p1label}</span>`
    : `<span class="hl-p2">${p2label}${aiBadge}</span>`;
  const step = G.pieceStep + 1;
  const total = G.turnNum === 1 ? (G.turn === 0 ? 1 : 2) : 2;
  document.getElementById('tbanner').innerHTML =
    `${pn} — inserisci pezzo <b>${step} di ${total}</b>`;
}

export function renderField() {
  const el = document.getElementById('field');
  el.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const z = zoneOf(i);
    const cell = document.createElement('div');
    const zoneClass = ['zone-castello','zone-castello','zone-re','zone-villaggio','zone-villaggio'][i];
    cell.className = 'cell ' + zoneClass;

    // Cell number
    const num = document.createElement('div');
    num.className = 'cell-num';
    num.textContent = i + 1;
    cell.appendChild(num);

    // Two lanes container
    const lanes = document.createElement('div');
    lanes.className = 'cell-lanes';

    const slot = G.pipe[i];

    // Lane G1 (top)
    const laneP1 = document.createElement('div');
    laneP1.className = 'lane lane-p1';
    if (slot.p1) {
      const d = document.createElement('div');
      d.className = 'piece-chip pc-p1';
      const vals = slot.p1.z.map((v, zi) =>
        zi === z ? `<span class="pc-zone-hi">${v}</span>` : v
      ).join('·');
      d.innerHTML = `<div class="pc-img"><img src="${getPieceImg(slot.p1.name)}" alt="${slot.p1.name}" onerror="this.style.display='none'"></div><div class="pc-info"><div class="pc-name">${slot.p1.name}</div><div class="pc-vals">${vals}</div></div>`;
      laneP1.appendChild(d);
    } else {
      laneP1.innerHTML = '<span class="lane-empty">G1 →</span>';
    }
    lanes.appendChild(laneP1);

    // Lane G2 (bottom)
    const laneP2 = document.createElement('div');
    laneP2.className = 'lane lane-p2';
    if (slot.p2) {
      const d = document.createElement('div');
      d.className = 'piece-chip pc-p2';
      const vals = slot.p2.z.map((v, zi) =>
        zi === z ? `<span class="pc-zone-hi">${v}</span>` : v
      ).join('·');
      d.innerHTML = `<div class="pc-img"><img src="${getPieceImg(slot.p2.name)}" alt="${slot.p2.name}" onerror="this.style.display='none'"></div><div class="pc-info"><div class="pc-name">${slot.p2.name}</div><div class="pc-vals">${vals}</div></div>`;
      laneP2.appendChild(d);
    } else {
      laneP2.innerHTML = '<span class="lane-empty">← G2</span>';
    }
    lanes.appendChild(laneP2);

    cell.appendChild(lanes);
    el.appendChild(cell);
  }
}

export function renderPhaseSlots() {
  const totalSlots = G.turnNum === 1 ? (G.turn === 0 ? 1 : 2) : 2;
  const html = buildPhaseSlotsHTML(totalSlots);
  // Aggiorna entrambi i contenitori (mobile nel banner-row, desktop sotto il campo)
  ['phase-slots', 'phase-slots-desktop'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

export function buildPhaseSlotsHTML(totalSlots) {
  let html = '';
  for (let s = 0; s < totalSlots; s++) {
    let cls, content;
    if (s < G.pieceStep) {
      cls = 'phase-slot ps-done';
      content = `<span class="ps-label">PEZZO ${s+1}</span><span>✓ Inserito</span>`;
    } else if (s === G.pieceStep) {
      cls = 'phase-slot ps-active';
      if (G.selected >= 0) {
        const p = G.basket[G.selected];
        content = `<span class="ps-label">PEZZO ${s+1} — SELEZIONATO</span><span class="ps-piece-name">${p.name}</span><span class="ps-piece-vals">C:${p.z[0]} R:${p.z[1]} V:${p.z[2]}</span>`;
      } else {
        content = `<span class="ps-label">PEZZO ${s+1}</span><span>← scegli dal basket</span>`;
      }
    } else {
      cls = 'phase-slot';
      content = `<span class="ps-label">PEZZO ${s+1}</span>`;
    }
    html += `<div class="${cls}">${content}</div>`;
  }
  return html;
}

export function renderBasket() {
  const el = document.getElementById('bgrid');
  el.innerHTML = '';
  G.basket.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'bcard tier-' + p.tier + (i === G.selected ? ' selected' : '') + (G.over ? ' disabled' : '');
    const tierCls = { l:'rb-l', e:'rb-e', r:'rb-r', c:'rb-c' }[p.tier];
    const tierLbl = { l:'Leggendario', e:'Epico', r:'Raro', c:'Comune' }[p.tier];
    d.innerHTML = `
      <div class="bc-img"><img src="${getPieceImg(p.name)}" alt="${p.name}" onerror="this.style.display='none'"></div>
      <div class="bc-name">${p.name}</div>
      <div class="bc-vals">
        <span class="bcv" title="Castello">C:&nbsp;&nbsp;${p.z[0]}</span>
        <span class="bcv" title="Re">R:&nbsp;&nbsp;${p.z[1]}</span>
        <span class="bcv" title="Villaggio">V:&nbsp;&nbsp;${p.z[2]}</span>
      </div>
      <div style="margin-top:4px"><span class="rb ${tierCls}">${tierLbl}</span></div>`;
    // Gestione click: singolo → seleziona, doppio → seleziona + gioca
    // Il doppio click usa window.doInsert (intercettato da matchmaking.js in multiplayer)
    // invece della doInsert locale, così Firebase viene aggiornato correttamente
    const playCard = () => {
      const fn = (typeof window.doInsert === 'function') ? window.doInsert : doInsert;
      fn();
    };
    let clickTimer = null;
    d.addEventListener('click', (e) => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        G.selected = i;
        renderBasket();
        renderPhaseSlots();
        d.classList.add('playing');
        d.addEventListener('animationend', () => d.classList.remove('playing'), { once: true });
        setTimeout(() => { if (G.selected === i) playCard(); }, 200);
      } else {
        clickTimer = setTimeout(() => {
          clickTimer = null;
          selectCard(i);
        }, 220);
      }
    });

    // Swipe verso l'alto (mobile/tablet) → seleziona + gioca
    let touchStartY = 0;
    let touchStartX = 0;
    d.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    d.addEventListener('touchend', (e) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = Math.abs(touchStartX - e.changedTouches[0].clientX);
      // Swipe verso l'alto: almeno 40px verticali, meno di 60px orizzontali
      if (dy > 40 && dx < 60) {
        e.preventDefault();
        selectCard(i);
        d.classList.add('playing');
        d.addEventListener('animationend', () => d.classList.remove('playing'), { once: true });
        setTimeout(() => {
          if (G.selected === i) {
            const fn = (typeof window.doInsert === 'function') ? window.doInsert : doInsert;
            fn();
          }
        }, 50);
      }
    }, { passive: true });

    el.appendChild(d);
  });
  document.getElementById('basket-hint').textContent = G.over ? '' : 'Clicca per selezionare';
  document.getElementById('btn-ins').disabled = G.selected < 0 || G.over || (MP.isOnline && G.turn !== MP.myIndex);
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────

let currentTab = 'rarity';

export function switchTab(tab) {
  currentTab = tab;
  ['rarity','pieces','rules'].forEach(t => {
    document.getElementById('panel-'+t).style.display = t === tab ? '' : 'none';
    document.getElementById('tab-'+t).classList.toggle('active', t === tab);
  });
  if (tab === 'pieces') populatePieceEditor();
}

export function openSettings() {
  // Rarità sliders
  const tiersEl = document.getElementById('rarity-tiers');
  tiersEl.innerHTML = '';
  TIERS.forEach(t => {
    const count = ALL_PIECES.filter(p => tierOf(getEffectivePiece(p).val) === t.id).length;
    const row = document.createElement('div');
    row.className = 'rarity-row';
    row.innerHTML = `
      <div class="rarity-label">
        <span class="rb ${t.cls}">${t.label}</span> &nbsp;${t.range}
        <small>${count} pezzi</small>
      </div>
      <input type="range" class="rarity-slider" id="slider-${t.id}" min="0" max="20" step="1" value="${SETTINGS.weights[t.id]}"
             oninput="document.getElementById('val-${t.id}').textContent=this.value">
      <div class="rarity-val" id="val-${t.id}">${SETTINGS.weights[t.id]}</div>
    `;
    tiersEl.appendChild(row);
  });

  // Win score
  document.getElementById('win-slider').value = SETTINGS.winPts;
  document.getElementById('win-val').textContent = SETTINGS.winPts;

  // Mostra tab corrente
  switchTab(currentTab);

  document.getElementById('settings-overlay').classList.add('show');
}

function populatePieceEditor() {
  const tbody = document.getElementById('piece-edit-tbody');
  const search = (document.getElementById('piece-search')?.value || '').toLowerCase();
  tbody.innerHTML = '';

  [...ALL_PIECES]
    .filter(p => !search || p.name.toLowerCase().includes(search))
    .sort((a,b) => a.name.localeCompare(b.name))
    .forEach(p => {
      const eff = getEffectivePiece(p);
      const t = tierOf(eff.val);
      const tierCls = { l:'rb-l', e:'rb-e', r:'rb-r', c:'rb-c' }[t];
      const tierLbl = { l:'Leg', e:'Epi', r:'Rar', c:'Com' }[t];
      const hasOv = !!PIECE_OVERRIDES[p.name];

      const tr = document.createElement('tr');
      tr.dataset.pname = p.name;
      tr.innerHTML = `
        <td style="font-size:11px;${hasOv?'color:var(--gold)':''}">${p.name}</td>
        <td><input class="piece-edit-input${hasOv?' changed':''}" data-field="0" data-piece="${p.name}" type="number" min="0" max="4" value="${eff.z[0]}" oninput="onPieceInput(this)"></td>
        <td><input class="piece-edit-input${hasOv?' changed':''}" data-field="1" data-piece="${p.name}" type="number" min="0" max="4" value="${eff.z[1]}" oninput="onPieceInput(this)"></td>
        <td><input class="piece-edit-input${hasOv?' changed':''}" data-field="2" data-piece="${p.name}" type="number" min="0" max="4" value="${eff.z[2]}" oninput="onPieceInput(this)"></td>
        <td><input class="piece-edit-input${hasOv?' changed':''}" data-field="val" data-piece="${p.name}" type="number" min="1" max="99" value="${eff.val}" oninput="onPieceInput(this)"></td>
        <td><span class="rb ${tierCls}" id="badge-${p.name.replace(/\s/g,'_')}">${tierLbl}</span></td>
      `;
      tbody.appendChild(tr);
    });
}

function filterPieceTable() {
  populatePieceEditor();
}

function onPieceInput(input) {
  const pname = input.dataset.piece;
  const field = input.dataset.field;
  const orig = ALL_PIECES.find(p => p.name === pname);
  if (!orig) return;

  // Leggi tutti i valori correnti dalla riga
  const row = input.closest('tr');
  const inputs = row.querySelectorAll('.piece-edit-input');
  const z0 = parseInt(inputs[0].value) || 0;
  const z1 = parseInt(inputs[1].value) || 0;
  const z2 = parseInt(inputs[2].value) || 0;
  const val = parseInt(inputs[3].value) || 1;

  // Salva override solo se diverso dal default
  const isDefault = z0 === orig.z[0] && z1 === orig.z[1] && z2 === orig.z[2] && val === orig.val;
  if (isDefault) {
    delete PIECE_OVERRIDES[pname];
  } else {
    PIECE_OVERRIDES[pname] = { z: [z0, z1, z2], val };
  }

  // Aggiorna badge rarità in tempo reale
  const newTier = tierOf(val);
  const tierCls = { l:'rb-l', e:'rb-e', r:'rb-r', c:'rb-c' }[newTier];
  const tierLbl = { l:'Leg', e:'Epi', r:'Rar', c:'Com' }[newTier];
  const badge = document.getElementById('badge-' + pname.replace(/\s/g,'_'));
  if (badge) { badge.className = 'rb ' + tierCls; badge.textContent = tierLbl; }

  // Evidenzia riga modificata
  inputs.forEach(i => i.classList.toggle('changed', !isDefault));
  row.querySelector('td').style.color = isDefault ? '' : 'var(--gold)';
}

export function resetPieceValues() {
  PIECE_OVERRIDES = {};
  populatePieceEditor();
}

export function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('show');
}

export function applySettings() {
  SETTINGS.weights.l = parseInt(document.getElementById('slider-l').value);
  SETTINGS.weights.e = parseInt(document.getElementById('slider-e').value);
  SETTINGS.weights.r = parseInt(document.getElementById('slider-r').value);
  SETTINGS.weights.c = parseInt(document.getElementById('slider-c').value);
  SETTINGS.winPts    = parseInt(document.getElementById('win-slider').value);

  if (Object.values(SETTINGS.weights).every(w => w === 0)) SETTINGS.weights.c = 1;

  POOL = buildPool();
  closeSettings();
  resetGame();
}

export function renderLog() {
  const html = G.log.slice(-30).map(l =>
    `<div class="log-entry${l.isCombat?' le-combat':''}">${l.html}</div>`
  ).join('');
  // Aggiorna entrambi i log (mobile e desktop)
  ['log', 'log-mobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = html; el.scrollTop = el.scrollHeight; }
  });
}
