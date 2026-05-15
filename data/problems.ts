// 問題データの型定義と Lv.1 問題1-1（営業マン月次売上ランキング）

export type Character = {
  id: string;
  emoji: string;
  description: string;
};

export type Problem = {
  id: string;
  rank: number;
  rankTitle: string;
  rankEmoji: string;
  title: string;
  scenario: string; // 問題文（物語の導入）
  characters: Character[];
  hints: string[];
  positions: string[]; // ["1位", "2位", "3位", "4位"]
  solution: Record<string, string>; // { "B": "1位", "A": "2位", ... }
  estimatedSeconds: number; // 想定解答時間
  tips: string; // 正解後に表示する解説
};

// =============================
// 問題 1-1：営業マン月次売上ランキング
// =============================
export const problem_1_1: Problem = {
  id: "1-1",
  rank: 1,
  rankTitle: "内定者",
  rankEmoji: "🔰",
  title: "営業マン月次売上ランキング",
  scenario:
    "ある営業所に4人の営業マンが在籍している。今月の売上で、4人の順位（1位〜4位）が決まった。次のヒントから各人の順位を推理せよ。",
  characters: [
    { id: "A", emoji: "👔", description: "中堅3年目、安定したリピート受注に強い" },
    { id: "B", emoji: "🚀", description: "若手2年目、新規開拓で急成長中のエース" },
    { id: "C", emoji: "🎩", description: "ベテラン8年目、大口案件を狙う" },
    { id: "D", emoji: "🔰", description: "新人1年目、まだ手探り" },
  ],
  hints: [
    "B は今月、ついに A の背中を初めて越えた。",
    "C のベテラン経験をもってしても、A のリピート受注の合計には届かなかった。",
    "「俺より下に、まだ1人いるよな」と、C は朝礼で苦笑いした。",
    "新人 D に、いきなりトップの座は早すぎた。",
  ],
  positions: ["1位", "2位", "3位", "4位"],
  solution: { B: "1位", A: "2位", C: "3位", D: "4位" },
  estimatedSeconds: 180,
  tips: "ヒント③「俺より下に1人いる」を消去法で読み解けるかが SPI推論の核心。「A・B はすでに C より上 → 残る D が C より下」と推論する流れがポイント。",
};

// 将来の追加問題用
export const problems: Problem[] = [problem_1_1];
