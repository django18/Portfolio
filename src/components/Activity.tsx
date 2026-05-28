interface ActivityItem {
  readonly date: string;
  readonly repo: string;
  readonly message: string;
}

const activities: readonly ActivityItem[] = [
  { date: "May 28, 2025", repo: "trading-agent", message: "Add Gemini 2.0 Flash fallback with automatic provider switching" },
  { date: "May 26, 2025", repo: "padhai-webapp", message: "Implement XState v5 voice ↔ chat ↔ draw state machine" },
  { date: "May 24, 2025", repo: "trading-agent", message: "Wire Supabase trade journal with SQLite fallback" },
  { date: "May 22, 2025", repo: "padhai-webapp", message: "PWA offline mode: service worker caching for exam sessions" },
  { date: "May 20, 2025", repo: "portfolio", message: "Add case study cards with live project links" },
  { date: "May 18, 2025", repo: "trading-agent", message: "Upstox WebSocket real-time market feed integration" },
];

export function Activity() {
  return (
    <section
      id="activity"
      style={{
        padding: "80px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
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
          // recent activity
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
          Constantly building
        </h2>
      </div>

      <div>
        {activities.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 160px 1fr",
              gap: "0 24px",
              alignItems: "baseline",
              paddingTop: "14px",
              paddingBottom: "14px",
              borderBottom: i < activities.length - 1 ? "1px solid var(--border)" : "none",
              transition: "background 0.15s",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              {item.date}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                opacity: 0.8,
              }}
            >
              {item.repo}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
              }}
            >
              {item.message}
            </span>
          </div>
        ))}
      </div>

      <a
        href="https://github.com/django18"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "24px",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--text-muted)",
          textDecoration: "none",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")
        }
      >
        View all on GitHub →
      </a>
    </section>
  );
}
