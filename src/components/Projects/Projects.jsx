import { useState, useEffect, useRef } from "react";

import styles from "./Projects.module.css";

import projectsData from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const sectionRef = useRef(null);

  // Stable anchor ids so the CV can deep-link flagship case studies.
  const projectSlug = (title) => {
    if (title.startsWith("Shiftbase —")) return "project-shiftbase";
    if (title.startsWith("LifeOS —")) return "project-lifeos";
    if (title.startsWith("Air Quality")) return "project-thesis";
    if (title.startsWith("KosManager —")) return "project-kosmanager-dotnet";
    if (title.startsWith("Horticultural")) return "project-capstone";
    return undefined;
  };

  // Get all visible projects from all categories (hidden = folded into a platform parent)
  const allProjects = Object.values(projectsData.categories)
    .flat()
    .filter((project) => !project.hidden);

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

  const filteredProjects = () => {
    let filtered = allProjects;

    // Apply category filter
    if (filter !== "all") {
      if (["Solo", "Group", "Final Project"].includes(filter)) {
        filtered = (projectsData.categories[filter] || []).filter(
          (project) => !project.hidden
        );
      } else {
        // Filter by technology/skill
        filtered = allProjects.filter((project) =>
          project.skills.some(
            (skill) => skill.toLowerCase() === filter.toLowerCase()
          )
        );
      }
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.skills.some((skill) =>
            skill.toLowerCase().includes(term)
          ) ||
          (project.subProjects || []).some((sub) =>
            sub.title.toLowerCase().includes(term)
          )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "title":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
        return filtered.reverse();
      case "skills":
        return filtered.sort((a, b) => b.skills.length - a.skills.length);
      default:
        // Featured first so flagship case studies lead; data order preserved otherwise.
        return [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
  };

  return (
    <section className={styles.container} id="projects" ref={sectionRef}>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
            Featured Projects
          </h2>
          <p
            className={`${styles.subtitle} ${isVisible ? styles.slideUp : ""}`}
          >
            Innovative solutions crafted with passion and precision — Shiftbase,
            LifeOS, and KosManager are 6-repo platform case studies, open the
            card for the full breakdown
          </p>

          <div className={styles.searchAndSort}>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects, skills, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className={styles.clearSearch}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className={styles.sortContainer}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="default">Default Order</option>
                <option value="title">Sort by Title</option>
                <option value="newest">Newest First</option>
                <option value="skills">Most Skills</option>
              </select>
            </div>
          </div>

          <div className={styles.projectStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {filteredProjects().length}
              </span>
              <span className={styles.statLabel}>Projects Found</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{allProjects.length}</span>
              <span className={styles.statLabel}>Total Projects</span>
            </div>
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.filters}>
              <button
                className={`${styles.filterBtn} ${
                  filter === "all" ? styles.active : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All Projects
              </button>
            {projectsData.projectTypes.map((type) => (
              <button
                key={type.name}
                className={`${styles.filterBtn} ${
                  filter === type.name ? styles.active : ""
                }`}
                onClick={() => setFilter(type.name)}
                title={type.description}
              >
                <span className={styles.filterIcon}>{type.icon}</span>
                {type.name}
              </button>
            ))}

            {/* Technology Filters */}
            <div className={styles.filterDivider}></div>
            {["react", "javascript", "python", "ai", "ml"].map((tech) => (
              <button
                key={tech}
                className={`${styles.filterBtn} ${styles.techFilter} ${
                  filter === tech ? styles.active : ""
                }`}
                onClick={() => setFilter(tech)}
              >
                {tech === "ai"
                  ? "AI"
                  : tech === "ml"
                  ? "ML"
                  : tech.charAt(0).toUpperCase() + tech.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.projectsContainer}>
          <div className={styles.projects}>
            {filteredProjects().map((project, id) => (
              <div
                key={`${project.title}-${id}`}
                id={projectSlug(project.title)}
                className={styles.projectWrapper}
                style={{ "--delay": `${id * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {filteredProjects().length === 0 && (
            <div className={styles.noProjects}>
              <div className={styles.noProjectsIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 4.21l4.5 2.6 4.5-2.6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 19.79V14.6L3 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12l-4.5 2.6v5.19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.27 6.96L12 12.01l8.73-5.05"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22.08V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>No Projects Found</h3>
              <p>
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                  setSortBy("default");
                }}
                className={styles.resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
