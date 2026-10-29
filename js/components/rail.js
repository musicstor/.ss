// Reusable "rail" section: title + a row of cards with loading, empty and error states.
import { h } from "../ui.js";
import { SourceNotConnectedError } from "../sources/music-source.js";

function skeletonCard() {
  return h("div", { class: "card skeleton", "aria-hidden": "true" },
    h("div", { class: "card-art" }), h("div", { class: "line" }), h("div", { class: "line short" }));
}

function trackCard(t) {
  return h("article", { class: "card" },
    h("img", { class: "card-art", src: t.artwork, alt: "", loading: "lazy", width: 300, height: 300 }),
    h("p", { class: "card-title", title: t.title }, t.title),
    h("p", { class: "card-sub" }, t.artist));
}

export function createRail({ title, subtitle, load }) {
  const body = h("div");
  const section = h("section", { class: "rail", "aria-labelledby": `rail-${title.replace(/\W+/g, "-")}` },
    h("div", { class: "rail-head" },
      h("div", {}, h("h2", { id: `rail-${title.replace(/\W+/g, "-")}` }, title), subtitle && h("p", {}, subtitle))),
    body);

  async function run() {
    body.replaceChildren(h("div", { class: "card-row", "aria-busy": "true" }, ...Array.from({ length: 6 }, skeletonCard)));
    try {
      const items = await load();
      if (!items.length) return body.replaceChildren(stateBox("Nothing here yet", "No tracks were returned for this section."));
      body.replaceChildren(h("div", { class: "card-row" }, ...items.map(trackCard)));
    } catch (err) {
      if (err instanceof SourceNotConnectedError) {
        body.replaceChildren(stateBox("Music source not connected yet",
          "This section will fill with real tracks when the Audius connection is added in Phase 2. No sample or fake tracks are shown."));
      } else {
        body.replaceChildren(stateBox("Couldn't load this section", "Check your connection and try again.", run, true));
      }
    }
  }

  function stateBox(heading, text, retry, isError) {
    return h("div", { class: `state${isError ? " error" : ""}` },
      h("h3", {}, heading), h("p", {}, text),
      retry && h("button", { class: "btn", type: "button", onclick: retry }, "Try again"));
  }

  // Short delay so the skeleton is visible and testable.
  setTimeout(run, 700);
  return section;
}
