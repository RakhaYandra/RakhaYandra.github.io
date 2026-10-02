import { useState, useEffect, useRef } from "react";
import styles from "./Skills.module.css";

const MODULES = [
  {
    index: "MODULE 01 // RUNTIME",
    title: "Backend & API Architecture",
    description:
      "Low-latency concurrent HTTP services and enterprise monolithic APIs built with strict separation of concerns, clean domain interfaces, and idempotent logic.",
    chips: ["Go / Golang", "Gin Engine", "ASP.NET Core", "C# / EF Core", "Blazor", "REST OpenAPI"],
  },
  {
    index: "MODULE 02 // VERIFICATION",
    title: "QA & Deterministic Testing",
    description:
      "Empirical verification pipelines where CI/CD blocks regressions through automated headless runner collections and rigorous assertion metrics.",
    chips: ["Newman CLI", "Postman", "Cypress E2E", "Playwright"],
    highlight: "100% Assertion",
  },
  {
    index: "MODULE 03 // FRONTEND",
    title: "Client & Administrative UI",
    description:
      "High-responsiveness Single-Page Applications and live administrative telemetry cockpits designed for instant visual clarity and zero-latency user flows.",
    chips: ["React.js SPA", "Tailwind CSS", "Vite", "State Machine", "Semantic HTML"],
  },
  {
    index: "MODULE 04 // PERSISTENCE",
    title: "Data Persistence & IoT",
    description:
      "Relational schemas optimized for referential integrity, event streaming, real-time Telegram bot webhook handlers, and micro-sensor telemetry ingestion.",
    chips: ["PostgreSQL", "MySQL / SQLite", "Telegram API", "IoT Sensors", "ML Inference"],
  },
];

const TELEMETRY = [
  { label: "TOTAL ASSERTIONS", value: "267+", sub: "Across 4 Flagships" },
  { label: "NEWMAN SUITES", value: "112 / 112", sub: "100% Pass Rate", ok: true },
  { label: "QA SUITES", value: "146 / 146", sub: "Verified Green", ok: true },
  { label: "CYPRESS & PLAYWRIGHT", value: "46 / 46", sub: "Zero Flake E2E" },
];

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} id="skills" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={`${styles.eyebrow} ${isVisible ? styles.fadeInUp : ""}`}>
          <span className={styles.eyebrowDot}></span>
          <span>• THE INSIGHT &amp; ARCHITECTURE</span>
        </div>
        <h2 className={`${styles.title} ${isVisible ? styles.fadeInUp : ""}`}>
          Institution-Caliber Backend Reliability, Engineered for Production.
        </h2>
        <p className={`${styles.subtitle} ${isVisible ? styles.fadeInUp : ""}`}>
          Modern mission-critical web applications require more than functional
          endpoints. They demand deterministic contract guarantees, real-time
          stress testing, and structured persistence layers that resist
          edge-case failure.
        </p>
      </div>

      <div className={`${styles.grid} ${isVisible ? styles.fadeInUp : ""}`}>
        {MODULES.map((mod) => (
          <div key={mod.index} className={styles.card}>
            <span className={styles.cardIndex}>{mod.index}</span>
            <h3 className={styles.cardTitle}>{mod.title}</h3>
            <p className={styles.cardDesc}>{mod.description}</p>
            <div className={styles.chips}>
              {mod.chips.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
              {mod.highlight && (
                <span className={`${styles.chip} ${styles.chipOk}`}>
                  {mod.highlight}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.banner} ${isVisible ? styles.fadeInUp : ""}`}>
        <div className={styles.bannerHead}>
          <span className={styles.bannerLabel}>SYSTEM TELEMETRY SUMMARY</span>
          <h4 className={styles.bannerTitle}>
            All Production Contracts Cleared
          </h4>
          <p className={styles.bannerDesc}>
            Continuous integration runs Newman automated tests against all CRUD
            invariants before deployment staging.
          </p>
        </div>
        <div className={styles.bannerStats}>
          {TELEMETRY.map((t) => (
            <div key={t.label} className={styles.statTile}>
              <span className={styles.statLabel}>{t.label}</span>
              <span className={styles.statValue}>{t.value}</span>
              <span
                className={`${styles.statSub} ${t.ok ? styles.statSubOk : ""}`}
              >
                {t.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
