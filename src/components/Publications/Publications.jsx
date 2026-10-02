import { useState, useEffect, useRef } from "react";
import styles from "./Publications.module.css";
import publications from "../../data/publications.json";

const FOCUS = [
  "Sub-50ms ingestion latency for distributed IoT sensor packets",
  "On-device anomaly filtering preventing bad telemetry commits",
  "Statistical verification against empirical ground-truth stations",
];

export const Publications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} id="publications" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span>
          <span>• RESEARCH &amp; PUBLICATIONS</span>
        </div>
        <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
          Peer-Reviewed Academic Output &amp; Architectural Research
        </h2>
      </div>

      {publications.map((publication, id) => (
        <div
          key={id}
          className={`${styles.featured} ${isVisible ? styles.slideUp : ""}`}
        >
          <div className={styles.featuredMain}>
            <div className={styles.featuredTags}>
              <span className={styles.venueBadge}>
                IEEE ICoDSA 2025 CONFERENCE
              </span>
              <span className={styles.doi}>DOI: 10.1109/ICoDSA67155.2025.11157609</span>
            </div>
            <h3 className={styles.featuredTitle}>{publication.title}</h3>
            <p className={styles.featuredDesc}>
              Published in the 2025 International Conference on Data Science and
              Advanced Analytics. Explores low-latency telemetry pipelines from
              edge sensor microcontrollers to cloud backends, applying
              continuous regression algorithms for localized microclimate
              particulate estimation.
            </p>
            <div className={styles.featuredActions}>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                VIEW IEEE PUBLICATION <span aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedPublication(publication)}
                className={styles.ghostButton}
              >
                READ ABSTRACT
              </button>
            </div>
            <span className={styles.authors}>
              Authors: {publication.authors.join(", ")}
            </span>
          </div>
          <div className={styles.focusCard}>
            <span className={styles.focusLabel}>RESEARCH CORE FOCUS</span>
            <ul className={styles.focusList}>
              {FOCUS.map((item) => (
                <li key={item} className={styles.focusItem}>
                  <span className={styles.focusCheck} aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Publication Modal */}
      {selectedPublication && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedPublication(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedPublication(null)}
              aria-label="Close publication details"
            >
              ×
            </button>
            <div className={styles.modalHeader}>
              <span className={styles.venueBadge}>
                {selectedPublication.venue}
              </span>
              <h3 className={styles.modalTitle}>{selectedPublication.title}</h3>
              <span className={styles.authors}>
                {selectedPublication.authors.join(", ")} ·{" "}
                {selectedPublication.publicationDate}
              </span>
            </div>
            <div className={styles.modalBody}>
              {selectedPublication.takeaway && (
                <div className={styles.modalTakeaway}>
                  <h4>Key Takeaway / Technical Impact</h4>
                  <p>{selectedPublication.takeaway}</p>
                </div>
              )}
              <div className={styles.modalAbstract}>
                <h4>Abstract</h4>
                <p>{selectedPublication.abstract}</p>
              </div>
              <div className={styles.keywords}>
                {selectedPublication.keywords.map((keyword) => (
                  <span key={keyword} className={styles.keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
              <div className={styles.modalActions}>
                <a
                  href={selectedPublication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  Access Full Paper
                </a>
                {selectedPublication.doi && (
                  <a
                    href={selectedPublication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ghostButton}
                  >
                    DOI
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
