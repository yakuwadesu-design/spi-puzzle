"use client";

import { useEffect, useState } from "react";
import { problems as allProblems } from "@/data/problems";
import { ProblemCard } from "./ProblemCard";
import {
  getRankProgress,
  hasSeenUnlock,
  markUnlockSeen,
} from "@/lib/storage";

type RankInfo = {
  title: string;
  emoji: string;
  timeLimit: number;
};

const RANK_INFO: Record<number, RankInfo> = {
  1: { title: "内定者", emoji: "🔰", timeLimit: 90 },
  2: { title: "新人", emoji: "🌱", timeLimit: 75 },
  3: { title: "若手", emoji: "👔", timeLimit: 60 },
  4: { title: "エース", emoji: "🚀", timeLimit: 50 },
  5: { title: "マネージャー", emoji: "🎩", timeLimit: 45 },
  6: { title: "部長", emoji: "🏆", timeLimit: 40 },
  7: { title: "役員", emoji: "💎", timeLimit: 30 },
};

export function RankSection({ rank }: { rank: number }) {
  const info = RANK_INFO[rank];
  const rankProblems = allProblems.filter((p) => p.rank === rank);

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState({
    total: rankProblems.length,
    solved: 0,
    unlocked: rank === 1,
  });
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getRankProgress(rank, allProblems);
    setProgress(p);

    // 初回解放時のセレブレーション
    if (p.unlocked && rank > 1 && !hasSeenUnlock(rank)) {
      setShowCelebration(true);
      markUnlockSeen(rank);
    }
  }, [rank]);

  if (!info) return null;

  // 初回マウント前は控えめ表示
  if (!mounted) {
    return (
      <section className="mb-10 opacity-50">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{info.emoji}</span>
          <div>
            <h2 className="text-lg font-bold">
              {info.title}{" "}
              <span className="text-zinc-400">Lv.{rank}</span>
            </h2>
            <p className="text-xs text-zinc-500">読み込み中...</p>
          </div>
        </div>
      </section>
    );
  }

  const isLocked = !progress.unlocked;
  const isFullyCleared =
    progress.unlocked &&
    progress.total > 0 &&
    progress.solved === progress.total;
  const isUnlockedButEmpty = progress.unlocked && rankProblems.length === 0;

  return (
    <>
      <section
        className={`mb-10 transition-opacity ${
          isLocked ? "opacity-60" : ""
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`text-3xl ${isLocked ? "grayscale" : ""}`}
          >
            {info.emoji}
          </span>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span>
                {info.title}{" "}
                <span className="text-zinc-400">Lv.{rank}</span>
              </span>
              {isLocked && (
                <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  🔒 ロック
                </span>
              )}
              {isFullyCleared && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  🏆 完全制覇
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-500">
              {isLocked
                ? `Lv.${rank - 1} の全問題クリアで解放`
                : isUnlockedButEmpty
                ? "🎉 解放！問題は近日公開予定"
                : `${progress.solved} / ${progress.total} クリア ・ 制限時間 ${info.timeLimit}秒/問`}
            </p>
          </div>
        </div>

        {isLocked && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/50">
            🔒 ロック中（前のランクをクリアして解放）
          </div>
        )}

        {isUnlockedButEmpty && (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 text-center dark:border-emerald-700 dark:bg-emerald-950/40">
            <div className="mb-2 text-3xl">🎉</div>
            <div className="text-sm font-bold">
              Lv.{rank} {info.title} 解放！
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              問題は近日追加予定。お楽しみに！
            </div>
          </div>
        )}

        {progress.unlocked && rankProblems.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {rankProblems.map((p) => (
              <ProblemCard key={p.id} problem={p} />
            ))}
          </div>
        )}
      </section>

      {/* 初回解放セレブレーション */}
      {showCelebration && (
        <UnlockCelebration
          rank={rank}
          title={info.title}
          emoji={info.emoji}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </>
  );
}

function UnlockCelebration({
  rank,
  title,
  emoji,
  onClose,
}: {
  rank: number;
  title: string;
  emoji: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      {/* 紙吹雪 */}
      {Array.from({ length: 32 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-confetti text-3xl"
          style={{
            left: `${(i * 3.2) % 100}%`,
            animationDelay: `${(i * 0.04) % 1.5}s`,
          }}
        >
          {["🎉", "✨", "⭐", "🎊", "🏆"][i % 5]}
        </span>
      ))}

      <div
        className="relative w-full max-w-md animate-slide-up rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          🔓 ランクアップ！
        </div>
        <div className="mb-4 inline-block animate-celebrate text-7xl">
          {emoji}
        </div>
        <h2 className="mb-3 text-3xl font-bold">
          {title} (Lv.{rank}) 解放！
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          おめでとうございます！次のランクの問題が解放されました。
          <br />
          さらに難しい推論問題に挑戦してみましょう。
        </p>
        <button
          onClick={onClose}
          className="rounded-full bg-zinc-900 px-8 py-3 font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          挑戦する 🚀
        </button>
      </div>
    </div>
  );
}
