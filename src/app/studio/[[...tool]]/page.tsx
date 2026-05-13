"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(
  async () => {
    const { NextStudio } = await import("next-sanity/studio");
    const config = (await import("../../../../sanity.config")).default;
    return function Page() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false, loading: () => <div style={{ background: "#101112", minHeight: "100vh" }} /> }
);

export default function StudioPage() {
  return <Studio />;
}
