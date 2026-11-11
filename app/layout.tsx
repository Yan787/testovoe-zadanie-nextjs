import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Interview Trainer",
  description: "Тренажёр для подготовки к frontend-собеседованиям.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link className="brand" href="/">Frontend Interview Trainer</Link>
            <nav aria-label="Основная навигация">
              <Link href="/">Главная</Link>
              <Link href="/problems">Вопросы</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
