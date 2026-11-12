import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "trainer-admin-session";
const sessionSeconds = 8 * 60 * 60;

function adminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 32 ? password : undefined;
}

function equal(left: string, right: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(left), digest(right));
}

function sign(expires: string, password: string) {
  return createHmac("sha256", password).update(`trainer-admin:${expires}`).digest("hex");
}

export async function isAdmin() {
  const password = adminPassword();
  const session = (await cookies()).get(cookieName)?.value;
  if (!password || !session) return false;

  const [expires, signature] = session.split(".");
  return Boolean(
    signature && /^\d{13}$/.test(expires) &&
    Number(expires) > Date.now() && equal(signature, sign(expires, password)),
  );
}

export async function startAdminSession(candidate: FormDataEntryValue | null) {
  const password = adminPassword();
  if (!password || typeof candidate !== "string" || !equal(candidate, password)) {
    return false;
  }

  const expires = String(Date.now() + sessionSeconds * 1000);
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
  cookieStore.set(cookieName, `${expires}.${sign(expires, password)}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: sessionSeconds,
  });
  return true;
}
