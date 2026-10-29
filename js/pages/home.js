import { h } from "../ui.js";
import { createRail } from "../components/rail.js";
import * as source from "../sources/music-source.js";

export const title = "Home";

export function render() {
  return h("div", {},
    h("section", { class: "hero" },
      h("h1", {}, "Music that sets the mood."),
      h("p", {}, "NOVA MUSIC streams tracks from sources that permit it, starting with independent artists on Audius. It does not include every mainstream or regional release."),
      h("a", { class: "btn btn-primary", href: "#/search" }, "Search music")),
    createRail({ title: "Featured", subtitle: "Hand-picked by the NOVA team", load: () => source.getFeatured({ limit: 12 }) }),
    createRail({ title: "Trending", subtitle: "What listeners are playing now", load: () => source.getTrending({ limit: 12 }) }),
    createRail({ title: "New releases", subtitle: "Fresh tracks, newest first", load: () => source.getNewReleases({ limit: 12 }) }),
    createRail({ title: "Recommended", subtitle: "Picks to try next", load: () => source.getRecommended({ limit: 12 }) }));
}
