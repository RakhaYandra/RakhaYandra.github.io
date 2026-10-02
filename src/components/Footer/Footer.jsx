import styles from "./Footer.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.indexGrid}>
          <div className={styles.indexCol}>
            <span className={styles.indexLabel}>INDEX 001 // NAVIGATION</span>
            <a href="#skills">Architecture Overview</a>
            <a href="#projects">Production Deployments</a>
            <a href="#experience">Institutional Career Track</a>
            <a href="#education">Academic Background</a>
          </div>
          <div className={styles.indexCol}>
            <span className={styles.indexLabel}>INDEX 002 // CORE STACK</span>
            <span>Go (Gin) &amp; ASP.NET Core EF</span>
            <span>Automated Newman &amp; Postman CI</span>
            <span>Zero-Flake E2E Playwright</span>
          </div>
          <div className={styles.indexCol}>
            <span className={styles.indexLabel}>INDEX 003 // RESEARCH</span>
            <a
              href="https://rakhayandra.github.io/#project-thesis"
              target="_blank"
              rel="noopener noreferrer"
            >
              IEEE ICoDSA 2025 Air Quality IoT
            </a>
            <a href="#publications">Deterministic API Regression Specs</a>
            <a href="#writing">Backend Architecture Notes</a>
          </div>
          <div className={styles.indexCol}>
            <span className={styles.indexLabel}>INDEX 004 // DIRECT</span>
            <span className={styles.email}>
              rakhaputrapebriyandra272@gmail.com
            </span>
            <span className={styles.locale}>Medan / Bandung / UTC+7</span>
            <div className={styles.socialRow}>
              <a
                href="https://github.com/RakhaYandra"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/rakhaputrapebriyandra"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>
            © {currentYear} RAKHA PUTRA PEBRI YANDRA • SYSTEM VERIFIED ARCHITECTURE
          </span>
          <span>RUNTIME: GO // .NET // LINUX</span>
        </div>
      </div>
      <div className={styles.watermark} aria-hidden="true">
        RAKHA YANDRA
      </div>
    </footer>
  );
};
