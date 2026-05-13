import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { portableTextComponents } from "./portable-text";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  tags: string[];
  body: unknown[];
  estimatedReadTime: number;
  seo?: { metaDescription?: string; ogTitle?: string };
  canonicalUrl?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avinashdangi.dev";

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(postSlugsQuery);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    // ignore
  }
  if (!post) return {};

  const title = post.seo?.ogTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const canonical = post.canonicalUrl ?? `${siteUrl}/blog/${slug}`;
  const ogImage = `${siteUrl}/blog/${slug}/opengraph-image`;

  return {
    title: `${title} — Avinash Dangi`,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Avinash Dangi"],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@avinashdangi",
    },
    other: {
      "article:author": "Avinash Dangi",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    // ignore
  }
  if (!post) notFound();

  const canonical = post.canonicalUrl ?? `${siteUrl}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: "Avinash Dangi",
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    url: canonical,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}
      >
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            marginBottom: "48px",
          }}
        >
          ← All posts
        </Link>

        <header style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {post.tags?.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span>{formatDate(post.publishedAt)}</span>
            {post.estimatedReadTime > 0 && <span>{post.estimatedReadTime} min read</span>}
          </div>
        </header>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.85,
            color: "var(--text-secondary)",
          }}
        >
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        <footer
          style={{
            marginTop: "80px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              marginBottom: "12px",
            }}
          >
            Originally published at{" "}
            <a
              href={canonical}
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              {canonical.replace("https://", "")}
            </a>
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            If you&apos;re reading this on Dev.to or Hashnode, the canonical version lives on my
            portfolio. Questions or feedback?{" "}
            <a
              href="mailto:avinashdangi.26@gmail.com"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Email me.
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
