import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags,
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200),
    mainImage { asset->{ url }, alt }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags,
    body,
    mainImage { asset->{ url }, alt },
    seo,
    canonicalUrl,
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200)
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;
