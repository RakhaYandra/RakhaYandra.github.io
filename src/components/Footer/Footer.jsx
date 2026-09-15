import styles from "./Footer.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Light glow effects */}
      <div className={styles.glowOrb}></div>

      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h3>Rakha Putra Pebri Yandra</h3>
            <p>Information Systems Generalist</p>
          </div>

          <div className={styles.status}>
            <div className={styles.statusDot}></div>
            <span>Open to full-time career opportunities</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Rakha Yandra. All rights reserved.
          </p>
          <div className={styles.links}>
            <a
              href="https://github.com/RakhaYandra"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rakhaputrapebriyandra"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
            <a href="mailto:rakhaputrapebriyandra272@gmail.com" className={styles.link}>
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
