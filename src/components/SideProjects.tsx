"use client";

import { useState } from "react";

interface SideProject {
  readonly title: string;
  readonly year: string;
  readonly description: string;
  readonly what: string;
  readonly impact: string;
  readonly impactLabel: string;
  readonly stack: readonly string[];
  readonly tags: readonly string[];
  readonly url?: string;
  readonly github?: string;
  readonly status: "live" | "building" | "archived";
  readonly image?: string;
}

const gradients: Record<string, string> = {
  "Autonomous AI Trading Agent":
    "linear-gradient(135deg, #001a1a 0%, #003333 50%, #001a3d 100%)",
};

const sideProjects: readonly SideProject[] = [
  {
    title: "Autonomous AI Trading Agent",
    year: "2025",
    status: "building",
    description:
      "An autonomous agent for Indian equity F&O markets that monitors, reasons, and executes — without manual intervention during market hours.",
    what: "Built a 4-layer architecture: data ingestion from Upstox API → context builder → Gemini/Claude AI brain → order execution with hard guardrails. Paper trading default, live mode requires explicit override. Full observability, Telegram alerts, trade journal in Supabase. Runs on Bun + Elysia.",
    impact: "Full stack",
    impactLabel: "data → AI → execution",
    stack: ["Bun", "Elysia", "TypeScript", "Gemini AI", "Supabase", "Upstox API"],
    tags: ["AI", "FinTech", "Solo"],
  },
];

function statusBadgeStyle(
  status: SideProject["status"]
): React.CSSProperties {
  if (status === "building") {
    return {
      background: "rgba(234, 179, 8, 0.15)",
      color: "#eab308",
      border: "1px solid rgba(234, 179, 8, 0.3)",
    };
  }
  if (status === "live") {
    return {
      background: "var(--accent-dim)",
      color: "var(--accent)",
      border: "1px solid rgba(74, 222, 128, 0.3)",
    };
  }
  return {
    background: "rgba(255,255,255,0.05)",
    color: "var(--text-muted)",
    border: "1px solid var(--border)",
  };
}

function statusLabel(status: SideProject["status"]): string {
  return `● ${status}`;
}

function SideProjectCard({ project }: { project: SideProject }) {
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
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
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
              gradients[project.title] ??
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
            {project.tags[0]}
          </span>
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              padding: "3px 8px",
              borderRadius: "20px",
              ...statusBadgeStyle(project.status),
            }}
          >
            {statusLabel(project.status)}
          </span>
        </div>
      )}

      <div
        style={{ padding: "0 32px", display: "flex", flexDirection: "column", gap: "20px" }}
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
                flexWrap: "wrap",
              }}
            >
              {project.title}
              {project.url && (
                <a
                  href={project.url}
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
                    ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
                  }
                >
                  Live ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid var(--border)",
                    opacity: 0.85,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "opacity 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.opacity = "1";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.opacity = "0.85";
                    el.style.color = "var(--text-muted)";
                  }}
                >
                  GitHub →
                </a>
              )}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {project.year}
            </p>
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
              {project.impact}
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
              {project.impactLabel}
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
          {project.description}
        </p>

        <div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {expanded ? project.what : project.what.slice(0, 140) + "…"}
          </p>
          {project.what.length > 140 && (
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
            {project.stack.map((tech) => (
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
            {project.tags.map((tag) => (
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

export function SideProjects() {
  return (
    <section
      id="projects"
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
          Side Projects
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
          Built in my own time
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            marginTop: "12px",
            marginBottom: "0",
          }}
        >
          Things I built because I wanted them to exist.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "16px",
        }}
      >
        {sideProjects.map((project) => (
          <SideProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
