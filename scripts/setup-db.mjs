import { readFile } from "node:fs/promises";
import pg from "pg";
import { getMigrations } from "better-auth/db/migration";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL before setting up PostgreSQL.");
}

const sql = await readFile(new URL("../db/setup.sql", import.meta.url), "utf8");
const progressSql = await readFile(new URL("../db/progress.sql", import.meta.url), "utf8");
const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 5000 });

try {
  await pool.query(sql);
  const { runMigrations } = await getMigrations({
    database: pool,
    emailAndPassword: { enabled: true },
  });
  await runMigrations();
  await pool.query(progressSql);
  console.log("The questions, accounts and progress tables are ready.");
} finally {
  await pool.end();
}
