import Link from "next/link";
import { notFound } from "next/navigation";
import { problems } from "@/lib/problems";
import { RevealAnswer } from "./reveal-answer";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = problems.find((item) => item.slug === slug);

  if (!problem) {
    notFound();
  }

  return (
    <main>
      <Link className="back-link" href="/problems">Все вопросы</Link>
      <article className="problem">
        <p className="problem-meta">{problem.topic} · {problem.difficulty}</p>
        <h1>{problem.title}</h1>
        <p>{problem.question}</p>
        <RevealAnswer answer={problem.answer} />
      </article>
    </main>
  );
}
