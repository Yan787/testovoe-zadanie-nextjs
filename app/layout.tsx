import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { siteName, siteDescription, siteUrl, openGraphImages } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName,
    title: siteName,
    description: siteDescription,
    images: openGraphImages,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={GeistSans.variable}>
      <body>
        <div className="circuit-background" aria-hidden="true">
          <div className="circuit-frame">
            <span className="circuit-pulse" />
            <span className="circuit-pulse circuit-pulse-second" />
          </div>
        </div>
        <header className="site-header">
          <div className="site-header-inner">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">›_</span>
              Frontend Interview Trainer
            </Link>
            <nav aria-label="Основная навигация">
              <Link href="/">Главная</Link>
              <Link href="/problems">Вопросы</Link>
              <Link href="/dashboard" prefetch={false}>Кабинет</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
