import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Interview Trainer",
  description: "Тренажёр для подготовки к frontend-собеседованиям.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={GeistSans.variable}>
      <body>
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
