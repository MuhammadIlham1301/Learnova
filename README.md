# 🎓 Learnova

> **Learning Management System for Modern Students**

## Deskripsi

**Learnova** adalah aplikasi web Learning Management System (LMS) yang dirancang untuk mendukung proses pembelajaran modern secara digital. Aplikasi ini memungkinkan mahasiswa mengakses materi kuliah, melihat tugas, memantau progress belajar, dan mengelola jadwal — semuanya dalam satu platform yang mudah digunakan.

Frontend berupa **10 halaman statis** (HTML, Tailwind CSS, JavaScript vanilla) dan **backend REST API** dengan Node.js + Express + SQLite di folder [`backend/`](backend/).

Halaman: `index.html`, `login.html`, `register.html`, `forgot-password.html`, `dashboard.html`, `dashboard-dosen.html`, `matakuliah.html`, `materi.html`, `tugas.html`, `jadwal.html`. Register dan Forgot Password adalah **simulasi frontend** (tanpa endpoint); login mengarahkan **mahasiswa → `dashboard.html`** dan **dosen → `dashboard-dosen.html`** (role dibaca dari database). Seluruh halaman mengikuti design system Stitch (halaman aplikasi memakai sidebar rail gelap) dan responsif di desktop/mobile.

Login, Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, dan Jadwal sudah **terintegrasi REST API** (`fetch()`); Landing Page menampilkan data statis yang konsisten dengan seed database.

Project ini dibuat sebagai **Tugas Kelompok** mata kuliah pemrograman web.

## Status Project

| Status | Fase |
|--------|------|
| ✅ Selesai | **Integrasi Frontend–Backend** (10 halaman, API terhubung) |

**Hasil pengujian terakhir (2026-10-07)**: Backend API 9/9 PASS · Static checks PASS (10 halaman, config identik) · JSON/e2e 8/8 PASS · Feature tests 12/12 PASS · Browser interaction 7/7 PASS · 4 akun demo lolos (redirect sesuai role) · Jadwal (API + filter + nav) ALL PASS · 0 error console · 0 overflow horizontal di 1280px & 375px. Rincian: [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) §11.

## Anggota Kelompok

| No | Nama | Peran / Halaman |
|----|------|-----------------|
| 1  | Muhammad Adrian | UI/UX & Frontend |
| 2  | Egi Bayu Setiawan | Backend, Database & REST API |
| 3  | Muhammad Ilham | Integrasi Frontend–Backend, Testing & Dokumentasi |

## Teknologi

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

> Frontend statis tanpa build tool; backend REST API dijalankan dengan npm dari folder `backend/`.

## Menjalankan Project

**Prasyarat:** Node.js + npm (internet untuk CDN Tailwind & Google Fonts).

**1. Backend (REST API):**

```bash
cd backend
npm install        # sekali saja — menginstall express, cors, better-sqlite3, bcryptjs
npm run seed       # membuat backend/learnova.db dari nol (jalankan ulang kapan pun untuk reset data)
npm start          # API berjalan di http://localhost:3000/api — cek GET /api/health
```

> Database tidak dibuat otomatis oleh `npm start` — wajib `npm run seed` terlebih dahulu.

**2. Frontend:** buka `index.html` langsung di browser (atau lewat live server), lalu login dari halaman Login.

**Akun Demo — hanya untuk DEMO/LOCAL development (bukan akun produksi):**

| Nama | Email | Password | Role |
|------|-------|----------|------|
| Muhammad Ilham | `ilham@learnova.id` | `learnova123` | mahasiswa |
| Muhammad Adrian | `adrian@learnova.id` | `learnova123` | mahasiswa |
| Mohammad Givi Efgivia | `givi@learnova.id` | `learnova123` | dosen |
| Dr. Andi Pratama | `andi@learnova.id` | `learnova123` | dosen |

> Keempat akun dibuat oleh `backend/src/db/seed.js`, tersimpan **hanya di `backend/learnova.db` lokal**, password di-hash bcrypt (tidak ada plaintext di database), dan **role diambil dari database** saat login. Jangan gunakan kredensial ini di lingkungan produksi — ubah nilai demo di seed bila perlu.

## Dokumentasi

| File | Keterangan |
|------|------------|
| [📋 Requirements](docs/REQUIREMENTS.md) | Kebutuhan dan spesifikasi project |
| [🎨 Design](docs/DESIGN.md) | Rancangan halaman, navigasi, dan pembagian tugas |
| [✅ Tasks](docs/TASKS.md) | Daftar tugas dan progres pengerjaan |

## Alur Aplikasi

```
Landing Page → Login → Dashboard (mahasiswa) / Dashboard Dosen (dosen)
                            ↓
        Mata Kuliah → Materi / Tugas / Jadwal
                  ↕
        Register / Forgot Password (simulasi frontend)
```

---

> © 2026 Learnova — Tugas Kelompok
