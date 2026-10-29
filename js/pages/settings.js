import { h, toast } from "../ui.js";
import { getSettings, setSetting, resetSettings } from "../store.js";

export const title = "Settings";

function selectField(id, label, hint, key, options) {
  const sel = h("select", { id, onchange: (e) => { setSetting(key, e.target.value); toast("Setting saved", "success", 1800); } },
    ...options.map(([v, text]) => h("option", { value: v }, text)));
  sel.value = getSettings()[key];
  return h("div", { class: "field" }, h("label", { for: id }, label), sel, h("p", { class: "hint" }, hint));
}

export function render() {
  const s = getSettings();
  const comfort = h("input", { type: "checkbox", id: "set-comfort", onchange: (e) => { setSetting("comfort", e.target.checked); toast("Setting saved", "success", 1800); } });
  comfort.checked = s.comfort;

  return h("div", {},
    h("div", { class: "page-head" }, h("h1", {}, "Settings"), h("p", {}, "Saved on this device. Account settings arrive with login in Phase 4.")),
    h("div", { class: "panel" },
      selectField("set-theme", "Theme", "System follows your Windows light or dark setting.", "theme",
        [["dark", "Dark"], ["light", "Light"], ["system", "Match system"]]),
      selectField("set-quality", "Visual quality", "Low removes blur and shadows for older or busy computers. High adds richer glass effects.", "quality",
        [["low", "Low"], ["balanced", "Balanced"], ["high", "High"]]),
      selectField("set-motion", "Motion", "Auto follows your system's reduced-motion setting.", "motion",
        [["auto", "Auto"], ["reduce", "Reduce motion"], ["full", "Full motion"]]),
      h("div", { class: "field" },
        h("div", { class: "switch-row" }, h("label", { for: "set-comfort" }, "Comfort mode"), comfort),
        h("p", { class: "hint" }, "Softer contrast and calmer colours for long listening sessions.")),
      h("div", {}, h("button", { class: "btn", type: "button", onclick: () => { resetSettings(); toast("Settings reset", "success"); location.reload(); } }, "Reset to defaults"))));
}
