import { problems } from "@/lib/problems";

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().toLowerCase();

  if (!query) {
    return Response.json([]);
  }

  const results = problems
    .filter(({ title }) => title.toLowerCase().includes(query))
    .slice(0, 5)
    .map(({ slug, title }) => ({ slug, title }));

  return Response.json(results);
}
