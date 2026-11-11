import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <main className="problem-page">
      <h1>Вход в тренажёр</h1>
      <LoginForm />
    </main>
  );
}
