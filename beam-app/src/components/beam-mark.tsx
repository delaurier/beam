export function BeamMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M12 1.5v21M1.5 12h21M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.6" fill="var(--accent)" />
    </svg>
  );
}
