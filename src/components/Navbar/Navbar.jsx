import { useState, useEffect } from "react";
import { getImageUrl } from "../../utils";
import { useTheme } from "../../hooks/useTheme";
import { GooeyNav } from "../ui/gooey-nav";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import styles from "./Navbar.module.css";

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
  { href: "/3d/", label: "3D Blueprint", icon: "📐" },
];

export const Navbar = ({ onOpenPalette }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
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

  useEffect(() => {
    const updateActive = () => {
      let current = 0;
      mainMenuItems.forEach((item, i) => {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 120) current = i;
      });
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

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
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ""}`}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </SheetTrigger>

            <SheetContent aria-label="Site navigation">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <nav className={styles.sheetLinks}>
                {mainMenuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.menuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.menuNumber}>{item.number}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
                {moreMenuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.menuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.dropdownIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className={styles.menuItems}>
            <GooeyNav
              className={styles.gooey}
              items={mainMenuItems.map((item, i) => ({
                href: item.href,
                label: item.label,
                icon: (
                  <span
                    className={styles.menuNumber}
                    style={activeSection === i ? { color: "inherit" } : undefined}
                  >
                    {item.number}
                  </span>
                ),
              }))}
              value={activeSection}
              onChange={setActiveSection}
              size="xs"
            />

            {/* More Dropdown */}
            <div className={styles.dropdownContainer}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`${styles.menuItem} ${styles.dropdownToggle}`}
                >
                  <span className={styles.menuNumber}>•••</span>
                  <span>More</span>
                  <svg
                    className={styles.dropdownArrow}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {moreMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className={styles.dropdownItem}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className={styles.dropdownIcon} aria-hidden="true">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={styles.navActions}>
          <button
            type="button"
            className={styles.paletteBtn}
            onClick={onOpenPalette}
            aria-label="Open command palette"
          >
            ⌘K
          </button>
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
