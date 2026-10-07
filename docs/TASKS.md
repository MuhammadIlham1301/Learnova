# ✅ Tasks — Learnova LMS

Daftar tugas pengerjaan project dari awal hingga selesai.
Disusun berdasarkan ketentuan resmi tugas dan scope Learnova yang telah disepakati.

> **Cara pakai:** Ganti `[ ]` menjadi `[x]` jika tugas sudah selesai.

---

## 🎨 Tahap 1 — Perancangan

- [x] Menentukan nama aplikasi: **Learnova**
- [x] Menentukan tagline: *Learning Management System for Modern Students*
- [x] Menentukan konsep logo
- [x] Menentukan warna dan tipografi (Dark Green, Cream, Orange; Newsreader & Plus Jakarta Sans)
- [x] Membuat wireframe sederhana untuk halaman-halaman Learnova (kini diperluas menjadi 10 halaman)
- [x] Menentukan struktur menu dan navigasi
- [x] Menentukan tech stack: HTML5 + Tailwind CSS via CDN + Vanilla JavaScript
- [x] Menyusun dokumen REQUIREMENTS.md
- [x] Menyusun dokumen DESIGN.md

---

> **Catatan (revisi 2026-10-07):** Tech stack diperluas dengan **backend Node.js + Express + SQLite**
> (lihat Tahap 3). Kebutuhan frontend di bawah tidak berubah.

## 💻 Tahap 2 — Coding Frontend

> Tech stack: **HTML5**, **Tailwind CSS via CDN**, **Vanilla JavaScript**
>
> **Status: ✅ SELESAI (termasuk integrasi API 2026-10-07).** Frontend sudah memiliki **10 halaman**
> dan seluruhnya mengikuti design system Stitch; Login, Dashboard, Dashboard Dosen, Mata Kuliah,
> Materi, Tugas, dan Jadwal sudah memanggil REST API via `fetch()`. Data dummy tetap konsisten
> antar halaman dan dengan seed SQLite.
>
> Mata kuliah dummy yang digunakan (7 MK, konsisten dengan seed):
> - Seminar Capstone Project
> - Audit System & IT Governance
> - Big Data
> - Enterprise Resource Planning (ERP)
> - Kewirausahaan
> - Manajemen Resiko
> - Sistem Pendukung Keputusan dan Eksekutif

---

### 🌐 Landing Page (`index.html`)

- [x] Logo / nama Learnova
- [x] Navbar
- [x] Deskripsi LMS
- [x] Tombol Login
- [x] Tombol Register (mengarah ke `login.html`)
- [x] Informasi mata kuliah (7 MK konsisten dengan seed)
- [x] Informasi fitur LMS
- [x] Footer

---

### 🔐 Login (`login.html`)

- [x] Email / username
- [x] Password
- [x] Tombol Login
- [x] Link "Lupa Kata Sandi?" → `forgot-password.html`
- [x] Link "Daftar Sekarang" → `register.html`
- [x] Login terintegrasi API: `fetch()` `POST /api/auth/login` → sukses redirect sesuai role database (mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html`), gagal menampilkan pesan error API

---

### 📝 Register (`register.html`) — simulasi frontend

- [x] Form Nama Lengkap, Email, Kata Sandi, Konfirmasi
- [x] Validasi client-side (field kosong, konfirmasi tidak cocok)
- [x] Simulasi pendaftaran (alert) → redirect ke `login.html` — **tanpa endpoint backend**

---

### 🔒 Forgot Password (`forgot-password.html`) — simulasi frontend

- [x] Input Email
- [x] Validasi client-side (email kosong)
- [x] Simulasi pengiriman instruksi reset (alert) → redirect ke `login.html` — **tanpa endpoint backend**

---

### 📊 Dashboard (`dashboard.html`) — terintegrasi API

- [x] Nama pengguna
- [x] Daftar / ringkasan mata kuliah (7 MK: Seminar Capstone Project, Audit System & IT Governance, Big Data, ERP, Kewirausahaan, Manajemen Resiko, SPKE — `GET /api/matakuliah`)
- [x] Progress pembelajaran (`GET /api/progress?user_id=`)
- [x] Ringkasan materi (dari field `total_materials`)
- [x] Materi Pembelajaran Terbaru (`GET /api/materi` → kontainer `#materi-terbaru-list`)
- [x] Ringkasan tugas (`GET /api/tugas`)
- [x] Jadwal kuliah sederhana (`GET /api/jadwal`)
- [x] Notifikasi sederhana (`GET /api/notifikasi?user_id=`)

---

### 👨‍🏫 Dashboard Dosen (`dashboard-dosen.html`) — read-only, terintegrasi API

- [x] Shell identik Dashboard (config head sama, sidebar + topbar Stitch, menu Dashboard aktif)
- [x] Greeting nama dari sesi login (`localStorage.learnova_user`)
- [x] Ringkasan angka dihitung dari API untuk MK yang diampu: jumlah MK diampu, tugas aktif di MK tersebut, jadwal mengajar hari ini, notifikasi (tanpa statistik karangan)
- [x] Grid mata kuliah: hanya MK dengan `lecturer_email` = email sesi login (badge "Diampu"); bila kosong → daftar kosong + catatan jujur (tanpa katalog penuh, tanpa angka karangan)
- [x] Daftar jadwal mengajar (`GET /api/jadwal` difilter MK diampu, penanda "Hari Ini")
- [x] Tugas & tenggat (top-5 belum dikumpulkan dari MK yang diampu `GET /api/tugas`)
- [x] Materi Kelas (`GET /api/materi` difilter MK diampu + status baca)
- [x] Pengumpulan Tugas — empty state jujur (endpoint submit belum ada pada API)
- [x] Papan pengumuman (`GET /api/notifikasi?user_id=` + empty state)
- [x] Read-only: tanpa tombol kumpul/tambah/pengelolaan

---

### 📚 Mata Kuliah (`matakuliah.html`) — terintegrasi API

- [x] Menampilkan daftar mata kuliah (`GET /api/matakuliah` + pencarian)
- [x] Informasi dosen dan progress (`GET /api/progress?user_id=`)
- [x] Detail mata kuliah seperti Big Data
  - [x] Pertemuan 1, Pertemuan 2, Pertemuan 3 (tab pertemuan)
  - [x] Materi
  - [x] Tugas
  - [x] Praktikum jika ditampilkan dalam desain

---

### 📁 Materi (`materi.html`) — terintegrasi API

- [x] Daftar materi (`GET /api/materi` + `GET /api/matakuliah`)
- [x] Judul materi
- [x] Jenis materi seperti Teks / PDF / Video
- [x] Status sudah / belum dibaca (dari API, badge)
- [x] Filter mata kuliah (chip) + filter status + tombol "Buka Materi" (simulasi alert)

---

### 📝 Tugas (`tugas.html`) — terintegrasi API

- [x] Daftar tugas (`GET /api/tugas` + `GET /api/matakuliah`)
- [x] Mata kuliah
- [x] Judul tugas
- [x] Deadline (format Indonesia)
- [x] Status (dihitung dari status + deadline)
- [x] Simulasi penyerahan tugas `submitTask()` (ubah badge + disabled di UI — **tanpa endpoint submit**, sesuai §7)

---

### 📅 Jadwal (`jadwal.html`) — terintegrasi API

- [x] Daftar jadwal (`GET /api/jadwal` + nama MK dari `GET /api/matakuliah`)
- [x] Tampil hari, jam WIB, nama dosen (dari JOIN `lecturer`), ruang (badge "Hari Ini")
- [x] Filter hari — chip dibuat dinamis dari hari yang ada pada data
- [x] Filter mata kuliah (dropdown dari MK yang punya jadwal)
- [x] Ringkasan banner (total jadwal & kelas hari ini — dihitung dari API)
- [x] Loading skeleton, error + "Coba Lagi", empty state "Tidak Ada Jadwal"

---

### 🔗 Navigasi

- [x] Landing → Login
- [x] Login → Dashboard (mahasiswa) / Dashboard Dosen (dosen) — sesuai role database
- [x] Dashboard → Mata Kuliah
- [x] Mata Kuliah → Materi / Tugas
- [x] Menu "Jadwal" (`jadwal.html`) di sidebar desktop + mobile menu semua halaman aplikasi
- [x] Login → Register / Forgot Password (link "Daftar Sekarang" & "Lupa Kata Sandi?")
- [x] Navigasi kembali antarhalaman berfungsi

---

### 📱 Responsive

- [x] Tampilan responsif di desktop (uji 1280px — tanpa overflow horizontal)
- [x] Tampilan responsif di mobile (uji 375px — tanpa overflow horizontal)
- [x] Menu navigasi mobile berfungsi dengan baik (hamburger toggle)

---

## ⚙️ Tahap 3 — Backend (Node.js + Express + SQLite)

> Tech stack: **Node.js**, **Express**, **SQLite** (via `better-sqlite3`) + `bcryptjs` (hash password)
> Lokasi: folder `backend/` — base URL `http://localhost:3000/api`
> **Status: ✅ SELESAI (2026-10-07).** Endpoint mengikuti `REQUIREMENTS.md` §7; frontend lalu
> diintegrasikan ke API ini (lihat Tahap 2 & 4). Tidak ada endpoint register, reset password, maupun submit tugas.

### 🛠️ Setup

- [x] Inisialisasi folder `backend/` + `npm init` (`package.json` hanya di `backend/`)
- [x] Install dependensi: `express`, `cors`, `better-sqlite3`, `bcryptjs` (tanpa `jsonwebtoken`/`dotenv` — auth tidak memakai token)
- [x] Buat entry point `src/server.js`: middleware CORS, parser JSON, port dari `process.env.PORT || 3000`
- [x] Buat helper koneksi database `src/db/connection.js`

### 🗄️ Database & Seed

- [x] Skema SQLite (10 tabel): `users`, `courses`, `meetings`, `materials`, `tasks`, `submissions`, `progress`, `schedule`, `announcements`, `notifications`
- [x] Seed data dummy **konsisten dengan frontend** (7 MK: Seminar Capstone Project, Audit System & IT Governance, Big Data, ERP, Kewirausahaan, Manajemen Resiko, SPKE; nama dosen, judul tugas & jadwal sama persis; kolom `lecturer_email` untuk pemetaan dosen akun demo)
- [x] Skrip seed `src/db/seed.js` + data awal JSON di `src/data/`
- [x] `learnova.db` dibuat otomatis saat seed (`npm run seed`), tidak di-commit

### 🔌 REST API

- [x] `POST /api/auth/login` — validasi email + password (bcrypt) → `{ success, message, user }` **tanpa token**
- [x] `GET /api/matakuliah` dan `GET /api/matakuliah/:id`
- [x] `GET /api/materi` dan `GET /api/materi/:id`
- [x] `GET /api/tugas` dan `GET /api/tugas/:id`
- [x] `GET /api/progress` dan `GET /api/progress/:id` (`?user_id=`)
- [x] `GET /api/jadwal` dan `GET /api/jadwal/:id`
- [x] `GET /api/notifikasi` dan `GET /api/notifikasi/:id` (`?user_id=`)
- [x] `GET /api/health` — status server
- [x] Format response konsisten (`success`/`data`/`message`) + error handling JSON (400/401/404/500)

> **Tidak ada** endpoint `POST /api/tasks/:id/submit`, register, atau reset password —
> pengumpulan tugas, Register, dan Forgot Password tetap simulasi frontend.

### 🧪 Pengujian API

- [x] Semua endpoint mengembalikan JSON (9/9 PASS — uji otomatis)
- [x] Login berhasil untuk akun dummy, gagal untuk password salah (401) dan email kosong (400)
- [x] 10 halaman frontend tetap berfungsi setelah integrasi API (static checks PASS)

---

## 🧪 Tahap 4 — Pengujian

> **Hasil terakhir (2026-10-07):** Backend API 9/9 PASS · Static checks PASS (**10 halaman**) ·
> JSON/e2e 8/8 PASS · Feature tests 12/12 PASS · Browser interaction 7/7 PASS ·
> Akun demo 4 akun ALL PASS (redirect role) · Jadwal ALL PASS (API + filter + nav) ·
> Browser console 0 error · 0 overflow horizontal di 1280px & 375px (10 halaman).

- [x] Semua tombol utama dapat diklik
- [x] Navigasi antarhalaman berfungsi (termasuk link Register & Lupa Kata Sandi dari Login)
- [x] Login via API dapat digunakan (sukses → Dashboard / Dashboard Dosen sesuai role; error API tampil di kotak error)
- [x] Simulasi Register & Forgot Password berfungsi (validasi → alert → redirect ke Login)
- [x] Simulasi penyerahan tugas berfungsi dan status berubah (badge + tombol disabled)
- [x] Tampilan tidak rusak di berbagai ukuran layar
- [x] Responsive desktop dan mobile (uji 1280px & 375px — tanpa overflow horizontal)
- [x] Interaksi JavaScript berjalan tanpa error di console

---

## 📄 Tahap 5 — Dokumentasi & Pengumpulan

- [x] README.md
- [x] REQUIREMENTS.md
- [x] DESIGN.md
- [x] TASKS.md
- [x] Dokumentasi API backend (cara menjalankan + daftar endpoint → `REQUIREMENTS.md` §7, `README.md`, `AGENTS.md`)
- [ ] Screenshot halaman utama (Landing Page, Login, Dashboard, Mata Kuliah)
- [ ] Source code final
- [ ] Laporan / dokumentasi PDF (termasuk kontribusi anggota kelompok)
- [ ] Link deployment opsional jika digunakan
- [ ] Submit / kumpulkan ke dosen

---

## 📌 Catatan Progress

| Tanggal | Catatan |
|---------|---------|
| 2026-10-06 | Dokumentasi project dibuat dan diselaraskan sesuai ketentuan resmi tugas (README.md, REQUIREMENTS.md, DESIGN.md, TASKS.md) |
| 2026-10-07 | Scope direvisi: backend Node.js + Express + SQLite ditambahkan. REQUIREMENTS.md, DESIGN.md, TASKS.md, README.md, dan AGENTS.md diperbarui. Ditambahkan Tahap 3 — Backend. |
| 2026-10-07 | Backend selesai (10 tabel, endpoint nyata sesuai §7, login tanpa token) lalu **integrasi frontend–backend selesai**: Login, Dashboard, Mata Kuliah, Materi, Tugas via `fetch()`. Ditambahkan halaman `register.html` & `forgot-password.html` (simulasi frontend). Seluruh halaman diredesain mengikuti design system Stitch. Semua dokumen disinkronkan dengan kondisi aktual. |
| 2026-10-07 | **Penambahan 2 halaman (10 total):** `dashboard-dosen.html` (ringkasan read-only dosen, terintegrasi API) dan `jadwal.html` (daftar jadwal + filter hari/MK). Login kini mengarahkan berdasarkan role database (mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html`). Menu "Jadwal" ditambahkan ke sidebar & mobile menu semua halaman aplikasi. README, REQUIREMENTS, DESIGN, dan AGENTS.md disesuaikan. |
