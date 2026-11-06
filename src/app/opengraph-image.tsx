import { ImageResponse } from "next/og";
import { firm } from "@/content/firm";

export const alt = firm.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#c5a46d" }}>
          {firm.tagline.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 980 }}>
            Ferreira França Advogados
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#e8d9b5" }}>
            Advocacia em Itajaí
          </div>
        </div>
        <div style={{ display: "flex", width: 96, height: 4, background: "#741b2c" }} />
      </div>
    ),
    { ...size },
  );
}
