// shared UI state (runes module) — lets the command palette tell the
// canvas to pause while it's open, so the blur isn't fighting the rAF loop.
export const ui = $state({ paletteOpen: false });
