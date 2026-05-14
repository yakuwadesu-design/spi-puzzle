import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPI ナンプレ - 推論問題をパズル感覚で攻略",
  description: "転職活動者のための、SPI／玉手箱の推論問題をナンプレ風UIで遊びながら攻略できるWebアプリ。広告ゼロ、1日5分の習慣化設計。",
  openGraph: {
    title: "SPI ナンプレ - 推論問題をパズル感覚で攻略",
    description: "転職活動者のための、SPI推論をナンプレ風UIで攻略するWebアプリ。",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
