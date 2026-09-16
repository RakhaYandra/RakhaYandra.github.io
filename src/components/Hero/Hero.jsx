import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "JavaScript", icon: "🟨" },
    { name: "Golang", icon: "🐹" },
    { name: "Laravel", icon: "🔷" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Cypress", icon: "🌲" },
  ];

  // Track screen size for responsive scroll indicator
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.container}>
      {/* Simplified Background */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.gradientOrbs}></div>
        <div
          className={styles.mouseFollower}
          style={{
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          }}
        ></div>
      </div>

      <div className={styles.content}>
        {/* Status Badge */}
        <div
          className={`${styles.statusBadge} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <div className={styles.statusDot}></div>
          <span>Open to Work · Remote / Hybrid / On-site</span>
        </div>

        {/* Hero Heading */}
        <div
          className={`${styles.heroHeading} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <h1 className={styles.title}>
            Hi, I&apos;m <span className={styles.titleName}>Rakha Putra</span>
            <br />
            <span className={styles.titleRole}>Information Systems Generalist</span>
          </h1>
          <p className={styles.subtitle}>
            Generalist — backend-leaning (Go/Gin, Blazor/.NET) + QA-aware (Cypress, Newman, Playwright). Build · Analyze · Assure. An honors graduate (Cum Laude) delivering value across diverse IT functions. Based in Indonesia, open to remote roles.
          </p>
        </div>

        {/* Quick Stats */}
        <div
          className={`${styles.quickStats} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <div className={styles.statCard}>
            <div className={styles.statNumber}>Cum Laude</div>
            <div className={styles.statLabel}>Telkom University</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>Deployed Solutions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1.5+ Yrs</div>
            <div className={styles.statLabel}>Combined Experience</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`${styles.ctaGroup} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <a
            href="mailto:rakhaputrapebriyandra272@gmail.com"
            className={styles.primaryCta}
          >
            <span>Let&apos;s Collaborate</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#projects" className={styles.secondaryCta}>
            <span>View Portfolio</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1TaKJOdJJHmVEeZt7Ck2CnjJ7GLS531g-/view?usp=sharing"
            className={styles.cvButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.downloadIcon}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download CV</span>
          </a>
        </div>

        {/* Social Links */}
        <div
          className={`${styles.socialGroup} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <span className={styles.socialLabel}>Connect with me</span>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/RakhaYandra"
              className={styles.socialLink}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/rakhaputrapebriyandra"
              className={styles.socialLink}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:rakhaputrapebriyandra272@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator - mobile only, inside content */}
        {isMobile && (
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollText}>Scroll to explore</div>
            <div className={styles.scrollArrow}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator - desktop only, outside content */}
      {!isMobile && (
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollText}>Scroll to explore</div>
          <div className={styles.scrollArrow}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Enhanced Image Section */}
      <div
        className={`${styles.imageSection} ${
          isLoaded ? styles.fadeInRight : ""
        }`}
      >
        <div className={styles.imageContainer + " " + styles.animatedImage}>
          <div className={styles.imageFrame}>
            <img
              src={getImageUrl("hero/heroImage1.jpg")}
              alt="Rakha Putra Pebri Yandra - Information Systems Graduate"
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>

        {/* Modern Tech Stack */}
        <div className={styles.techStackContainer}>
          <h3 className={styles.techStackTitle}>Tech Stack</h3>
          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={styles.techBadge}
                style={{ "--delay": `${0.2 + index * 0.1}s` }}
                title={tech.name}
              >
                <span className={styles.techIcon}>{tech.icon}</span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
