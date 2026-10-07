# 📋 Requirements — Learnova LMS

> Dokumen final kebutuhan project berdasarkan ketentuan resmi dari dosen.
> **Status: FINAL (Revisi 2026-10-07)** — Scope direvisi: Learnova kini memiliki **backend**
> (Node.js + Express + SQLite). Kebutuhan frontend tidak berubah. Perubahan scope setelah
> revisi ini wajib didokumentasikan di dokumen ini dan `TASKS.md`.
>
> **Revisi dokumentasi 2026-10-07 (sinkronisasi implementasi):** frontend kini memiliki
> **10 halaman** (termasuk Register & Forgot Password — simulasi frontend — serta
> `dashboard-dosen.html` dan `jadwal.html`), login mengarahkan pengguna berdasarkan **role di
> database** (mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html`), integrasi
> `fetch()` ke REST API untuk Login, Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas,
> dan Jadwal **sudah selesai**, dan seluruh halaman mengikuti design system Stitch. Tabel
> endpoint pada §7 disesuaikan dengan kondisi backend aktual.

---

## 1. Latar Belakang

Proses pembelajaran di era digital membutuhkan platform yang memudahkan akses materi,
tugas, dan jadwal secara online. Project ini membangun sebuah
**Learning Management System (LMS) berbasis web** bernama **Learnova** sebagai tugas kelompok,
yang memungkinkan mahasiswa mengakses materi, mengumpulkan tugas, dan memantau progress belajar
secara digital melalui browser.

---

## 2. Tujuan

- Membangun aplikasi web LMS bernama Learnova yang dapat diakses melalui browser
- Menyediakan 10 halaman fungsional: Landing Page, Login, Register, Forgot Password, Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, Jadwal
- Membangun REST API backend (Node.js + Express + SQLite) yang menyediakan data untuk seluruh halaman
- Menghasilkan tampilan yang responsif di desktop dan mobile
- Memenuhi seluruh ketentuan pengumpulan tugas dari dosen

---

## 3. Aktor / Pengguna

Learnova memiliki **dua aktor** (role dibaca dari database saat login):

| Aktor | Deskripsi |
|-------|-----------|
| **Mahasiswa** | Pengguna utama sistem. Mengakses materi, melihat tugas, memantau progress, dan melihat jadwal kuliah. |
| **Dosen** | Melihat ringkasan **read-only** di `dashboard-dosen.html` (mata kuliah, tugas, jadwal, notifikasi). |

> **Catatan:**
> - Login sukses mengarahkan berdasarkan field `role` di database: **mahasiswa → `dashboard.html`**, **dosen → `dashboard-dosen.html`**.
> - `dashboard-dosen.html` bersifat **read-only** — tanpa UI pengumpulan/pengelolaan dan tanpa statistik yang tidak ada di API; pemetaan dosen–mata kuliah memfilter MK dengan `lecturer_email` = email sesi login (**tanpa fallback ke katalog penuh**); bila tidak ada MK yang cocok, ditampilkan daftar kosong + catatan jujur (`#course-mapping-note`).
> - Informasi nama dosen ditampilkan sebagai bagian dari informasi mata kuliah (data dummy dari seed).
> - Tidak ada UI pemilihan/manajemen role di frontend — role hanya datang dari database saat login.

---

## 4. Halaman

Learnova terdiri dari **10 halaman**, tidak lebih, tidak kurang:

| No | Halaman | File | Fungsi | Integrasi API |
|----|---------|------|--------|---------------|
| 1 | Landing Page | `index.html` | Halaman publik pertama yang dilihat sebelum login | — (statis, data dummy konsisten dengan seed) |
| 2 | Login | `login.html` | Halaman masuk ke sistem | ✅ `POST /api/auth/login` |
| 3 | Register | `register.html` | Halaman pendaftaran akun | ⚠️ **Simulasi frontend** (tanpa endpoint register) |
| 4 | Forgot Password | `forgot-password.html` | Halaman pemulihan kata sandi | ⚠️ **Simulasi frontend** (tanpa endpoint reset) |
| 5 | Dashboard | `dashboard.html` | Halaman utama mahasiswa setelah login | ✅ matakuliah, progress, tugas, jadwal, notifikasi, materi |
| 6 | Dashboard Dosen | `dashboard-dosen.html` | Ringkasan **read-only** untuk dosen setelah login | ✅ matakuliah, tugas, jadwal, notifikasi, materi |
| 7 | Mata Kuliah | `matakuliah.html` | Daftar mata kuliah dan pertemuan | ✅ matakuliah, progress |
| 8 | Materi | `materi.html` | Daftar materi per pertemuan | ✅ materi, matakuliah |
| 9 | Tugas | `tugas.html` | Daftar dan detail tugas | ✅ tugas, matakuliah |
| 10 | Jadwal | `jadwal.html` | Jadwal kuliah dengan filter hari & mata kuliah | ✅ jadwal, matakuliah |

> **Redirect login:** sukses autentikasi mengarahkan **mahasiswa → `dashboard.html`** dan
> **dosen → `dashboard-dosen.html`** (role dari database, bukan dari frontend).

> **Register & Forgot Password** dirancang sebagai satu keluarga visual dengan Login dan
> seluruh aksinya bersifat **simulasi frontend** (alert + redirect) — tidak ada endpoint
> register maupun reset password di backend. Tombol "Daftar Sekarang" dan "Lupa Kata Sandi?"
> di `login.html` mengarahkan ke kedua halaman tersebut; tombol "Daftar" pada Landing Page
> tetap diarahkan ke `login.html`.

---

## 5. Fitur per Halaman

---

### 🌐 Landing Page (`index.html`)

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Identitas Learnova | Logo dan nama aplikasi |
| 2 | Navbar | Navigasi dengan link ke bagian halaman + tombol Login |
| 3 | Deskripsi LMS | Penjelasan singkat tentang Learnova (hero section) |
| 4 | Tombol Login | Mengarahkan ke `login.html` |
| 5 | Informasi fitur | Tampilan fitur-fitur utama Learnova (card/grid) |
| 6 | Informasi mata kuliah | Preview mata kuliah yang tersedia (data dummy) |
| 7 | Footer | Nama aplikasi, tahun, nama anggota kelompok |

---

### 🔐 Login (`login.html`)

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Input Email / Username | Field teks untuk identitas pengguna |
| 2 | Input Password | Field password |
| 3 | Tombol Login | Klik → validasi client-side, lalu `fetch()` `POST /api/auth/login`; sukses → redirect sesuai role database: mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html` |
| 4 | Integrasi API | ✅ Kredensial divalidasi backend (akun dummy di SQLite); pesan error API ("Email tidak ditemukan", "Password salah", dll.) ditampilkan pada kotak error |
| 5 | Link "Lupa Kata Sandi?" | Mengarahkan ke `forgot-password.html` |
| 6 | Link "Daftar Sekarang" | Mengarahkan ke `register.html` |
| 7 | Link navigasi | Link kembali ke Landing Page |

> Tidak ada autentikasi token/JWT — login hanya memvalidasi akun dummy dan menyimpan
> profil user ke `localStorage` sebelum redirect.

---

### 👨‍🏫 Dashboard Dosen (`dashboard-dosen.html`) — terintegrasi API, read-only

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Greeting dosen | "Selamat datang kembali, [Nama]" — nama dari sesi login (`localStorage.learnova_user`) |
| 2 | Ringkasan angka | MK diampu, tugas aktif di MK tersebut, jadwal mengajar, notifikasi — **dihitung dari respons API** (tanpa statistik karangan) |
| 3 | Mata kuliah | Grid hanya MK dengan `lecturer_email` = email sesi login (badge "Diampu"); bila kosong → daftar kosong + catatan jujur |
| 4 | Tugas & tenggat | Top-5 tugas belum dikumpulkan dari MK yang diampu (`GET /api/tugas`, urut deadline) |
| 5 | Jadwal mengajar | `GET /api/jadwal` difilter MK diampu, dengan penanda "Hari Ini" |
| 6 | Materi Kelas | `GET /api/materi` difilter MK diampu + badge status baca |
| 7 | Pengumpulan Tugas | Empty state jujur — endpoint submit memang belum ada pada API |
| 8 | Papan pengumuman | `GET /api/notifikasi?user_id=` — empty state bila akun tidak punya notifikasi |

> Halaman **read-only**: tanpa tombol kumpul/tambah, tanpa pengelolaan data — cukup ringkasan
> dari endpoint yang sudah ada. Sidebar & navigasi identik dengan halaman mahasiswa (plus menu Jadwal).

---

### 📝 Register (`register.html`) — simulasi frontend

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Input Nama Lengkap, Email, Kata Sandi, Konfirmasi | Form pendaftaran dengan ikon, mengikuti design system Login |
| 2 | Validasi client-side | Field kosong → kotak error; konfirmasi tidak cocok → kotak error |
| 3 | Tombol "Daftar Sekarang" | Jika valid → menjalankan simulasi pendaftaran (alert) lalu redirect ke `login.html` |
| 4 | Link "Masuk Sekarang" | Mengarahkan ke `login.html` |

> ⚠️ **Simulasi murni.** Tidak ada `fetch()` dan **tidak ada endpoint register** di backend —
> tidak ada data user yang benar-benar dibuat.

---

### 🔒 Forgot Password (`forgot-password.html`) — simulasi frontend

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Input Email | Field email dengan ikon, mengikuti design system Login |
| 2 | Validasi client-side | Email kosong → kotak error |
| 3 | Tombol "Kirim Instruksi Reset" | Jika valid → menjalankan simulasi pengiriman (alert) lalu redirect ke `login.html` |
| 4 | Link "Kembali Masuk" | Mengarahkan ke `login.html` |

> ⚠️ **Simulasi murni.** Tidak ada `fetch()` dan **tidak ada endpoint reset password** di
> backend — tidak ada email yang benar-benar dikirim.

---

### 📊 Dashboard (`dashboard.html`) — terintegrasi API

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Greeting mahasiswa | "Selamat datang kembali, [Nama]" — nama dari profil dummy |
| 2 | Mata kuliah aktif | Jumlah & daftar MK dari `GET /api/matakuliah` |
| 3 | Progress pembelajaran | Persentase & gauge dari `GET /api/progress?user_id=` |
| 4 | Ringkasan materi | Jumlah modul dari field `total_materials` pada data matakuliah |
| 5 | Tugas mendatang | Daftar tugas dari `GET /api/tugas` + metrik jumlah tugas |
| 6 | Jadwal kuliah | Daftar jadwal dari `GET /api/jadwal` (hari/jam/nama MK) |
| 7 | Pengumuman / notifikasi | Daftar dari `GET /api/notifikasi?user_id=` |

---

### 📚 Mata Kuliah (`matakuliah.html`) — terintegrasi API

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Daftar mata kuliah | Grid MK dari `GET /api/matakuliah` (plus pencarian `#course-search`) |
| 2 | Nama dosen | Field `lecturer` dari API |
| 3 | Progress | Progress bar dari `GET /api/progress?user_id=` |
| 4 | Jumlah materi | Field `total_materials` dari API |
| 5 | Jumlah tugas | Field `total_tasks` dari API |
| 6 | Daftar pertemuan | Tab pertemuan (konten showcase Big Data) |
| 7 | Materi per pertemuan | Tombol akses materi → `materi.html` |
| 8 | Tugas per pertemuan | Tombol akses tugas → `tugas.html` |

---

### 📁 Materi (`materi.html`) — terintegrasi API

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Grid kartu materi | Data dari `GET /api/materi` + nama MK dari `GET /api/matakuliah` |
| 2 | Judul & deskripsi materi | Judul, pertemuan, dan deskripsi dari API |
| 3 | Tipe materi | Badge tipe: Teks, PDF, atau Video (dari field `tipe`) |
| 4 | Status baca | Badge "Sudah Dibaca" / "Belum Dibaca" (dari field `status_baca`) |
| 5 | Filter mata kuliah | Chip filter (Semua, Big Data, Capstone, Audit SI, ERP, Kewirausahaan, Manajemen Resiko, SPKE — id tombol: `btn-course-all`, `btn-course-bigdata`, dst.) — client-side |
| 6 | Filter status | Dropdown "Semua / Sudah Dibaca / Belum Dibaca" — client-side |
| 7 | Tombol "Buka Materi" | Simulasi alert (tidak ada embed PDF/video nyata) |

> Tidak ada embed PDF atau video nyata. Status baca ditampilkan dari data API (dummy);
> perubahan status tidak disimpan kembali ke database.

---

### 📝 Tugas (`tugas.html`) — terintegrasi API

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Daftar tugas | Data dari `GET /api/tugas` + nama MK dari `GET /api/matakuliah` |
| 2 | Judul & mata kuliah | Judul, pertemuan, dan nama MK dari API |
| 3 | Deadline | Tanggal tenggat dari field `deadline` (format Indonesia) |
| 4 | Status | Badge "Belum Dikerjakan" / "Terlambat" / "Dikumpulkan" (dihitung dari `status` + `deadline`) |
| 5 | Tombol Kumpulkan Tugas | Simulasi JavaScript — badge berubah + tombol disabled, tidak ada upload nyata |

> Pengumpulan tugas saat ini **simulasi frontend** (`submitTask()` hanya mengubah tampilan).
> Tidak ada upload file, dan **tidak ada endpoint submit di backend** — pengumpulan tugas
> memang di luar cakupan API saat ini.

---

### 📅 Jadwal (`jadwal.html`) — terintegrasi API

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Daftar jadwal | Data dari `GET /api/jadwal` + nama MK dari `GET /api/matakuliah` |
| 2 | Hari, jam, dosen, ruang | Badge hari (penanda "Hari Ini"), `jam_mulai`–`jam_selesai` WIB, nama dosen (dari JOIN `lecturer`), ruang |
| 3 | Filter hari | Chip hari — **dibuat dinamis dari hari yang ada pada data** — client-side |
| 4 | Filter mata kuliah | Dropdown MK dari daftar MK yang punya jadwal — client-side |
| 5 | Ringkasan banner | Total jadwal & jumlah kelas hari ini (dihitung dari API) |
| 6 | Empty state | Pesan "Tidak Ada Jadwal" bila filter tidak cocok dengan data |

---

## 6. Data

- Data disimpan di **SQLite** melalui backend (`backend/learnova.db`), di-*seed* dari data dummy awal
- Data dummy harus **konsisten antar halaman** (nama MK, nama dosen, dan judul tugas yang sama harus sama di semua halaman) **dan konsisten dengan data seed di database**
- Nama mahasiswa: gunakan placeholder yang jelas sebagai dummy (contoh: "Mahasiswa")
- Nama mata kuliah: gunakan 7 MK baku (Seminar Capstone Project, Audit System & IT Governance, Big Data, Enterprise Resource Planning (ERP), Kewirausahaan, Manajemen Resiko, Sistem Pendukung Keputusan dan Eksekutif)
- Nama dosen: gunakan nama placeholder yang jelas dummy
- Deadline: gunakan tanggal yang jelas tidak nyata atau format generik
- **Status integrasi:** Landing Page menampilkan data statis yang konsisten dengan seed;
  Login, Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, dan Jadwal sudah memanggil
  REST API via `fetch()` (lihat §7 — Backend & REST API)

---

## 7. Teknologi

### Tech Stack Final

**Frontend (tidak berubah):**

| Teknologi | Peran | Keterangan |
|-----------|-------|------------|
| **HTML** | Struktur | Fondasi struktur semua halaman — sesuai ketentuan wajib dosen |
| **Tailwind CSS** | Styling & Responsive UI | Styling dan responsive UI berdasarkan panduan desain Learnova. Termasuk dalam kategori framework CSS yang diperbolehkan dalam ketentuan tugas |
| **JavaScript Vanilla** | Interaksi, Simulasi & Integrasi | Simulasi pengumpulan tugas, simulasi Register/Forgot Password, hamburger menu mobile, interaksi UI, serta `fetch()` untuk memanggil REST API (login, dashboard, dashboard dosen, matakuliah, materi, tugas, jadwal) |

**Backend (revisi 2026-10-07):**

| Teknologi | Peran | Keterangan |
|-----------|-------|------------|
| **Node.js** | Runtime backend | Menjalankan server REST API |
| **Express** | Framework server | Routing dan middleware REST API di folder `backend/` |
| **SQLite** | Database | Database file-based (`backend/learnova.db`) — tanpa server database terpisah |

### Yang Tidak Digunakan

| Teknologi | Alasan |
|-----------|--------|
| Endpoint register & reset password (backend) | Halaman Register & Forgot Password tetap simulasi frontend — tidak ada endpoint terkait |
| Autentikasi token/JWT/OAuth | Login cukup validasi akun dummy + `localStorage` — tanpa token |
| React / Vue / framework JS lainnya | Tidak diperlukan untuk scope project ini |
| Bootstrap | Digantikan oleh Tailwind CSS |
| ORM berat / framework backend (Laravel, Django, dll.) | Di luar scope — cukup Express + SQLite |

> **Frontend tanpa framework/build tool.** Seluruh halaman mengikuti **design system Stitch**
> (palet warna, tipografi Newsreader/Plus Jakarta Sans, komponen `card-stitch`, `btn-stitch`,
> `badge-stitch`, `chip-stitch`, sidebar rail untuk halaman aplikasi) — lihat §7 "Frontend &
> Design System". Layout responsive desktop/mobile (sidebar tersembunyi di bawah breakpoint `lg`,
 hamburger + dropdown menu). React/Vue/Bootstrap tetap tidak digunakan.

### Frontend & Design System

| Halaman | Design system | Keterangan |
|---------|---------------|------------|
| Landing Page, Login, Dashboard, Mata Kuliah | ✅ **Stitch** (sumber visual utama) | Nav editorial, kartu, sidebar rail gelap, tipografi serif-headline |
| Materi, Tugas, Jadwal | ✅ **Stitch** — satu keluarga dengan Dashboard & Mata Kuliah | Sidebar + topbar identik, banner editorial, kartu & badge Stitch |
| Dashboard Dosen | ✅ **Stitch** — satu keluarga dengan Dashboard | Shell identik Dashboard, ringkasan read-only dari API |
| Register, Forgot Password | ✅ **Stitch** — satu keluarga dengan Login | Kartu tengah + glow, accent bar, input berikon, band bawah |
| Responsive | ✅ Desktop & mobile | Uji overflow horizontal lulus di 1280px dan 375px |

- Token desain diduplikasi sebagai blok `tailwind.config` identik di `<head>` setiap halaman
  (10 file) + class komponen di `css/style.css`.
- Class reusable: `card-stitch*`, `btn-stitch*`, `badge-stitch*`, `chip-stitch*`, `input-stitch`,
  `progress-stitch*`, `container-stitch`.

### Backend & REST API

- Base URL: `http://localhost:3000/api`
- Semua response berformat JSON dengan skema konsisten (`{ "success": true, "data": ... }` / `{ "success": false, "message": ... }`)
- Middleware CORS wajib aktif agar frontend (dibuka via file statis / live server) dapat memanggil API
- Login **tidak** menggunakan token — `POST /api/auth/login` mengembalikan objek `user` (tanpa password);
  frontend menyimpannya ke `localStorage` lalu redirect
- Upload file **tidak** disediakan — pengumpulan tugas hanya berupa perubahan tampilan di frontend
- **Belum ada** endpoint register dan reset password (halaman terkait simulasi frontend)

| Method | Endpoint | Fungsi | Halaman terkait |
|--------|----------|--------|-----------------|
| GET | `/health` | Status server | *(pengecekan)* |
| POST | `/auth/login` | Autentikasi email + password (akun dummy) → objek user | `login.html` |
| GET | `/matakuliah` | Daftar mata kuliah (termasuk `total_materials`, `total_tasks`, `lecturer_email`) | `dashboard.html`, `dashboard-dosen.html`, `matakuliah.html`, `materi.html`, `tugas.html`, `jadwal.html` |
| GET | `/matakuliah/:id` | Detail satu mata kuliah | `matakuliah.html` |
| GET | `/materi` | Daftar materi (judul, tipe, status baca, pertemuan) | `materi.html`, `dashboard.html`, `dashboard-dosen.html` |
| GET | `/materi/:id` | Detail satu materi | `materi.html` |
| GET | `/tugas` | Daftar tugas (judul, deadline, status) | `tugas.html`, `dashboard.html`, `dashboard-dosen.html` |
| GET | `/tugas/:id` | Detail satu tugas | `tugas.html` |
| GET | `/progress` | Progress per mata kuliah (`?user_id=`) | `dashboard.html`, `matakuliah.html` |
| GET | `/progress/:id` | Detail progress | `dashboard.html` |
| GET | `/jadwal` | Daftar jadwal kuliah (termasuk `matakuliah`, `lecturer`, `lecturer_email` via JOIN) | `dashboard.html`, `dashboard-dosen.html`, `jadwal.html` |
| GET | `/jadwal/:id` | Detail jadwal | `dashboard.html`, `jadwal.html` |
| GET | `/notifikasi` | Daftar pengumuman/notifikasi (`?user_id=`) | `dashboard.html`, `dashboard-dosen.html` |
| GET | `/notifikasi/:id` | Detail notifikasi | `dashboard.html` |

---

## 8. Struktur Source Code

```
Learnova/
├── index.html           ← Landing Page
├── login.html           ← Halaman Login (terintegrasi API)
├── register.html        ← Halaman Register (simulasi frontend)
├── forgot-password.html ← Halaman Forgot Password (simulasi frontend)
├── dashboard.html       ← Dashboard (terintegrasi API)
├── matakuliah.html      ← Halaman Mata Kuliah (terintegrasi API)
├── materi.html          ← Halaman Materi (terintegrasi API)
├── tugas.html           ← Halaman Tugas (terintegrasi API)
├── css/
│   └── style.css        ← CSS komponen Stitch (card-stitch, btn-stitch, dll.)
├── js/
│   └── script.js        ← JavaScript: hamburger menu, handler login fallback (non-login.html), simulasi register/lupa password
├── assets/
│   └── images/          ← Logo dan gambar pendukung (belum dipakai)
├── backend/             ← Backend Node.js + Express + SQLite (revisi 2026-10-07)
│   ├── package.json     ← Dependensi backend (express, cors, better-sqlite3, dll.)
│   ├── .env             ← Konfigurasi (port, dll.) — tidak dikompilasi
│   ├── learnova.db      ← Database SQLite (dihasilkan dari seed, tidak di-commit)
│   └── src/
│       ├── server.js    ← Entry point Express + routing endpoint + middleware CORS
│       ├── db/
│       │   ├── connection.js ← Koneksi & helper database
│       │   └── seed.js        ← Seeder data dummy ke SQLite
│       ├── controllers/ ← Controller: auth, matakuliah, materi, tugas, progress, jadwal, notifikasi
│       ├── routes/
│       │   └── auth.js  ← Route POST /api/auth/login
│       └── data/        ← Data dummy awal (JSON) untuk seed
├── docs/
│   ├── REQUIREMENTS.md
│   ├── DESIGN.md
│   └── TASKS.md
└── README.md
```

> `style.css` hanya digunakan untuk hal-hal yang tidak dapat dihandle oleh Tailwind utility classes.
> Tailwind CSS dimuat via CDN di setiap file HTML.
> Struktur backend bersifat indikatif — boleh disesuaikan selama endpoint §7 tetap tersedia.

---

## 9. Aturan Scope

Fitur-fitur berikut **dilarang ditambahkan** karena berada di luar requirements:

| Dilarang | Alasan |
|----------|--------|
| Halaman tambahan di luar 10 halaman terdaftar (§4) | Scope frontend sudah final pada 10 halaman |
| UI pemilihan / manajemen role di frontend | Role hanya datang dari database saat login |
| Aksi tulis/tambah pada Dashboard Dosen | Dashboard Dosen read-only — tidak ada endpoint pengelolaan |
| Upload file sungguhan | Pengumpulan tugas tetap simulasi tampilan — tanpa penyimpanan file |
| Endpoint register / reset password | Register & Forgot Password tetap simulasi frontend |
| Kalender kompleks | Di luar scope — jadwal cukup daftar sederhana |
| Fitur chat / pesan | Tidak ada dalam requirements |
| Fitur AI tambahan | Tidak ada dalam requirements |
| Framework JS (React, Vue, dll.) | Tidak diperlukan |
| ORM / framework backend berat (Laravel, Django, dll.) | Cukup Express + SQLite |

---

## 10. Alur Navigasi

```
Landing Page (index.html)
     │
     ├── Klik "Masuk" ──► Login (login.html) ◄──► Register (register.html)   [simulasi]
     │                         │                  Forgot Password (…)        [simulasi]
     │                         └── Login sukses (API, role database) ──► mahasiswa → Dashboard (dashboard.html)
     │                                                            └─► dosen → Dashboard Dosen (dashboard-dosen.html)
     │                                                        │
     │                          ┌──────────────┬──────────────┼──────────────┬──────────────┐
     │                          ▼              ▼              ▼              ▼              ▼
     │                    Mata Kuliah        Materi         Tugas         Jadwal    Papan Pengumuman
     │                  (matakuliah.html) (materi.html)  (tugas.html)  (jadwal.html) (#papan-pengumuman)
     │
     └── Sidebar "Keluar Akun" / Logout ──► Landing Page (index.html)
```

---

## 11. Kriteria Pengujian Minimal

| Kriteria | Keterangan |
|----------|------------|
| ✅ Tombol dapat diklik | Semua tombol utama berfungsi |
| ✅ Navigasi berfungsi | Perpindahan antar halaman berjalan normal (termasuk link Register & Lupa Kata Sandi dari Login) |
| ✅ Tampilan tidak rusak | Layout tidak berantakan di browser manapun |
| ✅ Login via API | `POST /api/auth/login` → redirect sesuai role (mahasiswa → Dashboard, dosen → Dashboard Dosen); akun/email tak dikenal & password salah → kotak error |
| ✅ Register & Forgot Password (simulasi) | Validasi field client-side → alert → redirect ke Login |
| ✅ Tugas simulasi | Klik tombol Kumpulkan Tugas → status berubah |
| ✅ Responsif | Tampilan menyesuaikan di desktop dan mobile (tanpa scroll horizontal) |
| ✅ API merespons | Semua endpoint mengembalikan JSON skema `{ success, data/message }` |

### Hasil Pengujian Terakhir (2026-10-07)

| Pemeriksaan | Hasil |
|-------------|-------|
| Backend API (endpoint, CORS, validasi login, error JSON) | ✅ **9/9 PASS** |
| Static checks (config identik **10 halaman**, tag balance, sintaks script, ID kritis, link/anchor, menu Jadwal di semua halaman aplikasi) | ✅ **PASS** |
| Pengujian fungsi halaman (jsdom JSON/e2e) | ✅ **8/8 PASS** |
| Feature tests (filter materi, chip status, tab matakuliah, hamburger) | ✅ **12/12 PASS** |
| Browser interaction tests (interaksi nyata: register, forgot, filter, submit) | ✅ **7/7 PASS** |
| Akun demo (4 akun: redirect sesuai role, greeting, USER_ID, dosen read-only, negatif 400/401/401) | ✅ **ALL PASS (38 cek)** |
| Jadwal (API + filter hari/kombinasi kosong + nav menu dari dashboard) | ✅ **ALL PASS (20 cek)** |
| Console browser | ✅ **0 error** |
| Overflow horizontal (10 halaman × 1280px & 375px) | ✅ **0 overflow** (20 kombinasi lulus) |

---

## 12. Ketentuan Pengumpulan

| No | Ketentuan | Keterangan |
|----|-----------|------------|
| 1 | **Source Code** | Seluruh kode wajib dikumpulkan |
| 2 | **Kontribusi Anggota** | Setiap anggota harus memiliki kontribusi yang jelas dan dapat diidentifikasi |
| 3 | **Pemahaman Kode** | Setiap anggota harus mampu menjelaskan bagian kode yang dikerjakan |
| 4 | **Dokumentasi PDF** | Laporan project dalam format PDF |
| 5 | **Screenshot** | Screenshot: Landing Page, Login, Dashboard, Mata Kuliah |
| 6 | **Link Deployment** | Sertakan link jika aplikasi di-deploy *(opsional)* |

---

## 13. Output Akhir

```
Landing Page → Login → Dashboard / Dashboard Dosen → Mata Kuliah → Materi / Tugas / Jadwal
     └─► Login ◄─► Register / Forgot Password (simulasi frontend)
```

Disertai dengan:
- Source code lengkap (10 halaman HTML + CSS + JS frontend + backend Node.js/Express/SQLite)
- Dokumentasi PDF
- Screenshot 4 halaman utama
- Link deployment *(opsional)*

---

> **Anggota Kelompok:**
> 1. Muhammad Adrian
> 2. Egi Bayu Setiawan
> 3. Muhammad Ilham
>
> © 2026 Learnova — Tugas Kelompok
