"use client";

import { useEffect, useRef, useState } from "react";
import type { Problem } from "@/data/problems";
import {
  getRecord,
  recordSolve,
  formatTime,
  type ProblemRecord,
} from "@/lib/storage";

type Props = { problem: Problem };
type Placement = Record<string, string | null>;

const MEDALS = ["🥇", "🥈", "🥉", "🏅", "🎖️"];
const HINT_PENALTY_SECONDS = 10; // ヒント1つ開示で +10秒

export function PuzzleBoard({ problem }: Props) {
  // 順位枠 → 配置されたキャラID
  const [placements, setPlacements] = useState<Placement>(
    Object.fromEntries(problem.positions.map((p) => [p, null]))
  );
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // タイマー
  const [elapsed, setElapsed] = useState(0); // 経過秒数
  const [isRunning, setIsRunning] = useState(true);
  const [hintPenalty, setHintPenalty] = useState(0); // ヒントペナルティ合計
  const [solveTime, setSolveTime] = useState<number | null>(null); // 解いた時の経過時間

  // 段階的ヒント
  const [revealedHints, setRevealedHints] = useState(2); // 最初は2つ表示

  // スコア記録
  const [record, setRecord] = useState<ProblemRecord | null>(null);

  // 答え合わせアニメーションのキー
  const [animKey, setAnimKey] = useState(0);

  const startTimeRef = useRef<number>(Date.now());

  // タイマー駆動
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(sec);
    }, 200);
    return () => clearInterval(interval);
  }, [isRunning]);

  // 既存ベストタイム読み込み
  useEffect(() => {
    setRecord(getRecord(problem.id));
  }, [problem.id]);

  const placedCharIds = new Set(
    Object.values(placements).filter(Boolean) as string[]
  );
  const allFilled = Object.values(placements).every((c) => c !== null);
  const isCorrect = problem.positions.every(
    (pos) =>
      placements[pos] ===
      (Object.entries(problem.solution).find(([, p]) => p === pos)?.[0] ??
        null)
  );

  const getChar = (id: string | null) =>
    id ? problem.characters.find((c) => c.id === id) ?? null : null;

  // 残り時間（負になりうる）
  const timeWithPenalty = elapsed + hintPenalty;
  const timeLeft = problem.timeLimit - timeWithPenalty;
  const isOverTime = timeLeft < 0;
  const isWarning = timeLeft > 0 && timeLeft <= 15;

  // 配置
  const handleSelectChar = (position: string, charId: string) => {
    const newPlacements = { ...placements };
    for (const p of problem.positions) {
      if (newPlacements[p] === charId) newPlacements[p] = null;
    }
    newPlacements[position] = charId;
    setPlacements(newPlacements);
    setExpandedSlot(null);
  };

  const handleClearSlot = (position: string) => {
    setPlacements({ ...placements, [position]: null });
    setExpandedSlot(null);
  };

  // 答え合わせ
  const handleSubmit = () => {
    setIsRunning(false);
    const finalTime = elapsed + hintPenalty;
    setSolveTime(finalTime);

    if (isCorrect) {
      // スコア記録
      const usedAllHints = revealedHints >= problem.hints.length;
      const noHint = revealedHints <= 2; // 初期表示の2つだけなら ノーヒント扱い
      const newRec = recordSolve({
        problemId: problem.id,
        timeSeconds: finalTime,
        withinTimeLimit: finalTime <= problem.timeLimit,
        noHint: !usedAllHints && noHint,
      });
      setRecord(newRec);
    }
    setShowResult(true);
    setAnimKey((k) => k + 1);
  };

  const handleReset = () => {
    setPlacements(
      Object.fromEntries(problem.positions.map((p) => [p, null]))
    );
    setExpandedSlot(null);
    setShowResult(false);
    setElapsed(0);
    setHintPenalty(0);
    setSolveTime(null);
    setRevealedHints(2);
    startTimeRef.current = Date.now();
    setIsRunning(true);
  };

  // ヒント1つ追加開示（ペナルティ +10秒）
  const handleRevealMoreHint = () => {
    if (revealedHints >= problem.hints.length) return;
    setRevealedHints((r) => r + 1);
    setHintPenalty((p) => p + HINT_PENALTY_SECONDS);
  };

  // シェア
  const handleShare = async () => {
    const text = `🎉 SPIナンプレ「${problem.title}」を ${formatTime(
      solveTime ?? 0
    )} でクリアしました！\n推論力ランク: ${problem.rankEmoji} ${
      problem.rankTitle
    } Lv.${problem.rank}\n\n#SPIナンプレ`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const fullText = `${text}\n${url}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text, url, title: "SPIナンプレ" });
        return;
      } catch {
        // ユーザーキャンセル等 → 通常のTwitterシェアにフォールバック
      }
    }
    // Twitter intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      fullText
    )}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const visibleHints = problem.hints.slice(0, revealedHints);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 text-zinc-900 dark:text-zinc-100 sm:py-10">
      {/* ヘッダー */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <a
          href="/play"
          className="text-zinc-500 underline-offset-2 hover:underline"
        >
          ← 問題一覧
        </a>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
          {problem.rankEmoji} {problem.rankTitle} Lv.{problem.rank}
        </span>
        <span className="text-xs text-zinc-500">問題 {problem.id}</span>
      </div>

      <h1 className="mb-3 text-2xl font-bold sm:text-3xl">{problem.title}</h1>

      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {problem.scenario}
      </p>

      {/* タイマー＆ベストタイム */}
      <div
        className={`mb-6 flex items-center justify-between rounded-2xl border-2 px-4 py-3 transition-colors ${
          isOverTime
            ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40"
            : isWarning
            ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40"
            : "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            残り時間
          </span>
          <span
            className={`font-mono text-2xl font-bold ${
              isOverTime
                ? "text-red-600 dark:text-red-300"
                : isWarning
                ? "animate-pulse-warn text-amber-600 dark:text-amber-300"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {isOverTime ? "−" : ""}
            {formatTime(Math.abs(timeLeft))}
          </span>
        </div>
        <div className="text-right text-xs">
          <div className="text-zinc-500">
            経過 {formatTime(elapsed)} + ヒント {formatTime(hintPenalty)}
          </div>
          {record && (
            <div className="font-semibold text-zinc-700 dark:text-zinc-300">
              ベスト: {formatTime(record.bestTimeSeconds)}
              {record.withinTimeLimit && " ⭐"}
            </div>
          )}
        </div>
      </div>

      {/* 登場人物 */}
      <section className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          登場人物
        </h2>
        <ul className="space-y-2">
          {problem.characters.map((char) => (
            <li key={char.id} className="flex items-start gap-3 text-sm">
              <span className="text-2xl leading-none">{char.emoji}</span>
              <span>
                <strong className="font-semibold">{char.id}</strong>：
                {char.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ヒント（段階的） */}
      <section className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
            💡 ヒント ({revealedHints}/{problem.hints.length})
          </h2>
          {revealedHints < problem.hints.length && (
            <button
              onClick={handleRevealMoreHint}
              className="rounded-full bg-amber-200 px-3 py-1 text-xs font-medium text-amber-900 transition-all hover:bg-amber-300 active:scale-95 dark:bg-amber-800 dark:text-amber-100 dark:hover:bg-amber-700"
            >
              もっと見る (+{HINT_PENALTY_SECONDS}秒)
            </button>
          )}
        </div>
        <ol className="space-y-2 text-sm leading-relaxed">
          {visibleHints.map((hint, i) => (
            <li
              key={i}
              className="flex gap-2 animate-expand-down"
            >
              <span className="shrink-0 font-mono text-amber-700 dark:text-amber-400">
                {i + 1}.
              </span>
              <span>{hint}</span>
            </li>
          ))}
          {revealedHints < problem.hints.length && (
            <li className="flex gap-2 opacity-40">
              <span className="shrink-0 font-mono">
                {revealedHints + 1}.
              </span>
              <span className="italic">＊＊＊＊＊＊＊＊＊（追加で開示できます）</span>
            </li>
          )}
        </ol>
      </section>

      {/* 順位枠 */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          あなたの解答（順位枠をタップ → キャラを選ぶ）
        </h2>
        <div className="space-y-2">
          {problem.positions.map((position, idx) => {
            const isExpanded = expandedSlot === position;
            const placedChar = getChar(placements[position]);
            const medal = MEDALS[idx] ?? "🏅";

            return (
              <div
                key={position}
                className={`overflow-hidden rounded-xl border-2 transition-all ${
                  placedChar
                    ? "border-emerald-400 dark:border-emerald-700"
                    : isExpanded
                    ? "border-blue-400 dark:border-blue-700"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedSlot(isExpanded ? null : position)
                  }
                  className={`flex w-full items-center gap-3 p-4 text-left transition-colors ${
                    placedChar
                      ? "bg-emerald-50 dark:bg-emerald-950/40"
                      : "bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span className="text-2xl">{medal}</span>
                  <span className="font-semibold">{position}</span>
                  {placedChar ? (
                    <span
                      key={placedChar.id}
                      className="ml-auto flex animate-pop-in items-center gap-2"
                    >
                      <span className="text-2xl">{placedChar.emoji}</span>
                      <span className="font-bold">{placedChar.id}</span>
                      <span className="text-xs text-zinc-500">
                        {isExpanded ? "▲" : "変更"}
                      </span>
                    </span>
                  ) : (
                    <span className="ml-auto text-sm font-medium text-blue-600 dark:text-blue-400">
                      {isExpanded ? "▲ 閉じる" : "▼ 選ぶ"}
                    </span>
                  )}
                </button>

                {isExpanded && (
                  <div className="animate-expand-down border-t border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <div className="grid grid-cols-4 gap-2">
                      {problem.characters.map((char) => {
                        const isCurrentlyHere =
                          placements[position] === char.id;
                        const placedElsewhere =
                          placedCharIds.has(char.id) && !isCurrentlyHere;
                        return (
                          <button
                            key={char.id}
                            disabled={placedElsewhere}
                            onClick={() => handleSelectChar(position, char.id)}
                            className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2 transition-all active:scale-95 ${
                              isCurrentlyHere
                                ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-950"
                                : placedElsewhere
                                ? "cursor-not-allowed border-zinc-200 bg-zinc-100 opacity-40 dark:border-zinc-800 dark:bg-zinc-900"
                                : "border-zinc-300 bg-white hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-blue-700 dark:hover:bg-blue-950/40"
                            }`}
                          >
                            <span className="text-3xl">{char.emoji}</span>
                            <span className="text-sm font-bold">{char.id}</span>
                            {placedElsewhere && (
                              <span className="text-[10px] text-zinc-500">
                                配置済
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {placedChar && (
                      <button
                        onClick={() => handleClearSlot(position)}
                        className="mt-2 w-full rounded-lg border border-dashed border-zinc-300 py-2 text-xs text-zinc-500 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      >
                        🗑 この順位をクリア
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
          <span>
            進捗：{Object.values(placements).filter(Boolean).length} /{" "}
            {problem.positions.length}
          </span>
          {allFilled && (
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              ✓ すべて配置完了
            </span>
          )}
        </div>
      </section>

      {/* アクション */}
      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none dark:bg-zinc-950/95 dark:sm:bg-transparent">
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="flex-1 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
        >
          答え合わせ
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          リセット
        </button>
      </div>

      {/* 答え合わせモーダル */}
      {showResult && (
        <div
          key={animKey}
          className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setShowResult(false)}
        >
          {/* 紙吹雪（正解時） */}
          {isCorrect && (
            <>
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="pointer-events-none absolute animate-confetti text-2xl"
                  style={{
                    left: `${(i * 4.3) % 100}%`,
                    animationDelay: `${(i * 0.05) % 1.2}s`,
                  }}
                >
                  {["🎉", "✨", "⭐", "🎊"][i % 4]}
                </span>
              ))}
            </>
          )}

          <div
            className="relative w-full max-w-md animate-slide-up rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 text-center text-3xl font-bold">
              <span className={isCorrect ? "inline-block animate-celebrate" : ""}>
                {isCorrect ? "🎉 正解！" : "🤔 ちょっと違うかも"}
              </span>
            </h2>
            <p className="mb-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {isCorrect
                ? "お見事！すべての順位が正解です。"
                : "惜しい！もう一度ヒントを読み返してみよう。"}
            </p>

            {/* タイム表示 */}
            {isCorrect && solveTime !== null && (
              <div className="mb-5 rounded-xl bg-zinc-50 p-4 text-center dark:bg-zinc-800/60">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  クリアタイム
                </div>
                <div className="font-mono text-3xl font-bold">
                  {formatTime(solveTime)}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {solveTime <= problem.timeLimit
                    ? `⭐ 制限時間 ${problem.timeLimit}秒 以内クリア！`
                    : `制限時間（${problem.timeLimit}秒）オーバー`}
                </div>
                {record && record.bestTimeSeconds === solveTime && (
                  <div className="mt-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    🏆 自己ベスト更新！
                  </div>
                )}
              </div>
            )}

            {isCorrect && (
              <div className="mb-5 space-y-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                <p className="text-xs font-semibold uppercase text-zinc-500">
                  正解
                </p>
                {Object.entries(problem.solution)
                  .sort(
                    (a, b) =>
                      problem.positions.indexOf(a[1]) -
                      problem.positions.indexOf(b[1])
                  )
                  .map(([id, pos]) => {
                    const ch = problem.characters.find((c) => c.id === id);
                    const idx = problem.positions.indexOf(pos);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-8 text-lg">
                          {MEDALS[idx] ?? "🏅"}
                        </span>
                        <span className="font-semibold">{pos}：</span>
                        <span className="text-xl">{ch?.emoji}</span>
                        <span className="font-bold">{id}</span>
                      </div>
                    );
                  })}
                <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    💡 {problem.tips}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {isCorrect && (
                <button
                  onClick={handleShare}
                  className="rounded-full bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-600 active:scale-95"
                >
                  🐦 結果をシェアする
                </button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResult(false)}
                  className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  {isCorrect ? "閉じる" : "もう一度考える"}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {isCorrect ? "もう一度" : "最初からやり直す"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
