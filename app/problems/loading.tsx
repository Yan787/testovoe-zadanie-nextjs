export default function ProblemsLoading() {
  return (
    <main className="catalog" aria-busy="true">
      <h1>Вопросы</h1>
      <p role="status">Загружаем вопросы…</p>
      <div className="catalog-skeleton" aria-hidden="true">
        <div className="skeleton-search" />
        {[0, 1, 2].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton-title" />
            <div className="skeleton-meta" />
          </div>
        ))}
      </div>
    </main>
  );
}
