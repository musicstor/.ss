// Small UI helpers: element builder and toast notifications.
export function h(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

export function toast(message, type = "info", ms = 4000) {
  const host = document.getElementById("toasts");
  if (!host) return;
  const t = h("div", { class: `toast ${type}` }, message);
  host.append(t);
  setTimeout(() => t.remove(), ms);
}
