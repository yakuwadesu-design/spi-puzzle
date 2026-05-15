import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表記 - SPI ナンプレ",
  description: "SPI ナンプレの特定商取引法に基づく表記。",
};

export default function TokushohoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 underline-offset-2 hover:underline"
      >
        ← TOP
      </Link>

      <h1 className="mb-3 text-3xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        ※ 現在は無料公開のみ。有料機能の販売開始時には販売事業者情報を本人確認の上で正式表記します。
      </p>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <tbody>
            {[
              ["販売事業者", "（販売開始時に表記）"],
              ["運営責任者", "（販売開始時に表記）"],
              [
                "所在地",
                "請求があった場合に遅滞なく開示します（個人事業主のため非公開）",
              ],
              [
                "電話番号",
                "請求があった場合に遅滞なく開示します",
              ],
              [
                "メールアドレス",
                "（販売開始時に表記）",
              ],
              [
                "販売価格",
                "各商品ページに表示（税込）",
              ],
              [
                "商品代金以外の必要料金",
                "なし",
              ],
              [
                "支払方法",
                "クレジットカード（Stripe 経由）",
              ],
              [
                "支払時期",
                "商品購入時にお支払いいただきます",
              ],
              [
                "商品の引き渡し時期",
                "決済完了後、即時にアプリ内で機能解放。即時反映されない場合は再読み込みをお試しください",
              ],
              [
                "返品・キャンセル",
                "デジタルコンテンツの性質上、購入後の返品・返金は原則お受けできません。決済システム不具合等の当方都合による不備があった場合は、購入から30日以内にお申し出いただければ全額返金いたします",
              ],
              [
                "動作環境",
                "iOS Safari 16以上 / Android Chrome 最新版 / PC（Chrome・Firefox・Safari・Edge の最新版）/ インターネット接続必須",
              ],
            ].map(([k, v], i) => (
              <tr
                key={i}
                className={
                  i % 2 === 0
                    ? "bg-zinc-50 dark:bg-zinc-900/60"
                    : ""
                }
              >
                <th className="w-1/3 border-b border-zinc-200 px-4 py-3 text-left align-top font-semibold dark:border-zinc-800">
                  {k}
                </th>
                <td className="border-b border-zinc-200 px-4 py-3 align-top dark:border-zinc-800">
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-xs text-zinc-500">
        最終更新日：2026年5月15日
      </p>
    </div>
  );
}
