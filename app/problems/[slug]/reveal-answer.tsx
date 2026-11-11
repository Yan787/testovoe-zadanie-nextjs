"use client";

import { useId, useState } from "react";

export function RevealAnswer({ answer }: { answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();

  return (
    <>
      <button
        className="action"
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Скрыть ответ" : "Показать ответ"}
      </button>
      <p className="answer" id={answerId} hidden={!isOpen}>{answer}</p>
    </>
  );
}
