import Link from "next/link";
import { problems } from "@/data/problems";

export default function PlayIndex() {
  // ランクごとにグルーピング
  const byRank = problems.reduce<Record<number, typeof problems>>((acc, p) => {
    (acc[p.rank] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      {/* ヘッダー */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="text-zinc-500 underline-offset-2 hover:underline">
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
                  {head.rankTitle} <span className="text-zinc-400">Lv.{head.rank}</span>
                </h2>
                <p className="text-xs text-zinc-500">{rankProblems.length}問</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {rankProblems.map((p) => (
                <Link
                  key={p.id}
                  href={`/play/${p.id}`}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-emerald-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="text-xs font-mono text-zinc-500">
                      問題 {p.id}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      約 {Math.round(p.estimatedSeconds / 60)} 分
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-xs text-zinc-600 dark:text-zinc-400">
                    {p.scenario}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    {p.characters.map((c) => (
                      <span key={c.id} className="text-xl">
                        {c.emoji}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* 将来のロックされたランク（プレースホルダ） */}
      <section className="mb-10 opacity-50">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl grayscale">🌱</span>
          <div>
            <h2 className="text-lg font-bold">
              新人 <span className="text-zinc-400">Lv.2</span>
            </h2>
            <p className="text-xs text-zinc-500">🔒 内定者を3問クリアで解放</p>
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
