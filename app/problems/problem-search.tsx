"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Suggestion = { slug: string; title: string };

export function ProblemSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Suggestion[] | null>(null);
  const [error, setError] = useState(false);
  const query = input.trim();

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(`/api/problems/search?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Search request failed");

        const suggestions: Suggestion[] = await response.json();
        if (!controller.signal.aborted) setResults(suggestions);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="problem-search" role="search">
      <label htmlFor="problem-search">Поиск по заголовкам</label>
      <input
        id="problem-search"
        type="search"
        value={input}
        onChange={(event) => {
          const nextInput = event.target.value;
          setInput(nextInput);
          if (nextInput.trim() !== query) {
            setResults(null);
            setError(false);
          }
        }}
      />
      <div aria-live="polite">
        {error && <p>Не удалось загрузить подсказки.</p>}
        {results?.length === 0 && <p>Вопросы не найдены.</p>}
        {!!results?.length && (
          <ul aria-label="Подсказки поиска">
            {results.map(({ slug, title }) => (
              <li key={slug}>
                <Link href={`/problems/${slug}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
