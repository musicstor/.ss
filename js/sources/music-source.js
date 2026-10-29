// Music source interface. Phase 2 replaces the body of these functions with real Audius calls.
// Until then every call fails honestly, so the UI shows "not connected" instead of fake tracks.
export class SourceNotConnectedError extends Error {
  constructor() {
    super("No music source is connected yet.");
    this.name = "SourceNotConnectedError";
  }
}

export async function getTrending(/* { limit, offset } */) { throw new SourceNotConnectedError(); }
export async function getNewReleases(/* { limit, offset } */) { throw new SourceNotConnectedError(); }
export async function getRecommended(/* { limit, offset } */) { throw new SourceNotConnectedError(); }
export async function getFeatured(/* { limit, offset } */) { throw new SourceNotConnectedError(); }
