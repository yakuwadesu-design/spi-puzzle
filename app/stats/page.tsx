import Link from "next/link";
import { StatsDashboard } from "@/components/StatsDashboard";

export const metadata = {
  title: "あなたの統計 - SPI ナンプレ",
  description: "SPI ナンプレでのプレイ統計（解いた問題数、ベストタイム、バッジ獲得状況）",
};

export default function StatsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/play"
          className="text-zinc-500 underline-offset-2 hover:underline"
        >
          ← 問題一覧
        </Link>
      </div>

      <h1 className="mb-2 text-3xl font-bold sm:text-4xl">📊 あなたの統計</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        これまでのプレイ実績です。データはお使いの端末内（LocalStorage）にのみ保存されています。
      </p>

      <StatsDashboard />
    </div>
  );
}
