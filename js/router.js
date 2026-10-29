// Tiny hash router: "#/home" -> pages[home]. Pages export { title, render() }.
import { h } from "./ui.js";

export function startRouter({ routes, outlet, fallback = "home" }) {
  function current() {
    const hash = location.hash.replace(/^#\/?/, "");
    const [name, query = ""] = hash.split("?");
    return { name: name || fallback, params: new URLSearchParams(query) };
  }

  async function go() {
    const { name, params } = current();
    const page = routes[name];
    if (!page) {
      outlet.replaceChildren(h("div", { class: "state error" },
        h("h3", {}, "Page not found"), h("p", {}, "That page doesn't exist."),
        h("a", { class: "btn", href: "#/home" }, "Back to Home")));
      document.title = "Not found · NOVA MUSIC";
    } else {
      outlet.replaceChildren(page.render(params));
      document.title = `${page.title} · NOVA MUSIC`;
    }
    document.querySelectorAll("[data-route]").forEach((a) => {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    outlet.focus({ preventScroll: true }); // moves screen-reader and keyboard focus to the new page
  }

  window.addEventListener("hashchange", go);
  go();
}
