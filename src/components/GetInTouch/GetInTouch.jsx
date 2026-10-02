import { useState, useEffect, useRef } from "react";
import styles from "./GetInTouch.module.css";

const CHANNELS = [
  {
    id: "linkedin",
    name: "LinkedIn Profile",
    handle: "/in/rakhaputrapebriyandra",
    url: "https://www.linkedin.com/in/rakhaputrapebriyandra",
  },
  {
    id: "github",
    name: "GitHub Source",
    handle: "@RakhaYandra",
    url: "https://www.github.com/RakhaYandra",
  },
  {
    id: "portfolio",
    name: "Live Portfolio",
    handle: "rakhayandra.github.io",
    url: "https://rakhayandra.github.io",
  },
];

export const GetInTouch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  const copyEmail = async () => {
    const email = "rakhaputrapebriyandra272@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className={styles.wrapper} ref={sectionRef}>
      <div className={`${styles.panel} ${isVisible ? styles.fadeInUp : ""}`}>
        <div className={styles.main}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}></span>
            <span>• TRANSMISSION DIRECT</span>
          </div>
          <h2 className={styles.title}>
            Ready to Engineer High-Reliability Systems?
          </h2>
          <p className={styles.subtitle}>
            Open to backend software engineering roles, distributed systems
            challenges, and test harness development. Inquire directly or
            inspect source repositories.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={copyEmail}
              className={styles.primaryButton}
            >
              {copiedEmail ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL ADDRESS"}
            </button>
            <a
              href="mailto:rakhaputrapebriyandra272@gmail.com"
              className={styles.secondaryButton}
            >
              LAUNCH MAIL CLIENT <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className={styles.note}>
            Prefer LinkedIn or email — usually responds within 24h (UTC+7).
          </p>
        </div>
        <div className={styles.channels}>
          <span className={styles.channelsLabel}>
            OFFICIAL VERIFIED CHANNELS
          </span>
          {CHANNELS.map((channel) => (
            <a
              key={channel.id}
              className={styles.channel}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.channelInfo}>
                <span className={styles.channelName}>{channel.name}</span>
                <span className={styles.channelHandle}>{channel.handle}</span>
              </span>
              <span className={styles.channelArrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
