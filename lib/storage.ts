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
