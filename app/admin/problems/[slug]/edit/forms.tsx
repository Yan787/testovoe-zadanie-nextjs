"use client";

import { useActionState, useState } from "react";
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
      <button type="submit" className="action" disabled={pending}>
        {pending ? "Входим…" : "Войти"}
      </button>
    </form>
  );
}

type EditableProblem = { slug: string; title: string; question: string; answer: string };

export function ProblemEditForm({ problem }: { problem: EditableProblem }) {
  const [error, action, pending] = useActionState(updateProblem.bind(null, problem.slug), "");
  const [values, setValues] = useState(problem);

  return (
    <form action={action} className="problem-edit-form" aria-busy={pending}>
      <label>
        Заголовок
        <input name="title" value={values.title} readOnly={pending}
          onChange={(event) => setValues({ ...values, title: event.target.value })}
          maxLength={200} required />
      </label>
      <label>
        Вопрос
        <textarea name="question" value={values.question} readOnly={pending}
          onChange={(event) => setValues({ ...values, question: event.target.value })}
          rows={4} maxLength={10000} required />
      </label>
      <label>
        Ответ
        <textarea name="answer" value={values.answer} readOnly={pending}
          onChange={(event) => setValues({ ...values, answer: event.target.value })}
          rows={8} maxLength={10000} required />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="action" disabled={pending}>
        {pending ? "Сохраняем…" : "Сохранить"}
      </button>
    </form>
  );
}
