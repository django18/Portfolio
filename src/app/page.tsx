import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { SideProjects } from "@/components/SideProjects";
import { Activity } from "@/components/Activity";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Hero />
        <Experience />
        <SideProjects />
        <Activity />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
