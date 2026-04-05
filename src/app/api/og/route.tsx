import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const typeConfig: Record<string, { gradient: string; emoji: string; label: string }> = {
  home: { gradient: "from-sky-500 to-teal-400", emoji: "🌊", label: "ทับสะแกโฟกัส" },
  news: { gradient: "from-blue-600 to-blue-400", emoji: "📰", label: "ข่าวสาร" },
  shops: { gradient: "from-emerald-600 to-emerald-400", emoji: "🏪", label: "ร้านค้า" },
  tourism: { gradient: "from-sky-600 to-cyan-400", emoji: "🏖️", label: "ท่องเที่ยว" },
  jobs: { gradient: "from-amber-600 to-amber-400", emoji: "💼", label: "หางาน" },
  board: { gradient: "from-purple-600 to-purple-400", emoji: "💬", label: "เว็บบอร์ด" },
  marketplace: { gradient: "from-rose-600 to-rose-400", emoji: "🛒", label: "ซื้อขาย" },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "ทับสะแกโฟกัส";
  const type = searchParams.get("type") || "home";
  const config = typeConfig[type] || typeConfig.home;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 60px",
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          {/* Type badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50px",
              padding: "10px 24px",
              marginBottom: "32px",
            }}
          >
            <span style={{ fontSize: "28px" }}>{config.emoji}</span>
            <span style={{ color: "#94a3b8", fontSize: "20px", fontWeight: 600 }}>
              {config.label}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? "42px" : "52px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.3,
              marginBottom: "32px",
              display: "flex",
              textAlign: "center",
            }}
          >
            {title}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "white",
                fontWeight: 800,
              }}
            >
              ท
            </div>
            <span style={{ color: "#64748b", fontSize: "18px", fontWeight: 500 }}>
              thapsakaefocus.com
            </span>
          </div>
        </div>

        {/* Gradient line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, #0ea5e9, #14b8a6, #0ea5e9)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
