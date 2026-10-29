// Honest placeholder for pages that arrive in later phases. It states what is coming and links somewhere real.
import { h } from "../ui.js";

export function makePlaceholder(heading, phase, text) {
  return {
    title: heading,
    render() {
      return h("div", {},
        h("div", { class: "page-head" }, h("h1", {}, heading)),
        h("div", { class: "state" },
          h("h3", {}, `Coming in Phase ${phase}`),
          h("p", {}, text),
          h("a", { class: "btn", href: "#/home" }, "Back to Home")));
    },
  };
}
