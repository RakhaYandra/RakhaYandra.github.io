import { useState, useEffect } from "react";
import { getImageUrl } from "../../utils";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainMenuItems = [
    { href: "#about", label: "About", number: "01" },
    { href: "#education", label: "Education", number: "02" },
    { href: "#skills", label: "Skills", number: "03" },
    { href: "#experience", label: "Experience", number: "04" },
    { href: "#projects", label: "Projects", number: "05" },
    { href: "#contact", label: "Contact", number: "06" },
  ];

  const moreMenuItems = [
    { href: "#certificates", label: "Certificates", icon: "🏆" },
    { href: "#organizations", label: "Organizations", icon: "🏢" },
    { href: "#publications", label: "Publications", icon: "📚" },
    { href: "#writing", label: "Writing", icon: "✍️" },
    { href: "#faq", label: "FAQ", icon: "❓" },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <a className={styles.logo} href="/">
          <div className={styles.logoIcon}>
            <img
              src={getImageUrl("hero/heroImage.jpg")}
              alt="Rakha Yandra"
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>Rakha Yandra</span>
          <span className={styles.logoPill}>DEV // SYSTEMS</span>
        </a>

        <div className={styles.menu}>
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            className={`${styles.menuItems} ${
              menuOpen ? styles.menuItemsOpen : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {mainMenuItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.menuItem}>
                  <span className={styles.menuNumber}>{item.number}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}

            {/* More Dropdown */}
            <li className={styles.dropdownContainer}>
              <button
                className={`${styles.menuItem} ${styles.dropdownToggle}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              >
                <span className={styles.menuNumber}>•••</span>
                <span>More</span>
                <svg
                  className={`${styles.dropdownArrow} ${
                    dropdownOpen ? styles.dropdownArrowOpen : ""
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <ul
                className={`${styles.dropdownMenu} ${
                  dropdownOpen ? styles.dropdownMenuOpen : ""
                }`}
              >
                {moreMenuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      <span className={styles.dropdownIcon}>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className={styles.navActions}>
          <span className={styles.availBadge}>
            <span className={styles.availDot}></span>
            AVAILABLE FOR HIRE
          </span>
          <a href="#contact" className={styles.ctaButton}>
            GET IN TOUCH
            <span aria-hidden="true">→</span>
          </a>
          {/* Theme toggle — Stitch: 32px circle, ikon swap */}
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Dark Mode Active" : "Light Mode Active"}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2.5v2.2M12 19.3v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
