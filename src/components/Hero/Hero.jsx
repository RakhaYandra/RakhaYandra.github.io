import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const techStack = [
    "Go / Gin",
    "ASP.NET Core",
    "React",
    "Newman",
    "Playwright",
    "PostgreSQL",
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
      <div className={styles.content}>
        {/* Status Badge */}
        <div
          className={`${styles.statusBadge} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <div className={styles.statusDot}></div>
          <span>• VERIFIED ARCHITECTURES &amp; SYSTEMS</span>
        </div>

        {/* Hero Heading */}
        <div
          className={`${styles.heroHeading} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <h1 className={styles.title}>
            Maximizing Backend{" "}
            <span className={styles.titleAccent}>Reliability</span> &amp;
            Verified Systems.
          </h1>
          <p className={styles.subtitle}>
            Information Systems Generalist &amp; Backend Engineer bridging
            robust domain modeling (Go/Gin, ASP.NET Core, Blazor) with
            empirical test harnesses (Newman, Cypress, Playwright) to eliminate
            runtime uncertainty before deployment.
          </p>
        </div>

        {/* Telemetry Ticker */}
        <div
          className={`${styles.quickStats} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <div className={styles.statCard}>
            <div className={styles.statLabel}>GPA / MERIT</div>
            <div className={styles.statNumber}>3.81</div>
            <div className={styles.statSub}>Cum Laude</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>TEST PASS RATE</div>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statSub}>267+ Assertions</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statLabel} ${styles.statLabelOk}`}>
              STATUS
            </div>
            <div className={`${styles.statNumber} ${styles.statNumberOk}`}>
              ACTIVE
            </div>
            <div className={styles.statSub}>Remote / Relocate</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`${styles.ctaGroup} ${isLoaded ? styles.fadeInUp : ""}`}
        >
          <a href="#projects" className={styles.primaryCta}>
            <span>EXPLORE FLAGSHIP WORK</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#project-thesis" className={styles.secondaryCta}>
            <span>VIEW IEEE PUBLICATION</span>
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

      {/* Executive Card */}
      <div
        className={`${styles.imageSection} ${
          isLoaded ? styles.fadeInRight : ""
        }`}
      >
        <div className={styles.imageContainer}>
          <div className={styles.cardHead}>
            <span className={styles.cardHeadLeft}>
              <span className={styles.cardHeadDot}></span>
              TELKOM UNIVERSITY
            </span>
            <span className={styles.cardHeadRight}>NODE // RPK-2025</span>
          </div>
          <div className={styles.imageFrame}>
            <img
              src={getImageUrl("about/aboutImage.jpg")}
              alt="Rakha Putra Pebri Yandra - Information Systems Graduate"
              className={styles.heroImage}
            />
            <div className={styles.namePlate}>
              <div>
                <h3 className={styles.namePlateName}>
                  Rakha Putra Pebri Yandra
                </h3>
                <p className={styles.namePlateRole}>
                  S.Kom • Backend &amp; Verification Lead
                </p>
              </div>
              <div className={styles.namePlateMeta}>
                <span>Medan, ID</span>
                <span className={styles.relocatePill}>Relocate: Jakarta · Bandung</span>
              </div>
            </div>
          </div>
          <div className={styles.telemetryRow}>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>Primary Runtime</span>
              <span className={styles.telemetryValue}>
                Go / Gin &amp; ASP.NET
              </span>
            </div>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>E2E Verification</span>
              <span className={`${styles.telemetryValue} ${styles.telemetryValueBlue}`}>
                Newman / Playwright
              </span>
            </div>
          </div>
        </div>

        {/* Core Stack */}
        <div className={styles.techStackContainer}>
          <div className={styles.techGrid}>
            {techStack.map((tech) => (
              <div key={tech} className={styles.techBadge} title={tech}>
                <span className={styles.techName}>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
