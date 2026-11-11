import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import { ProgressStats } from "./progress-stats";
import { SignOut } from "./sign-out";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main className="problem-page">
      <h1>Личный кабинет</h1>
      <p>{session.user.name}</p>
      <Suspense fallback={<p role="status">Загружаем прогресс…</p>}>
        <ProgressStats userId={session.user.id} />
      </Suspense>
      <div className="form-actions">
        <Link className="action" href="/problems">К вопросам</Link>
        <SignOut />
      </div>
    </main>
  );
}
