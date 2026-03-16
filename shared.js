// ─── shared.js — stato condiviso tra auth, matchmaking e game ────────────────

export let currentUser = null;
export function setCurrentUser(u) { currentUser = u; }

export const MP = {
  isOnline: false,
  gameId: null,
  myIndex: 0,
  opponentName: '',
  gameRef: null,
  presenceRef: null,
  queueRef: null,
  pollTimer: null,
  isInQueue: false,
  inviteRef: null,
  heartbeatInterval: null,
  disconnectTimer: null,
  turnTimer: null,
  eloUpdated: false,
  gameStartTime: 0,
};

export const TURN_TIMEOUT_MS = 45000;
export const ABANDON_MS      = 120000;
