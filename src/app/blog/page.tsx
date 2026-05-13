import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog — Avinash Dangi",
  description:
    "Writing about AI, frontend engineering, product craft, and building software that ships.",
  openGraph: {
    title: "Blog — Avinash Dangi",
    description:
      "Writing about AI, frontend engineering, product craft, and building software that ships.",
  },
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  tags: string[];
  estimatedReadTime: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // Sanity not configured — show empty state
  }

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        width: "100%",
      }}
    >
      <Link
        href="/"
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
        ← avinashdangi.dev
      </Link>

      <div style={{ marginBottom: "64px" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Writing
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Things I&apos;ve written
        </h1>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>
          No posts yet. Check back soon.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              style={{
                display: "block",
                padding: "32px 0",
                borderBottom: i < posts.length - 1 ? "1px solid var(--border)" : "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                    paddingTop: "4px",
                  }}
                >
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "12px",
                }}
              >
                {post.excerpt}
              </p>

              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
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
                {post.estimatedReadTime > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {post.estimatedReadTime} min read
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
