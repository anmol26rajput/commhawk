import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 30% 70%, rgba(46,139,255,0.25), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2e8bff" }} />
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.64)", letterSpacing: -0.5 }}>
            Engineering Digital Excellence
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 112, fontWeight: 600, color: "#ffffff", letterSpacing: -4 }}>COMMHAWK</span>
          <span style={{ fontSize: 32, color: "rgba(255,255,255,0.82)", maxWidth: 800 }}>
            A premier technology partner for ambitious companies scaling through cutting-edge development and AI.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
