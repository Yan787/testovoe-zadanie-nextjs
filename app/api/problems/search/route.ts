import { searchProblems } from "@/lib/problems";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();

  if (!query) {
    return Response.json([]);
  }

  return Response.json(await searchProblems(query));
}
