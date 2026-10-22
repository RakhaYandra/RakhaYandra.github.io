# 🎓 Rakha Putra Pebri Yandra - Portfolio Website

A modern, responsive portfolio website showcasing my academic achievements, professional experience, research, and technical skills as an Information Systems graduate.

The portfolio is designed to present my versatility across multiple IT functions, including software development, systems analysis, QA automation, and technology consulting, rather than locking me into a single technical role.

![Portfolio Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.4-yellow?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🎯 Purpose

This website acts as a comprehensive resume, demonstrating to HR recruiters, technical screeners, and hiring managers that I have:
1.  **Strong IT Fundamentals**: Grounded in network management, database schemas, and systems design.
2.  **Professional Development Experience**: Proven engineering across React, Laravel, Node.js, and Golang through industry internships.
3.  **Analytical & Business Thinking**: Developed through an Information Systems degree (graduating Cum Laude) and organizational leadership.
4.  **Quality & Documentation Focus**: Demonstrated by automated testing via Cypress and API specs via Swagger.

---

## ✨ Features

*   **🎨 Liquid Glass UI**: Clean and high-contrast dark interface featuring modern frosted glass layouts, custom color variables, and fluid typography.
*   **⚡ High Performance**: Fast compilation and build packaging optimized through Vite, featuring custom manual chunking and Terser compression.
*   **📱 Responsive & Fluid**: Mobile-first design checking viewport parameters, optimizing navigation, and managing responsive scroll markers.
*   **🌟 Defer Animations**: Scroll-triggered sliding and scale animation effects that respect browser accessibility preferences.
*   **♿ Accessible**: Proper HTML5 landmarks, clear tab index focus indicator rings, and a skip-navigation link for screen readers.
*   **🔍 Optimized SEO & Schema**: Features comprehensive meta tags, OpenGraph validation parameters, and customized structured JSON-LD data for search crawlers.
*   **🤖 Image Fallbacks**: An internal React state-based fallback system that handles missing skill/learning icons cleanly.
*   **🧊 3D Blueprint CV**: A separate `/3d` entry renders the whole CV as an interactive isometric blueprint (three.js, lazy-loaded chunk) without touching the main page bundle.

---

## 🛠️ Tech Stack

*   **Core**: HTML5, Vanilla CSS3 (Custom Variables), JavaScript (ES6+), React 18.2.0
*   **Build Tooling**: Vite 6.4, Terser Minifier, ESLint
*   **UI primitives**: Tailwind CSS v4, Radix UI (dialog, dropdown-menu, tabs, slot), Motion, class-variance-authority
*   **3D page**: three.js (WebGLRenderer, OrbitControls) in an isolated `/3d` entry
*   **Typography**: Outfit & Roboto (preloaded via Google Fonts)
*   **Hosting & Deployment**: GitHub Pages

### UI components (pilot)

Tailwind CSS v4 + shadcn-style primitives live in `src/components/ui/`, used alongside the existing CSS Modules.

*   `src/index.css` declares `@layer theme, base, legacy, components, utilities;` — Tailwind utilities win over the legacy globals, which in turn win over Tailwind's preflight. CSS Modules stay unlayered and therefore keep beating both.
*   Tailwind theme values are read from `vars.css` (no duplicated token set).
*   Animated components are adapted from [Rare UI](https://rareui.com) (MIT + Commons Clause + Attribution). Their credit notice is kept in the source files and the site footer.

---

## 📁 Folder Structure

```text
RakhaYandra.github.io/
├── assets/                 # Compilable and static media assets
│   ├── about/              # Illustration assets
│   ├── certificates/       # Credential issuer logos
│   ├── contact/            # Social and platform badges
│   ├── hero/               # Profile photography
│   ├── history/            # Company logos
│   ├── nav/                # Navigation icons
│   ├── organizations/      # Organizational banners
│   ├── projects/           # Showcase previews
│   └── skills/             # Technology icons
├── 3d/                     # Second Vite entry: /3d blueprint page
│   └── index.html          # Theme bootstrap + meta for the 3D view
├── src/                    # React application source code
│   ├── blueprint/          # 3D page: scene, zones, sheets, palette
│   ├── components/         # Modular layout components
│   │   ├── About/          # Info grid & capability-based cards
│   │   ├── Certificates/   # Certificates modal & lists
│   │   ├── CommandPalette.jsx # ⌘K palette: sections, projects, links
│   │   ├── Education/      # Honors timeline & focus descriptions
│   │   ├── ErrorBoundary/  # Crash safety wrapper
│   │   ├── Experience/     # Job timeline rendering tech stacks
│   │   ├── Faq/            # FAQ section (RareUI thread)
│   │   ├── Footer/         # Dedicated copyright & status bar
│   │   ├── GetInTouch/     # Recruiter-aligned call to action section
│   │   ├── GitHub/           # Live contribution heatmap section
│   │   ├── Hero/           # Greeting, profile image, & stats cards
│   │   ├── Navbar/         # Collapsible responsive navigation bar
│   │   ├── Organizations/  # Activities details modal & lists
│   │   ├── Projects/       # Dynamic search, sorting, and tag filters
│   │   ├── Publications/   # Research papers & recruiter summaries
│   │   ├── Skills/         # Active categories grid & learning list
│   │   ├── Writing/        # Backend architecture notes
│   │   └── ui/             # Shared Tailwind primitives (button, input, badge, dialog, dropdown-menu, tabs, select, collapsible, sheet, tooltip, command, gooey-nav, faq, scroll-progress, github-activity, animated-counter)
│   ├── data/               # JSON content databases + shared constants (sections, project slugs)
│   │   ├── certificates.json
│   │   ├── history.json
│   │   ├── organizations.json
│   │   ├── posts.json
│   │   ├── projects.json
│   │   ├── publications.json
│   │   └── skills.json
│   ├── hooks/              # Custom React lifecycle hooks
│   ├── lib/                # Shared helpers (cn class merger)
│   ├── App.jsx             # Main layout assembler
│   ├── index.css           # Layered globals (Tailwind + legacy)
│   ├── main.jsx            # Entry runner
│   ├── utils.js            # General helper scripts
│   └── vars.css            # Custom CSS properties and utility classes
├── index.html              # HTML shell & SEO meta configuration
├── package.json            # Scripts and dependencies declarations
├── postcss.config.js       # PostCSS with Tailwind v4 plugin
├── vite.config.js          # Vite and Rollup packaging configuration
└── CONTRIBUTING.md         # Development guidelines for developers & AI agents
```

---

## 🚀 Quick Start

### Prerequisites
*   Node.js (v20, see `.nvmrc`)
*   npm (v9 or higher)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/RakhaYandra/RakhaYandra.github.io.git
    cd RakhaYandra.github.io
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start dev server:
    ```bash
    npm run dev
    ```
4.  Open browser:
    Navigate to `http://localhost:3000/` (Vite port is configured to 3000 in `vite.config.js`).

### Available Scripts
*   `npm run dev` - Launches Vite local server on port 3000 with hot-reload.
*   `npm run build` - Compiles production-ready bundle in the `build/` folder.
*   `npm run preview` - Launches local server to preview production builds.
*   `npm run lint` - Runs ESLint syntax and formatting code checks.
*   `npm run deploy` - Triggers a production build and publishes it to GitHub Pages.

---

## ⚙️ Customization Guide

All text content is decoupled from components. To update content, modify the corresponding JSON files in `src/data/`:
*   **Skills & Tech Stack**: Edit `src/data/skills.json` to change technology listings, learning milestones, or proficiency numbers.
*   **Work Experience**: Edit `src/data/history.json` to modify timeline descriptions, job roles, or technologies.
*   **Project Showcase**: Edit `src/data/projects.json` to update links, teams, descriptions, or change filters.
*   **Organizations & Leadership**: Edit `src/data/organizations.json` to adjust roles, details, or achievements.
*   **Academic Publications**: Edit `src/data/publications.json` to edit research papers or add recruiter summaries.
*   **FAQ & Education**: Edit `src/data/faq.json` and `src/data/education.json`; both the main sections and the 3D sheets read from them.

### 3D Blueprint CV (`/3d`)

`3d/index.html` is a second Vite entry (`rollupOptions.input` in `vite.config.js`), so `/3d/` deploys as a static page next to the portfolio. The three.js chunk is only requested there.

*   **Zone layout**: `src/blueprint/data/zones.js` holds the five zone keys and their position/size on the 22 × 14 plan. Sheet copy and tab wiring live in `src/blueprint/components/ZoneContent.jsx`.
*   **Scene**: `src/blueprint/scene/` draws the board, block labels, and camera moves. Colours are read at runtime from `src/vars.css`, so light/dark follow the same `porto-theme` setting as the main site.
*   **Controls**: hover/click a zone, `Ctrl`/`⌘ + K` to jump, `←`/`→` between zones, `Esc` to close, and pan/pinch on touch. `prefers-reduced-motion` skips the camera tween.

---

## 📈 Performance & Accessibility (a11y)

*   **Manual Chunking**: Large dependencies like `react` and `react-dom` are bundled separately from utility scripts, optimizing network loading.
*   **Terser Minification**: Compresses compiled code files and strips debugger statements in the production build.
*   **Reduced Motion**: Key animations respect screen accessibility preference variables, disabling motion elements for sensitive viewers.
*   **Image Optimization**: Preloads critical assets while using `preconnect` headers for Google fonts. Defer loading of non-critical items using custom observers.

---

## 📞 Contact

**Rakha Putra Pebri Yandra**
*   📧 Email: [rakhaputrapebriyandra272@gmail.com](mailto:rakhaputrapebriyandra272@gmail.com)
*   💼 LinkedIn: [linkedin.com/in/rakhaputrapebriyandra](https://www.linkedin.com/in/rakhaputrapebriyandra)
*   🐱 GitHub: [github.com/RakhaYandra](https://github.com/RakhaYandra)

> 📱 Phone/WhatsApp available on request (via LinkedIn or email) to reduce spam.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
