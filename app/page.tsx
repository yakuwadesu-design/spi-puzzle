export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-zinc-50 to-zinc-100 font-sans dark:from-zinc-950 dark:to-black">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-16 text-center sm:py-24">
        {/* バッジ */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          現役の人材エージェントが作った SPI 対策アプリ
        </div>

        {/* メインコピー */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            SPI を、<br />
            <span className="text-emerald-600 dark:text-emerald-400">
              パズルで攻略する。
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            就活・転職で受ける SPI／玉手箱の
            <strong className="text-zinc-900 dark:text-zinc-100">
              推論問題
            </strong>
            を、
            <br className="hidden sm:block" />
            ナンプレ風のロジパズUIで遊びながら攻略する Web アプリ。
          </p>
        </div>

        {/* メインCTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="/play"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            🔰 1問やってみる（無料）
            <span aria-hidden>→</span>
          </a>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            登録不要 ・ 約3分で1問解けます
          </p>
        </div>

        {/* 統計 */}
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">
              13問
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              初級〜超上級
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">
              7段階
            </div>
            <div className="mt-1 text-xs text-zinc-500">推論力ランク</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">
              0円
            </div>
            <div className="mt-1 text-xs text-zinc-500">広告ゼロ</div>
          </div>
        </div>

        {/* 特徴3つ */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🧩</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ナンプレ感覚
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              論理を埋めるパズル UI で、暗記しないで身につく
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🎓</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              就活生は無料
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              基本機能すべて無料・広告なし。1日5分の習慣化設計
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">💼</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              中途は業界別パック
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              IT営業／人材／経理など、現役人事監修の問題集
            </p>
          </div>
        </div>

        {/* ランク制度のプレビュー */}
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            7段階の推論力ランク
          </h2>
          <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-400">
            各ランクの問題をクリアすると次が解放。あなたの推論力を「営業キャリアの階段」で可視化。
          </p>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {[
              { e: "🔰", t: "内定者" },
              { e: "🌱", t: "新人" },
              { e: "👔", t: "若手" },
              { e: "🚀", t: "エース" },
              { e: "🎩", t: "課長" },
              { e: "🏆", t: "部長" },
              { e: "💎", t: "役員" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 sm:p-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <span className="text-xl sm:text-3xl">{r.e}</span>
                <span className="text-[10px] sm:text-xs">{r.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 製作者の物語 */}
        <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-left dark:border-amber-900/50 dark:bg-amber-950/30">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
            💡 このアプリの背景
          </h2>
          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-100">
            人材紹介・人事の現場で、SPIで落ちる人を毎月見送ってきました。
            「中途でも SPI が出るとは思わなかった」「対策が必要だと気づかなかった」──そんな声が後を絶ちません。
            <br />
            <br />
            既存のSPI対策アプリは「4択問題集」が中心で、続けにくい。
            <strong>
              ナンプレ感覚で楽しく続けられて、業界別の現場感を反映した問題
            </strong>
            を目指して作りました。
          </p>
        </div>

        {/* セカンダリCTA */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="/play"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            問題一覧を見る
          </a>
        </div>
      </main>
    </div>
  );
}
