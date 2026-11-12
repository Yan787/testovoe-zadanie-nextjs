import { ImageResponse } from "next/og";

export const alt = "Frontend Interview Trainer — JavaScript, React, CSS, HTML, TypeScript, Next.js";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80, background: "#0a0a0a", color: "#ededed",
        border: "2px solid #292929",
      }}>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1a1", marginBottom: 40 }}>
          JavaScript · React · CSS · HTML · TypeScript · Next.js
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -5 }}>
          Frontend Interview
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: "#b4a3ff", letterSpacing: -5 }}>
          Trainer
        </div>
      </div>
    ),
    size,
  );
}
