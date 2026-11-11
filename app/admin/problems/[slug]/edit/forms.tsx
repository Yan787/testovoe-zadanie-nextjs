"use client";

import { useActionState } from "react";
import { signInAdmin, updateProblem } from "./actions";

export function AdminSignInForm() {
  const [error, action, pending] = useActionState(signInAdmin, "");

  return (
    <form action={action} className="problem-edit-form">
      <label>
        Пароль администратора
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="action" disabled={pending}>Войти</button>
    </form>
  );
}

type EditableProblem = { slug: string; title: string; question: string; answer: string };

export function ProblemEditForm({ problem }: { problem: EditableProblem }) {
  const [error, action, pending] = useActionState(updateProblem.bind(null, problem.slug), "");

  return (
    <form action={action} className="problem-edit-form">
      <label>
        Заголовок
        <input name="title" defaultValue={problem.title} maxLength={200} required />
      </label>
      <label>
        Вопрос
        <textarea name="question" defaultValue={problem.question} rows={4} maxLength={10000} required />
      </label>
      <label>
        Ответ
        <textarea name="answer" defaultValue={problem.answer} rows={8} maxLength={10000} required />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="action" disabled={pending}>
        {pending ? "Сохраняем…" : "Сохранить"}
      </button>
    </form>
  );
}
