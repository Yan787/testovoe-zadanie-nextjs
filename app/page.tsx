import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Frontend Interview Trainer</h1>
      <p>Тренажёр для подготовки к frontend-собеседованиям.</p>
      <Link className="action" href="/problems">Перейти к вопросам</Link>
    </main>
  );
}
