import { useState, useEffect, useRef } from "react";
import styles from "./Publications.module.css";
import publications from "../../data/publications.json";

export const Publications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
  };

  const closePublicationModal = () => {
    setSelectedPublication(null);
  };

  const getPublicationTypes = () => {
    const types = ["All", ...new Set(publications.map((pub) => pub.type))];
    return types;
  };

  const filteredPublications =
    filterType === "All"
      ? publications
      : publications.filter((pub) => pub.type === filterType);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "published":
        return "#22c55e";
      case "under review":
        return "#f59e0b";
      case "accepted":
        return "#3b82f6";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "journal article":
        return "📄";
      case "conference paper":
        return "🎤";
      case "book chapter":
        return "📚";
      case "preprint":
        return "📝";
      default:
        return "📋";
    }
  };

  return (
    <section className={styles.container} id="publications" ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.academicPattern}></div>
        <div className={styles.floatingElements}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingIcon}
              style={{
                "--delay": `${i * 0.8}s`,
                "--duration": `${8 + i * 1.5}s`,
              }}
            >
              {["📊", "📈", "🔬", "💡", "📑"][i % 5]}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
            Research Publications
          </h2>
          <p className={`${styles.subtitle} ${isVisible ? styles.slideUp : ""}`}>
            Contributing to knowledge through peer-reviewed research and academic
            discourse
          </p>
          
          {/* Filter Tabs */}
          <div
            className={`${styles.filterContainer} ${
              isVisible ? styles.slideUp : ""
            }`}
          >
            {getPublicationTypes().map((type, id) => (
              <button
                key={id}
                className={`${styles.filterTab} ${
                  filterType === type ? styles.active : ""
                }`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.publicationsGrid}>
          {filteredPublications.map((publication, id) => (
            <div
              key={id}
              className={`${styles.publicationCard} ${
                isVisible ? styles.slideUp : ""
              }`}
              style={{ "--delay": `${id * 0.15}s` }}
              onClick={() => handlePublicationClick(publication)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.publicationType}>
                  <span className={styles.typeIcon}>
                    {getTypeIcon(publication.type)}
                  </span>
                  <span className={styles.typeText}>{publication.type}</span>
                </div>

                <div
                  className={styles.statusBadge}
                  style={{
                    "--status-color": getStatusColor(publication.status),
                  }}
                >
                  {publication.status}
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.publicationTitle}>{publication.title}</h3>

                <div className={styles.authorsList}>
                  {publication.authors.map((author, authorId) => (
                    <span
                      key={authorId}
                      className={`${styles.author} ${
                        author.includes("Rakha") ? styles.primaryAuthor : ""
                      }`}
                    >
                      {author}
                    </span>
                  ))}
                </div>

                <div className={styles.publicationMeta}>
                  <div className={styles.venue}>
                    <span className={styles.venueIcon}>🏛️</span>
                    {publication.venue}
                  </div>
                  <div className={styles.publicationDate}>
                    <span className={styles.dateIcon}>📅</span>
                    {publication.publicationDate}
                  </div>
                </div>

                <p className={styles.abstract}>
                  {publication.abstract.substring(0, 150)}...
                </p>

                <div className={styles.keywords}>
                  {publication.keywords
                    .slice(0, 3)
                    .map((keyword, keywordId) => (
                      <span key={keywordId} className={styles.keyword}>
                        {keyword}
                      </span>
                    ))}
                  {publication.keywords.length > 3 && (
                    <span className={styles.moreKeywords}>
                      +{publication.keywords.length - 3} more
                    </span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <button className={styles.readMoreButton}>Read More</button>
                  {publication.url && publication.url !== "#" && (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.accessButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Access Paper
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Publication Modal */}
      {selectedPublication && (
        <div className={styles.modalOverlay} onClick={closePublicationModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closePublicationModal}
            >
              ×
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalType}>
                <span className={styles.modalTypeIcon}>
                  {getTypeIcon(selectedPublication.type)}
                </span>
                <span>{selectedPublication.type}</span>
                <div
                  className={styles.modalStatusBadge}
                  style={{
                    "--status-color": getStatusColor(
                      selectedPublication.status
                    ),
                  }}
                >
                  {selectedPublication.status}
                </div>
              </div>
              <h3 className={styles.modalTitle}>{selectedPublication.title}</h3>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <div className={styles.metaSection}>
                  <h4>Authors</h4>
                  <div className={styles.modalAuthorsList}>
                    {selectedPublication.authors.map((author, id) => (
                      <span
                        key={id}
                        className={`${styles.modalAuthor} ${
                          author.includes("Rakha")
                            ? styles.modalPrimaryAuthor
                            : ""
                        }`}
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.metaSection}>
                  <h4>Publication Details</h4>
                  <div className={styles.publicationDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Venue:</span>
                      <span className={styles.detailValue}>
                        {selectedPublication.venue}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Date:</span>
                      <span className={styles.detailValue}>
                        {selectedPublication.publicationDate}
                      </span>
                    </div>
                    {selectedPublication.doi &&
                      selectedPublication.doi !== "Pending" && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>DOI:</span>
                          <a
                            href={selectedPublication.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.detailValue}
                          >
                            {selectedPublication.doi}
                          </a>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {selectedPublication.takeaway && (
                <div className={styles.modalTakeaway}>
                  <h4>Key Takeaway / Technical Impact</h4>
                  <p className={styles.takeawayText}>{selectedPublication.takeaway}</p>
                </div>
              )}

              <div className={styles.modalAbstract}>
                <h4>Abstract</h4>
                <p>{selectedPublication.abstract}</p>
              </div>

              <div className={styles.modalKeywords}>
                <h4>Keywords</h4>
                <div className={styles.keywordsList}>
                  {selectedPublication.keywords.map((keyword, id) => (
                    <span key={id} className={styles.modalKeyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPublication.url && selectedPublication.url !== "#" && (
                <div className={styles.modalActions}>
                  <a
                    href={selectedPublication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalAccessButton}
                  >
                    Access Full Paper
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
