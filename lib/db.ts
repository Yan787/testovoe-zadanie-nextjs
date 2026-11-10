import "server-only";
import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  interviewTrainerPool?: Pool;
};

export function getDb(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Set DATABASE_URL before connecting to PostgreSQL.");
  }

  globalForDatabase.interviewTrainerPool ??= new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

  return globalForDatabase.interviewTrainerPool;
}
