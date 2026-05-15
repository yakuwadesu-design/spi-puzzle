// 問題データの型定義と Lv.1 問題（内定者ランク・3問）

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
  scenario: string;
  characters: Character[];
  hints: string[];
  positions: string[];
  solution: Record<string, string>;
  estimatedSeconds: number; // ゆっくり解いた目安時間（参考表示）
  timeLimit: number; // 制限時間（SPI想定、タイマー用）
  tips: string;
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
  timeLimit: 90,
  tips: "ヒント③「俺より下に1人いる」を消去法で読み解けるかが SPI推論の核心。「A・B はすでに C より上 → 残る D が C より下」と推論する流れがポイント。",
};

// =============================
// 問題 1-2：新人研修の総合評価
// =============================
export const problem_1_2: Problem = {
  id: "1-2",
  rank: 1,
  rankTitle: "内定者",
  rankEmoji: "🔰",
  title: "新人研修の総合評価",
  scenario:
    "ある会社の新人研修（3ヶ月）が終わり、最終評価で4人の新入社員に順位が付いた。表彰式で1位から順に名前が呼ばれる。次のヒントから各人の順位を推理せよ。",
  characters: [
    { id: "A", emoji: "📝", description: "学業優秀、ロジカル思考派、ノート魔" },
    { id: "B", emoji: "🌟", description: "コミュ力高め、人当たり◎のエース候補" },
    { id: "C", emoji: "🏃", description: "体育会系、明るく行動力◎" },
    { id: "D", emoji: "🎨", description: "クリエイティブで型破り、独自路線" },
  ],
  hints: [
    "A の評価は C より低かった。",
    "B は A を上回った。",
    "D は B より高評価だった。",
    "C は表彰式で2番目に呼ばれた。",
  ],
  positions: ["1位", "2位", "3位", "4位"],
  solution: { D: "1位", C: "2位", B: "3位", A: "4位" },
  estimatedSeconds: 120,
  timeLimit: 90,
  tips: "ヒント④で C=2位 を直接確定し、ヒント②③ で D > B > A の順序を導く。SPI推論は「確定できる部分から埋める」のが定石。",
};

// =============================
// 問題 1-3：最終面接の珍事件簿
// =============================
export const problem_1_3: Problem = {
  id: "1-3",
  rank: 1,
  rankTitle: "内定者",
  rankEmoji: "🔰",
  title: "最終面接の珍事件簿",
  scenario:
    "ある会社の最終面接日。4人の応募者がそれぞれ強烈な個性を発揮し、面接官は頭を抱えながら順位を決めた。1位だけが内定をもらう。あとの3人は…合掌。次のヒントから順位を推理せよ。",
  characters: [
    { id: "A", emoji: "🤓", description: "緊張で「お腹空きました」と口走った天然キャラ" },
    { id: "B", emoji: "💪", description: "握手で面接官の手を握り潰しかけた怪力キャラ" },
    { id: "C", emoji: "🦥", description: "返答まで平均8秒、考え込み派の哲学キャラ" },
    { id: "D", emoji: "🎤", description: "自己PRで突如歌い出したシンガー志望" },
  ],
  hints: [
    "慎重派 C は、考え込みすぎる悪癖がありながらも、天然 A の「お腹空きました」事件を最終的には上回った。",
    "D の歌唱力をもってしても、B の握力には及ばなかった。",
    "考え込み派 C も、結局トップ（内定）には届かなかった。",
    "A は、最下位の屈辱だけは免れた。",
  ],
  positions: ["1位", "2位", "3位", "4位"],
  solution: { B: "1位", C: "2位", A: "3位", D: "4位" },
  estimatedSeconds: 150,
  timeLimit: 90,
  tips: "ヒント①と③のコンビが鍵：『C > A』＋『C ≠ 1位』から C=2位、A=3位 が確定する。「等価な制約を3つ4つ組み合わせて徐々に範囲を狭める」が SPI推論の定石。",
};

// =============================
// 問題 2-1：5人の営業マンの売上ランキング（Lv.2 新人）
// =============================
export const problem_2_1: Problem = {
  id: "2-1",
  rank: 2,
  rankTitle: "新人",
  rankEmoji: "🌱",
  title: "5人の営業マン、月末の数字くらべ",
  scenario:
    "ある営業所の月末。5人の営業マンが今月の数字を見比べている。コーヒー片手に、誰かがつぶやいた──「ヤバい、また○○に抜かれた」。次のヒントから5人の順位（1位〜5位）を推理せよ。",
  characters: [
    { id: "A", emoji: "👔", description: "中堅5年目、いつも安定の中位狙い" },
    {
      id: "B",
      emoji: "🎯",
      description: "失速気味、今月も後輩に追い抜かれたかも",
    },
    { id: "C", emoji: "🥇", description: "トップ争いの常連、安定して上位" },
    {
      id: "D",
      emoji: "🚀",
      description: "急成長中のエース、今月は宣言通りトップを狙う",
    },
    { id: "E", emoji: "💼", description: "バランス型、波のないコンスタント" },
  ],
  hints: [
    "A の売上を上回ったのは、ちょうど2人だけだった。",
    "E と C の順位は、ちょうど2位離れていた。",
    "後輩 D は、先輩 B との直接対決でついに勝った。",
    "E はバランス型らしく、B よりは確実に上の数字を残した。",
    "C が4位という結末は、コーヒーが冷めるくらい予想外だっただろう。",
  ],
  positions: ["1位", "2位", "3位", "4位", "5位"],
  solution: { D: "1位", C: "2位", A: "3位", E: "4位", B: "5位" },
  estimatedSeconds: 240,
  timeLimit: 75,
  tips: "ヒント①「Aを上回ったのが2人だけ」から A=3位 を直接確定するのが鍵。残りは |E-C|=2、D>B、E>B、C≠4 で場合分けすると一意解に。5人になっても「確定情報から固める」のは同じ。",
};

// 全問題リスト（順序が表示順）
export const problems: Problem[] = [
  problem_1_1,
  problem_1_2,
  problem_1_3,
  problem_2_1,
];

// ID で取得
export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}
