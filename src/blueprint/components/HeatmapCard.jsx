import { useEffect, useMemo, useState } from "react";
import { mergeContributions } from "../../lib/merge-activity";
import styles from "./HeatmapCard.module.css";

const API = "https://github-contributions-api.jogruber.de/v4";
const PROFILES = ["RakhaYandra", "hyousaa"];

export function HeatmapCard() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all(
      PROFILES.map((login) =>
        fetch(`${API}/${login}?y=last`).then((response) =>
          response.ok ? response.json() : null
        )
      )
    )
      .then((responses) => {
        if (!alive) return;
        const lists = responses
          .filter(Boolean)
          .map((json) => json.contributions ?? []);
        const days = mergeContributions(lists);
        if (days.length) setData(days);
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
    const days = data.slice(-371);
    const grouped = [];
    for (let index = 0; index < days.length; index += 7) {
      grouped.push(days.slice(index, index + 7));
    }
    return grouped;
  }, [data]);

  const total = useMemo(
    () => (data ?? []).reduce((sum, day) => sum + day.count, 0),
    [data]
  );

  if (failed) return null;

  return (
    <aside
      className={styles.card}
      aria-label="GitHub contribution activity for RakhaYandra and hyousaa over the last twelve months"
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
            {total} contributions ·{" "}
            <a
              href="https://github.com/RakhaYandra"
              target="_blank"
              rel="noopener noreferrer"
            >
              @RakhaYandra
            </a>{" "}
            +{" "}
            <a
              href="https://github.com/hyousaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hyousaa
            </a>
          </p>
        </>
      ) : (
        <p className={styles.meta}>Loading activity…</p>
      )}
    </aside>
  );
}
