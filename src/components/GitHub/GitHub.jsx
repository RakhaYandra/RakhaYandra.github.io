import styles from "./GitHub.module.css";
import { GitHubActivity } from "../ui/github-activity";

const PROFILES = ["RakhaYandra", "hyousaa"];

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
          Live contribution graph and most-pushed repositories merged from{" "}
          <a
            href="https://github.com/RakhaYandra"
            target="_blank"
            rel="noopener noreferrer"
          >
            @RakhaYandra
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/hyousaa"
            target="_blank"
            rel="noopener noreferrer"
          >
            @hyousaa
          </a>
          , fetched from the public GitHub API.
        </p>
      </div>

      <div className={styles.cardWrap}>
        <GitHubActivity
          usernames={PROFILES}
          accent="#2563eb"
          showMonths
          className="mx-auto"
          aria-label="GitHub contribution activity for RakhaYandra and hyousaa"
        />
      </div>
    </section>
  );
};
