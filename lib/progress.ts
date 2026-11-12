import { getDb } from "./db";

export async function getProgress(userId: string) {
  const { rows: [stats] } = await getDb().query<{
    completed: number;
    total: number;
    problems: { slug: string; title: string; topic: string; difficulty: string }[];
  }>(
    `WITH completed_problems AS (
       SELECT problem.slug, problem.title, problem.topic, problem.difficulty
       FROM problem_progress AS progress
       JOIN problems AS problem ON problem.slug = progress.problem_slug
       WHERE progress.user_id = $1
     )
     SELECT
       count(*)::int AS completed,
       (SELECT count(*)::int FROM problems) AS total,
       COALESCE(
         jsonb_agg(completed_problems ORDER BY title, slug),
         '[]'::jsonb
       ) AS problems
     FROM completed_problems`,
    [userId],
  );
  return stats;
}

export async function completeProblem(userId: string, slug: string) {
  const { rows } = await getDb().query<{ slug: string }>(
    `WITH existing_problem AS (
       SELECT slug FROM problems WHERE slug = $2 FOR KEY SHARE
     ), completion AS (
       INSERT INTO problem_progress (user_id, problem_slug)
       SELECT $1, slug FROM existing_problem
       ON CONFLICT (user_id, problem_slug) DO NOTHING
     )
     SELECT slug FROM existing_problem`,
    [userId, slug],
  );
  return rows.length > 0;
}
