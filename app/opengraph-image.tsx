import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "gaweb - Jasa Pembuatan Website Custom, Landing Page & Company Profile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#092734",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #004F72 0%, transparent 60%), radial-gradient(circle at 85% 85%, #0891b2 0%, transparent 50%)",
          padding: "60px 80px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "#ffffff" }}>ga</span>
              <span style={{ color: "#38bdf8" }}>web</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: 20,
              fontWeight: 600,
              color: "#38bdf8",
            }}
          >
            100% Custom Code • Bukan WordPress
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "1050px",
              color: "#ffffff",
            }}
          >
            Jasa Pembuatan Website Custom & Landing Page Cepat
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "920px",
            }}
          >
            Super cepat (PageSpeed 90+), aman tanpa plugin, dan terima beres
            domain + hosting + dashboard admin mandiri.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 22,
                color: "#e2e8f0",
              }}
            >
              <span style={{ color: "#34d399", fontSize: 24 }}>✓</span>
              <span>PageSpeed 90+</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 22,
                color: "#e2e8f0",
              }}
            >
              <span style={{ color: "#34d399", fontSize: 24 }}>✓</span>
              <span>Dashboard Mandiri</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 22,
                color: "#e2e8f0",
              }}
            >
              <span style={{ color: "#34d399", fontSize: 24 }}>✓</span>
              <span>Garansi 7 Hari</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fbbf24",
            }}
          >
            Mulai Rp 999.000 • Terima Beres
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
