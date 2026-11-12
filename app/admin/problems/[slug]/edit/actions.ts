"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, startAdminSession } from "@/lib/admin-session";
import { updateProblemRecord } from "@/lib/problems";

export async function signInAdmin(_previous: string, formData: FormData) {
  if (!(await startAdminSession(formData.get("password")))) {
    return "Вход не выполнен. Проверьте пароль администратора.";
  }

  return "";
}

function readText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text && text.length <= maxLength && !text.includes("\0") ? text : null;
}

export async function updateProblem(slug: string, _previous: string, formData: FormData) {
  if (!(await isAdmin())) {
    return "Для сохранения войдите как администратор.";
  }

  const title = readText(formData, "title", 200);
  const question = readText(formData, "question", 10000);
  const answer = readText(formData, "answer", 10000);
  if (!title || !question || !answer) {
    return "Заполните все поля. Заголовок должен содержать до 200 символов, вопрос и ответ — до 10 000.";
  }

  let updated;
  try {
    updated = await updateProblemRecord(slug, { title, question, answer });
  } catch (error) {
    console.error("Failed to update problem", error);
    return "Не удалось сохранить изменения. Попробуйте ещё раз.";
  }
  if (!updated) return "Вопрос больше не существует.";

  const path = `/problems/${encodeURIComponent(slug)}`;
  revalidatePath(path);
  if (updated.title_changed) revalidatePath("/problems");
  redirect(`${path}?saved=1`);
}
