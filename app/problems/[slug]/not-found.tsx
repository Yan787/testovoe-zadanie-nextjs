import Link from "next/link";

export default function ProblemNotFound() {
  return (
    <main className="problem-page">
      <h1>Вопрос не найден</h1>
      <p>Проверьте адрес или выберите другой вопрос в каталоге.</p>
      <Link className="action" href="/problems">К вопросам</Link>
    </main>
  );
}
