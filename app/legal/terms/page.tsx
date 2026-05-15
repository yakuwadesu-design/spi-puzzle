import Link from "next/link";

export const metadata = {
  title: "利用規約 - SPI ナンプレ",
  description: "SPI ナンプレの利用規約。",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 underline-offset-2 hover:underline"
      >
        ← TOP
      </Link>

      <h1 className="mb-3 text-3xl font-bold">利用規約</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        「SPI ナンプレ」（以下「本サービス」）の利用にあたって、以下の利用規約に同意いただいたものとみなします。
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第1条 適用範囲
          </h2>
          <p>
            本規約は、ユーザーと本サービス運営者（以下「当方」）との間の本サービスの利用に関する一切の関係に適用されます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第2条 利用登録
          </h2>
          <p>
            本サービスの基本機能は登録不要でご利用いただけます。
            一部機能（業界別パックの購入等）は有償でご利用いただけます。利用にあたっては、本規約に同意した上で、所定の手続きを行ってください。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第3条 禁止事項
          </h2>
          <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>当方、他のユーザー、第三者の権利を侵害する行為</li>
            <li>
              本サービスの内容（問題、解答、解説等）を無断で複製・公開・販売する行為
            </li>
            <li>リバースエンジニアリング、デコンパイル等の行為</li>
            <li>本サービスの運営を妨げる行為</li>
            <li>
              本サービスを通じて、他者を誹謗中傷、または差別する内容を発信する行為
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第4条 知的財産権
          </h2>
          <p>
            本サービスのコンテンツ（問題、解答、UI、テキスト、デザイン等）に関する知的財産権はすべて当方に帰属します。無断での複製、転載、二次利用を禁止します。
          </p>
          <p className="mt-2">
            ただし、本サービスの利用結果（スコア、ランク等）を個人の SNS でシェアする行為は推奨いたします。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第5条 免責事項
          </h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              本サービスの内容は、SPI／玉手箱試験の合格を保証するものではありません
            </li>
            <li>
              本サービスの利用により生じたいかなる損害についても、当方は責任を負いません
            </li>
            <li>本サービスの内容は予告なく変更・追加・削除する場合があります</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第6条 サービスの停止
          </h2>
          <p>
            当方は、メンテナンス、システム障害、不可抗力等により、本サービスを停止する場合があります。これによりユーザーまたは第三者に生じた損害について、当方は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第7条 規約の変更
          </h2>
          <p>
            当方は、必要と判断した場合、ユーザーへの事前通知なく本規約を変更することができます。変更後の規約は、本サービス上に掲示した時点から効力を生じます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            第8条 準拠法・管轄裁判所
          </h2>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合は、当方の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>
      </div>

      <p className="mt-8 text-xs text-zinc-500">
        最終更新日：2026年5月15日
      </p>
    </div>
  );
}
