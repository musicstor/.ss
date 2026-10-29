import { initSettings } from "./store.js";
import { startRouter } from "./router.js";
import { makePlaceholder } from "./pages/placeholder.js";
import * as home from "./pages/home.js";
import * as settings from "./pages/settings.js";

initSettings();

const routes = {
  home,
  settings,
  search: makePlaceholder("Search", 2, "Search songs and artists once the Audius connection is added."),
  new: makePlaceholder("New Releases", 2, "Newest tracks with filters, from the connected music source."),
  library: makePlaceholder("Library", 4, "Your liked songs and saved playlists, after you log in."),
  login: makePlaceholder("Log in", 4, "Email and password login and signup with Firebase."),
};

startRouter({ routes, outlet: document.getElementById("main") });

// The top search box sends you to the Search page with your query.
document.getElementById("topbar-search").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = new FormData(e.target).get("q").toString().trim();
  location.hash = q ? `#/search?q=${encodeURIComponent(q)}` : "#/search";
});
