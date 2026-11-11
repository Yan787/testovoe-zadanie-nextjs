import { getDb } from "./db";

export async function getProgress(userId: string) {
  const { rows: [stats] } = await getDb().query<{ completed: number; total: number }>(
    `SELECT
       (SELECT count(*)::int FROM problem_progress WHERE user_id = $1) AS completed,
       (SELECT count(*)::int FROM problems) AS total`,
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
