import { getProgress } from "@/lib/progress";

export async function ProgressStats({ userId }: { userId: string }) {

  const { completed, total } = await getProgress(userId);

  return <p className="progress-count">Пройдено {completed} из {total} вопросов</p>;
}
