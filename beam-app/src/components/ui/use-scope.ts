/** Popups render in a portal, outside any Beam region, so they mark themselves as Beam. */
export function useScope() {
  return { "data-beam": "" } as const;
}
