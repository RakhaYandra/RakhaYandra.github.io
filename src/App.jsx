import { useEffect, useState } from "react";
import styles from "./App.module.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { About } from "./components/About/About";
import { Certificates } from "./components/Certificates/Certificates";
import { Education } from "./components/Education/Education";
import { GetInTouch } from "./components/GetInTouch/GetInTouch";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Organizations } from "./components/Organizations/Organizations";
import { Projects } from "./components/Projects/Projects";
import { Faq } from "./components/Faq/Faq";
import { Publications } from "./components/Publications/Publications";
import { Skills } from "./components/Skills/Skills";
import { Footer } from "./components/Footer/Footer";
import { Writing } from "./components/Writing/Writing";
import { GitHub } from "./components/GitHub/GitHub";
import { ScrollProgress } from "./components/ui/scroll-progress";
import { CommandPalette } from "./components/CommandPalette";
import { SECTIONS } from "./data/sections";

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.App}>
        {/* Navigation */}
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />

        {/* Main Content */}
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Experience />
          <Publications />
          <Certificates />
          <Organizations />
          <GitHub />
          <Projects />
          <Writing />
          <Faq />
          <GetInTouch />
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Reading progress + section jumper */}
        <ScrollProgress sections={SECTIONS} />

        {/* ⌘K command palette */}
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
