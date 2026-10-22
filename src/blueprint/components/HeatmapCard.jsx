import { useEffect, useMemo, useState } from "react";
import styles from "./HeatmapCard.module.css";

const API = "https://github-contributions-api.jogruber.de/v4/RakhaYandra?y=last";

export function HeatmapCard() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(API)
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (alive && json) setData(json);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!data) return [];
    const days = data.contributions.slice(-371);
    const grouped = [];
    for (let index = 0; index < days.length; index += 7) {
      grouped.push(days.slice(index, index + 7));
    }
    return grouped;
  }, [data]);

  if (failed) return null;

  return (
    <aside
      className={styles.card}
      aria-label="GitHub contribution activity for the last twelve months"
    >
      <p className={styles.label}>GITHUB ACTIVITY · LAST 12 MONTHS</p>
      {data ? (
        <>
          <div className={styles.grid}>
            {weeks.map((week) => (
              <div key={week[0].date} className={styles.week}>
                {week.map((day) => (
                  <span
                    key={day.date}
                    className={styles.cell}
                    data-level={day.level}
                    title={`${day.date} · ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className={styles.meta}>
            {data.total.lastYear} contributions ·{" "}
            <a
              href="https://github.com/RakhaYandra"
              target="_blank"
              rel="noopener noreferrer"
            >
              @RakhaYandra →
            </a>
          </p>
        </>
      ) : (
        <p className={styles.meta}>Loading activity…</p>
      )}
    </aside>
  );
}
