import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import { BlueprintCanvas } from "./components/BlueprintCanvas";
import { Sheet } from "./components/Sheet";
import { HeatmapCard } from "./components/HeatmapCard";
import { Palette } from "./components/Palette";
import { ZONES } from "./data/zones";
import { useTheme } from "../hooks/useTheme";

export function BlueprintApp() {
  const { theme, toggle } = useTheme();
  const [activeZone, setActiveZone] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const closeZone = useCallback(() => setActiveZone(null), []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }
      if (event.key !== "Escape") return;
      if (paletteOpen) setPaletteOpen(false);
      else closeZone();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, closeZone]);

  const highlighted = hovered || activeZone;
  const highlightedZone = ZONES.find((zone) => zone.key === highlighted);

  return (
    <div className={styles.page}>
      <BlueprintCanvas
        activeZone={activeZone}
        theme={theme}
        onHover={setHovered}
        onSelect={setActiveZone}
        onReady={() => setReady(true)}
      />

      <header className={styles.hud}>
        <div className={styles.hudLeft}>
          <a className={styles.backLink} href="/">
            ← Classic view
          </a>
          <div>
            <p className={styles.sheetCode}>SHEET A-01 / BLUEPRINT CV</p>
            <p className={styles.sheetTitle}>Rakha Putra Pebri Yandra</p>
          </div>
        </div>
        <div className={styles.hudRight}>
          <p className={`${styles.readout} mono`}>
            {highlightedZone
              ? `${highlightedZone.code} · ${highlightedZone.label.toUpperCase()}`
              : "PLAN 22.00 × 14.00 U · SCALE 1:100"}
          </p>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open zone palette (Ctrl or Command + K)"
          >
            <span className="mono">⌘K</span>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <nav className={styles.zoneNav} aria-label="Blueprint zones">
        {ZONES.map((zone) => (
          <button
            key={zone.key}
            type="button"
            className={`${styles.zoneButton} ${
              activeZone === zone.key ? styles.zoneButtonActive : ""
            }`}
            aria-current={activeZone === zone.key ? "true" : undefined}
            onClick={() => setActiveZone(zone.key)}
            onMouseEnter={() => setHovered(zone.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={`${styles.zoneCode} mono`}>{zone.code}</span>
            <span className={styles.zoneLabel}>{zone.label}</span>
          </button>
        ))}
      </nav>

      <HeatmapCard />

      <p className={`${styles.hint} mono`}>
        HOVER TO RAISE · CLICK TO OPEN · TAB / ENTER FOR KEYBOARD
      </p>

      {!ready && (
        <div className={styles.loading} role="status">
          <span className={`${styles.spinner} mono`} aria-hidden="true" />
          <span className="mono">RENDERING BLUEPRINT…</span>
        </div>
      )}

      <Palette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenZone={setActiveZone}
      />

      {activeZone && (
        <Sheet
          zoneKey={activeZone}
          onClose={closeZone}
          onNavigate={setActiveZone}
        />
      )}
    </div>
  );
}
