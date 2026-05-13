"use client";

export function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 24px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Lead Software Engineer · UI
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "32px",
            color: "var(--text-primary)",
          }}
        >
          Avinash
          <br />
          Dangi
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}
        >
          I build complete AI-native products — from database schema to PWA to
          CI/CD pipeline. 9 years across fintech, edtech, and AI at companies
          in India, Singapore, and Denmark.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "var(--text-primary)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            View Work
            <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "transparent",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid var(--border)",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text-primary)";
              el.style.borderColor = "var(--text-muted)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text-secondary)";
              el.style.borderColor = "var(--border)";
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
