// LocalStorage を使ったスコア・ベストタイム記録

const STORAGE_KEY = "spi-puzzle-progress-v1";

export type ProblemRecord = {
  bestTimeSeconds: number; // 最速クリア時間
  solvedCount: number; // 正解回数
  lastSolvedAt: number; // タイムスタンプ
  withinTimeLimit: boolean; // 制限時間内クリア達成歴
  noHintCleared: boolean; // ノーヒント正解歴
};

export type Progress = {
  records: Record<string, ProblemRecord>; // problemId → record
};

const isClient = () => typeof window !== "undefined";

export function loadProgress(): Progress {
  if (!isClient()) return { records: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { records: {} };
    return JSON.parse(raw) as Progress;
  } catch {
    return { records: {} };
  }
}

export function saveProgress(progress: Progress): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // QuotaExceededError or other - silently fail
  }
}

export function getRecord(problemId: string): ProblemRecord | null {
  const p = loadProgress();
  return p.records[problemId] ?? null;
}

export function recordSolve(params: {
  problemId: string;
  timeSeconds: number;
  withinTimeLimit: boolean;
  noHint: boolean;
}): ProblemRecord {
  const { problemId, timeSeconds, withinTimeLimit, noHint } = params;
  const p = loadProgress();
  const prev = p.records[problemId];
  const next: ProblemRecord = {
    bestTimeSeconds: prev
      ? Math.min(prev.bestTimeSeconds, timeSeconds)
      : timeSeconds,
    solvedCount: (prev?.solvedCount ?? 0) + 1,
    lastSolvedAt: Date.now(),
    withinTimeLimit: (prev?.withinTimeLimit ?? false) || withinTimeLimit,
    noHintCleared: (prev?.noHintCleared ?? false) || noHint,
  };
  p.records[problemId] = next;
  saveProgress(p);
  return next;
}

export function getSolvedCount(): number {
  const p = loadProgress();
  return Object.keys(p.records).length;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}秒`;
  return `${m}分${s.toString().padStart(2, "0")}秒`;
}

// ==============================
// ランク解放ロジック
// ==============================

type ProblemLike = { id: string; rank: number };

export function getRankProgress(
  rank: number,
  allProblems: ProblemLike[]
): { total: number; solved: number; unlocked: boolean } {
  const rankProblems = allProblems.filter((p) => p.rank === rank);
  const total = rankProblems.length;
  const progress = loadProgress();
  const solved = rankProblems.filter((p) => !!progress.records[p.id]).length;

  let unlocked = false;
  if (rank === 1) {
    unlocked = true;
  } else {
    const prevRankProblems = allProblems.filter((p) => p.rank === rank - 1);
    if (prevRankProblems.length > 0) {
      unlocked = prevRankProblems.every((p) => !!progress.records[p.id]);
    }
  }

  return { total, solved, unlocked };
}

export function getHighestUnlockedRank(allProblems: ProblemLike[]): number {
  const ranks = Array.from(new Set(allProblems.map((p) => p.rank))).sort(
    (a, b) => a - b
  );
  let highest = 1;
  for (const r of ranks) {
    if (getRankProgress(r, allProblems).unlocked) highest = r;
  }
  return highest;
}

const UNLOCK_SEEN_KEY_PREFIX = "spi-puzzle-unlock-seen-";

export function hasSeenUnlock(rank: number): boolean {
  if (!isClient()) return true; // SSR safety
  return localStorage.getItem(UNLOCK_SEEN_KEY_PREFIX + rank) === "true";
}

export function markUnlockSeen(rank: number): void {
  if (!isClient()) return;
  localStorage.setItem(UNLOCK_SEEN_KEY_PREFIX + rank, "true");
}

// ==============================
// 統計（/stats ページ用）
// ==============================

export type Stats = {
  totalSolved: number;
  totalAttempted: number; // = solvedCount の合計（複数回挑戦含む）
  totalBestTimeSeconds: number; // ベストタイムの合計
  avgBestTimeSeconds: number; // 平均ベストタイム
  inTimeBadges: number; // ⭐ 制限時間内クリアの数
  noHintBadges: number; // 🎯 ノーヒントクリアの数
  fastestSolveSeconds: number | null; // 全問題中の最速タイム
  rankBreakdown: Record<
    number,
    { total: number; solved: number; avgTime: number }
  >;
};

export function getStats(
  allProblems: ProblemLike[]
): Stats {
  const progress = loadProgress();
  const records = progress.records;
  const solvedIds = Object.keys(records);

  let totalBestTime = 0;
  let totalAttempted = 0;
  let inTimeBadges = 0;
  let noHintBadges = 0;
  let fastestSolve: number | null = null;

  for (const id of solvedIds) {
    const r = records[id];
    totalBestTime += r.bestTimeSeconds;
    totalAttempted += r.solvedCount;
    if (r.withinTimeLimit) inTimeBadges++;
    if (r.noHintCleared) noHintBadges++;
    if (fastestSolve === null || r.bestTimeSeconds < fastestSolve) {
      fastestSolve = r.bestTimeSeconds;
    }
  }

  const totalSolved = solvedIds.length;
  const avgBestTime = totalSolved > 0 ? Math.round(totalBestTime / totalSolved) : 0;

  // ランク別集計
  const rankBreakdown: Stats["rankBreakdown"] = {};
  const ranks = Array.from(new Set(allProblems.map((p) => p.rank))).sort();
  for (const rank of ranks) {
    const rankProblems = allProblems.filter((p) => p.rank === rank);
    const total = rankProblems.length;
    const solvedRankProblems = rankProblems.filter((p) => records[p.id]);
    const solved = solvedRankProblems.length;
    const avgTime =
      solved > 0
        ? Math.round(
            solvedRankProblems.reduce(
              (sum, p) => sum + records[p.id].bestTimeSeconds,
              0
            ) / solved
          )
        : 0;
    rankBreakdown[rank] = { total, solved, avgTime };
  }

  return {
    totalSolved,
    totalAttempted,
    totalBestTimeSeconds: totalBestTime,
    avgBestTimeSeconds: avgBestTime,
    inTimeBadges,
    noHintBadges,
    fastestSolveSeconds: fastestSolve,
    rankBreakdown,
  };
}
