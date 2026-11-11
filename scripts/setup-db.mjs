import { readFile } from "node:fs/promises";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL before setting up PostgreSQL.");
}

const sql = await readFile(new URL("../db/setup.sql", import.meta.url), "utf8");
const client = new pg.Client({ connectionString, connectionTimeoutMillis: 5000 });

try {
  await client.connect();
  await client.query(sql);
  console.log("The problems table and starter questions are ready.");
} finally {
  await client.end();
}
