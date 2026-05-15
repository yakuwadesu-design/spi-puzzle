"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Problem } from "@/data/problems";
import { getRecord, formatTime, type ProblemRecord } from "@/lib/storage";

export function ProblemCard({ problem }: { problem: Problem }) {
  const [record, setRecord] = useState<ProblemRecord | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecord(getRecord(problem.id));
  }, [problem.id]);

  const isSolved = record !== null;

  return (
    <Link
      href={`/play/${problem.id}`}
      className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-emerald-400 hover:shadow-md active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-zinc-500">
          問題 {problem.id}
        </span>
        <div className="flex items-center gap-1">
          {mounted && isSolved && (
            <span title="クリア済" className="text-base">
              ✅
            </span>
          )}
          {mounted && record?.withinTimeLimit && (
            <span title="制限時間内クリア" className="text-base">
              ⭐
            </span>
          )}
          {mounted && record?.noHintCleared && (
            <span title="ノーヒントクリア" className="text-base">
              🎯
            </span>
          )}
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            制限 {problem.timeLimit}秒
          </span>
        </div>
      </div>
      <h3 className="mb-2 text-base font-bold leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
        {problem.title}
      </h3>
      <p className="line-clamp-3 text-xs text-zinc-600 dark:text-zinc-400">
        {problem.scenario}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          {problem.characters.map((c) => (
            <span key={c.id} className="text-xl">
              {c.emoji}
            </span>
          ))}
        </div>
        {mounted && record && (
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            ベスト: {formatTime(record.bestTimeSeconds)}
          </span>
        )}
      </div>
    </Link>
  );
}
