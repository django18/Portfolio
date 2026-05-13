import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { postSlugsQuery } from "@/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avinashdangi.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: { slug: string }[] = [];
  try {
    slugs = await client.fetch(postSlugsQuery);
  } catch {
    // Sanity not configured yet — sitemap ships without blog posts
  }

  const posts = slugs.map(({ slug }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...posts,
  ];
}
