import { useState, useEffect, useRef } from "react";
import styles from "./Skills.module.css";
import { getImageUrl } from "../../utils";
import skillsData from "../../data/skills.json";

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Development");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} id="skills" ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.codePattern}></div>
        <div className={styles.floatingShapes}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={styles.shape}
              style={{
                "--delay": `${i * 0.5}s`,
                "--duration": `${8 + i * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <div className={`${styles.badge} ${isVisible ? styles.fadeInUp : ""}`}>
          <div className={styles.badgeIcon}>⚡</div>
          <span>Skills & Technologies</span>
        </div>
        <h2 className={`${styles.title} ${isVisible ? styles.fadeInUp : ""}`}>
          My Technical
          <span className={styles.titleAccent}> Arsenal</span>
        </h2>
        <p className={`${styles.subtitle} ${isVisible ? styles.fadeInUp : ""}`}>
          Technologies and tools I use to bring digital ideas to life, plus what
          I&apos;m currently exploring
        </p>
      </div>

      {/* Category Tabs */}
      <div
        className={`${styles.categoryTabs} ${isVisible ? styles.fadeInUp : ""}`}
      >
        {Object.keys(skillsData.categories).map((category) => (
          <button
            key={category}
            className={`${styles.categoryTab} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div
        className={`${styles.skillsGrid} ${isVisible ? styles.fadeInUp : ""}`}
      >
        {Object.entries(skillsData.categories).map(
          ([category, categorySkills]) => (
            <div
              key={category}
              className={`${styles.skillCategory} ${
                activeCategory === category ? styles.activeCategory : ""
              }`}
            >
              <div className={styles.skillsList}>
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.title}
                    className={styles.skillCard}
                    style={{ "--delay": `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredSkill(skill.title)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className={styles.skillIcon}>
                      {imageErrors[skill.title] ? (
                        <div className={styles.fallbackIcon}>
                          <span className={styles.fallbackText}>{skill.title.charAt(0)}</span>
                        </div>
                      ) : (
                        <img
                          src={getImageUrl(skill.imageSrc)}
                          alt={skill.title}
                          onError={() => {
                            setImageErrors((prev) => ({ ...prev, [skill.title]: true }));
                          }}
                        />
                      )}
                      <div
                        className={`${styles.skillGlow} ${
                          hoveredSkill === skill.title ? styles.glowActive : ""
                        }`}
                      ></div>
                    </div>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.title}</span>
                      <div className={styles.skillLevel}>
                        <div className={styles.skillBar}>
                          <div
                            className={styles.skillProgress}
                            style={{
                              "--progress": `${skill.proficiency}%`,
                            }}
                          ></div>
                        </div>
                        <span className={styles.skillPercentage}>
                          {skill.proficiency >= 80
                            ? "Expert"
                            : skill.proficiency >= 60
                            ? "Advanced"
                            : skill.proficiency >= 40
                            ? "Intermediate"
                            : "Beginner"}
                        </span>
                      </div>
                      {hoveredSkill === skill.title && (
                        <div className={styles.skillTooltip}>
                          <span className={styles.proficiencyLevel}>
                            {skill.proficiency >= 80
                              ? "Expert"
                              : skill.proficiency >= 60
                              ? "Advanced"
                              : skill.proficiency >= 40
                              ? "Intermediate"
                              : "Beginner"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Currently Learning Section */}
      <div
        className={`${styles.learningSection} ${
          isVisible ? styles.fadeInUp : ""
        }`}
      >
        <div className={styles.learningHeader}>
          <div className={styles.learningBadge}>
            <div className={styles.badgeIcon}>🚀</div>
            <span>Currently Exploring</span>
          </div>
          <h3 className={styles.learningTitle}>What I&apos;m Learning Now</h3>
          <p className={styles.learningSubtitle}>
            Continuously expanding my skillset with new technologies and
            frameworks
          </p>
        </div>

        <div className={styles.currentlyLearningContainer}>
          {skillsData.currentlyLearning &&
            skillsData.currentlyLearning.map((skill) => (
              <div key={skill.title} className={styles.learningItem}>
                <div className={styles.learningCardHeader}>
                  <div className={styles.learningIcon}>
                    {imageErrors[skill.title] ? (
                      <div className={styles.fallbackIcon}>
                        <span className={styles.fallbackText}>{skill.title.charAt(0)}</span>
                      </div>
                    ) : (
                      <img
                        src={getImageUrl(skill.imageSrc)}
                        alt={skill.title}
                        className={styles.learningIconImage}
                        onError={() => {
                          setImageErrors((prev) => ({ ...prev, [skill.title]: true }));
                        }}
                      />
                    )}
                    <div className={styles.learningGlow}></div>
                  </div>
                  <div className={styles.learningStatus}>
                    <span className={styles.statusBadge}>{skill.status}</span>
                    <span className={styles.startDate}>
                      Started {skill.startDate}
                    </span>
                  </div>
                </div>
                <div className={styles.learningContent}>
                  <h4 className={styles.learningSkillTitle}>{skill.title}</h4>
                  <p className={styles.learningDescription}>
                    {skill.description}
                  </p>
                  <div className={styles.learningProgress}>
                      <div className={styles.progressHeader}>
                        <span>Progress</span>
                        <span>{skill.status}</span>
                      </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ "--progress": `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.learningActions}>
                    <div className={styles.focusAreas}>
                      {skill.focusAreas.map((area, idx) => (
                        <span key={idx} className={styles.focusArea}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Proficiency Overview */}
      <div
        className={`${styles.proficiencySection} ${
          isVisible ? styles.fadeInUp : ""
        }`}
      >
        <h3 className={styles.proficiencyTitle}>What I&apos;m Hired For</h3>
        <div className={styles.proficiencyBars}>
          {skillsData.proficiencyOverview.map((item, index) => (
            <div key={index} className={styles.proficiencyItem}>
              <div className={styles.proficiencyHeader}>
                <span>{item.category}</span>
              </div>
              <div className={styles.proficiencyBar}>
                <div
                  className={styles.proficiencyFill}
                  style={{ "--width": `${item.percentage}%` }}
                ></div>
              </div>
              <p className={styles.proficiencyDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tech Cloud */}
      <div
        className={`${styles.techCloud} ${isVisible ? styles.fadeInUp : ""}`}
      >
        <div className={styles.cloudTitle}>
          Technologies I Love Working With
        </div>
        <div className={styles.techItems}>
          {skillsData.techCloud.map((tech, index) => (
            <div
              key={tech}
              className={styles.techBubble}
              style={{
                "--delay": `${index * 0.1}s`,
                "--size": `${Math.random() * 0.5 + 0.8}rem`,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
