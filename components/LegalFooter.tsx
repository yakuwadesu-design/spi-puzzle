import Link from "next/link";

export function LegalFooter() {
  return (
    <footer className="mx-auto mt-12 max-w-3xl border-t border-zinc-200 px-4 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
      <nav className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/legal/tokushoho"
          className="underline-offset-2 hover:underline"
        >
          特定商取引法に基づく表記
        </Link>
        <span aria-hidden>・</span>
        <Link
          href="/legal/privacy"
          className="underline-offset-2 hover:underline"
        >
          プライバシーポリシー
        </Link>
        <span aria-hidden>・</span>
        <Link
          href="/legal/terms"
          className="underline-offset-2 hover:underline"
        >
          利用規約
        </Link>
      </nav>
      <div className="mt-3 text-zinc-400 dark:text-zinc-600">
        © 2026 SPI ナンプレ
      </div>
    </footer>
  );
}
