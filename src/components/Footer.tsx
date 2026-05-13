export function Footer() {
  return (
    <footer
      style={{
        padding: "32px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Avinash Dangi · {new Date().getFullYear()}
      </p>
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Built with Next.js · Gurugram, India
      </p>
    </footer>
  );
}
