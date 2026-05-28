"use client";

import { useState } from "react";

interface CaseStudy {
  readonly title: string;
  readonly problem: string;
  readonly what: string;
  readonly impact: string;
  readonly impactLabel: string;
  readonly stack: readonly string[];
  readonly tags: readonly string[];
  readonly url?: string;
  readonly image?: string;
}

interface Employer {
  readonly company: string;
  readonly period: string;
  readonly role: string;
  readonly location: string;
  readonly summary?: string;
  readonly caseStudies?: readonly CaseStudy[];
}

const gradients: Record<string, string> = {
  "AI Voice Tutor":
    "linear-gradient(135deg, #1a1035 0%, #2d1b69 50%, #0f2027 100%)",
  "PadhAI Desktop & Android":
    "linear-gradient(135deg, #0d2137 0%, #0a3d2e 50%, #071a12 100%)",
  "Mobile Trading Platform":
    "linear-gradient(135deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)",
  "Onboarding Redesign":
    "linear-gradient(135deg, #1a0020 0%, #2d0040 50%, #0f001a 100%)",
};

const employers: readonly Employer[] = [
  {
    company: "SigIQ",
    period: "2025 – Present",
    role: "Lead Frontend Engineer",
    location: "Gurugram, India",
    caseStudies: [
      {
        title: "AI Voice Tutor",
        url: "https://evertutor.ai/",
        problem: "Students needed real-time tutoring without a human tutor on call.",
        what: "Built an AI tutor from scratch — voice input, chat, draw annotation on a shared whiteboard, and gamification, all in one session. Used XState to model the multi-modal state machine so voice ↔ chat ↔ draw transitions were deterministic, not spaghetti. Added socket connections for dynamic lesson planning that adapted mid-session based on student responses.",
        impact: "40%",
        impactLabel: "engagement lift",
        stack: ["React", "XState", "WebSockets", "TypeScript", "Canvas API"],
        tags: ["AI", "EdTech", "Real-time"],
      },
      {
        title: "PadhAI Desktop & Android",
        problem: "Product needed to reach students on desktop and Android without maintaining two separate codebases.",
        what: "Shipped the desktop app by configuring a PWA to run inside a WebView — one codebase, two surfaces. Built the CI/CD pipeline from scratch: automated testing environment for exam security, deployment workflows, and the Spark test launch that drove high initial traffic. Performance observability baked in from day one.",
        impact: "1 codebase",
        impactLabel: "→ desktop + Android",
        stack: ["PWA", "WebView", "CI/CD", "React", "TypeScript"],
        tags: ["Mobile", "DevOps", "Performance"],
      },
    ],
  },
  {
    company: "Saxo Bank",
    period: "2024",
    role: "Senior Frontend Engineer",
    location: "Gurugram, India",
    summary:
      "Returned as Senior Engineer. Built advanced trading chart features, extended the design system, and mentored junior engineers across the frontend team.",
  },
  {
    company: "LeadIQ",
    period: "2021 – 2023",
    role: "Frontend Engineer",
    location: "Singapore (Remote)",
    caseStudies: [
      {
        title: "Onboarding Redesign",
        problem: "User drop-off in the first session was killing growth. Onboarding was static and didn't adapt.",
        what: "Redesigned the onboarding experience using a server-driven UI approach — the server controlled what UI to show next based on user state, so we could iterate without app releases. Built dynamic UI/UX features that personalized each step. Maintained and optimized the CI/CD pipeline throughout. Worked fully remote across time zones with the Singapore team.",
        impact: "40%",
        impactLabel: "retention increase",
        stack: ["React", "TypeScript", "Server-driven UI", "CI/CD"],
        tags: ["Growth", "Remote", "Product"],
      },
    ],
  },
  {
    company: "Saxo Bank",
    period: "2019 – 2021",
    role: "Frontend Engineer",
    location: "Gurugram, India",
    caseStudies: [
      {
        title: "Mobile Trading Platform",
        problem: "Saxo's retail investors needed a mobile-native trading experience with real-time data.",
        what: "Built and maintained the React Native investor platform end-to-end — real-time market data feeds, portfolio management, and order execution. Contributed to Saxo's design system: created and maintained core UI components with Storybook documentation, ensuring visual consistency across web and mobile. Also built new trading indicators and annotations for the web trading chart using functional Vanilla JS.",
        impact: "1M+",
        impactLabel: "Saxo users",
        stack: ["React Native", "Vanilla JS", "D3", "Storybook", "TypeScript"],
        tags: ["FinTech", "Real-time", "Mobile"],
      },
    ],
  },
  {
    company: "C-DOT",
    period: "2016 – 2019",
    role: "Research Engineer",
    location: "New Delhi, India",
    summary:
      "Research and development in telecom systems at India's premier telecom R&D centre. Built internal tooling and simulation systems for network protocols.",
  },
];

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "border-color 0.2s",
        cursor: "default",
        overflow: "hidden",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
      }
    >
      {caseStudy.image ? (
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            display: "block",
            borderRadius: "12px 12px 0 0",
          }}
        />
      ) : (
        <div
          style={{
            height: "180px",
            background:
              gradients[caseStudy.title] ??
              "linear-gradient(135deg, #111 0%, #222 100%)",
            borderRadius: "12px 12px 0 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "80px",
              opacity: 0.06,
              fontFamily: "var(--font-mono)",
              userSelect: "none",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {caseStudy.tags[0]}
          </span>
        </div>
      )}

      <div
        style={{
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {caseStudy.title}
              {caseStudy.url && (
                <a
                  href={caseStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid var(--accent)",
                    opacity: 0.85,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    (
                      (e.currentTarget as HTMLAnchorElement).style.opacity =
                        "0.85"
                    )
                  }
                >
                  Live ↗
                </a>
              )}
            </h3>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {caseStudy.impact}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginTop: "2px",
              }}
            >
              {caseStudy.impactLabel}
            </p>
          </div>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontStyle: "italic",
          }}
        >
          {caseStudy.problem}
        </p>

        <div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {expanded ? caseStudy.what : caseStudy.what.slice(0, 140) + "…"}
          </p>
          {caseStudy.what.length > 140 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "12px",
                cursor: "pointer",
                marginTop: "6px",
                fontFamily: "var(--font-mono)",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {expanded ? "show less" : "read more"}
            </button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {caseStudy.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  border: "1px solid var(--border)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
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
        </div>
      </div>

      <div style={{ height: "12px" }} />
    </article>
  );
}

function EmployerBlock({ employer }: { employer: Employer }) {
  return (
    <div>
      {/* Employer header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {employer.company}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {employer.period}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {employer.role}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
            }}
          >
            {employer.location}
          </span>
        </div>
      </div>

      {/* Summary-only employer */}
      {employer.summary && !employer.caseStudies && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "640px",
          }}
        >
          {employer.summary}
        </p>
      )}

      {/* Case studies grid */}
      {employer.caseStudies && employer.caseStudies.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "16px",
          }}
        >
          {employer.caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} caseStudy={cs} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "120px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
      }}
    >
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
          Work Experience
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Where I&apos;ve worked
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {employers.map((employer) => (
          <EmployerBlock key={`${employer.company}-${employer.period}`} employer={employer} />
        ))}
      </div>
    </section>
  );
}
