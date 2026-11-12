import Link from "next/link";
import { getProgress } from "@/lib/progress";
import { isAdmin } from "@/lib/admin-session";

export async function ProgressStats({ userId }: { userId: string }) {
  const [{ completed, total, problems }, admin] = await Promise.all([
    getProgress(userId),
    isAdmin(),
  ]);
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="completed-problems" aria-labelledby="completed-title">
      <div className="progress-summary">
        <p className="progress-count" id="progress-label">
          Пройдено {completed} из {total} вопросов
        </p>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <progress className="progress-bar" aria-labelledby="progress-label"
        value={completed} max={total || 1}>
        {percentage}%
      </progress>
      <h2 id="completed-title">Пройденные вопросы</h2>
      {problems.length === 0 ? (
        <p>Вы пока не отметили ни одного вопроса пройденным.</p>
      ) : (
        <ul className="problem-list">
          {problems.map(({ slug, title, topic, difficulty }) => (
            <li key={slug} className={admin ? "completed-row" : undefined}>
              <Link className="problem-link" href={`/problems/${encodeURIComponent(slug)}`}>
                <strong>{title}</strong>
                <span>{topic} · {difficulty}</span>
              </Link>
              {admin && (
                <Link className="edit-problem-link"
                  href={`/admin/problems/${encodeURIComponent(slug)}/edit`}
                  aria-label={`Редактировать вопрос «${title}»`}>
                  Редактировать
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
