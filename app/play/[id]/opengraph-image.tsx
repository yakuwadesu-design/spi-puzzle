import { ImageResponse } from "next/og";
import { problems, getProblemById } from "@/data/problems";

export const alt = "SPI ナンプレ - 問題に挑戦";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return problems.map((p) => ({ id: p.id }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = getProblemById(id);

  if (!problem) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            fontSize: 60,
          }}
        >
          SPI ナンプレ
        </div>
      ),
      size
    );
  }

  const rankLabel = `${problem.rankEmoji} ${problem.rankTitle} Lv.${problem.rank}`;
  const problemLabel = `問題 ${problem.id}`;
  const timeLabel = `⏱️ 制限時間 ${problem.timeLimit}秒`;
  const hintsLabel = `ヒント ${problem.hints.length}個`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #fefcfb 0%, #ecfdf5 100%)",
          padding: 70,
          fontFamily: "sans-serif",
        }}
      >
        {/* ヘッダー：ランクバッジ */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#10b981",
              color: "white",
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 28,
              fontWeight: 700,
              display: "flex",
            }}
          >
            {rankLabel}
          </div>
          <div style={{ fontSize: 24, color: "#64748b", display: "flex" }}>
            {problemLabel}
          </div>
        </div>

        {/* タイトル */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#0f172a",
            marginTop: 36,
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          {problem.title}
        </div>

        {/* メタ情報 */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 28,
            fontSize: 32,
            color: "#475569",
          }}
        >
          <div style={{ display: "flex" }}>{timeLabel}</div>
          <div style={{ display: "flex", color: "#cbd5e1" }}>|</div>
          <div style={{ display: "flex" }}>{hintsLabel}</div>
        </div>

        {/* キャラ絵文字一覧 */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
          }}
        >
          {problem.characters.map((c) => (
            <div
              key={c.id}
              style={{
                fontSize: 96,
                display: "flex",
              }}
            >
              {c.emoji}
            </div>
          ))}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 32,
                color: "#0f172a",
                display: "flex",
              }}
            >
              SPI ナンプレ
            </div>
            <div
              style={{ fontSize: 22, color: "#64748b", display: "flex" }}
            >
              推論問題をパズル感覚で攻略
            </div>
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
