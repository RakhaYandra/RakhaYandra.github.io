import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

const LinkButton = ({ href, className, children, disabledLabel }) => {
  if (!href) {
    return (
      <span className={`${className} ${styles.disabledAction}`} aria-label={disabledLabel}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};

export const ProjectCard = ({
  project: {
    title,
    imageSrc,
    description,
    myRole,
    outcome,
    skills,
    workType,
    duration,
    teamSize,
    advisor,
    archived,
    links = {},
  },
}) => {
  return (
    <div className={`${styles.container} ${archived ? styles.archivedCard : ""}`}>
      {/* Liquid Glass Layers */}
      <div className={styles.liquidLayer1}></div>
      <div className={styles.liquidLayer2}></div>
      <div className={styles.liquidLayer3}></div>

      {/* Card Glow Effect */}
      <div className={styles.cardGlow}></div>

      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`${title} project screenshot`}
          className={styles.image}
        />
        <div className={styles.imageGlow}></div>
        {archived && <div className={styles.archivedBadge}>Archived</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.projectMeta}>
              <span className={styles.workType}>{workType}</span>
              {duration && <span className={styles.duration}>{duration}</span>}
            </div>
          </div>
        </div>

        {myRole && (
          <p className={styles.myRole}>
            <span className={styles.myRoleLabel}>My role:</span> {myRole}
          </p>
        )}

        <p className={styles.description}>{description}</p>

        {outcome && outcome.length > 0 && (
          <ul className={styles.outcomes}>
            {outcome.map((item, id) => (
              <li key={id} className={styles.outcomeItem}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.outcomeCheck}
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <span key={id} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>

        {/* Additional project details */}
        {(teamSize || advisor) && (
          <div className={styles.additionalInfo}>
            {teamSize && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Team:</span>
                <span className={styles.infoValue}>{teamSize}</span>
              </div>
            )}
            {advisor && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Advisor:</span>
                <span className={styles.infoValue}>{advisor}</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <LinkButton
            href={links.live}
            className={styles.primaryAction}
            disabledLabel={`${title} has no live demo`}
          >
            Live Demo
          </LinkButton>
          <LinkButton
            href={links.repo}
            className={styles.secondaryAction}
            disabledLabel={`${title} has no source repository`}
          >
            View Code
          </LinkButton>
          {links.docs && (
            <a
              href={links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.docsAction}
            >
              Docs / Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
