# Development Guidelines & Contribution Standards

This document serves as the guide for developers and AI agents contributing to this portfolio. Following these standards ensures the project remains professional, accessible, lightweight, and aligned with the candidate's personal brand.

---

## 1. Project Philosophy

The portfolio focuses on:
*   **Professionalism**: Communicating the candidate's value clearly, authentically, and without generic cliches.
*   **Simplicity**: Keeping the architecture clean. Third-party libraries are allowed only when they earn their weight: Tailwind CSS v4 (utilities), shadcn-style primitives in `src/components/ui/`, and Motion (animated components). No global state stores, no UI frameworks on top.
*   **Performance**: Ensuring fast load times, minimal bundle sizes, and optimal asset loading.
*   **Accessibility (a11y)**: Adhering to WCAG guidelines for semantic structure, focus indicators, and screen readers.
*   **Maintainability**: Writing structured, self-documenting code.
*   **Consistency**: Adhering strictly to layout, typography, and color tokens defined in `src/vars.css`.
*   **Personal Branding**: Reinforcing the positioning of the candidate as a versatile **Information Systems Graduate** capable of software development, systems analysis, QA, and IT operations.

---

## 2. Development Principles

*   **Keep it Modular**: Group files by component features.
*   **Reuse Components**: Avoid repeating layout code. Reuse components like `<OptimizedImage />` where appropriate.
*   **Write Readable Code**: Prefer explicit, clean code over clever or hyper-abstracted patterns.
*   **Composition over Duplication**: Build large layouts by combining smaller, testable components.
*   **Keep it Production-Ready**: Keep builds green and ensure all dependencies are properly managed. Do not commit debug logs or experimental code.

---

## 3. Coding Standards

### Naming Conventions

| Item | Case Pattern | Example |
| :--- | :--- | :--- |
| **Component Folders** | PascalCase | `src/components/About/` |
| **Component Files** | PascalCase | `About.jsx`, `About.module.css` |
| **Hooks Files** | camelCase | `useIntersectionObserver.js` |
| **Data Files** | camelCase / snake_case | `skills.json`, `projects.json` |
| **Functions** | camelCase | `getImageUrl()`, `handleButtonClick()` |
| **Constants** | UPPER_SNAKE_CASE | `CHUNK_SIZE_LIMIT`, `MAX_PROJECTS` |
| **Variables** | camelCase | `mousePosition`, `isLoaded` |

---

## 4. React Guidelines

*   **Component Structure**: Keep business logic (hooks, state) at the top of the component file, followed by side effects (`useEffect`), event handlers, and finally the JSX return statement.
*   **State Management**: Use local state (`useState`) and custom hooks for component-specific logic. Do not introduce global state stores (Redux, Zustand) unless project scope expands significantly.
*   **Hooks Usage**: Ensure hooks follow the Rules of Hooks. Wrap heavy computations in `useMemo` and functions in `useCallback` when passed as props to optimized children.
*   **Reusability**: Accept standard HTML properties via destructuring props (e.g., `className`, `style`, `id`) to ensure component flexibility.

---

## 5. Styling Guidelines

*   **Design Tokens**: Style rules must reference values from `src/vars.css` (e.g., `var(--color-primary)`, `var(--spacing-md)`, `var(--transition-base)`). Tailwind classes must use the same tokens via arbitrary values (e.g., `bg-(--color-primary)`), never hardcoded hex.
*   **CSS Modules**: Always use CSS Modules (`*.module.css`) to prevent global style leaks and namespace collisions.
*   **Shared primitives**: Reusable UI goes in `src/components/ui/` (button, input, badge, faq, animated-counter). Do not duplicate them per section.
*   **Layer order**: `src/index.css` declares `@layer theme, base, legacy, components, utilities;`. Legacy globals live in `@layer legacy` (above Tailwind preflight, below utilities). CSS Modules are unlayered and beat both — so when migrating an element to Tailwind, delete its module rule instead of stacking classNames.
*   **Dark mode**: `useTheme` sets both `data-theme` and `.dark`. Tailwind dark styles use the custom variant (`@custom-variant dark`), legacy CSS uses `[data-theme="dark"]`. Keep both in sync.
*   **Responsive Behavior**: Use mobile-first styles. Implement clamp functions (`clamp()`) for responsive typography rather than hardcoding multiple media-query overrides.
*   **Color Usage**: Keep to the designated color system:
    *   **Primary Accent**: Green (`#22c55e`, representing growth/technology)
    *   **Secondary Accent**: Blue (`#3b82f6`, representing stability/business)
    *   **Backgrounds**: Sleek dark space tones (`#0a0e1a` and `#111827`)
*   **Animations**: Maintain micro-interactions and scroll-triggered animations. Ensure they respect user settings by utilizing `@media (prefers-reduced-motion: reduce)` via utilities in `src/utils.js`.

---

## 6. Accessibility Guidelines

*   **Semantic HTML**: Use proper HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`).
*   **Keyboard Navigation**: Ensure all interactive elements are reachable via `Tab` key and have visible `:focus-visible` outline rings.
*   **Color Contrast**: Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
*   **ARIA Attributes**: Use `aria-label`, `aria-expanded`, and roles where appropriate to describe UI actions to assistive technologies.
*   **Screen Reader Compatibility**: Place skip-navigation links at the top of `index.html` to let screen readers skip navbar links.

---

## 7. Performance Guidelines

*   **Lazy Loading**: Use Code Splitting for heavy assets or secondary routes. Use `lazyLoadImage` or the Intersection Observer hook to defer loading of off-screen components.
*   **Asset Optimization**: Use WebP or SVG format for illustrations and icons. Avoid uploading large raw images; compress assets before placing them in `assets/`.
*   **Bundle Size**: Keep production bundles small by avoiding large external libraries. Optimize Vite/Rollup chunks inside `vite.config.js`.

---

## 8. Content Guidelines

*   **Tone**: Keep descriptions professional, authentic, natural, and confident yet humble.
*   **Branding Alignment**: Do not lock the candidate into a single role (e.g., "React Developer"). Frame experiences around multi-functional versatility (Analytical thinking, Software engineering, QA automation, System documentation).
*   **Framework**: Write professional experiences using the **Action + Technology + Business Impact** model. Focus on measurable results rather than daily task lists.

---

## 9. Git Guidelines

*   **Branch Naming**:
    *   Features: `feature/amazing-feature`
    *   Bugfixes: `bugfix/issue-description`
    *   Refactoring: `refactor/component-name`
*   **Commit Messages**: Follow Conventional Commits:
    *   `feat: add new capabilities section`
    *   `fix: resolve modal image rendering on mobile`
    *   `docs: update contributor guidelines`
    *   `style: optimize spacing on about cards`
*   **Pull Requests**: Ensure all PRs are linked to an issue, contain screenshots/videos of UI changes, and pass all local builds.

---

## 10. Code Review Checklist

Before submitting changes, verify:
- [ ] Code builds successfully (`npm run build`).
- [ ] No ESLint warnings or errors (`npm run lint`).
- [ ] Layout is fully responsive across mobile, tablet, and desktop breakpoints.
- [ ] Accessible keyboard navigation and ARIA tags are functional.
- [ ] Personal branding remains aligned to the versatility of an Information Systems graduate.

---

## 11. AI Agent Instructions

Future AI agents working on this repository must:
1.  Read `README.md` first to understand project context.
2.  Read `CONTRIBUTING.md` to learn about coding standards and branding positioning.
3.  Analyze existing components before writing code to prevent duplication.
4.  Do not perform broad code refactoring unless it directly resolves a performance or bugs issue.
5.  Maintain content tone and personal branding guidelines strictly. Do not rewrite text using generic AI buzzwords.
6.  Keep the Rare UI credit: the link in the footer and the source-file notices must stay. Any new Rare UI component needs both.
