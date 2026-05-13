import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginTop: "48px",
          marginBottom: "16px",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginTop: "36px",
          marginBottom: "12px",
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid var(--accent)",
          paddingLeft: "20px",
          margin: "32px 0",
          color: "var(--text-muted)",
          fontStyle: "italic",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          marginBottom: "24px",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          color: "var(--text-secondary)",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          marginBottom: "24px",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          color: "var(--text-secondary)",
        }}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "1px 6px",
          color: "var(--accent)",
        }}
      >
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure style={{ margin: "40px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.asset?.url}
          alt={value.alt ?? ""}
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}
        />
        {value.caption && (
          <figcaption
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              textAlign: "center",
            }}
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }) => (
      <pre
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "20px 24px",
          margin: "32px 0",
          overflowX: "auto",
          fontSize: "13px",
          fontFamily: "var(--font-mono)",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
        }}
      >
        {value.filename && (
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginBottom: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {value.filename}
          </div>
        )}
        <code>{value.code}</code>
      </pre>
    ),
  },
};
