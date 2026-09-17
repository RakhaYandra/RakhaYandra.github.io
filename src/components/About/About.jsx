import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.subtitle}>
          Passionate about creating innovative solutions through technology
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={getImageUrl("about/aboutImage.jpg")}
            alt="Rakha Putra Pebri Yandra"
            className={styles.aboutImage}
          />
          <div className={styles.imageGlow}></div>

          {/* Quick Info Card */}
          <div className={styles.quickInfo}>
            <h4>Quick Info</h4>
            <div className={styles.quickStats}>
              <div className={styles.quickStat}>
                <span className={styles.number}>3.81</span>
                <span className={styles.label}>GPA / Cum Laude</span>
              </div>
              <div className={styles.quickStat}>
                <span className={styles.number}>5+</span>
                <span className={styles.label}>Deployed Solutions</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.description}>
            <p>
              I am an{" "}
              <span className={styles.highlight}>
                Information Systems graduate (Cum Laude)
              </span>{" "}
              from Telkom University. My background bridges the gap between software development and systems analysis, allowing me to approach technology with both a technical mindset and a business-oriented perspective.
            </p>
            <p>
              I have professional experience in full-stack development, API engineering, systems documentation, and QA testing. Having worked across corporate environments like Telkomsel and startups like Technova, I adapt quickly to different tools, methodologies, and cross-functional team structures.
            </p>
            <p>
              My goal is to deliver value across diverse IT functions — strongest in backend APIs and test automation — whether in software engineering, systems analysis, QA, or technology consulting.
            </p>
          </div>

          <div className={styles.personalInfo}>
            <div className={styles.personalInfoHeader}>
              <div className={styles.icon}>👤</div>
              <h3>Personal Information</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>GPA</span>
                <span className={styles.infoValue}>3.81 (Cum Laude)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>Medan, Indonesia</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Education</span>
                <span className={styles.infoValue}>Telkom University</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Degree</span>
                <span className={styles.infoValue}>Information Systems</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Experience</span>
                <span className={styles.infoValue}>1.5+ Yrs (Combined)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Availability</span>
                <span className={styles.infoValue}>Open to Opportunities</span>
              </div>
            </div>
          </div>

          <div className={styles.aboutItems}>
            <div className={styles.aboutItemsHeader}>
              <div className={styles.icon}>⚡</div>
              <h3>Capabilities & Value</h3>
            </div>
            <div className={`${styles.aboutItem} ${styles.frontend}`}>
              <div className={styles.iconContainer}>
                <img
                  src={getImageUrl("about/serverIcon.png")}
                  alt="Software & API Development"
                />
              </div>
              <div className={styles.aboutItemText}>
                <h3>Software & API Development</h3>
                <p>
                  Designing and building reliable frontend interfaces and backend services. Proficient in React, Laravel, Node.js, and Golang, with a focus on database optimization (PostgreSQL, SQL Server) and scalable RESTful API architectures.
                </p>
                <div className={styles.skills}>
                  <span>React</span>
                  <span>Laravel</span>
                  <span>Golang</span>
                  <span>Gin/JWT</span>
                  <span>Blazor/.NET</span>
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>MySQL</span>
                </div>
              </div>
            </div>
            <div className={`${styles.aboutItem} ${styles.backend}`}>
              <div className={styles.iconContainer}>
                <img
                  src={getImageUrl("about/uiIcon.png")}
                  alt="Systems & Business Analysis"
                />
              </div>
              <div className={styles.aboutItemText}>
                <h3>Systems & Business Analysis</h3>
                <p>
                  Translating complex business requirements into clear technical specifications. Experienced in business process modeling, system design, and comprehensive API documentation using Swagger, bridging the gap between business goals and tech teams.
                </p>
                <div className={styles.skills}>
                  <span>System Design</span>
                  <span>Swagger (API Docs)</span>
                  <span>Business Process</span>
                  <span>Figma</span>
                  <span>Data Flows</span>
                </div>
              </div>
            </div>
            <div className={`${styles.aboutItem} ${styles.business}`}>
              <div className={styles.iconContainer}>
                <img
                  src={getImageUrl("about/cursorIcon.png")}
                  alt="QA Testing & Technical Collaboration"
                />
              </div>
              <div className={styles.aboutItemText}>
                <h3>QA Testing & Technical Collaboration</h3>
                <p>
                  Ensuring application quality, performance, and stability. Skilled in automated end-to-end testing with Cypress, supporting User Acceptance Testing (UAT), and collaborating in Agile teams to deliver production-ready software.
                </p>
                <div className={styles.skills}>
                  <span>Cypress (QA)</span>
                  <span>Playwright</span>
                  <span>Newman</span>
                  <span>Agile/Scrum</span>
                  <span>Git & Version Control</span>
                  <span>UAT Support</span>
                  <span>API Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
