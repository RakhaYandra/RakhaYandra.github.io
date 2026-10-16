import { useState, useEffect, useRef } from "react";
import styles from "./Faq.module.css";
import { Faq as RareFaq } from "../ui/faq";

const FAQS = [
  {
    q: "How do you ensure zero regression in production backend APIs?",
    a: "Every backend API is coupled with an automated Newman Postman collection containing assertion scripts for status codes, schema parity, header contracts, and relational idempotency. In projects like LifeOS (75/75 endpoints passed) and Shiftbase (15/15 passed), these test harnesses run in headless CLI mode prior to any merge, guaranteeing no silent failure modes escape into production.",
  },
  {
    q: "What is your architectural philosophy when choosing between Go and .NET?",
    a: "I select the runtime based on domain operational requirements: Go (Gin) is leveraged when ultra-low memory overhead, lightweight container footprints, and high concurrent connection handling (via goroutines and channels) are paramount. ASP.NET Core with Blazor is selected for enterprise environments demanding rapid domain modeling, complex Entity Framework ORM migrations, and cohesive server-side UI synchronization.",
  },
  {
    q: "What did your IEEE IoT & Machine Learning research entail?",
    a: "Presented at IEEE ICoDSA 2025 (DOI: 10.1109/ICoDSA67155.2025.11157609), the research focused on designing distributed micro-sensor arrays measuring ambient particulate matter (PM2.5, PM10) and gases, feeding telemetry to an inference backend that models micro-climate air quality variations in real time, validating data integrity against calibrated reference stations.",
  },
  {
    q: "Are you available for remote, hybrid, or relocation contracts?",
    a: "Yes. Currently based in Medan (UTC+7), I am actively open to institutional full-time software engineering roles, distributed remote contracts across global timezones, as well as on-site positions with relocation to Jakarta / Bandung.",
  },
].map((item, index) => ({
  id: `faq-${index + 1}`,
  question: item.q,
  answer: item.a,
}));

export const Faq = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} id="faq" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span>
          <span>• VERIFICATION FAQ</span>
        </div>
        <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
          System Architecture Contracts &amp; FAQ
        </h2>
        <a className={styles.headerLink} href="#contact">
          HAVE ARCHITECTURAL QUESTIONS? <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={isVisible ? styles.slideUp : undefined}>
        <RareFaq
          items={FAQS}
          aria-label="Frequently asked questions"
          className="max-w-none"
        />
      </div>
    </section>
  );
};
