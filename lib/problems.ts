import { getDb } from "./db";

type ProblemSummary = {
  slug: string;
  title: string;
  topic: string;
  difficulty: string;
};

type Problem = ProblemSummary & {
  question: string;
  answer: string;
};

export async function listProblemSlugs() {
  const { rows } = await getDb().query<{ slug: string }>(
    "SELECT slug FROM problems ORDER BY slug",
  );
  return rows;
}

export async function listProblems() {
  const { rows } = await getDb().query<ProblemSummary>(
    "SELECT slug, title, topic, difficulty FROM problems ORDER BY slug",
  );
  return rows;
}

export async function getProblem(slug: string) {
  const { rows } = await getDb().query<Problem>(
    "SELECT slug, title, topic, difficulty, question, answer FROM problems WHERE slug = $1",
    [slug],
  );
  return rows[0];
}

export async function searchProblems(query: string) {
  const { rows } = await getDb().query<Pick<Problem, "slug" | "title">>(
    "SELECT slug, title FROM problems WHERE strpos(lower(title), lower($1)) > 0 ORDER BY slug LIMIT 5",
    [query],
  );
  return rows;
}

export async function updateProblemRecord(
  slug: string,
  { title, question, answer }: Pick<Problem, "title" | "question" | "answer">,
) {
  const { rows } = await getDb().query<{ title_changed: boolean }>(
    `WITH previous AS (
      SELECT slug, title FROM problems WHERE slug = $1 FOR UPDATE
    )
    UPDATE problems AS problem
    SET title = $2, question = $3, answer = $4
    FROM previous
    WHERE problem.slug = previous.slug
    RETURNING previous.title IS DISTINCT FROM problem.title AS title_changed`,
    [slug, title, question, answer],
  );
  return rows[0];
}
