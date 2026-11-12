"use client";

import { useSearchParams } from "next/navigation";

export function SavedNotice() {
  const params = useSearchParams();
  if (params.get("saved") !== "1") return null;

  return <p className="success-notice" role="status">Изменения сохранены.</p>;
}
