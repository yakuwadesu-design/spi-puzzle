import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LegalFooter } from "@/components/LegalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spi-puzzle.vercel.app"),
  title: "SPI ナンプレ - 推論問題をパズル感覚で攻略",
  description:
    "就活・転職で受ける SPI／玉手箱の推論問題を、ナンプレ風UIで遊びながら攻略できるWebアプリ。就活生は無料、中途は業界別パック。広告ゼロ・1日5分の習慣化設計。",
  openGraph: {
    title: "SPI ナンプレ - 推論問題をパズル感覚で攻略",
    description:
      "就活・転職のSPI推論をナンプレ風UIで攻略。就活生は無料、中途は業界別パック。",
    type: "website",
    url: "https://spi-puzzle.vercel.app",
    siteName: "SPI ナンプレ",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPI ナンプレ - 推論問題をパズル感覚で攻略",
    description:
      "就活・転職のSPI推論をナンプレ風UIで攻略。就活生は無料、中途は業界別パック。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <LegalFooter />
      </body>
    </html>
  );
}
