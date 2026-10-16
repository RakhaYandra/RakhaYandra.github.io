import styles from "./GitHub.module.css";
import { GitHubActivity } from "../ui/github-activity";

export const GitHub = () => {
  return (
    <section className={styles.container} id="open-source">
      <div className={styles.sectionHeader}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span>
          <span>• OPEN SOURCE ACTIVITY</span>
        </div>
        <h2 className={styles.title}>Shipping in Public, Every Week</h2>
        <p className={styles.subtitle}>
          Live contribution graph and most-pushed repositories, fetched from
          the public GitHub API.{" "}
          <a
            href="https://github.com/RakhaYandra"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full profile on GitHub →
          </a>
        </p>
      </div>

      <div className={styles.cardWrap}>
        <GitHubActivity
          username="RakhaYandra"
          accent="#2563eb"
          showMonths
          className="mx-auto"
          aria-label="GitHub contribution activity for RakhaYandra"
        />
      </div>
    </section>
  );
};
