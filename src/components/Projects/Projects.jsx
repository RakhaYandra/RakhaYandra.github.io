import { useState, useEffect, useRef } from "react";

import styles from "./Projects.module.css";

import projectsData from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { AnimatedCounter } from "../ui/animated-counter";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SORT_OPTIONS = [
  { value: "default", label: "Default Order" },
  { value: "title", label: "Sort by Title" },
  { value: "newest", label: "Newest First" },
  { value: "skills", label: "Most Skills" },
];

export const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const sectionRef = useRef(null);

  // Stable anchor ids so the CV can deep-link flagship case studies.
  const projectSlug = (title) => {
    if (title.startsWith("Fukurou —")) return "project-fukurou";
    if (title.startsWith("Kage —")) return "project-kage";
    if (title.startsWith("Mamori —")) return "project-mamori";
    if (title.startsWith("Neko —")) return "project-neko";
    if (title.startsWith("Omarchy-neko —")) return "project-omarchy-neko";
    if (title.startsWith("Tora —")) return "project-tora";
    if (title.startsWith("Ookami —")) return "project-ookami";
    if (title.startsWith("Kitsune —")) return "project-kitsune";
    if (title.startsWith("Tanuki —")) return "project-tanuki";
    if (title.startsWith("LANBox —")) return "project-lanbox";
    if (title.startsWith("Pulse —")) return "project-pulse";
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
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}></span>
            <span>• PROPOSITIONS &amp; FLAGSHIP SYSTEMS</span>
          </div>
          <h2 className={`${styles.title} ${isVisible ? styles.slideUp : ""}`}>
            Deterministic Systems Built with Rigorous Test Contracts
          </h2>
          <p
            className={`${styles.subtitle} ${isVisible ? styles.slideUp : ""}`}
          >
            Every platform built by Rakha is engineered with automated API test
            harnesses, deterministic database states, and live production
            auditability.
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
              <Input
                type="text"
                placeholder="Search projects, skills, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects"
                className="h-11 pr-11 pl-11"
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full text-(--color-text-muted)"
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
                </Button>
              )}
            </div>

            <div className={styles.sortContainer}>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger aria-label="Sort projects">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={styles.projectStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <AnimatedCounter value={filteredProjects().length} />
              </span>
              <span className={styles.statLabel}>Projects Found</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <AnimatedCounter value={allProjects.length} />
              </span>
              <span className={styles.statLabel}>Total Projects</span>
            </div>
            {filter !== "all" && (
              <div className={styles.statItem}>
                <Badge variant="accent" asSpan>
                  {filter}
                </Badge>
                <span className={styles.statLabel}>Active Filter</span>
              </div>
            )}
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.filters}>
              <Button
                type="button"
                variant={filter === "all" ? "default" : "ghost"}
                onClick={() => setFilter("all")}
              >
                All Projects
              </Button>
              {projectsData.projectTypes.map((type) => (
                <Button
                  key={type.name}
                  type="button"
                  variant={filter === type.name ? "default" : "ghost"}
                  onClick={() => setFilter(type.name)}
                  title={type.description}
                >
                  <span aria-hidden="true">{type.icon}</span>
                  {type.name}
                </Button>
              ))}

              {/* Technology Filters */}
              <div className={styles.filterDivider}></div>
              {["react", "javascript", "python", "ai", "ml"].map((tech) => (
                <Button
                  key={tech}
                  type="button"
                  size="sm"
                  variant={filter === tech ? "default" : "secondary"}
                  onClick={() => setFilter(tech)}
                  className="font-mono text-xs uppercase"
                >
                  {tech === "ai"
                    ? "AI"
                    : tech === "ml"
                    ? "ML"
                    : tech.charAt(0).toUpperCase() + tech.slice(1)}
                </Button>
              ))}
            </div>
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
              <ProjectCard project={project} index={id} />
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
            <Button
              type="button"
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
                setSortBy("default");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
