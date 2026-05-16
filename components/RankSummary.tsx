"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { problems as allProblems } from "@/data/problems";
import { getHighestUnlockedRank, getSolvedCount } from "@/lib/storage";

const RANK_INFO: Record<number, { title: string; emoji: string }> = {
  1: { title: "内定者", emoji: "🔰" },
  2: { title: "新人", emoji: "🌱" },
  3: { title: "若手", emoji: "👔" },
  4: { title: "エース", emoji: "🚀" },
  5: { title: "マネージャー", emoji: "🎩" },
  6: { title: "部長", emoji: "🏆" },
  7: { title: "役員", emoji: "💎" },
};

export function RankSummary() {
  const [mounted, setMounted] = useState(false);
  const [currentRank, setCurrentRank] = useState(1);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setCurrentRank(getHighestUnlockedRank(allProblems));
    setSolvedCount(getSolvedCount());
  }, []);

  const info = RANK_INFO[currentRank] ?? RANK_INFO[1];

  return (
    <div className="mb-8 flex items-center gap-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 p-4 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-blue-950/40">
      <div className="text-5xl">{info.emoji}</div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          あなたの推論力
        </div>
        <div className="text-xl font-bold">
          {info.title}{" "}
          <span className="text-zinc-400">Lv.{currentRank}</span>
        </div>
        {mounted && (
          <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            解いた問題: {solvedCount} 問
          </div>
        )}
      </div>
      <Link
        href="/stats"
        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        📊 詳細
      </Link>
    </div>
  );
}
