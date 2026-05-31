/**
 * Camadas decorativas fixas sobre todo o site: grão de filme + vinheta.
 * `pointer-events-none` para não interferir na interação. Sem JS.
 */
export function TextureOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="texture-grain pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[69] [background:radial-gradient(120%_120%_at_50%_30%,transparent_55%,rgba(0,0,0,0.55)_100%)]"
      />
    </>
  );
}
