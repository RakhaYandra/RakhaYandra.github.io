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
import { Publications } from "./components/Publications/Publications";
import { Skills } from "./components/Skills/Skills";
import { Footer } from "./components/Footer/Footer";
import { Writing } from "./components/Writing/Writing";

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
          <Certificates />
          <Organizations />
          <Publications />
          <Projects />
          <Writing />
          <GetInTouch />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
