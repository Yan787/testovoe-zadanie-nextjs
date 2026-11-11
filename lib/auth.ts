import "server-only";
import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { getDb } from "./db";

let auth: ReturnType<typeof createAuth> | undefined;

function createAuth() {
  return betterAuth({
    database: getDb(),
    emailAndPassword: { enabled: true },
  });
}

export function getAuth() {
  return auth ??= createAuth();
}

export async function getSession() {
  return getAuth().api.getSession({ headers: await headers() });
}
