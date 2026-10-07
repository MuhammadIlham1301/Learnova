# AGENTS.md — Learnova LMS

Static 10-page HTML/CSS/JS frontend (Indonesian-language student group project) + a Node.js/Express/SQLite REST API in `backend/`. Frontend has no build, no package manager, no tests, no linter, no CI — verify it by opening the HTML files in a browser (Tailwind is loaded from CDN, so styling needs internet access). Backend runs with npm inside `backend/` (see Backend section).

## Hard constraints (from `docs/REQUIREMENTS.md`, status FINAL — revised 2026-10-07)

- Exactly **10 pages**: `index.html`, `login.html`, `register.html`, `forgot-password.html`, `dashboard.html`, `dashboard-dosen.html`, `matakuliah.html`, `materi.html`, `tugas.html`, `jadwal.html`. Do not add pages beyond this list.
- **Register** (`register.html`) and **Forgot Password** (`forgot-password.html`) exist as **frontend-only simulations** (alert + redirect, no `fetch()`); they follow the same Stitch design system as Login. They are legitimate pages — keep them and keep `login.html`'s links ("Daftar Sekarang", "Lupa Kata Sandi?") pointing at them. "Daftar" on the Landing Page goes to `login.html` (per REQUIREMENTS).
- **Forbidden**: real file upload, a role-selection/management UI (role comes only from the DB at login), React/Vue, Bootstrap, complex calendars, chat, AI features, heavy backend frameworks/ORMs (use plain Express + SQLite).
- Backend **is** in scope: REST API in `backend/` (Node.js + Express + SQLite), endpoints per `docs/REQUIREMENTS.md` §7 (`auth`, `matakuliah`, `materi`, `tugas`, `progress`, `jadwal`, `notifikasi`, `health`), JSON responses `{ success, data }` / `{ success, message }`, CORS enabled.
- **Integration status (2026-10-07)**: Login calls `POST /api/auth/login` and redirects by the DB role — **mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html`**. Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, and Jadwal render via `fetch()`. "Kumpulkan Tugas" (`submitTask()`) remains a **frontend-only simulation** (badge toggle) — there is no submit endpoint. Register/Forgot Password remain frontend-only simulations (no endpoints). The Landing Page is static (dummy data consistent with the SQLite seed).
- `dashboard-dosen.html` is **read-only**: no submission UI, no invented statistics. Summary cards (MK/tugas/jadwal/notifikasi) + 6 sections: **Mata Kuliah Diampu**, **Jadwal Mengajar**, **Tugas & Tenggat**, **Papan Pengumuman**, **Materi Kelas**, **Pengumpulan Tugas**. Lecturer–course mapping filters courses whose `lecturer_email` equals the logged-in session email (**no fallback to the full catalog**); when no course matches (e.g. `andi@learnova.id`), the sections render honest empty states plus the `#course-mapping-note` note.
- All data is dummy and must be **consistent across pages AND with the SQLite seed**. Canonical 7 courses (revised 2026-10-07): **Seminar Capstone Project, Audit System & IT Governance, Big Data, Enterprise Resource Planning (ERP), Kewirausahaan, Manajemen Resiko, Sistem Pendukung Keputusan dan Eksekutif** (older docs mentioning "Pemrograman Web/Basis Data/Analisis Sistem" are stale — code wins).
- UI and copy are in **Bahasa Indonesia** (`lang="id"`).
- Track progress by ticking checkboxes in `docs/TASKS.md`.

## Styling

- Tailwind CSS via `https://cdn.tailwindcss.com` + an inline `tailwind.config` block duplicated in the `<head>` of **every** HTML file (identical hash across all 10). Custom theme: `primary #022619`, `accent #D4621A`, `base #F5F0E8`, `surface #eafef2`, `border #C8D5CC` + the Stitch semantic palette (`secondary`, `secondary-container`, `on-surface-variant`, `error-container`, `on-error`, `on-error-container`, …); `font-sans` = Plus Jakarta Sans, `font-serif` = Newsreader (Google Fonts `<link>` also in every head).
- If you change theme tokens or fonts, update all 10 heads — there is no shared partial. Verify the config stays identical (same keys/values) across every page.
- Visual language: **Stitch design system** — components `card-stitch*`, `btn-stitch*`, `badge-stitch*`, `chip-stitch*`, `input-stitch`, `progress-stitch*`, `container-stitch`, plus the dark sidebar rail on app pages (Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, Jadwal). Sidebar nav on every app page: Dashboard, Mata Kuliah, Materi, Tugas, Jadwal (+ logout).
- `css/style.css` holds the reusable Stitch component classes plus what Tailwind can't do (scrollbar, smooth scroll). Don't move page-specific styling there by default.
- Colors/fonts/layout rules: `docs/DESIGN.md` (sections 2–4 and §9 "Anti AI-Slop Rules"). `DESIGN.md` §8 documents the tech stack incl. the backend architecture (updated 2026-10-07). Note: REQUIREMENTS/README/DESIGN may still contain stale details — code and this file win when they disagree.

## JavaScript

- `js/script.js` loads on every page; it wires the mobile menu (requires ids `mobile-menu-btn` + `mobile-menu`), a **fallback** client-side login handler (`login-form`, `login-error`, `email`, `password` → redirect when non-empty) that is **skipped on `login.html`** (that page has its own API-based handler), plus `simulateRegister()` / `simulateForgotPassword()` (alert-only).
- `login.html` (inline `<script>`) does client-side validation + `fetch()` `POST /api/auth/login`, shows API errors in `#login-error`, stores the user in `localStorage`, and redirects by `data.user.role` (`dosen` → `dashboard-dosen.html`, else `dashboard.html`); its two links use `onclick` → `forgot-password.html` / `register.html`.
- Page-specific behavior lives in inline `<script>` blocks at the bottom of each page: `dashboard.html` (6 fetches: matakuliah, progress, tugas, jadwal, notifikasi, materi), `dashboard-dosen.html` (5 fetches: matakuliah, tugas, jadwal, notifikasi, materi), `matakuliah.html` (meeting tabs + 2 fetches), `materi.html` (course/status filters + 2 fetches), `tugas.html` (`submitTask()` status toggle + 2 fetches), `jadwal.html` (day chips + course dropdown filters + 2 fetches: jadwal, matakuliah). Keep shared behavior in `script.js`, page-local behavior inline.
- JS toggles Tailwind `hidden` classes directly — removing/renaming those classes breaks interactivity. Don't remove elements/IDs referenced by `fetch()` rendering or `localStorage` (e.g. `mobile-menu-btn`, `login-form`, filter controls).

## Backend

- Lives entirely in `backend/` (separate npm project — `package.json` only exists there, never at repo root).
- Stack: Node.js + Express + `better-sqlite3`, database file `backend/learnova.db` (generated by seed, not committed). No ORM, no TypeScript, no bundler.
- Run: `npm install` then `npm start` (or `node src/server.js`) inside `backend/`; API base URL `http://localhost:3000/api`, CORS must stay enabled.
- Layout: `src/server.js` (routing + CORS + 404/error handlers), `src/db/` (`connection.js`, `seed.js`), `src/controllers/` (auth, matakuliah, materi, tugas, progress, jadwal, notifikasi), `src/routes/auth.js` (`POST /login`), `src/data/` (JSON seed). Endpoints are fixed by `docs/REQUIREMENTS.md` §7.
- Login returns `{ success, message, user }` — **no token**; no register/reset-password/submit endpoints.
- Seed data lives in `backend/src/db/seed.js` (idempotent DROP+CREATE+INSERT) and must mirror the frontend's dummy data exactly (same 7 courses, lecturers, task titles, deadlines).
- Do not create backend code, routes, or files outside `backend/`.

## Working rules

- Before implementing anything, read `docs/REQUIREMENTS.md`, `docs/DESIGN.md`, and `docs/TASKS.md` — `DESIGN.md` §0 makes this mandatory. Scope there is the source of intent; when docs and code disagree, code wins (then fix the docs).
- Don't invent fake-looking data or filler sections (see `DESIGN.md` §9); dummy content should be obviously placeholder and in Indonesian academic context.
- `assets/images/` is empty — no logo/image files exist yet; don't reference files that aren't there (Stitch pages use verified remote Unsplash URLs instead).

## Frontend change rules (integration complete 2026-10-07)

- Frontend visual design follows the Stitch system on all 10 pages; frontend redesigns are not forbidden, but changes must be **deliberate and verified** — preserve layout integrity, config consistency across the 10 heads, and responsive behavior (no horizontal overflow at 1280px/375px).
- JavaScript frontend may be changed for maintenance/features, but **preserve the existing `fetch()` integration** (endpoints, JSON handling, rendering) unless the API itself is being changed.
- Backend changes stay inside `backend/` only.
- Integration uses `fetch()` to the existing REST API; register/Forgot Password and `submitTask()` intentionally stay simulation-only unless endpoints are added.
- Jangan menghapus fitur frontend yang sudah ada (nav, filter, tabs, badge, link Register/Forgot).
