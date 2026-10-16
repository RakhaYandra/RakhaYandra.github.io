import { useState } from "react";
import styles from "./ProjectCard.module.css";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

const LinkButton = ({ href, children, disabledLabel }) => {
  if (!href) {
    return (
      <Button type="button" variant="secondary" size="sm" disabled aria-label={disabledLabel} className={actionClass}>
        {children}
      </Button>
    );
  }
  return (
    <Button type="button" variant="secondary" size="sm" asChild className={actionClass}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
};

const actionClass =
  "font-mono text-xs font-semibold tracking-wide uppercase";

/* Pull N/N verification ratios out of outcome bullets, e.g.
   "22/22 QA Pass; Newman 22/22; e2e 7/7". Returns null when absent. */
const parseVerification = (outcome = []) => {
  const text = outcome.join(" | ");
  const find = (re) => {
    const m = text.match(re);
    return m ? m[1].replace(/\s+/g, " ") : null;
  };
  const newman =
    find(/newman\D{0,12}(\d+\s*\/\s*\d+)/i) ||
    find(/(\d+\s*\/\s*\d+)\s*newman/i);
  const qa =
    find(/(\d+\s*\/\s*\d+)\s*(?:QA|test cases)/i) ||
    find(/QA\D{0,12}(\d+\s*\/\s*\d+)/i);
  const e2e =
    find(/e2e\D{0,12}(\d+\s*\/\s*\d+)/i) ||
    find(/(\d+\s*\/\s*\d+)\s*e2e/i);
  if (!newman && !qa && !e2e) return null;
  return { newman, qa, e2e };
};

export const ProjectCard = ({
  index = 0,
  project: {
    title,
    description,
    myRole,
    outcome,
    skills,
    workType,
    duration,
    teamSize,
    advisor,
    archived,
    featured,
    links = {},
    subProjects = [],
  },
}) => {
  // Hide effort-based durations (days/weeks) — keep them only in data.
  const showDuration = duration && !/day|week/i.test(duration);
  const [showRepos, setShowRepos] = useState(false);
  const verification = parseVerification(outcome);
  const isPlatform = subProjects.length > 0;
  const status = archived
    ? { label: "ARCHIVED", kind: "muted" }
    : isPlatform
      ? { label: "100% SUITE VERIFIED", kind: "ok", pulse: true }
      : featured
        ? { label: "FEATURED", kind: "info" }
        : null;

  return (
    <div className={`${styles.container} ${archived ? styles.archivedCard : ""}`}>
      <div className={styles.content}>
        <div className={styles.sysRow}>
          <span className={styles.sysLabel}>
            SYSTEM // {String(index + 1).padStart(3, "0")}
          </span>
          {status && (
            <span className={`${styles.statusPill} ${styles[status.kind]}`}>
              {status.pulse && <span className={styles.statusDot}></span>}
              {status.label}
            </span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
        {(workType || showDuration) && (
          <div className={styles.projectMeta}>
            {workType && <span className={styles.workType}>{workType}</span>}
            {showDuration && <span className={styles.duration}>{duration}</span>}
          </div>
        )}

        {myRole && <p className={styles.myRole}>{myRole}</p>}

        <p className={styles.description}>{description}</p>

        {verification && (
          <div className={styles.verifyStrip}>
            <div className={styles.verifyCell}>
              <span className={styles.verifyLabel}>NEWMAN AUTOMATED</span>
              <span className={styles.verifyValue}>{verification.newman ?? "—"}</span>
              <span className={styles.verifySub}>Endpoints Passed</span>
            </div>
            <div className={styles.verifyCell}>
              <span className={styles.verifyLabel}>QA HARNESS</span>
              <span className={styles.verifyValue}>{verification.qa ?? "—"}</span>
              <span className={styles.verifySub}>Invariants Verified</span>
            </div>
            <div className={styles.verifyCell}>
              <span className={styles.verifyLabel}>E2E PLAYWRIGHT</span>
              <span className={styles.verifyValue}>{verification.e2e ?? "—"}</span>
              <span className={styles.verifySub}>Flows Validated</span>
            </div>
          </div>
        )}

        <div className={styles.skills}>
          {skills.slice(0, 8).map((skill, id) => (
            <Badge key={id} asSpan className="font-mono text-[0.6875rem] uppercase">
              {skill}
            </Badge>
          ))}
          {skills.length > 8 && (
            <Badge asSpan className="font-mono text-[0.6875rem] uppercase">
              +{skills.length - 8} more
            </Badge>
          )}
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
                <span className={styles.infoValue}>
                  {Array.isArray(advisor) ? advisor.join("; ") : advisor}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <LinkButton
            href={links.live}
            disabledLabel={`${title} has no live demo`}
          >
            Live Demo
          </LinkButton>
          <LinkButton
            href={links.repo}
            disabledLabel={`${title} has no source repository`}
          >
            View Code
          </LinkButton>
          {subProjects.length > 0 && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowRepos(true)}
              className={actionClass}
            >
              View {subProjects.length} Repos
            </Button>
          )}
          {links.docs && (
            <Button type="button" variant="secondary" size="sm" asChild className={actionClass}>
              <a
                href={links.docs}
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs / Paper
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Platform repos modal */}
      <Dialog open={showRepos} onOpenChange={(open) => setShowRepos(open)}>
        <DialogContent className={styles.dialogContent}>
          <div className={styles.modalHeader}>
            <DialogTitle className={styles.modalTitle}>{title}</DialogTitle>
            <DialogDescription className={styles.modalSubtitle}>
              {subProjects.length} repositories — solo-built
            </DialogDescription>
          </div>
          <div className={styles.modalBody}>
            {subProjects.map((sub) => (
              <div key={sub.title} className={styles.subRepo}>
                <div className={styles.subRepoInfo}>
                  <h4 className={styles.subRepoTitle}>{sub.title}</h4>
                  <p className={styles.subRepoBlurb}>{sub.blurb}</p>
                  <div className={styles.subRepoStack}>
                    {sub.stack.map((tech) => (
                      <Badge key={tech} asSpan className="font-mono text-[0.6875rem] uppercase">
                        {tech}
                      </Badge>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
