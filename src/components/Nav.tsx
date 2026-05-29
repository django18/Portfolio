"use client";

import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          color: "var(--text-primary)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        AD
      </a>
      <div style={{ display: "flex", gap: "32px" }}>
        {[
          { label: "Work", href: "/#experience" },
          { label: "Blog", href: "/blog" },
          { label: "About", href: "/#about" },
          { label: "Contact", href: "/#contact" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text-secondary)")
            }
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
