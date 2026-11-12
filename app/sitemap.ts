import type { MetadataRoute } from "next";
import { listProblemSlugs } from "@/lib/problems";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const problems = await listProblemSlugs();

  return [
    { url: new URL("/", siteUrl).href },
    { url: new URL("/problems", siteUrl).href },
    ...problems.map(({ slug }) => ({
      url: new URL(`/problems/${encodeURIComponent(slug)}`, siteUrl).href,
    })),
  ];
}
