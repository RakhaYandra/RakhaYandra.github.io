import { useState, useEffect, useRef } from "react";
import styles from "./Education.module.css";

const educationData = [
  {
    id: "university",
    institution: "Telkom University — Bachelor of Information Systems",
    degree: "S.Kom",
    major: "Enterprise Information Systems, Distributed Databases, Verification Harnesses",
    period: "2021 – 2025",
    location: "Bandung, Indonesia",
    status: "Cum Laude",
    gpa: "3.81 / 4.00",
    description:
      "Graduated with Cum Laude distinction. Specialized in Enterprise Information Systems, Distributed Database Architectures, and Automated Verification Harnesses.",
    highlights: [
      "Distributed Systems & Cloud Architecture",
      "Database Management Systems (RDBMS & NoSQL)",
      "Software Verification, QA & Testing",
      "Enterprise Architecture (TOGAF / Zachman)",
      "Algorithms & Data Structures",
    ],
  },
  {
    id: "highschool",
    institution: "SMK Telkom 1 Medan",
    degree: "High School Diploma",
    major: "Telecommunications Engineering",
    period: "2018 – 2021",
    location: "Medan, Indonesia",
    status: "Graduated",
    gpa: null,
    description:
      "Specialized in Telecommunications Engineering with focus on Electronics and Network Systems. Technical foundation for systems thinking.",
    highlights: [
      "Electronics & Telecommunications",
      "Fiber Optics Technology",
      "Radio Communication Systems",
      "Fiber to the Home (FTTH)",
    ],
  },
];

const achievements = [
  {
    label: "GRANT",
    title: "2023 Student Creativity Program (PKM) Grant Recipient",
    description:
      "Product designer in a team developing a secure digital lock payment system using IoT and mobile technologies.",
  },
  {
    label: "HONORS",
    title: "Cum Laude Graduate",
    description:
      "Graduated with honors, demonstrating exceptional academic performance and commitment to excellence.",
  },
];

export const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className={styles.container} ref={sectionRef}>
      <div className={styles.panel}>
        <div className={styles.panelMain}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}></span>
            <span>• ACADEMIC CREDENTIALS &amp; MERIT</span>
          </div>
          <h2 className={`${styles.title} ${isVisible ? styles.fadeInUp : ""}`}>
            Telkom University — Bachelor of Information Systems
          </h2>
          <p className={styles.subtitle}>
            Graduated with <strong>Cum Laude</strong> academic distinction.
            Specialized in Enterprise Information Systems, Distributed Database
            Architectures, and Automated Verification Harnesses.
          </p>
          <div className={styles.meritRow}>
            <div className={styles.meritTile}>
              <span className={styles.meritLabel}>Degree</span>
              <span className={styles.meritValue}>S.Kom</span>
            </div>
            <div className={styles.meritTile}>
              <span className={styles.meritLabel}>GPA / Honors</span>
              <span className={`${styles.meritValue} ${styles.meritBlue}`}>
                3.81 / 4.00
              </span>
            </div>
            <div className={styles.meritTile}>
              <span className={styles.meritLabel}>Conferral Status</span>
              <span className={`${styles.meritValue} ${styles.meritGreen}`}>
                Cum Laude
              </span>
            </div>
          </div>
        </div>
        <div className={styles.courseCard}>
          <span className={styles.courseLabel}>PRIMARY COURSEWORK</span>
          <ul className={styles.courseList}>
            {educationData[0].highlights.map((h) => (
              <li key={h} className={styles.courseItem}>
                <span className={styles.courseDot}></span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.timeline}>
        {educationData.map((education, index) => (
          <div
            key={education.id}
            className={`${styles.timelineItem} ${isVisible ? styles.fadeInUp : ""}`}
            style={{ "--delay": `${index * 0.15}s` }}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.institution}>{education.institution}</h3>
                <div className={styles.location}>{education.location}</div>
              </div>
              <div className={styles.periodCol}>
                <span className={styles.period}>{education.period}</span>
                <span className={styles.status}>{education.status}</span>
              </div>
            </div>
            <h4 className={styles.degree}>{education.degree}</h4>
            <p className={styles.major}>{education.major}</p>
            {education.gpa && <div className={styles.gpa}>GPA: {education.gpa}</div>}
            <p className={styles.description}>{education.description}</p>
            <div className={styles.highlights}>
              {education.highlights.map((highlight) => (
                <span key={highlight} className={styles.highlightItem}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <div key={achievement.title} className={styles.achievementCard}>
            <span className={styles.achievementLabel}>{achievement.label}</span>
            <h4 className={styles.achievementTitle}>{achievement.title}</h4>
            <p className={styles.achievementDescription}>
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
