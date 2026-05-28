const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "React Native", "Vue", "Expo"],
  "Backend": ["Node.js", "Bun", "Elysia", "FastAPI", "Spring Boot", "GraphQL"],
  "AI & Data": ["Gemini AI", "Claude API", "OpenAI", "XState", "D3.js", "D3fc"],
  "Infra & Tools": ["Supabase", "Firebase", "PostgreSQL", "MongoDB", "CI/CD", "Playwright"],
} as const;


export function About() {
  return (
    <section
      id="about"
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
        About
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "64px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            I care about the whole product, not just my slice of it.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              Computer Engineering from NSIT Delhi (2016). Started as a research engineer,
              moved into product engineering at Saxo Bank building trading charts and mobile
              platforms. Went remote at LeadIQ (Singapore) for two years, then back to
              Saxo as senior engineer, and now leading frontend at SigIQ building AI
              products for students.
            </p>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              My work sits at the intersection of AI and product craft. I&apos;m the
              engineer who asks "how does this reach users?" before writing the first
              line of code — and who still cares about the CI/CD pipeline when the
              feature ships.
            </p>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              Open to senior/lead roles at remote-friendly companies building
              AI-native products.
            </p>
          </div>
        </div>

        <div>
          <div>
            <h3
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              Stack
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {Object.entries(skills).map(([category, techs]) => (
                <div key={category} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "16px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      paddingTop: "4px",
                    }}
                  >
                    {category}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
