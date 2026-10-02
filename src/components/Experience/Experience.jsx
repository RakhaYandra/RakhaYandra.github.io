import { useState, useEffect, useRef } from "react";

import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
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
    <section className={styles.container} id="experience" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span>
          <span>• CHRONOLOGY &amp; LEADERSHIP</span>
        </div>
        <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
          Career Track, Professional Deployments &amp; Academic Leadership
        </h2>
        <p className={`${styles.subtitle} ${isVisible ? styles.slideUp : ""}`}>
          A track record spanning freelance backend and frontend production
          deliveries, corporate internships, and university laboratory
          leadership.
        </p>
      </div>
      <span className={styles.timelineLabel}>
        PRODUCTION TIMELINE // {history.length} TENURES
      </span>
      <div className={styles.experienceGrid}>
        {history.map((historyItem, id) => {
          return (
            <div
              key={id}
              className={`${styles.experienceCard} ${
                isVisible ? styles.slideUp : ""
              }`}
              style={{ "--delay": `${id * 0.1}s` }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.logoContainer}>
                    <img
                      src={getImageUrl(historyItem.imageSrc)}
                      alt={`${historyItem.organisation} Logo`}
                      className={styles.companyLogo}
                    />
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardTopRow}>
                      <h3 className={styles.position}>{historyItem.organisation}</h3>
                      <span className={styles.duration}>
                        {`${historyItem.startDate} – ${historyItem.endDate}`}
                      </span>
                    </div>
                    <h4 className={styles.company}>{historyItem.role}</h4>
                  </div>
                </div>
                <ul className={styles.responsibilities}>
                  {historyItem.experiences.map((experience, expId) => {
                    return <li key={expId}>{experience}</li>;
                  })}
                </ul>
                <div className={styles.techStack}>
                  {historyItem.techStack &&
                    historyItem.techStack.map((tech, techId) => (
                      <span key={techId} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
