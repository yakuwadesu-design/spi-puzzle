"use client";

import { useState } from "react";
import type { Problem } from "@/data/problems";

type Props = { problem: Problem };

type Placement = Record<string, string | null>; // position → characterId | null

export function PuzzleBoard({ problem }: Props) {
  // 順位枠 → 配置されたキャラID（null=空）
  const [placements, setPlacements] = useState<Placement>(
    Object.fromEntries(problem.positions.map((p) => [p, null]))
  );
  // 現在選択されているキャラのID
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  // 答え合わせモーダル表示
  const [showResult, setShowResult] = useState(false);

  const placedCharIds = new Set(Object.values(placements).filter(Boolean) as string[]);
  const allFilled = Object.values(placements).every((c) => c !== null);

  // 答えが合っているか判定
  const isCorrect = problem.positions.every(
    (pos) =>
      placements[pos] ===
      (Object.entries(problem.solution).find(([, p]) => p === pos)?.[0] ?? null)
  );

  const getChar = (id: string | null) =>
    id ? problem.characters.find((c) => c.id === id) ?? null : null;

  // キャラカードをタップ
  const handleCharClick = (charId: string) => {
    if (placedCharIds.has(charId)) {
      // 配置済 → 枠から戻す
      const slotEntry = Object.entries(placements).find(([, c]) => c === charId);
      if (slotEntry) {
        setPlacements({ ...placements, [slotEntry[0]]: null });
      }
      setSelectedChar(null);
    } else {
      // 未配置 → 選択/選択解除
      setSelectedChar(selectedChar === charId ? null : charId);
    }
  };

  // 順位枠をタップ
  const handleSlotClick = (position: string) => {
    if (selectedChar) {
      // 選択中のキャラを配置（既存があれば置換）
      const newPlacements = { ...placements };
      // 選択中のキャラが他の枠にあれば、そこから外す
      for (const pos of problem.positions) {
        if (newPlacements[pos] === selectedChar) {
          newPlacements[pos] = null;
        }
      }
      newPlacements[position] = selectedChar;
      setPlacements(newPlacements);
      setSelectedChar(null);
    } else if (placements[position]) {
      // キャラ未選択で、枠にキャラがあれば外す
      setPlacements({ ...placements, [position]: null });
    }
  };

  const handleSubmit = () => setShowResult(true);

  const handleReset = () => {
    setPlacements(
      Object.fromEntries(problem.positions.map((p) => [p, null]))
    );
    setSelectedChar(null);
    setShowResult(false);
  };

  const medals = ["🥇", "🥈", "🥉", "🏅", "🎖️"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 text-zinc-900 dark:text-zinc-100 sm:py-10">
      {/* ヘッダー */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <a
          href="/"
          className="text-zinc-500 underline-offset-2 hover:underline"
        >
          ← TOP
        </a>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
          {problem.rankEmoji} {problem.rankTitle} Lv.{problem.rank}
        </span>
        <span className="text-xs text-zinc-500">問題 {problem.id}</span>
      </div>

      {/* タイトル */}
      <h1 className="mb-3 text-2xl font-bold sm:text-3xl">{problem.title}</h1>

      {/* シナリオ */}
      <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {problem.scenario}
      </p>

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

      {/* ヒント */}
      <section className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
          💡 ヒント
        </h2>
        <ol className="space-y-2 text-sm leading-relaxed">
          {problem.hints.map((hint, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 font-mono text-amber-700 dark:text-amber-400">
                {i + 1}.
              </span>
              <span>{hint}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 順位枠 */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          あなたの解答
        </h2>
        <div className="space-y-3">
          {problem.positions.map((position, idx) => {
            const charId = placements[position];
            const char = getChar(charId);
            const medal = medals[idx] ?? "🏅";
            return (
              <button
                key={position}
                onClick={() => handleSlotClick(position)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  char
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                    : selectedChar
                    ? "border-dashed border-emerald-400 bg-emerald-50/50 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/20"
                    : "border-dashed border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
                }`}
              >
                <span className="text-2xl">{medal}</span>
                <span className="font-semibold">{position}</span>
                {char ? (
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-2xl">{char.emoji}</span>
                    <span className="text-base font-bold">{char.id}</span>
                  </span>
                ) : (
                  <span className="ml-auto text-sm text-zinc-400">
                    {selectedChar ? "タップで配置" : "未配置"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* キャラカード */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          営業マンカード（タップして選択 → 順位枠をタップで配置）
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {problem.characters.map((char) => {
            const isPlaced = placedCharIds.has(char.id);
            const isSelected = selectedChar === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleCharClick(char.id)}
                className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300 dark:border-blue-400 dark:bg-blue-950/40"
                    : isPlaced
                    ? "border-zinc-300 bg-zinc-100 opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                    : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
                }`}
              >
                <span className="text-3xl">{char.emoji}</span>
                <span className="text-sm font-semibold">{char.id}</span>
                <span className="text-[10px] text-zinc-500">
                  {isSelected ? "選択中" : isPlaced ? "配置済" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* アクションボタン */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="flex-1 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
        >
          答え合わせ
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          リセット
        </button>
      </div>

      {/* 答え合わせモーダル */}
      {showResult && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setShowResult(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 text-center text-3xl font-bold">
              {isCorrect ? "🎉 正解！" : "🤔 ちょっと違うかも"}
            </h2>
            <p className="mb-5 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {isCorrect
                ? "お見事！すべての順位が正解です。"
                : "惜しい！もう一度ヒントを読み返してみよう。"}
            </p>

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
                          {medals[idx] ?? "🏅"}
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

            <div className="flex gap-2">
              <button
                onClick={() => setShowResult(false)}
                className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {isCorrect ? "閉じる" : "もう一度考える"}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isCorrect ? "もう一度" : "最初からやり直す"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
