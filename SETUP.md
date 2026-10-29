# NOVA MUSIC: Phase 1 setup (Windows)

## Folder structure

```
nova-music/
├── index.html              App shell: sidebar, top bar, player bar, mobile nav, icon sprite
├── SETUP.md                This file
├── assets/
│   ├── logo.svg            NOVA MUSIC logo (original)
│   └── favicon.svg
├── css/
│   ├── tokens.css          Colours, spacing, themes, quality/comfort/motion switches
│   ├── base.css            Reset, focus rings, reduced motion
│   ├── layout.css          Sidebar, top bar, player bar, responsive breakpoints
│   └── components.css      Buttons, cards, skeletons, panels, toasts
└── js/
    ├── main.js             Starts settings + router
    ├── config.js           Audius / Firebase config (empty until Phases 2 and 4)
    ├── store.js            Settings saved in localStorage
    ├── router.js           Hash router (#/home, #/settings ...)
    ├── ui.js               Element helper and toasts
    ├── sources/
    │   └── music-source.js Music interface; Phase 2 fills it with real Audius calls
    ├── components/
    │   └── rail.js         Card rows with loading, empty and error states
    └── pages/
        ├── home.js
        ├── settings.js
        └── placeholder.js  Honest "coming in Phase N" pages
```

## Run it

The app uses JavaScript modules, which browsers block when you double-click `index.html`. Use a tiny local server:

**Option A: VS Code (easiest)**
1. Install VS Code, then the "Live Server" extension.
2. File > Open Folder > `nova-music`.
3. Right-click `index.html` > Open with Live Server.

**Option B: Python**
1. Open the `nova-music` folder in File Explorer, click the address bar, type `cmd`, press Enter.
2. Run `python -m http.server 5500` (install Python from python.org if needed).
3. Open http://localhost:5500

**Option C: Node**
Run `npx serve .` in the folder, then open the address it prints.

## Phase 1 test checklist

- [ ] Home loads with skeleton cards for about a second, then each section says "Music source not connected yet" (no fake tracks).
- [ ] Sidebar shows on a wide window, icons only on a tablet-width window, bottom navigation on a phone-width window.
- [ ] Every sidebar and bottom-nav link opens a page; the current one is highlighted.
- [ ] Tab through the page: focus ring is always visible; "Skip to main content" appears first.
- [ ] Settings > Theme: Light and Dark change the look immediately and survive a refresh.
- [ ] Settings > Visual quality Low: blur and shadows disappear.
- [ ] Settings > Motion "Reduce motion": the skeleton shimmer stops.
- [ ] Settings > Comfort mode softens the colours.
- [ ] Type in the top search box and press Enter: you land on Search.
- [ ] Player bar buttons are disabled and say playback arrives in Phase 2.

## Common errors

- **Blank page, console says CORS or "Failed to load module script"**: you opened the file directly. Use a local server (above).
- **Styles missing**: the `css` folder must sit next to `index.html`.
- **Settings don't persist**: the browser blocks storage (private window). Use a normal window.
- **Port already in use**: change 5500 to another number.

## Audius notes for Phase 2

Phase 2 will start by checking the current official Audius developer documentation for endpoint names, key registration, CORS and terms. Nothing about Audius is assumed or hard-coded in Phase 1.
