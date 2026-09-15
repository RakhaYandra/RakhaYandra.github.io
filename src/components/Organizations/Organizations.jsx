import { useState, useEffect, useRef } from "react";
import styles from "./Organizations.module.css";
import { getImageUrl } from "../../utils";
import organizations from "../../data/organizations.json";

export const Organizations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  // Sort organizations by date (newest first)
  const sortedOrganizations = [...organizations].sort((a, b) => {
    const getDateValue = (dateStr) => {
      if (dateStr.toLowerCase() === "present") return new Date();
      const [month, year] = dateStr.split(" ");
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      return new Date(parseInt(year), monthIndex);
    };

    // Sort by start date first (newest first), then by end date if start dates are equal
    const startDateA = getDateValue(a.startDate);
    const startDateB = getDateValue(b.startDate);

    if (startDateA.getTime() !== startDateB.getTime()) {
      return startDateB - startDateA; // Descending order (newest first)
    }

    // If start dates are equal, sort by end date (newest first)
    const endDateA = getDateValue(a.endDate);
    const endDateB = getDateValue(b.endDate);
    return endDateB - endDateA;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: Set visible after 2 seconds if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
  };

  const closeOrgModal = () => {
    setSelectedOrg(null);
  };

  const isCurrentRole = (endDate) => {
    return endDate.toLowerCase() === "present";
  };

  const visibleOrganizations = showAll
    ? sortedOrganizations
    : sortedOrganizations.slice(0, 4);

  return (
    <section className={styles.container} id="organizations" ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.networkPattern}></div>
        <div className={styles.floatingNodes}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={styles.node}
              style={{
                "--delay": `${i * 1.2}s`,
                "--duration": `${8 + i * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2
            className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}
          >
            Professional Organizations
          </h2>
          <p
            className={`${styles.subtitle} ${isVisible ? styles.slideUp : ""}`}
          >
            Building communities and driving innovation through collaboration
          </p>
        </div>

        <div className={styles.timeline}>
          {visibleOrganizations.map((org, id) => (
            <div
              key={id}
              className={`${styles.timelineItem} ${isVisible ? styles.slideIn : ""}`}
              style={{ "--delay": `${id * 0.2}s` }}
            >
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot}></div>
                <div className={styles.markerLine}></div>
              </div>

              <div
                className={styles.organizationCard}
                onClick={() => handleOrgClick(org)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.orgIcon}>
                    <img
                      src={getImageUrl(org.imageSrc)}
                      alt={`${org.name} logo`}
                      className={styles.orgLogo}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background =
                          "linear-gradient(135deg, #22c55e, #3b82f6)";
                        e.target.parentElement.innerHTML = org.name.charAt(0);
                      }}
                    />
                  </div>

                  <div className={styles.orgInfo}>
                    <h3 className={styles.orgName}>{org.name}</h3>
                    <p className={styles.orgRole}>{org.role}</p>
                    <div className={styles.dateRange}>
                      <span className={styles.startDate}>{org.startDate}</span>
                      <span className={styles.dateSeparator}>—</span>
                      <span
                        className={`${styles.endDate} ${
                          isCurrentRole(org.endDate) ? styles.current : ""
                        }`}
                      >
                        {org.endDate}
                      </span>
                    </div>
                  </div>

                  {isCurrentRole(org.endDate) && (
                    <div className={styles.currentBadge}>
                      <span className={styles.pulseIndicator}></span>
                      Current
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <p className={styles.orgDescription}>{org.description}</p>

                  <div className={styles.achievementsPreview}>
                    <h4 className={styles.achievementsTitle}>
                      Key Achievements
                    </h4>
                    <ul className={styles.achievementsList}>
                      {org.achievements
                        .slice(0, 2)
                        .map((achievement, achievementId) => (
                          <li
                            key={achievementId}
                            className={styles.achievementItem}
                          >
                            {achievement}
                          </li>
                        ))}
                      {org.achievements.length > 2 && (
                        <li className={styles.moreAchievements}>
                          +{org.achievements.length - 2} more achievements
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className={styles.cardActions}>
                    <button className={styles.viewDetailsButton}>
                      View Details
                    </button>
                    {org.website && (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteButton}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles.cardGlow}></div>
              </div>
            </div>
          ))}
        </div>

        {(sortedOrganizations.length > visibleOrganizations.length ||
          showAll) && (
          <div className={styles.showMoreContainer}>
            <button
              type="button"
              className={styles.showMoreButton}
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll
                ? "Show less"
                : `Show all ${sortedOrganizations.length} roles`}
            </button>
          </div>
        )}
      </div>

      {/* Organization Modal */}
      {selectedOrg && (
        <div className={styles.modalOverlay} onClick={closeOrgModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeOrgModal}>
              ×
            </button>

            <div className={styles.modalHeader}>
              <img
                src={getImageUrl(selectedOrg.imageSrc)}
                alt={`${selectedOrg.name} logo`}
                className={styles.modalLogo}
              />
              <div className={styles.modalHeaderInfo}>
                <h3 className={styles.modalTitle}>{selectedOrg.name}</h3>
                <p className={styles.modalRole}>{selectedOrg.role}</p>
                <div className={styles.modalDateRange}>
                  {selectedOrg.startDate} — {selectedOrg.endDate}
                  {isCurrentRole(selectedOrg.endDate) && (
                    <span className={styles.modalCurrentBadge}>Current</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalDescription}>
                <h4>Role Description</h4>
                <p>{selectedOrg.description}</p>
              </div>

              <div className={styles.modalAchievements}>
                <h4>Achievements & Contributions</h4>
                <ul className={styles.modalAchievementsList}>
                  {selectedOrg.achievements.map((achievement, id) => (
                    <li key={id} className={styles.modalAchievementItem}>
                      <span className={styles.achievementIcon}>✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedOrg.website && (
                <div className={styles.modalActions}>
                  <a
                    href={selectedOrg.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalWebsiteButton}
                  >
                    Visit Organization Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
