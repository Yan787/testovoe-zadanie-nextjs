import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblem, listProblemSlugs } from "@/lib/problems";
import { RevealAnswer } from "./reveal-answer";
import { markProblemComplete } from "./actions";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return listProblemSlugs();
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    notFound();
  }

  return (
    <main className="problem-page">
      <Link className="back-link" href="/problems">Все вопросы</Link>
      <article className="problem">
        <p className="problem-meta">{problem.topic} · {problem.difficulty}</p>
        <h1>{problem.title}</h1>
        <p>{problem.question}</p>
        <RevealAnswer answer={problem.answer} />
        <form action={markProblemComplete.bind(null, problem.slug)}>
          <button className="action action-secondary" type="submit">Отметить пройденным</button>
        </form>
      </article>
    </main>
  );
}
