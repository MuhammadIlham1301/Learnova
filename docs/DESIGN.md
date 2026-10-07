# 🎨 Design Document — Learnova

> Dokumen rancangan visual dan fungsional aplikasi Learnova.
> Tidak ada source code di sini — hanya panduan desain dan rencana implementasi.
>
> **Sumber:** Diperbarui berdasarkan referensi visual desain Stitch dan ketentuan resmi dosen.
> **Status sinkronisasi 2026-10-07:** dokumen ini selaras dengan implementasi aktual —
> 10 halaman, design system Stitch, integrasi REST API (lihat §5, §8).

---

## 0. Aturan Wajib untuk Implementasi

> [!IMPORTANT]
> Sebelum mengimplementasikan halaman atau fitur apa pun, agent/developer WAJIB membaca:
> - `README.md`
> - `docs/REQUIREMENTS.md`
> - `docs/TASKS.md`
> - `docs/DESIGN.md` (dokumen ini)
>
> Implementasi yang tidak mengacu pada dokumen-dokumen di atas tidak diperbolehkan.

---

## 1. Visual Direction

Learnova menggunakan gaya **editorial academic modern** — tampilan yang terasa premium, rapi, dan profesional, tetapi tetap nyaman dan mudah digunakan oleh mahasiswa.

### Prinsip Utama

| Prinsip | Penjelasan |
|---------|------------|
| **Editorial Academic** | Terinspirasi dari desain majalah akademik modern — typography kuat, layout berani |
| **Premium & Profesional** | Bukan tampilan dashboard generik — setiap halaman punya karakter visual |
| **Asymmetric / Bento Grid** | Layout tidak selalu simetris; gunakan grid yang dinamis dan menarik |
| **Banyak Whitespace** | Ruang kosong digunakan secara sengaja — bukan kekosongan, tapi napas desain |
| **Border & Card Minimal** | Hindari border tebal dan shadow berlebihan; gunakan hanya saat benar-benar perlu |
| **Usability First** | Prioritaskan kemudahan penggunaan di atas dekorasi visual |

### Yang Harus Dihindari

- Tampilan dashboard template generik (kotak-kotak seragam, warna biru korporat)
- Section atau elemen yang ditambahkan hanya untuk "mengisi ruang"
- Statistik atau data palsu yang terkesan dipaksakan
- Fitur yang tidak ada di `REQUIREMENTS.md`

---

## 2. Color System

Palet warna terinspirasi dari referensi visual desain Stitch, disesuaikan untuk identitas Learnova.

### Palet Utama

> Nilai hex di bawah ini adalah token yang terpasang di blok `tailwind.config` setiap halaman
> (sumber kebenaran: kode). Selain itu, config memuat palet semantik Stitch: `secondary`,
> `secondary-container`, `on-surface-variant`, `error`, `error-container`, `on-error`,
> `on-error-container`, `surface-container`, dst.

| Peran | Nama | Hex | Penggunaan |
|-------|------|-----|-----------|
| **Primary** | Deep Green | `#022619` | Sidebar rail, heading utama, tombol primer, aksen kuat |
| **Background** | Cream / Off-white | `#F5F0E8` | Background utama seluruh halaman |
| **Accent** | Orange | `#D4621A` | Highlight, badge status, tombol aksi penting, underline aksen |
| **Surface** | Mint Surface | `#eafef2` | Background card, panel, form |
| **Border** | Soft Gray-Green | `#C8D5CC` | Border card dan divider — tipis dan subtle |
| **Text Primary** | Dark | `#1A1A1A` | Heading dan body text utama |
| **Text Secondary** | Medium Gray | `#6B7280` | Label, caption, metadata |
| **Text on Primary** | White | `#FFFFFF` | Teks di atas background deep green |

### Aturan Penggunaan Warna

- **Deep Green** hanya untuk elemen dengan bobot visual tinggi (sidebar, navbar, CTA utama, heading hero)
- **Orange** digunakan secara hemat — hanya untuk status penting atau aksi utama, bukan dekorasi
- **Cream** sebagai background memberi kesan hangat dan tidak "dingin" seperti putih murni
- **Mint Surface** untuk card/panel agar terpisah dari background cream
- Jangan mencampur terlalu banyak warna dalam satu halaman — gunakan maksimal 3 warna bersamaan
- Jika menambah token warna baru, tambahkan ke **semua 8 head** agar config identik (lihat `AGENTS.md`)

---

## 3. Typography

### Font yang Digunakan

| Font | Penggunaan | Sumber |
|------|------------|--------|
| **Newsreader** | Heading display, hero title, editorial accent | Google Fonts |
| **Plus Jakarta Sans** | Body text, navigasi, tombol, label, UI elemen | Google Fonts |

### Hierarki Typography

| Level | Font | Ukuran (Desktop) | Ukuran (Mobile) | Penggunaan |
|-------|------|-----------------|-----------------|------------|
| **Display / Hero** | Newsreader | 56–72px | 36–48px | Judul besar di hero section Landing Page |
| **H1 — Page Title** | Newsreader | 36–48px | 28–36px | Judul utama tiap halaman |
| **H2 — Section Title** | Newsreader | 24–30px | 22–26px | Judul section dalam halaman |
| **H3 — Card Title** | Plus Jakarta Sans | 18–20px | 16–18px | Judul card, nama mata kuliah |
| **Body** | Plus Jakarta Sans | 15–16px | 14–15px | Paragraf, deskripsi, konten materi |
| **Label / Caption** | Plus Jakarta Sans | 12–13px | 11–12px | Metadata, deadline, status badge |
| **Button** | Plus Jakarta Sans | 14–15px | 14px | Semua tombol — font weight medium/semibold |
| **Navigation** | Plus Jakarta Sans | 14px | 14px | Item navbar dan sidebar |

### Aturan Typography

- Heading dengan Newsreader memberikan karakter editorial yang kuat
- Body text dengan Plus Jakarta Sans menjaga keterbacaan di semua ukuran
- Jangan gunakan lebih dari 2 font family
- Line-height body: 1.6–1.7 untuk kenyamanan membaca
- Letter-spacing heading display: sedikit negatif (-0.5 hingga -1px) untuk kesan premium

---

## 4. Layout

### Karakter Layout Learnova

Pertahankan karakter visual berikut di seluruh halaman:

| Elemen | Panduan |
|--------|---------|
| **Navbar** | Bersih, tipis, tidak terlalu tinggi. Logo di kiri, menu di kanan. Tidak ada drop shadow berat. |
| **Hero Section** | Typography besar dan berani. Asymmetric — teks tidak selalu di tengah. |
| **Asymmetric Grid** | Kolom tidak harus sama lebar. Gunakan variasi 60/40 atau 70/30. |
| **Bento/Grid Cards** | Card dengan ukuran berbeda-beda dalam satu grid — bukan kotak seragam. |
| **Whitespace** | Padding section minimal 80px di desktop, 48px di mobile. Jangan padatkan layout. |
| **Border** | Hanya gunakan border tipis (`1px`) dengan warna `#C8D5CC`. Tidak ada border tebal. |
| **Rounded Corner** | Border-radius secukupnya: `8px` untuk card, `6px` untuk tombol, `4px` untuk badge. |

### Breakpoint Responsive

| Breakpoint | Lebar | Keterangan |
|------------|-------|------------|
| **Desktop** | > 1024px | Layout penuh, sidebar terlihat, grid multi-kolom |
| **Tablet** | 768px – 1024px | Layout sedang, sidebar bisa di-collapse |
| **Mobile** | < 768px | Layout satu kolom, sidebar disembunyikan, hamburger menu |

### Prinsip Mobile Layout

> Mobile layout **bukan sekadar desktop yang dikecilkan**. Susun ulang elemen agar tetap nyaman digunakan dengan jari.

- Sidebar tersembunyi → diganti hamburger menu (☰) di navbar
- Grid card berubah dari multi-kolom menjadi single-column
- Tombol lebih tinggi (min 44px) agar mudah di-tap
- Font tidak terlalu kecil (minimum 14px untuk body)
- Jarak antar elemen lebih lega di mobile

### Teknik CSS

| Teknik | Fungsi |
|--------|--------|
| `CSS Grid` | Layout utama halaman dan bento-style cards |
| `Flexbox` | Navbar, baris tombol, alignment elemen horizontal |
| `@media query` | Responsive breakpoint desktop/tablet/mobile |
| `clamp()` | Font size yang menyesuaikan ukuran layar secara fluid |
| `max-width + margin auto` | Membatasi lebar konten agar tidak terlalu lebar |
| `CSS Custom Properties` | Warna dan spacing yang konsisten via variabel CSS |

---

## 5. Struktur Halaman

**10 halaman** (implementasi aktual — tanpa penambahan halaman di luar daftar ini):

| No | Halaman | File | Fungsi | Integrasi API |
|----|---------|------|--------|---------------|
| 1 | Landing Page | `index.html` | Halaman pertama yang dilihat pengunjung sebelum login | — (statis, konsisten dengan seed) |
| 2 | Login | `login.html` | Form masuk ke aplikasi | ✅ `POST /api/auth/login` |
| 3 | Register | `register.html` | Form pendaftaran akun | ⚠️ Simulasi frontend (tanpa endpoint) |
| 4 | Forgot Password | `forgot-password.html` | Form pemulihan kata sandi | ⚠️ Simulasi frontend (tanpa endpoint) |
| 5 | Dashboard | `dashboard.html` | Halaman utama mahasiswa setelah login — ringkasan aktivitas | ✅ matakuliah, progress, tugas, jadwal, notifikasi, materi |
| 6 | Dashboard Dosen | `dashboard-dosen.html` | Ringkasan **read-only** untuk dosen setelah login | ✅ matakuliah, tugas, jadwal, notifikasi, materi |
| 7 | Mata Kuliah | `matakuliah.html` | Daftar mata kuliah dan pertemuan | ✅ matakuliah, progress |
| 8 | Materi | `materi.html` | Konten materi per pertemuan | ✅ materi, matakuliah |
| 9 | Tugas | `tugas.html` | Daftar dan detail tugas | ✅ tugas, matakuliah |
| 10 | Jadwal | `jadwal.html` | Jadwal kuliah dengan filter hari & mata kuliah | ✅ jadwal, matakuliah |

### Alur Navigasi

```
[Pengunjung]
     │
     ▼
Landing Page (index.html)
     │
     ├── Klik "Masuk" ──────────────► Login (login.html) ◄──┐
     │                                    │                 │
     │                              Login sukses       Register (register.html)
     │                              via API (role DB)  Forgot Password (…)
     │                                    │             [simulasi frontend]
     │                    ┌───────────────┴───────────┐         │
     │                    ▼                           ▼         │
     │        mahasiswa → Dashboard        dosen → Dashboard Dosen
     │         (dashboard.html)            (dashboard-dosen.html) ─┘
     │                    │                           │  (alert → kembali Login)
     │              ┌─────┴─────────┬─────────┬───────┴────┐
     │              ▼               ▼         ▼            ▼
     │        Mata Kuliah         Materi     Tugas        Jadwal
     │     (matakuliah.html)  (materi.html)(tugas.html) (jadwal.html)
     │
     └── Sidebar "Keluar Akun" ──► kembali ke Landing Page
```

### Navbar: Dua Kondisi

**Sebelum login (Landing Page):**
```
[ Learnova ]              [ Beranda ]  [ Fitur ]  [ Mata Kuliah ]  [ Masuk ]  [ Daftar ]
```

**Setelah login (Dashboard, Mata Kuliah, Materi, Tugas):**
```
[ Learnova ]      [ Dashboard ]  [ Mata Kuliah ]  [ Materi ]  [ Tugas ]      [ 👤 Nama ▾ ]
```

> **Mobile:** Semua menu navbar terlipat menjadi ikon hamburger (☰). Saat diklik, menu muncul sebagai overlay/drawer dari atas atau samping.

---

## 6. Detail Setiap Halaman

---

### 6.1 🌐 Landing Page (`index.html`)

**Tujuan:** Memperkenalkan Learnova kepada pengunjung dan mendorong mereka untuk login atau daftar.

**Layout Konsep:**
```
┌─────────────────────────────────────────────────────────┐
│ NAVBAR: Logo Learnova | Beranda Fitur MK | Masuk Daftar │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│  HERO — kiri             │  Visual/ilustrasi — kanan    │
│  "Learnova"              │  (bisa berupa card dummy     │
│  (Newsreader, besar)     │   atau gambar sederhana)     │
│                          │                              │
│  Tagline LMS             │                              │
│                          │                              │
│  [Mulai Belajar]         │                              │
│  [Masuk]                 │                              │
│                          │                              │
├──────────────────────────┴──────────────────────────────┤
│ FITUR LEARNOVA — Bento Grid (3–4 card berbeda ukuran)   │
│ [Materi Digital] [Pantau Progress] [Kelola Tugas] ...   │
├─────────────────────────────────────────────────────────┤
│ MATA KULIAH TERSEDIA — Grid card sederhana              │
│ [Big Data] [Capstone] [Audit SI] [ERP] ... (7 MK)         │
├─────────────────────────────────────────────────────────┤
│ FOOTER: © 2026 Learnova | Tugas Kelompok                │
└─────────────────────────────────────────────────────────┘
```

**Komponen UI:**
- Navbar (logo + menu + 2 tombol: Masuk & Daftar)
- Hero section: heading display (Newsreader), tagline, 2 CTA button
- Section fitur: bento-style grid, 3–4 card, icon sederhana + deskripsi singkat
- Section mata kuliah: card preview (nama MK, dummy info singkat)
- Footer: nama aplikasi, tahun, nama anggota kelompok

**Navigasi keluar dari halaman ini:**
- Klik "Masuk" → `login.html`
- Klik "Daftar" → `login.html` (sesuai ketentuan REQUIREMENTS §5; halaman `register.html` diakses dari Login via link "Daftar Sekarang")

---

### 6.2 🔐 Login (`login.html`)

**Tujuan:** Pintu masuk ke aplikasi. Login **terintegrasi backend** — kredensial divalidasi via `POST /api/auth/login` (lihat §8).

**Layout Konsep:**
```
┌──────────────────┬──────────────────────────────────────┐
│                  │                                      │
│  Panel kiri      │  Panel kanan — Form Login            │
│  (background     │                                      │
│   dark green,    │  [ Logo Learnova ]                   │
│   quote atau     │  "Selamat datang kembali"            │
│   visual LMS)    │                                      │
│                  │  ┌────────────────────────────────┐  │
│                  │  │ Email / Username               │  │
│                  │  ├────────────────────────────────┤  │
│                  │  │ Password                       │  │
│                  │  └────────────────────────────────┘  │
│                  │                                      │
│                  │  [ Lupa password? ]                  │
│                  │  [ Masuk ]  ← tombol full-width      │
│                  │                                      │
│                  │  Belum punya akun? [Daftar]          │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
```

**Komponen UI:**
- Panel kiri dekoratif (background dark green, bisa berisi logo besar atau kutipan)
- Input Email / Username
- Input Password (dengan toggle show/hide opsional)
- Tombol "Masuk" (full-width, dark green)
- Link "Lupa password?"
- Link "Daftar sekarang"

**Login via API (implementasi aktual):**
- Klik tombol "Masuk" → validasi client-side (field tidak boleh kosong), lalu `fetch()` `POST /api/auth/login`
- Sukses → profil user disimpan ke `localStorage` → redirect ke `dashboard.html`
- Gagal (email tidak ditemukan / password salah) → pesan error API tampil pada kotak error
- Link "Lupa Kata Sandi?" → `forgot-password.html` (simulasi frontend)
- Link "Daftar Sekarang" → `register.html` (simulasi frontend)

**Navigasi keluar dari halaman ini:**
- Login berhasil → `dashboard.html`
- Klik "Daftar Sekarang" → `register.html`; "Lupa Kata Sandi?" → `forgot-password.html`
- Link kembali → `index.html`

---

### 6.3 📊 Dashboard (`dashboard.html`)

**Tujuan:** Halaman utama setelah login. Memberikan gambaran umum aktivitas dan kondisi belajar mahasiswa.

**Layout Konsep:**
```
┌────────────┬────────────────────────────────────────────┐
│            │ NAVBAR                                     │
│  SIDEBAR   ├────────────────────────────────────────────┤
│            │                                            │
│ Dashboard  │  "Selamat datang, [Nama Mahasiswa]"        │
│ Mata       │  Hari ini, [tanggal dummy]                 │
│ Kuliah     │                                            │
│ Materi     │  ┌─────────────┬──────────┬─────────────┐  │
│ Tugas      │  │ MK Aktif    │  Tugas   │ Progress    │  │
│            │  │ [angka]     │ Mendd [n]│ [%]         │  │
│ ──────     │  └─────────────┴──────────┴─────────────┘  │
│ 👤 [Nama]  │                                            │
│            │  MATA KULIAH SAYA                          │
│            │  ┌──────────────┐  ┌──────────────┐       │
│            │  │ Big Data     │  │ Capstone     │       │
│            │  │ Progress 40% │  │ Progress 40% │       │
│            │  └──────────────┘  └──────────────┘       │
│            │                                            │
│            │  TUGAS MENDATANG        PENGUMUMAN         │
│            │  • Tugas 1 – [MK]       • Info kelas      │
│            │  • Tugas 2 – [MK]       • Jadwal ujian    │
└────────────┴────────────────────────────────────────────┘
```

**Komponen UI:**
- Greeting: "Selamat datang kembali, [Nama]" (nama dari sesi login `localStorage.learnova_user`)
- **4 summary card** (angka dihitung dari API, tanpa statistik karangan): **Beban Studi / Mata Kuliah Aktif** (`/matakuliah` + chips MK), **Rata-rata Progress** (`/progress`), **Tenggat Terdekat** (`/tugas`), **Materi Tuntas** (`completed_materials` vs `total_materials` dari `/progress` + `/matakuliah`)
- Grid mata kuliah yang diikuti (card dengan nama MK + progress bar dari `/progress`)
- Daftar tugas mendatang (nama tugas + mata kuliah — dari `/tugas`)
- **Materi Pembelajaran Terbaru** (kartu materi dari `GET /api/materi`, kontainer `#materi-terbaru-list`)
- Pengumuman/notifikasi sederhana (dari `/notifikasi`, data dummy di DB)
- Jadwal kuliah (dari `/jadwal`)

**Data dummy yang diperbolehkan:**
- Nama mahasiswa: "Mahasiswa" atau nama placeholder yang jelas dummy
- Nama mata kuliah: pakai 7 MK baku (Seminar Capstone Project, Audit System & IT Governance, Big Data, ERP, Kewirausahaan, Manajemen Resiko, SPKE)
- Progress: persentase dummy dari seed SQLite yang jelas bukan data nyata

**Navigasi keluar dari halaman ini:**
- Sidebar/navbar → `matakuliah.html`, `materi.html`, `tugas.html`, `jadwal.html`

---

### 6.4 📚 Mata Kuliah (`matakuliah.html`)

**Tujuan:** Menampilkan daftar mata kuliah dan pertemuan. Pintu masuk ke materi dan tugas per pertemuan.

**Layout Konsep:**
```
┌────────────┬────────────────────────────────────────────┐
│            │ Mata Kuliah                                │
│  SIDEBAR   │ ───────────────────────────────────────── │
│            │  ┌──────────────┐  ┌──────────────┐       │
│            │  │ Big Data     │  │ Capstone     │       │
│            │  │ Dosen: [nama]│  │ Dosen: [nama]│       │
│            │  │ 2 Materi     │  │ 2 Materi     │       │
│            │  │ 3 Tugas      │  │ 3 Tugas      │       │
│            │  │ Progress 40% │  │ Progress 40% │       │
│            │  └──────────────┘  └──────────────┘       │
│            │                                            │
│            │ [Klik card → masuk ke daftar pertemuan]   │
│            │ ───────────────────────────────────────── │
│            │  Detail Pertemuan (saat card diklik)       │
│            │  Pertemuan 1 – Pengenalan HTML             │
│            │  [Lihat Materi]  [Lihat Tugas]             │
│            │  Pertemuan 2 – CSS Dasar                   │
│            │  [Lihat Materi]  [Lihat Tugas]             │
└────────────┴────────────────────────────────────────────┘
```

**Komponen UI:**
- Grid card mata kuliah (nama MK, nama dosen, jumlah materi/tugas, progress bar — semua dari `GET /api/matakuliah` + `GET /api/progress`)
- Daftar pertemuan (tab pertemuan, konten showcase Big Data)
- Tombol "Lihat Materi" dan "Lihat Tugas" per pertemuan
- Pencarian daftar mata kuliah (`#course-search`)

**Navigasi keluar dari halaman ini:**
- Klik "Lihat Materi" → `materi.html`
- Klik "Lihat Tugas" → `tugas.html`

---

### 6.5 📁 Materi (`materi.html`)

**Tujuan:** Menampilkan daftar dan konten materi per pertemuan.

**Layout Konsep:**
```
┌────────────┬────────────────────────────────────────────┐
│            │ Materi — Big Data                           │
│  SIDEBAR   │ ───────────────────────────────────────── │
│            │  ┌────────────────────────────────────┐   │
│ [Daftar    │  │ Pertemuan 1 – Pengenalan HTML       │   │
│  Materi]   │  │ 📄 PDF  |  Status: ✅ Sudah Dibaca  │   │
│            │  │ [Buka Materi]                       │   │
│ • Pertemuan│  ├────────────────────────────────────┤   │
│   1 ✅      │  │ Pertemuan 2 – CSS Dasar             │   │
│ • Pertemuan│  │ 📄 PDF  |  Status: ⬜ Belum Dibaca  │   │
│   2 ⬜      │  │ [Buka Materi]                       │   │
│ • Pertemuan│  └────────────────────────────────────┘   │
│   3 ⬜      │                                            │
│            │  ← Kembali ke Mata Kuliah                  │
└────────────┴────────────────────────────────────────────┘
```

**Komponen UI:**
- Grid/daftar kartu materi — data dari `GET /api/materi`, nama MK dari `GET /api/matakuliah`
- Tipe materi ditampilkan sebagai badge: `📄 PDF`, `🎬 Video`, `📝 Teks`
- Status: "Sudah Dibaca" (✅ hijau) / "Belum Dibaca" (⬜ abu) — dari field `status_baca` API
- Filter client-side: chip mata kuliah (Semua, Big Data, Capstone, Audit SI, ERP, Kewirausahaan, Manajemen Resiko, SPKE) + dropdown status
- Tombol "Buka Materi" per item (simulasi alert)
- Tombol navigasi: "← Kembali ke Mata Kuliah"

**Aturan konten:**
- Tidak ada embed PDF/video nyata — "Buka Materi" hanya simulasi alert
- Status baca berasal dari data dummy API; perubahan status tidak disimpan kembali ke database

**Navigasi keluar dari halaman ini:**
- Kembali → `matakuliah.html`
- Navbar → halaman lain

---

### 6.6 📝 Tugas (`tugas.html`)

**Tujuan:** Menampilkan daftar tugas beserta deadline dan status pengerjaan.

**Layout Konsep:**
```
┌────────────┬────────────────────────────────────────────┐
│            │ Tugas                                      │
│  SIDEBAR   │ ───────────────────────────────────────── │
│            │  ┌────────────────────────────────────┐   │
│            │  │ Tugas 1 – Membuat Form HTML         │   │
│            │  │ Mata Kuliah: Big Data                  │   │
│            │  │ Deadline: 10 Oktober 2026           │   │
│            │  │ Status: [Belum Dikerjakan] ← badge  │   │
│            │  │ [Lihat Detail]                      │   │
│            │  ├────────────────────────────────────┤   │
│            │  │ Tugas 2 – Membuat Layout CSS        │   │
│            │  │ Mata Kuliah: Big Data                  │   │
│            │  │ Deadline: 17 Oktober 2026           │   │
│            │  │ Status: [Sudah Dikumpulkan] ← badge │   │
│            │  │ [Lihat Detail]                      │   │
│            │  └────────────────────────────────────┘   │
└────────────┴────────────────────────────────────────────┘
```

**Komponen UI:**
- List card tugas — data dari `GET /api/tugas`, nama MK dari `GET /api/matakuliah`
- Status badge: "Belum Dikerjakan" (orange), "Terlambat", "Dikumpulkan" (hijau) — dihitung dari field `status` + `deadline`
- Tombol "Kumpulkan Tugas" (simulasi `submitTask()` — hanya UI, tidak ada upload nyata)

**Aturan konten:**
- Deadline menggunakan tanggal dummy yang jelas tidak nyata atau tanggal generik
- Data tugas berasal dari seed API (dummy); tidak ada endpoint submit di backend
- Tidak perlu fitur upload file nyata

**Navigasi keluar dari halaman ini:**
- Navbar/sidebar → halaman lain

---

### 6.7 📝 Register (`register.html`) — simulasi frontend

**Tujuan:** Pendaftaran akun dengan tampilan selaras dengan halaman Login (kartu tengah + glow, input berikon). Seluruh aksinya **simulasi frontend** — tidak ada `fetch()` dan tidak ada endpoint register.

**Komponen UI:**
- Form: Nama Lengkap, Email, Kata Sandi, Konfirmasi Kata Sandi
- Validasi client-side: field kosong → kotak error; konfirmasi tidak cocok → kotak error
- Tombol "Daftar Sekarang" → alert simulasi → redirect ke `login.html`
- Link "Masuk Sekarang" → `login.html`; link kembali ke `index.html`

---

### 6.8 🔒 Forgot Password (`forgot-password.html`) — simulasi frontend

**Tujuan:** Pemulihan kata sandi dengan tampilan selaras dengan Login. Seluruh aksinya **simulasi frontend** — tidak ada `fetch()` dan tidak ada endpoint reset password.

**Komponen UI:**
- Form: Email
- Validasi client-side: email kosong → kotak error
- Tombol "Kirim Instruksi Reset" → alert simulasi → redirect ke `login.html`
- Link "Kembali Masuk" → `login.html`

---

### 6.9 👨‍🏫 Dashboard Dosen (`dashboard-dosen.html`) — read-only

**Tujuan:** Ringkasan untuk dosen setelah login (role `dosen` dari database). Semua angka berasal dari respons API yang sudah ada — **tanpa statistik karangan, tanpa aksi tulis**.

**Komponen UI:**
- Shell identik dengan Dashboard (head config sama, sidebar + topbar Stitch, menu Dashboard aktif)
- Greeting: "Selamat datang kembali, [Nama]" — nama dari `localStorage.learnova_user`
- 4 ringkasan: MK Diampu, Tugas Aktif, Jadwal Mengajar, Notifikasi — dihitung dari `/matakuliah`, `/tugas`, `/jadwal`, `/notifikasi?user_id=` (semua angka hanya untuk MK yang diampu)
- Grid mata kuliah: hanya MK dengan `lecturer_email` = email sesi login (badge "Diampu"); jika kosong → daftar kosong + catatan jujur (tanpa katalog penuh, tanpa angka karangan)
- Kolom: jadwal mengajar (dari `/jadwal` difilter MK diampu, penanda "Hari Ini") + tugas & tenggat (top-5 dari MK diampu) + Materi Kelas (dari `/materi` difilter MK diampu) + Pengumpulan Tugas (empty state jujur — endpoint submit belum ada) + papan pengumuman (empty state bila kosong)
- Tombol CTA: "Buka Mata Kuliah" → `matakuliah.html`, "Lihat Jadwal" → `jadwal.html`

**Aturan konten:**
- Read-only: tanpa tombol kumpul/tambah/hapus — tidak ada endpoint pengelolaan
- Jangan menampilkan persentase/progress yang tidak dihitung dari data API

---

### 6.10 📅 Jadwal (`jadwal.html`)

**Tujuan:** Menampilkan jadwal kuliah mingguan (hari, jam, ruang) dengan filter.

**Komponen UI:**
- Shell identik dengan Materi/Tugas (sidebar, topbar, banner editorial)
- Banner: "Jadwal Perkuliahan" + ringkasan (total jadwal & kelas hari ini — dihitung dari API)
- Filter: chip hari (**dibuat dinamis dari hari yang ada pada data**) + dropdown mata kuliah — keduanya client-side
- Grid kartu jadwal: badge hari (penanda "Hari Ini"), nama MK + nama dosen (dari JOIN `matakuliah`/`lecturer` pada `/jadwal`), jam WIB, ruang
- States: loading skeleton, error + "Coba Lagi", empty state "Tidak Ada Jadwal" saat filter tidak cocok

## 7. Rencana Pembagian Halaman

> Anggota kelompok telah ditentukan. Pembagian halaman akan ditentukan kemudian bersama kelompok.

**Anggota Kelompok:**
1. Muhammad Adrian
2. Egi Bayu Setiawan
3. Muhammad Ilham

> Pembagian kontribusi per file belum dicatat (menunggu keputusan kelompok).
> Seluruh file di bawah **sudah diimplementasikan**; status menunjukkan kondisi kode saat ini.

| No | Halaman / Komponen | File | Dikerjakan oleh | Status |
|----|-------------------|------|-----------------|--------|
| 1 | Landing Page | `index.html` | Belum dicatat | ✅ Terpasang |
| 2 | Login | `login.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 3 | Register *(simulasi frontend)* | `register.html` | Belum dicatat | ✅ Terpasang |
| 4 | Forgot Password *(simulasi frontend)* | `forgot-password.html` | Belum dicatat | ✅ Terpasang |
| 5 | Dashboard | `dashboard.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 6 | Dashboard Dosen *(read-only)* | `dashboard-dosen.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 7 | Mata Kuliah | `matakuliah.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 8 | Materi | `materi.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 9 | Tugas | `tugas.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 10 | Jadwal | `jadwal.html` | Belum dicatat | ✅ Terpasang (terintegrasi API) |
| 11 | CSS komponen Stitch | `css/style.css` | Belum dicatat | ✅ Terpasang |
| 12 | JavaScript (navigasi + simulasi + fallback login) | `js/script.js` | Belum dicatat | ✅ Terpasang |
| 13 | Backend REST API | `backend/src/` | Belum dicatat | ✅ Terpasang |

---

## 8. Tech Stack

> **Revisi 2026-10-07:** Learnova ditambahkan backend. Tabel di bawah disesuaikan —
> aturan desain visual (§2–§4) dan rancangan halaman (§6) **tidak berubah**.

### Frontend — Yang Digunakan

| Teknologi | Keterangan |
|-----------|-----------|
| **HTML5** | Struktur halaman web (**10 halaman** sesuai daftar §5 — tanpa penambahan) |
| **Tailwind CSS** (via CDN) | Styling, layout, responsive — dimuat dari `cdn.tailwindcss.com` dengan blok `tailwind.config` inline di tiap `<head>` (identik di 10 halaman) |
| **JavaScript** (Vanilla) | Interaksi UI, hamburger menu, simulasi Register/Forgot Password & `submitTask()`, serta `fetch()` untuk memanggil REST API (login, dashboard, dashboard dosen, matakuliah, materi, tugas, jadwal) |
| **Google Fonts** | Newsreader + Plus Jakarta Sans (dimuat via `<link>` di HTML) |
| **Design system** | Komponen Stitch (`card-stitch*`, `btn-stitch*`, `badge-stitch*`, `chip-stitch*`, `input-stitch`, `progress-stitch*`) di `css/style.css` |

### Backend — Yang Digunakan (revisi 2026-10-07)

| Teknologi | Keterangan |
|-----------|-----------|
| **Node.js** | Runtime backend |
| **Express** | Server REST API di folder `backend/` |
| **SQLite** | Database file-based (`backend/learnova.db`) via `better-sqlite3` — tanpa server database terpisah |

### Tidak Digunakan (sesuai ketentuan dosen dan scope project)

| Tidak Digunakan | Alasan |
|----------------|--------|
| React / Vue / framework JS | Tidak diwajibkan, memperbesar kompleksitas |
| Bootstrap | Digantikan oleh Tailwind CSS |
| ORM berat / framework backend (Laravel, Django, dll.) | Cukup Express + SQLite untuk scope ini |
| UI pemilihan/manajemen role di frontend | Role hanya datang dari database saat login — `dashboard-dosen.html` adalah halaman ringkas read-only, bukan sistem role management |
| Endpoint register & reset password (backend) | Register & Forgot Password adalah simulasi frontend — halamannya ada, endpoint-nya tidak |
| Autentikasi token (JWT/Bearer) | Login hanya mengembalikan objek user ke `localStorage` |

### Arsitektur Frontend — Backend

```
┌──────────────────────────────┐          ┌───────────────────────────────┐
│  Frontend (10 file HTML)     │          │  Backend (backend/)           │
│  + CSS + JS — tanpa build    │  fetch() │  Node.js + Express            │
│  dibuka via browser /        ├─────────►│  http://localhost:3000/api    │
│  live server                 │  JSON    │         │                     │
└──────────────────────────────┘          │         ▼                     │
                                          │  SQLite (backend/learnova.db) │
                                          └───────────────────────────────┘
```

| Aspek | Keputusan |
|-------|-----------|
| Pemisahan | Frontend dan backend berjalan terpisah — frontend tetap file statis, tanpa build tool |
| Base URL | `http://localhost:3000/api` (daftar endpoint: `REQUIREMENTS.md` §7) |
| CORS | Wajib aktif di Express agar frontend (file HTML tanpa build tool) dapat memanggil API |
| Response | Format JSON konsisten: `{ success, data }` / `{ success, message }` |
| Autentikasi | `POST /api/auth/login` **tanpa token** — objek user disimpan ke `localStorage`, lalu redirect sesuai role: mahasiswa → Dashboard, dosen → Dashboard Dosen |
| Status integrasi | ✅ **Selesai (2026-10-07):** Login, Dashboard, Dashboard Dosen, Mata Kuliah, Materi, Tugas, Jadwal memanggil API via `fetch()`; Landing Page statis (konsisten dengan seed) |
| Simulasi frontend | Register, Forgot Password, dan `submitTask()` (Kumpulkan Tugas) sengaja tetap tanpa endpoint |
| Redesign frontend | ✅ **Boleh** selama tetap mempertahankan fungsi (navigasi, filter, tabs, ID yang dipakai JS), integrasi API (`fetch()`), konsistensi config di 10 halaman, dan design system Stitch |
| Data | Seed SQLite dari data dummy yang sama dengan yang tampil di frontend (konsistensi antar halaman tetap berlaku) |

### Struktur File (kondisi aktual)

```
learnova/
│
├── index.html            ← Landing Page
├── login.html            ← Halaman Login (terintegrasi API)
├── register.html         ← Register (simulasi frontend)
├── forgot-password.html  ← Forgot Password (simulasi frontend)
├── dashboard.html        ← Dashboard mahasiswa (terintegrasi API)
├── dashboard-dosen.html  ← Dashboard Dosen, read-only (terintegrasi API)
├── matakuliah.html       ← Halaman Mata Kuliah (terintegrasi API)
├── materi.html           ← Halaman Materi (terintegrasi API)
├── tugas.html            ← Halaman Tugas (terintegrasi API)
├── jadwal.html           ← Halaman Jadwal (terintegrasi API)
│
├── css/
│   └── style.css         ← Komponen Stitch + what Tailwind can't do
│
├── js/
│   └── script.js         ← Hamburger menu, fallback login, simulasi register/forgot
│
├── assets/
│   └── images/           ← Kosong (halaman Stitch memakai URL Unsplash remote)
│
├── backend/              ← Backend Node.js + Express + SQLite
│   ├── package.json      ← express, cors, better-sqlite3, bcryptjs
│   ├── learnova.db       ← Database SQLite (dihasilkan seed, tidak di-commit)
│   └── src/
│       ├── server.js     ← Entry point Express + CORS + routing + error handler
│       ├── db/
│       │   ├── connection.js  ← Koneksi & helper database
│       │   └── seed.js        ← Seeder data dummy (npm run seed)
│       ├── controllers/  ← auth, matakuliah, materi, tugas, progress, jadwal, notifikasi
│       ├── routes/
│       │   └── auth.js   ← POST /api/auth/login
│       └── data/         ← Data dummy awal (JSON)
│
├── docs/
│   ├── REQUIREMENTS.md
│   ├── DESIGN.md
│   └── TASKS.md
│
└── README.md
```

---

## 9. Anti AI-Slop Rules

> Aturan ini berlaku untuk setiap proses implementasi halaman Learnova.

| Aturan | Detail |
|--------|--------|
| ❌ Jangan tambah fitur tidak ada di requirements | Hanya implementasikan yang ada di `REQUIREMENTS.md` |
| ❌ Jangan buat statistik/data palsu terkesan nyata | Data dummy harus jelas bahwa itu placeholder |
| ❌ Jangan tambah section hanya untuk mempercantik | Setiap section harus punya fungsi yang jelas |
| ❌ Jangan ubah identitas visual Learnova | Warna, font, dan nama aplikasi tidak boleh berubah tanpa alasan |
| ❌ Jangan gunakan konten dari desain referensi | Tidak boleh pakai nama institusi asing, angka fiktif dari template |
| ✅ Gunakan data dummy yang jelas dan sederhana | Contoh: "Big Data", "Mahasiswa A", tanggal yang jelas dummy |
| ✅ Prioritaskan usability di atas dekorasi | Jika harus pilih antara cantik dan mudah digunakan, pilih mudah digunakan |
| ✅ Konteks LMS Indonesia | Gunakan bahasa Indonesia, nama mata kuliah umum, konteks perkuliahan lokal |

---

## 10. Catatan Perancangan

| Tanggal | Catatan |
|---------|---------|
| 2026-10-06 | Dokumen rancangan pertama dibuat |
| 2026-10-06 | DESIGN.md diperbarui: visual direction, color system, typography, layout detail, aturan implementasi |
| 2026-10-07 | Scope direvisi: backend Node.js + Express + SQLite ditambahkan. §8 Tech Stack diperbarui (Tailwind CDN sesuai kode) + subsection Arsitektur Frontend–Backend. |
| 2026-10-07 | Sinkronisasi implementasi: struktur halaman jadi **8 halaman** (Register & Forgot Password ditambahkan, simulasi frontend); token warna disesuaikan dengan `tailwind.config` aktual (§2); integrasi `fetch()` selesai untuk Login/Dashboard/Mata Kuliah/Materi/Tugas; klaim Bearer token dihapus (login tanpa token); redesign frontend dinyatakan boleh selama fungsi & integrasi terjaga (§8). |
| 2026-10-07 | Penambahan halaman atas permintaan: struktur jadi **10 halaman** — `dashboard-dosen.html` (ringkasan read-only dosen) dan `jadwal.html` (daftar jadwal + filter hari/MK); login mengarahkan berdasarkan **role database** (mahasiswa → `dashboard.html`, dosen → `dashboard-dosen.html`); menu "Jadwal" ditambahkan ke sidebar & mobile menu semua halaman aplikasi; §4–§8 disesuaikan. |
| — | Pembagian anggota kelompok belum diisi |
