import { useState, useEffect, useRef } from "react";
import styles from "./Faq.module.css";
import { Faq as RareFaq } from "../ui/faq";
import faqs from "../../data/faq.json";

const FAQS = faqs.map((item, index) => ({
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
