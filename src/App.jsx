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
import { ScrollProgress } from "./components/ui/scroll-progress";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "certificates", label: "Certificates" },
  { id: "organizations", label: "Organizations" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.App}>
        {/* Navigation */}
        <Navbar />

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
          <Projects />
          <Writing />
          <Faq />
          <GetInTouch />
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Reading progress + section jumper */}
        <ScrollProgress sections={SECTIONS} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
