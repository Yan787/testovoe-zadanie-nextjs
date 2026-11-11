import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin-session";
import { getProblem } from "@/lib/problems";
import { AdminSignInForm, ProblemEditForm } from "./forms";

export default async function EditProblemPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdmin())) {
    return (
      <main>
        <h1>Вход для администратора</h1>
        <AdminSignInForm />
      </main>
    );
  }

  const { slug } = await params;
  const problem = await getProblem(slug);
  if (!problem) notFound();

  return (
    <main>
      <Link className="back-link" href={`/problems/${encodeURIComponent(slug)}`}>К карточке</Link>
      <h1>Редактирование вопроса</h1>
      <ProblemEditForm problem={problem} />
    </main>
  );
}
