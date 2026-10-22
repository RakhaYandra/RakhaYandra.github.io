import { useEffect, useRef } from "react";
import styles from "./Sheet.module.css";
import { ZoneContent } from "./ZoneContent";
import { ZONES } from "../data/zones";

const SITE_ANCHORS = {
  about: "#about",
  experience: "#experience",
  skills: "#skills",
  projects: "#projects",
  other: "#education",
};

export function Sheet({ zoneKey, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const index = ZONES.findIndex((item) => item.key === zoneKey);
  const zone = ZONES[index];
  const previous = ZONES[(index - 1 + ZONES.length) % ZONES.length];
  const next = ZONES[(index + 1) % ZONES.length];

  useEffect(() => {
    panelRef.current?.focus();
  }, [zoneKey]);

  const onPanelKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate(previous.key);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate(next.key);
    }
  };

  if (!zone) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <section
        key={zoneKey}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zone-title"
        className={styles.panel}
        onKeyDown={onPanelKeyDown}
      >
        <header className={styles.header}>
          <div>
            <p className={`${styles.code} mono`}>
              {zone.code} / {zoneKey.toUpperCase()}
            </p>
            <h2 id="zone-title" className={styles.title}>
              {zone.label}
            </h2>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close zone"
          >
            ✕
          </button>
        </header>

        <ZoneContent zoneKey={zoneKey} />

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => onNavigate(previous.key)}
            aria-label={`Previous zone: ${previous.label}`}
          >
            ← {previous.label}
          </button>
          <a
            className={styles.siteLink}
            href={`/${SITE_ANCHORS[zoneKey] || ""}`}
          >
            Full section →
          </a>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => onNavigate(next.key)}
            aria-label={`Next zone: ${next.label}`}
          >
            {next.label} →
          </button>
        </footer>
      </section>
    </div>
  );
}
