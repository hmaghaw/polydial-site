import { useState } from "react";

// Uses the real PNG when it's in /public (run scripts/fetch-assets.sh),
// otherwise falls back to the bundled SVG approximation.
export default function Logo({ className = "h-8 w-auto" }) {
  const [src, setSrc] = useState("/polydial-logo-rectangular.png");
  return (
    <img
      src={src}
      alt="PolyDial"
      className={className}
      onError={() => src.endsWith(".png") && setSrc("/polydial-logo.svg")}
    />
  );
}
