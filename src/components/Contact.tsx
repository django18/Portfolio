"use client";

const links = [
  {
    label: "Email",
    value: "avinashdangi.26@gmail.com",
    href: "mailto:avinashdangi.26@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/django18",
    href: "https://github.com/django18",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/avinash-dangi",
    href: "https://www.linkedin.com/in/avinash-dangi",
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
      }}
    >
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
        Contact
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "64px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Let&apos;s build
            <br />
            something.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "400px",
            }}
          >
            Open to senior/lead frontend roles at remote-first companies
            building products people actually use. Also happy to talk AI,
            trading systems, or edtech.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.15s",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.paddingLeft = "8px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.paddingLeft = "0";
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "2px",
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-primary)" }}>
                  {value}
                </p>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "18px" }}>
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
