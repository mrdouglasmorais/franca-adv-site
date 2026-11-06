import { ImageResponse } from "next/og";

export const alt = "Ferreira França Advogados e Associados — advocacia em Itajaí/SC";
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
          ADVOCACIA E ASSESSORIA EMPRESARIAL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>Ferreira França</div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#e8d9b5" }}>Advocacia em Itajaí / SC</div>
        </div>
        <div style={{ display: "flex", width: 96, height: 4, background: "#741b2c" }} />
      </div>
    ),
    { ...size },
  );
}
