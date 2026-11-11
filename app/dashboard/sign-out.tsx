"use client";

import { useActionState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignOut() {
  const [error, submit, pending] = useActionState(async () => {
    try {
      const result = await authClient.signOut();
      if (result.error) return true;
      window.location.assign("/login");
      return false;
    } catch {
      return true;
    }
  }, false);

  return (
    <form action={submit}>
      <button className="action action-secondary" type="submit" disabled={pending}>Выйти</button>
      {error && <p role="alert">Не удалось выйти. Попробуйте снова.</p>}
    </form>
  );
}
