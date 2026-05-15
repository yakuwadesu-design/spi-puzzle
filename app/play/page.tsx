import Link from "next/link";
import { problems } from "@/data/problems";
import { RankSection } from "@/components/RankSection";
import { RankSummary } from "@/components/RankSummary";

export default function PlayIndex() {
  // 表示するランクのリスト（実装済 + 次の1ランク）
  const definedRanks = Array.from(
    new Set(problems.map((p) => p.rank))
  ).sort((a, b) => a - b);
  const maxDefinedRank = Math.max(...definedRanks);
  // 次のランクも「ロック」状態で表示する（最大 Lv.7まで）
  const displayRanks = Array.from(
    new Set([...definedRanks, Math.min(maxDefinedRank + 1, 7)])
  ).sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-zinc-900 dark:text-zinc-100 sm:py-12">
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-zinc-500 underline-offset-2 hover:underline"
        >
          ← TOP
        </Link>
      </div>

      <h1 className="mb-2 text-3xl font-bold sm:text-4xl">問題を選ぶ</h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        各ランクの問題をすべてクリアすると次のランクが解放されます。
      </p>

      <RankSummary />

      {displayRanks.map((rank) => (
        <RankSection key={rank} rank={rank} />
      ))}

      <p className="mt-12 text-center text-xs text-zinc-400">
        © 2026 SPI ナンプレ
      </p>
    </div>
  );
}
