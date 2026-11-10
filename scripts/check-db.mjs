import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL in .env.local.");
}

const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 5000 });
try {
  const { rows: [row] } = await pool.query(
    "SELECT current_database() AS database, current_setting('server_version') AS version",
  );
  console.log(`PostgreSQL ${row.version} · ${row.database}`);
} finally {
  await pool.end();
}
