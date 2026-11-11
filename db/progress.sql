CREATE TABLE IF NOT EXISTS problem_progress (
  user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  problem_slug text NOT NULL REFERENCES problems(slug) ON DELETE CASCADE,
  PRIMARY KEY (user_id, problem_slug)
);
