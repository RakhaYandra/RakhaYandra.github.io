import { useState } from "react";
import { createPortal } from "react-dom";
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
    subProjects = [],
  },
}) => {
  // Hide effort-based durations (days/weeks) — keep them only in data.
  const showDuration = duration && !/day|week/i.test(duration);
  const [showRepos, setShowRepos] = useState(false);
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
        {subProjects.length > 0 && (
          <div className={styles.repoCountBadge}>
            {subProjects.length} repos
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.projectMeta}>
              <span className={styles.workType}>{workType}</span>
              {showDuration && <span className={styles.duration}>{duration}</span>}
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
          {subProjects.length > 0 && (
            <button
              type="button"
              onClick={() => setShowRepos(true)}
              className={`${styles.secondaryAction} ${styles.reposButton}`}
            >
              View {subProjects.length} Repos
            </button>
          )}
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

      {/* Platform repos modal — portaled to body so card transform/overflow can't clip it */}
      {showRepos &&
        subProjects.length > 0 &&
        createPortal(
          <div
            className={styles.modalOverlay}
            onClick={() => setShowRepos(false)}
          >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCloseButton}
              onClick={() => setShowRepos(false)}
              aria-label="Close repositories"
            >
              ×
            </button>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{title}</h3>
              <p className={styles.modalSubtitle}>
                {subProjects.length} repositories — solo-built
              </p>
            </div>
            <div className={styles.modalBody}>
              {subProjects.map((sub) => (
                <div key={sub.title} className={styles.subRepo}>
                  <div className={styles.subRepoInfo}>
                    <h4 className={styles.subRepoTitle}>{sub.title}</h4>
                    <p className={styles.subRepoBlurb}>{sub.blurb}</p>
                    <div className={styles.subRepoStack}>
                      {sub.stack.map((tech) => (
                        <span key={tech} className={styles.skill}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={sub.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.subRepoLink}
                  >
                    Open repo
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
