import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー - SPI ナンプレ",
  description: "SPI ナンプレのプライバシーポリシー。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 underline-offset-2 hover:underline"
      >
        ← TOP
      </Link>

      <h1 className="mb-3 text-3xl font-bold">プライバシーポリシー</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        「SPI ナンプレ」（以下「本サービス」）は、ユーザーの個人情報を以下の方針で取り扱います。
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            1. 取得する情報
          </h2>
          <h3 className="mb-2 font-semibold">1-1. ユーザーが直接提供する情報</h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>メールアドレス（リリース通知・購入時の連絡用、任意）</li>
            <li>
              支払情報（クレジットカード情報は Stripe 社が処理し、当方では保持しません）
            </li>
          </ul>
          <h3 className="mt-4 mb-2 font-semibold">1-2. 自動的に取得する情報</h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              アクセス情報（ページ訪問数、滞在時間、利用ブラウザ、デバイス）
            </li>
            <li>Cookie（セッション管理、ユーザー体験向上のため）</li>
            <li>
              LocalStorage（プレイ記録は端末内のみで管理。当方サーバーには送信しません）
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            2. 利用目的
          </h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>本サービスの提供・運営・改善</li>
            <li>購入手続きの実行と確認</li>
            <li>ユーザーからのお問い合わせへの対応</li>
            <li>リリース通知・重要なお知らせの送信</li>
            <li>アクセス解析による改善（個人を特定しない統計情報のみ）</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            3. 第三者提供
          </h2>
          <p>以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>法令に基づく開示請求があった場合</li>
            <li>ユーザー本人の同意を得た場合</li>
            <li>業務委託先（決済代行：Stripe Inc.）への必要範囲での提供</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            4. 外部サービスの利用
          </h2>
          <p>本サービスでは以下の外部サービスを利用しています。</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>Vercel Inc.</strong>：ホスティング・アクセス解析（
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline text-blue-600 dark:text-blue-400"
              >
                プライバシーポリシー
              </a>
              ）
            </li>
            <li>
              <strong>Stripe Inc.</strong>：決済処理（
              <a
                href="https://stripe.com/jp/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline text-blue-600 dark:text-blue-400"
              >
                プライバシーポリシー
              </a>
              ）
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            5. Cookie の利用
          </h2>
          <p>
            本サービスは以下の目的で Cookie を利用します：セッション管理、アクセス解析（個人を特定しない統計情報）。
          </p>
          <p className="mt-2">
            Cookie の利用を希望しない場合、ブラウザの設定で無効化することができます。ただし、一部機能が利用できなくなる可能性があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            6. LocalStorage の利用
          </h2>
          <p>
            本サービスでは、以下の情報を端末内の LocalStorage に保存します：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>プレイ記録（クリアした問題、ベストタイム、ヒント使用数等）</li>
            <li>ランク解放状態</li>
            <li>ユーザー設定</li>
          </ul>
          <p className="mt-2">
            これらの情報は <strong>端末内にのみ保存され、当方サーバーには送信されません</strong>。ブラウザの設定で LocalStorage を削除すると、プレイ記録は失われます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            7. 個人情報の開示・訂正・削除
          </h2>
          <p>
            ユーザー本人からの個人情報の開示・訂正・削除のご請求があった場合、本人確認の上、合理的な期間内に対応します。お問い合わせ窓口にご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            8. お問い合わせ
          </h2>
          <p>
            本ポリシーに関するお問い合わせは、販売開始時に表記する連絡先までお願いします。原則として5営業日以内に返信します。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            9. ポリシーの変更
          </h2>
          <p>
            本ポリシーの内容は、必要に応じて変更することがあります。変更後のポリシーは本ページにて公開し、変更日を明記します。
          </p>
        </section>
      </div>

      <p className="mt-8 text-xs text-zinc-500">
        最終更新日：2026年5月15日
      </p>
    </div>
  );
}
