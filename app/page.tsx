import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-labelledby="home-title">
        <h1 id="home-title">
          Frontend Interview <span>Trainer</span>
        </h1>
        <p>Готовьтесь к frontend-собеседованиям на вопросах по JavaScript, React и CSS.</p>
        <Link className="action" href="/problems">
          Перейти к вопросам <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
