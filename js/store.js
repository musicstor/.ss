// Settings store: persisted in localStorage, applied to <html> data attributes that the CSS reads.
const KEY = "nova.settings.v1";
const DEFAULTS = { theme: "dark", quality: "balanced", motion: "auto", comfort: false };
const listeners = new Set();
let state = { ...DEFAULTS };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* private mode or corrupt data: keep defaults */ }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { /* storage unavailable: settings last for this visit only */ }
}

export function apply() {
  const root = document.documentElement;
  const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = state.theme === "system" ? (systemLight ? "light" : "dark") : state.theme;
  const systemReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.theme = theme;
  root.dataset.quality = state.quality;
  root.dataset.comfort = state.comfort ? "on" : "off";
  root.dataset.motion = state.motion === "reduce" || (state.motion === "auto" && systemReduce) ? "reduce" : "full";
}

export function getSettings() { return { ...state }; }

export function setSetting(key, value) {
  if (!(key in DEFAULTS)) return;
  state[key] = value;
  save(); apply();
  listeners.forEach((fn) => fn(getSettings()));
}

export function resetSettings() {
  state = { ...DEFAULTS };
  save(); apply();
  listeners.forEach((fn) => fn(getSettings()));
}

export function onSettingsChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function initSettings() {
  load(); apply();
  // Keep "system" theme and "auto" motion live when the OS setting changes.
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", apply);
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", apply);
}
