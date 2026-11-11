import Link from "next/link";
import { listProblems } from "@/lib/problems";
import { ProblemSearch } from "./problem-search";

export const dynamic = "force-dynamic";

export default async function ProblemsPage() {
  const problems = await listProblems();

  return (
    <main className="catalog">
      <h1>Вопросы</h1>
      <ProblemSearch />
      <ul className="problem-list">
        {problems.map(({ slug, title, topic, difficulty }) => (
          <li key={slug}>
            <Link className="problem-link" href={`/problems/${slug}`}>
              <strong>{title}</strong>
              <span>{topic} · {difficulty}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
