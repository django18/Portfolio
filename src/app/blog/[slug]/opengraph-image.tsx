import { ImageResponse } from "next/og";
import { client } from "@/sanity/client";
import { postBySlugQuery } from "@/sanity/queries";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  let post = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    // Sanity not configured
  }

  const title = post?.title ?? "Avinash Dangi";
  const excerpt = post?.excerpt ?? "Writing about AI, frontend engineering, and product craft.";
  const tags: string[] = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#4ade80",
            fontSize: "14px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          AVINASH DANGI · BLOG
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: tags.length ? "14px" : "0",
              color: "#4ade80",
              display: "flex",
              gap: "8px",
            }}
          >
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(74,222,128,0.1)",
                  padding: "4px 12px",
                  borderRadius: "4px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#52525b", fontSize: "14px", fontFamily: "monospace" }}>
            avinashdangi.dev/blog
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            AD
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
