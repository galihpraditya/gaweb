import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "gaweb - Bikin Website Modern yang Gampang Dikelola Sendiri | 100% Custom Code";
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
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 10% 12%, rgba(0, 79, 114, 0.05) 0%, transparent 45%), radial-gradient(circle at 92% 88%, rgba(13, 148, 136, 0.07) 0%, transparent 50%), linear-gradient(180deg, #F9FBFC 0%, #FFFFFF 100%)",
          padding: "44px 56px",
          color: "#092734",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          border: "1px solid #E2E8F0",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Mockup */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo gaweb */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                display: "flex",
              }}
            >
              <span style={{ color: "#092734" }}>ga</span>
              <span style={{ color: "#004F72" }}>web</span>
            </span>
          </div>

          {/* Value Prop Pill Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#FFFFFF",
              padding: "10px 22px",
              borderRadius: "9999px",
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              fontSize: 18,
              fontWeight: 700,
              color: "#004F72",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#10B981",
              }}
            />
            <span>100% Custom Code • Bukan WordPress</span>
          </div>
        </div>

        {/* Center Hero Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            marginTop: "6px",
            marginBottom: "6px",
          }}
        >
          {/* Main Headline H1 */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "1060px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#092734" }}>Bikin Website Modern yang</span>
            <span
              style={{
                color: "#004F72",
                marginLeft: "12px",
                marginRight: "12px",
              }}
            >
              Gampang Dikelola
            </span>
            <span style={{ color: "#092734" }}>Sendiri</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#475569",
              lineHeight: 1.45,
              maxWidth: "960px",
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            Bebas template kaku, tanpa ribet. Loading super cepat, terima beres
            domain + hosting, dan bisa kamu kelola sendiri dengan mudah.
          </div>

          {/* Hero Buttons Mockup */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {/* Primary Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#004F72",
                color: "#FFFFFF",
                padding: "13px 28px",
                borderRadius: "9999px",
                fontSize: 19,
                fontWeight: 700,
                boxShadow: "0 6px 18px rgba(0, 79, 114, 0.24)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Chat WhatsApp Sekarang</span>
            </div>

            {/* Secondary Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #CBD5E1",
                color: "#092734",
                padding: "13px 26px",
                borderRadius: "9999px",
                fontSize: 19,
                fontWeight: 700,
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
              }}
            >
              <span>Lihat Portofolio &amp; Harga</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#092734"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges & Reassurance */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1.5px solid #E2E8F0",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          {/* Trust Checkpoints with SVG icons */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 18,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Terima beres domain &amp; hosting</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 18,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Dashboard mudah diedit</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 18,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Garansi 7 hari</span>
            </div>
          </div>

          {/* Pricing Highlight Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 17,
              fontWeight: 700,
              color: "#92400E",
              backgroundColor: "#FEF3C7",
              padding: "7px 18px",
              borderRadius: "9999px",
              border: "1.5px solid #FDE68A",
              whiteSpace: "nowrap",
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
