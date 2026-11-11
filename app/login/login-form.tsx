"use client";

import { useActionState, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const [registering, setRegistering] = useState(false);
  const [error, submit, pending] = useActionState(async (_previous: boolean, formData: FormData) => {
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));

    try {
      const result = registering
        ? await authClient.signUp.email({ name: String(formData.get("name")).trim(), email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) return true;
      window.location.assign("/dashboard");
      return false;
    } catch {
      return true;
    }
  }, false);

  return (
    <form action={submit} className="problem-edit-form">
      {registering && (
        <label>
          Имя
          <input name="name" autoComplete="name" maxLength={100} required />
        </label>
      )}
      <label>
        Электронная почта
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Пароль
        <input
          name="password"
          type="password"
          autoComplete={registering ? "new-password" : "current-password"}
          minLength={8}
          maxLength={128}
          required
        />
      </label>
      {error && <p role="alert">Не удалось продолжить. Проверьте данные и попробуйте снова.</p>}
      <div className="form-actions">
        <button className="action" type="submit" disabled={pending}>
          {registering ? "Создать аккаунт" : "Войти"}
        </button>
        <button className="action action-secondary" type="button" disabled={pending}
          onClick={() => setRegistering((value) => !value)}>
          {registering ? "Уже есть аккаунт" : "Регистрация"}
        </button>
      </div>
    </form>
  );
}
