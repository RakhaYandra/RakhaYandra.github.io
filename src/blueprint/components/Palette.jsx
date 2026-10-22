import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Palette.module.css";
import { ZONES } from "../data/zones";

const LINKS = [
  { label: "Classic portfolio", hint: "rakhayandra.github.io", href: "/" },
  {
    label: "GitHub",
    hint: "@RakhaYandra",
    href: "https://github.com/RakhaYandra",
  },
  {
    label: "LinkedIn",
    hint: "/in/rakhaputrapebriyandra",
    href: "https://www.linkedin.com/in/rakhaputrapebriyandra",
  },
];

export function Palette({ open, onClose, onOpenZone }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const zones = ZONES.filter(
      (zone) =>
        !q ||
        zone.label.toLowerCase().includes(q) ||
        zone.code.toLowerCase().includes(q)
    ).map((zone) => ({
      id: zone.key,
      label: zone.label,
      hint: `${zone.code} · ZONE`,
      action: () => {
        onOpenZone(zone.key);
        onClose();
      },
    }));
    const links = LINKS.filter(
      (link) => !q || link.label.toLowerCase().includes(q)
    ).map((link) => ({
      id: link.href,
      label: link.label,
      hint: link.hint,
      href: link.href,
    }));
    return [...zones, ...links];
  }, [query, onOpenZone, onClose]);

  if (!open) return null;

  const activateFirst = () => {
    const first = results[0];
    if (!first) return;
    if (first.href) window.location.href = first.href;
    else first.action();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Jump to a zone"
      >
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              activateFirst();
            }
          }}
          placeholder="Jump to zone, link, or section…"
          aria-label="Search zones and links"
        />
        <ul className={styles.list}>
          {results.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <a className={styles.item} href={item.href}>
                  <span>{item.label}</span>
                  <span className={`${styles.hint} mono`}>{item.hint}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.item}
                  onClick={item.action}
                >
                  <span>{item.label}</span>
                  <span className={`${styles.hint} mono`}>{item.hint}</span>
                </button>
              )}
            </li>
          ))}
          {results.length === 0 && (
            <li className={styles.empty}>No match. Try “projects” or “contact”.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
