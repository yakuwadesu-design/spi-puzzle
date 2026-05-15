import Link from "next/link";
import { problems } from "@/data/problems";
import { ProblemCard } from "@/components/ProblemCard";

export default function PlayIndex() {
  const byRank = problems.reduce<Record<number, typeof problems>>((acc, p) => {
    (acc[p.rank] ??= []).push(p);
    return acc;
  }, {});

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
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        現在解放されているのは <strong>🔰 内定者 Lv.1</strong> の問題です。3問すべてクリアすると次のランクが開放されます（実装予定）。
      </p>

      {Object.entries(byRank).map(([rank, rankProblems]) => {
        const head = rankProblems[0];
        return (
          <section key={rank} className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">{head.rankEmoji}</span>
              <div>
                <h2 className="text-lg font-bold">
                  {head.rankTitle}{" "}
                  <span className="text-zinc-400">Lv.{head.rank}</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  {rankProblems.length}問 ・ 制限時間 {head.timeLimit}秒/問
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {rankProblems.map((p) => (
                <ProblemCard key={p.id} problem={p} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-10 opacity-50">
        <div className="mb-4 flex items-center gap-3">
          <span className="grayscale text-3xl">🌱</span>
          <div>
            <h2 className="text-lg font-bold">
              新人 <span className="text-zinc-400">Lv.2</span>
            </h2>
            <p className="text-xs text-zinc-500">
              🔒 内定者を3問クリアで解放
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/50">
          近日公開
        </div>
      </section>

      <p className="mt-12 text-center text-xs text-zinc-400">
        © 2026 SPI ナンプレ
      </p>
    </div>
  );
}
