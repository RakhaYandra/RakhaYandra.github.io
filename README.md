# 🎓 Rakha Putra Pebri Yandra - Portfolio Website

A modern, responsive portfolio website showcasing my academic achievements, professional experience, research, and technical skills as an Information Systems graduate.

The portfolio is designed to present my versatility across multiple IT functions, including software development, systems analysis, QA automation, and technology consulting, rather than locking me into a single technical role.

![Portfolio Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-yellow?style=for-the-badge&logo=vite)
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

---

## 🛠️ Tech Stack

*   **Core**: HTML5, Vanilla CSS3 (Custom Variables), JavaScript (ES6+), React 18.2.0
*   **Build Tooling**: Vite 4.4.5, Terser Minifier, ESLint
*   **Typography**: Outfit & Roboto (preloaded via Google Fonts)
*   **Hosting & Deployment**: GitHub Pages

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
│   ├── organizations/      # Organizational banners
│   ├── projects/           # Showcase previews
│   └── skills/             # Technology icons
├── docs/                   # Planning and project documentation files
├── src/                    # React application source code
│   ├── components/         # Modular layout components
│   │   ├── About/          # Info grid & capability-based cards
│   │   ├── Certificates/   # Certificates modal & lists
│   │   ├── Education/      # Honors timeline & focus descriptions
│   │   ├── ErrorBoundary/  # Crash safety wrapper
│   │   ├── Experience/     # Job timeline rendering tech stacks
│   │   ├── Footer/         # Dedicated copyright & status bar
│   │   ├── GetInTouch/     # Recruiter-aligned call to action section
│   │   ├── Hero/           # Greeting, profile image, & stats cards
│   │   ├── Navbar/         # Collapsible responsive navigation bar
│   │   ├── OptimizedImage/ # Performance image loader
│   │   ├── Organizations/  # Activities details modal & lists
│   │   ├── Projects/       # Dynamic search, sorting, and tag filters
│   │   └── Skills/         # Active categories grid & learning list
│   ├── data/               # Content databases (JSON files)
│   │   ├── certificates.json
│   │   ├── history.json
│   │   ├── organizations.json
│   │   ├── projects.json
│   │   ├── publications.json
│   │   └── skills.json
│   ├── hooks/              # Custom React lifecycle hooks
│   ├── App.jsx             # Main layout assembler
│   ├── index.css           # Global layout adjustments
│   ├── main.jsx            # Entry runner
│   ├── utils.js            # General helper scripts
│   └── vars.css            # Custom CSS properties and utility classes
├── index.html              # HTML shell & SEO meta configuration
├── package.json            # Scripts and dependencies declarations
├── vite.config.js          # Vite and Rollup packaging configuration
└── CONTRIBUTING.md         # Development guidelines for developers & AI agents
```

---

## 🚀 Quick Start

### Prerequisites
*   Node.js (v18 or higher recommended)
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
*   🟢 WhatsApp: [wa.me/6285385032274](https://wa.me/6285385032274)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
