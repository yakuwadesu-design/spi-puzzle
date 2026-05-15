import { ImageResponse } from "next/og";

export const alt =
  "SPI ナンプレ - 推論問題をパズル感覚で攻略するWebアプリ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #fefcfb 0%, #ecfdf5 50%, #f0f9ff 100%)",
          padding: 70,
          fontFamily: "sans-serif",
        }}
      >
        {/* バッジ */}
        <div
          style={{
            background: "#ecfdf5",
            color: "#047857",
            padding: "10px 24px",
            borderRadius: 999,
            fontSize: 24,
            fontWeight: 700,
            border: "2px solid #10b981",
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          🎓 就活生は無料 ・ 💼 中途は業界別パック
        </div>

        {/* タイトル1 */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "#0f172a",
            marginTop: 36,
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          SPI を、
        </div>

        {/* タイトル2 */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "#10b981",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          パズルで攻略する。
        </div>

        {/* サブタイトル */}
        <div
          style={{
            fontSize: 32,
            color: "#475569",
            marginTop: 24,
            display: "flex",
          }}
        >
          就活・転職のSPI推論を、ナンプレ風UIで遊びながら身につける
        </div>

        {/* 統計 */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 64,
                color: "#0f172a",
                display: "flex",
              }}
            >
              13問
            </div>
            <div style={{ color: "#64748b", fontSize: 22, display: "flex" }}>
              初級〜超上級まで
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 64,
                color: "#0f172a",
                display: "flex",
              }}
            >
              7段階
            </div>
            <div style={{ color: "#64748b", fontSize: 22, display: "flex" }}>
              推論力ランク
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 64,
                color: "#0f172a",
                display: "flex",
              }}
            >
              0円
            </div>
            <div style={{ color: "#64748b", fontSize: 22, display: "flex" }}>
              登録不要・広告ゼロ
            </div>
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ fontSize: 56, display: "flex" }}>🔰</div>
            <div style={{ fontSize: 56, display: "flex" }}>🌱</div>
            <div style={{ fontSize: 56, display: "flex" }}>👔</div>
            <div style={{ fontSize: 56, display: "flex" }}>🚀</div>
            <div style={{ fontSize: 56, display: "flex" }}>🎩</div>
            <div style={{ fontSize: 56, display: "flex" }}>🏆</div>
            <div style={{ fontSize: 56, display: "flex" }}>💎</div>
          </div>
          <div style={{ fontSize: 22, color: "#94a3b8", display: "flex" }}>
            spi-puzzle.vercel.app
          </div>
        </div>
      </div>
    ),
    size
  );
}
