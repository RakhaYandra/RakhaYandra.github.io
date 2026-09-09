import { useState, useEffect } from "react";
import { getImageUrl } from "../../utils";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <span className={styles.logoText}>Rakha Putra Pebri Yandra</span>
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
          <a
            href="mailto:rakhaputrapebriyandra272@gmail.com"
            className={styles.ctaButton}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  );
};
