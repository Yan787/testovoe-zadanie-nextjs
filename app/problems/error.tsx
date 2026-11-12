"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function ProblemsError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <main className="catalog">
      <h1>Не удалось загрузить вопросы</h1>
      <p role="alert">Возникла ошибка при загрузке. Попробуйте ещё раз.</p>
      <div className="form-actions">
        <button className="action" type="button" disabled={pending}
          onClick={() => startTransition(() => retry())}>
          {pending ? "Повторяем…" : "Попробовать снова"}
        </button>
        <Link className="action action-secondary" href="/">На главную</Link>
      </div>
    </main>
  );
}
