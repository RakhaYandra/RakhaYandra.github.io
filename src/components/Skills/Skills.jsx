import { useState, useEffect, useRef } from "react";
import styles from "./Skills.module.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { AnimatedCounter } from "../ui/animated-counter";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import skillsData from "../../data/skills.json";

const PROFICIENCY = new Map(
  Object.values(skillsData.categories)
    .flat()
    .map((s) => [s.title, s.proficiency])
);

const CHIP_SKILL = {
  "Go / Golang": "Golang",
  "ASP.NET Core": "Blazor/.NET",
  "C# / EF Core": "Blazor/.NET",
  "Newman CLI": "Newman",
  "Cypress E2E": "Cypress (QA Testing)",
  "React.js SPA": "React",
  "MySQL / SQLite": "MySQL",
};

const MODULES = [
  {
    id: "runtime",
    index: "MODULE 01 // RUNTIME",
    title: "Backend & API Architecture",
    description:
      "Low-latency concurrent HTTP services and enterprise monolithic APIs built with strict separation of concerns, clean domain interfaces, and idempotent logic.",
    chips: ["Go / Golang", "Gin Engine", "ASP.NET Core", "C# / EF Core", "Blazor", "REST OpenAPI"],
  },
  {
    id: "verification",
    index: "MODULE 02 // VERIFICATION",
    title: "QA & Deterministic Testing",
    description:
      "Empirical verification pipelines where CI/CD blocks regressions through automated headless runner collections and rigorous assertion metrics.",
    chips: ["Newman CLI", "Postman", "Cypress E2E", "Playwright"],
    highlight: "100% Assertion",
  },
  {
    id: "frontend",
    index: "MODULE 03 // FRONTEND",
    title: "Client & Administrative UI",
    description:
      "High-responsiveness Single-Page Applications and live administrative telemetry cockpits designed for instant visual clarity and zero-latency user flows.",
    chips: ["React.js SPA", "Tailwind CSS", "Vite", "State Machine", "Semantic HTML"],
  },
  {
    id: "persistence",
    index: "MODULE 04 // PERSISTENCE",
    title: "Data Persistence & IoT",
    description:
      "Relational schemas optimized for referential integrity, event streaming, real-time Telegram bot webhook handlers, and micro-sensor telemetry ingestion.",
    chips: ["PostgreSQL", "MySQL / SQLite", "Telegram API", "IoT Sensors", "ML Inference"],
  },
];

const TELEMETRY = [
  { label: "TOTAL ASSERTIONS", value: 267, suffix: "+", sub: "Across 4 Flagships" },
  { label: "NEWMAN SUITES", value: 112, prefix: "", suffix: " / 112", sub: "100% Pass Rate", ok: true },
  { label: "QA SUITES", value: 146, suffix: " / 146", sub: "Verified Green", ok: true },
  { label: "CYPRESS & PLAYWRIGHT", value: 46, suffix: " / 46", sub: "Zero Flake E2E" },
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

      <Tabs
        defaultValue={MODULES[0].id}
        className={`${styles.tabs} ${isVisible ? styles.fadeInUp : ""}`}
      >
        <TabsList aria-label="Capability modules">
          {MODULES.map((mod) => (
            <TabsTrigger key={mod.id} value={mod.id}>
              {mod.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {MODULES.map((mod) => (
          <TabsContent key={mod.id} value={mod.id} className={styles.panel}>
            <span className={styles.cardIndex}>{mod.index}</span>
            <h3 className={styles.cardTitle}>{mod.title}</h3>
            <p className={styles.cardDesc}>{mod.description}</p>
            <div className={styles.chips}>
              {mod.chips.map((chip) => {
                const level = PROFICIENCY.get(CHIP_SKILL[chip] ?? chip);
                if (!level) {
                  return (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  );
                }
                return (
                  <Tooltip key={chip}>
                    <TooltipTrigger asChild>
                      <span className={styles.chip} tabIndex={0}>
                        {chip}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Proficiency: {level}%</TooltipContent>
                  </Tooltip>
                );
              })}
              {mod.highlight && (
                <span className={`${styles.chip} ${styles.chipOk}`}>
                  {mod.highlight}
                </span>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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
              <span className={styles.statValue}>
                <AnimatedCounter value={t.value} suffix={t.suffix} />
              </span>
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
