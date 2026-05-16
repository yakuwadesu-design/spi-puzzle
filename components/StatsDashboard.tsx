"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { problems as allProblems } from "@/data/problems";
import {
  getStats,
  formatTime,
  getHighestUnlockedRank,
  type Stats,
} from "@/lib/storage";

const RANK_INFO: Record<number, { title: string; emoji: string }> = {
  1: { title: "内定者", emoji: "🔰" },
  2: { title: "新人", emoji: "🌱" },
  3: { title: "若手", emoji: "👔" },
  4: { title: "エース", emoji: "🚀" },
  5: { title: "マネージャー", emoji: "🎩" },
  6: { title: "部長", emoji: "🏆" },
  7: { title: "役員", emoji: "💎" },
};

export function StatsDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [currentRank, setCurrentRank] = useState(1);

  useEffect(() => {
    setMounted(true);
    setStats(getStats(allProblems));
    setCurrentRank(getHighestUnlockedRank(allProblems));
  }, []);

  if (!mounted || !stats) {
    return (
      <div className="text-center text-sm text-zinc-500">読み込み中...</div>
    );
  }

  // データなしの場合
  if (stats.totalSolved === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <div className="mb-3 text-5xl">🔰</div>
        <h2 className="mb-2 text-lg font-bold">まだプレイ実績がありません</h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          1問でも解くと、ここに統計が表示されます。
        </p>
        <Link
          href="/play/1-1"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          🔰 1問目に挑戦する →
        </Link>
      </div>
    );
  }

  const currentRankInfo = RANK_INFO[currentRank] ?? RANK_INFO[1];
  const totalProblems = allProblems.length;
  const completionRate = Math.round((stats.totalSolved / totalProblems) * 100);

  return (
    <div className="space-y-8">
      {/* 推論力サマリー */}
      <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 p-6 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-blue-950/40">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{currentRankInfo.emoji}</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              あなたの推論力
            </div>
            <div className="text-2xl font-bold">
              {currentRankInfo.title}{" "}
              <span className="text-zinc-400">Lv.{currentRank}</span>
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              全{totalProblems}問中{" "}
              <strong className="text-emerald-700 dark:text-emerald-300">
                {stats.totalSolved}問
              </strong>{" "}
              クリア（{completionRate}%）
            </div>
          </div>
        </div>
      </div>

      {/* メイン統計 4カード */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="解いた問題"
          value={`${stats.totalSolved}問`}
          subLabel={`累計${stats.totalAttempted}回挑戦`}
        />
        <StatCard
          label="累計ベスト合計"
          value={formatTime(stats.totalBestTimeSeconds)}
          subLabel="自己最速の合計"
        />
        <StatCard
          label="平均ベスト"
          value={formatTime(stats.avgBestTimeSeconds)}
          subLabel="1問あたり"
        />
        <StatCard
          label="最速タイム"
          value={
            stats.fastestSolveSeconds !== null
              ? formatTime(stats.fastestSolveSeconds)
              : "—"
          }
          subLabel="全問題で最速"
        />
      </div>

      {/* バッジ */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          獲得したバッジ
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <BadgeCard
            emoji="⭐"
            label="制限時間内クリア"
            count={stats.inTimeBadges}
            total={stats.totalSolved}
            description="制限時間内に正解した問題数"
          />
          <BadgeCard
            emoji="🎯"
            label="ノーヒントクリア"
            count={stats.noHintBadges}
            total={stats.totalSolved}
            description="ヒント追加なしで正解した問題数"
          />
        </div>
      </div>

      {/* ランク別内訳 */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          ランク別の進捗
        </h2>
        <div className="space-y-3">
          {Object.entries(stats.rankBreakdown).map(([rank, data]) => {
            const info = RANK_INFO[Number(rank)];
            if (!info) return null;
            const isComplete = data.solved === data.total && data.total > 0;
            const progressPercent =
              data.total > 0 ? (data.solved / data.total) * 100 : 0;
            return (
              <div key={rank} className="flex items-center gap-3">
                <div className="text-2xl">{info.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      {info.title}{" "}
                      <span className="text-xs text-zinc-400">
                        Lv.{rank}
                      </span>
                    </span>
                    <span className="text-xs text-zinc-500">
                      {data.solved} / {data.total} クリア
                      {data.solved > 0 && (
                        <span className="ml-2">
                          ・平均 {formatTime(data.avgTime)}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full transition-all ${
                        isComplete
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                {isComplete && <span className="text-lg">🏆</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {completionRate < 100
            ? `あと${totalProblems - stats.totalSolved}問で完全制覇`
            : "🏆 全問題クリア！完全制覇です"}
        </p>
        <Link
          href="/play"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          問題に挑戦する →
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subLabel,
}: {
  label: string;
  value: string;
  subLabel: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 font-mono text-2xl font-bold tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] text-zinc-400">{subLabel}</div>
    </div>
  );
}

function BadgeCard({
  emoji,
  label,
  count,
  total,
  description,
}: {
  emoji: string;
  label: string;
  count: number;
  total: number;
  description: string;
}) {
  const rate = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <span className="text-3xl">{emoji}</span>
        <div>
          <div className="text-sm font-bold">{label}</div>
          <div className="text-xs text-zinc-500">{description}</div>
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums">{count}</span>
        <span className="text-xs text-zinc-400">/ {total}（{rate}%）</span>
      </div>
    </div>
  );
}
