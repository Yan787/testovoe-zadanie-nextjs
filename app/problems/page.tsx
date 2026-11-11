import Link from "next/link";
import { problems } from "@/lib/problems";
import { ProblemSearch } from "./problem-search";

export default function ProblemsPage() {
  return (
    <main>
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
