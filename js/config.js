// Central configuration. Nothing secret belongs in this file: it is shipped to the browser.
export const CONFIG = {
  appName: "NOVA MUSIC",
  // Phase 2: the Audius app key (public identifier) goes here after you register an app.
  // It is NOT a secret. Never put an API secret / bearer token in browser code.
  audius: {
    apiKey: "",
  },
  // Phase 4: Firebase web config goes here (these values are safe to expose; security comes from Firestore rules).
  firebase: null,
};
