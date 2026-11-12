import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProblem, listProblemSlugs } from "@/lib/problems";
import { RevealAnswer } from "./reveal-answer";
import { markProblemComplete } from "./actions";
import { SavedNotice } from "./saved-notice";
import { siteName, openGraphImages } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return listProblemSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = await getProblem(slug);
  if (!problem) notFound();

  const description = problem.question.replace(/\s+/g, " ").trim().slice(0, 160);
  const path = `/problems/${encodeURIComponent(slug)}`;

  return {
    title: problem.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName,
      locale: "ru_RU",
      title: `${problem.title} | ${siteName}`,
      description,
      url: path,
      images: openGraphImages,
    },
  };
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    notFound();
  }

  return (
    <main className="problem-page">
      <Link className="back-link" href="/problems">Все вопросы</Link>
      <Suspense fallback={null}>
        <SavedNotice />
      </Suspense>
      <article className="problem">
        <p className="problem-meta">{problem.topic} · {problem.difficulty}</p>
        <h1>{problem.title}</h1>
        <p>{problem.question}</p>
        <RevealAnswer answer={problem.answer} />
        <form action={markProblemComplete.bind(null, problem.slug)}>
          <button className="action action-secondary" type="submit">Отметить пройденным</button>
        </form>
      </article>
    </main>
  );
}
