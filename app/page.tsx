export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 font-sans dark:from-zinc-950 dark:to-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-12 px-6 py-24 text-center">
        {/* バッジ */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          開発中・近日リリース
        </div>

        {/* メインコピー */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            SPI を、パズルで攻略する。
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            転職・就活で受ける SPI／玉手箱の<strong className="text-zinc-900 dark:text-zinc-100">推論問題</strong>を、
            <br className="hidden sm:block" />
            ナンプレ風のロジパズUIで遊びながら攻略する Web アプリ。
          </p>
        </div>

        {/* 特徴3つ */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🧩</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ナンプレ感覚
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              論理を埋めるパズル UI で中毒性のある攻略体験
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🎯</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              業界別パック
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              IT営業／人材業界／経理など、職種別の問題シリーズを展開予定
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">⏱️</div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              1日5分の習慣
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              通勤・スキマ時間で続く設計。広告ゼロでサクサク
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            リリース通知を受け取る
            <span aria-hidden>→</span>
          </a>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            ※ プロトタイプ準備中。フォーム実装は近日中
          </p>
        </div>

        {/* フッター */}
        <footer className="mt-16 text-xs text-zinc-400 dark:text-zinc-600">
          © 2026 SPI ナンプレ · Built with Next.js & Vercel
        </footer>
      </main>
    </div>
  );
}
