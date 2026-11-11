"use server";

import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { completeProblem } from "@/lib/progress";

export async function markProblemComplete(slug: string) {
  const session = await getSession();
  if (!session) redirect("/login");

  if (!(await completeProblem(session.user.id, slug))) notFound();
  redirect("/dashboard");
}
