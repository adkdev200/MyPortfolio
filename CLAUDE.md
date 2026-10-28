# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Overview

This repository hosts a static, single‑page portfolio site for **Dev Adhikari**. The site is built entirely from plain HTML, CSS, and a small amount of vanilla JavaScript. There is no build step, package manager, or test framework configured – the site can be served directly as static assets.

---

## Common Development Commands

| Goal | Command | Notes |
|------|---------|-------|
| **Preview locally** | `python -m http.server 8000` | Serves the repository root on <http://localhost:8000>. Open `http://localhost:8000/index.html` in a browser. Any changes to HTML/CSS/JS are reflected on refresh.
| **Lint CSS** | `stylelint "**/*.css"` | Requires `stylelint` to be installed globally (`npm i -g stylelint`). The repository uses a custom editorial palette defined in `style.css` and `enhancements.css`. Linting helps catch syntax errors.
| **Lint JavaScript** | `eslint "**/*.js"` | Requires `eslint` to be installed globally (`npm i -g eslint`). No ESLint config is present; you can initialise one with `eslint --init` if you wish to enforce coding style.
| **Run a single‑file check** | `htmlhint index.html` | `htmlhint` validates the HTML markup. Install globally with `npm i -g htmlhint`.
| **Deploy to GitHub Pages** | `git push origin main` | The repository is already set up for GitHub Pages (the `CNAME` file points to `www.adhikaridev.com.np`). Pushing to `main` publishes the latest `index.html`, CSS, and JS.

> **Note:** The site has no automated test suite. Validation is performed manually by opening the page in a browser and checking the console for errors.

---

## High‑Level Architecture

### 1. HTML (`index.html`)

- **Structure** – The page is divided into semantic sections (`<section>` elements) with IDs: `about`, `work`, `notes`, `contact`, etc.
- **Artifacts** – Each portfolio item lives inside an `<article class="artifact">` block that follows a consistent markup pattern:
  ```html
  <article class="artifact">
    <div class="artifact-number">01</div>
    <div class="artifact-body">
      <div class="artifact-heading">…</div>
      <div class="artifact-grid">…</div>
    </div>
  </article>
  ```
- **Metadata** – Tags for the artifact live in a `<div class="metadata">` with `<span>` elements. These are read by CSS for styling and can be indexed for search.
- **Navigation** – The header navigation links use fragment anchors (`#about`, `#work`, …) for smooth scrolling.

### 2. CSS (`style.css` & `enhancements.css`)

- **Design system** – Root CSS variables (`--paper`, `--ink`, `--red`, …) define the palette and typography. Both files import the same variable set; `enhancements.css` overrides a few values for a slightly different visual feel.
- **Layout** – Most layouts rely on CSS Grid (e.g., the hero grid, artifact grid, notes grid). Responsive breakpoints are provided via `@media (max-width: …)` rules.
- **Theme** – The site does not switch themes dynamically, but the variables make it trivial to create a dark‑mode variant if needed.
- **Component styles** – UI components such as the loader, ticker, and artifact hover effects are self‑contained.

### 3. JavaScript (`script.js`)

- **Page loader** – Hides the overlay after a short timeout.
- **Dot‑grid canvas** – Draws an animated background of dots.
- **Artifact hover** – Slight horizontal translation on mouse enter.
- **Photo parallax** – Moves the profile picture slightly based on cursor position.
- **Scroll‑reveal** – Uses `IntersectionObserver` to animate notes, artifacts, and timeline rows when they enter the viewport.
- **Stat count‑up** – Animates the numbers in the hero stats once they become visible.
- **Header background** – Changes the header background after scrolling past a threshold.
- **Easter egg** – Logs a small ASCII banner to the console.

> **Extension point:** To add new interactive behavior, extend `script.js` with additional DOM queries and observers, following the existing pattern.

---

## Typical Workflow for Adding a New Portfolio Artifact

1. **Create the artifact markup** – Copy an existing `<article class="artifact">` block, increment the `artifact-number`, update the `<h2>` title, description, and links. Add appropriate `<span>` tags in the `metadata` area.
2. **Add related assets** – If the artifact needs images, place them next to the other assets (e.g., in a dedicated `assets/` folder) and reference them with a relative path.
3. **Style tweaks** – Most artifacts inherit the global styles; custom styling can be added to `style.css` or `enhancements.css` as needed.
4. **Run a local preview** – `python -m http.server 8000` and reload the page to verify layout and interactions.
5. **Commit & push** – Follow the repository’s conventional‑commit style and include the required attribution lines (see the system reminder).

---

## Miscellaneous Notes

- **Cursor / Copilot Rules** – No `.cursor` or `.github/copilot‑instructions.md` files are present in this repository.
- **README** – A dedicated `README.md` does not exist; the most important project details are already captured in the HTML hero section and the `DevAdhikari_AI_Agent_Developer.pdf` résumé.
- **Importable Configs** – There are no OpenAI Codex or Gemini CLI config files to import at this time.
- **Future Enhancements** – If a build tool (e.g., Vite, Webpack, or a static site generator) is introduced later, update this CLAUDE.md with the corresponding `npm run dev`, `npm run build`, and test commands.

---

## Attribution (required for git actions)

When you create commits or pull‑requests via Claude Code, remember to end commit messages with:
```
Co-Authored-By: Claude Code <noreply@anthropic.com>
```
and PR descriptions with:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

*End of CLAUDE.md*