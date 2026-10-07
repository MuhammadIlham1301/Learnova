const db = require('./connection');
const bcrypt = require('bcryptjs');

console.log('🌱 Seeding database...');

db.exec(`
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS progress;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'mahasiswa',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  lecturer_email TEXT,
  description TEXT,
  total_materials INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE meetings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  meeting_number INTEGER NOT NULL,
  description TEXT,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  meeting_id INTEGER,
  title TEXT NOT NULL,
  type TEXT CHECK(type IN ('Teks', 'PDF', 'Video')) NOT NULL,
  content TEXT,
  status TEXT CHECK(status IN ('Belum Dibaca', 'Sudah Dibaca')) DEFAULT 'Belum Dibaca',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE SET NULL
);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  meeting_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  deadline TEXT NOT NULL,
  status TEXT CHECK(status IN ('Belum Dikerjakan', 'Sudah Dikumpulkan')) DEFAULT 'Belum Dikerjakan',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE SET NULL
);

CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  submitted_at TEXT DEFAULT (datetime('now')),
  status TEXT CHECK(status IN ('Dikumpulkan', 'Dinilai')) DEFAULT 'Dikumpulkan',
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  percentage INTEGER DEFAULT 0,
  completed_materials INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(user_id, course_id)
);

CREATE TABLE schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  day TEXT NOT NULL,
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  room TEXT,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK(status IN ('belum_dibaca', 'sudah_dibaca')) DEFAULT 'belum_dibaca',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

// Akun demo (DEMO/LOCAL) — password di-hash bcrypt, tidak ada plaintext di database.
// Seed selalu DROP + CREATE seluruh tabel, sehingga re-run tidak pernah menduplikasi user.
const demoUsers = [
  { email: 'ilham@learnova.id', password: bcrypt.hashSync('learnova123', 10), name: 'Muhammad Ilham', role: 'mahasiswa' },
  { email: 'adrian@learnova.id', password: bcrypt.hashSync('learnova123', 10), name: 'Muhammad Adrian', role: 'mahasiswa' },
  { email: 'givi@learnova.id', password: bcrypt.hashSync('learnova123', 10), name: 'Mohammad Givi Efgivia', role: 'dosen' },
  { email: 'andi@learnova.id', password: bcrypt.hashSync('learnova123', 10), name: 'Dr. Andi Pratama', role: 'dosen' }
];

const insertUser = db.prepare(`
  INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)
`);
let userId = null;
demoUsers.forEach((u, i) => {
  const res = insertUser.run(u.email, u.password, u.name, u.role);
  if (i === 0) userId = res.lastInsertRowid;
});

// 7 mata kuliah semester ini — nama dosen persis seperti data akademik yang diberikan.
// lecturer_email hanya diisi untuk dosen akun demo (givi@learnova.id), kolom lain NULL
// (pemetaan dosen–mata kuliah untuk dosen lain memang belum ada datanya).
const courses = [
  { name: 'Seminar Capstone Project', lecturer: 'MUHAMMAD GIVI EFGIVIA, Dr., Ir., M.Kom', lecturerEmail: 'givi@learnova.id', description: 'Seminar penyusunan proposal capstone: perumusan masalah, tinjauan pustaka, metodologi, dan rencana pengembangan proyek.', total_tasks: 3 },
  { name: 'Audit System & IT Governance', lecturer: 'NUR CHALIK AZHAR, M.Kom', lecturerEmail: null, description: 'Audit sistem informasi dan tata kelola TI: standar COBIT/ISO 27001, kontrol internal, serta pelaporan kepatuhan.', total_tasks: 3 },
  { name: 'Big Data', lecturer: 'MUHAMMAD GIVI EFGIVIA, Dr., Ir., M.Kom', lecturerEmail: 'givi@learnova.id', description: 'Pengantar konsep Big Data, Hadoop, Spark, dan analisis data berskala besar.', total_tasks: 3 },
  { name: 'Enterprise Resource Planning (ERP)', lecturer: 'FALDY IRWIENSYAH, S.Kom, MTI', lecturerEmail: null, description: 'Konsep ERP, modul bisnis terintegrasi, seleksi vendor, implementasi, dan evaluasi sistem ERP pada organisasi.', total_tasks: 3 },
  { name: 'Kewirausahaan', lecturer: 'ADITYO ARI WIBOWO, Dr., SE., MM', lecturerEmail: null, description: 'Etika wirausaha, ide usaha, business model canvas, inovasi, dan penyusunan rencana bisnis.', total_tasks: 3 },
  { name: 'Manajemen Resiko', lecturer: 'TIRTA ANHARI, S.T, M.Kom', lecturerEmail: null, description: 'Identifikasi, analisis, mitigasi, dan pemantauan resiko pada proyek dan organisasi informatika.', total_tasks: 2 },
  { name: 'Sistem Pendukung Keputusan dan Eksekutif', lecturer: 'ERIZAL, S.Kom.,M.Kom.', lecturerEmail: null, description: 'Sistem pendukung keputusan, dashboard eksekutif, analitik bisnis, dan data warehouse untuk pengambilan keputusan.', total_tasks: 2 }
];

const insertCourse = db.prepare(`
  INSERT INTO courses (name, lecturer, lecturer_email, description, total_materials, total_tasks) VALUES (?, ?, ?, ?, ?, ?)
`);
const courseIds = [];
courses.forEach(c => {
  const res = insertCourse.run(c.name, c.lecturer, c.lecturerEmail, c.description, 0, c.total_tasks);
  courseIds.push(res.lastInsertRowid);
});

// 3 pertemuan per mata kuliah (konsisten dengan tab "Rincian Perkuliahan" di matakuliah.html)
const meetingsData = [
  { courseId: courseIds[0], title: 'Pengenalan Capstone & Perumusan Masalah', meetingNumber: 1, description: 'Rumusan masalah, latar belakang, dan tujuan penelitian' },
  { courseId: courseIds[0], title: 'Tinjauan Pustaka & Metodologi', meetingNumber: 2, description: 'Kajian pustaka, metode penelitian, dan rencana evaluasi' },
  { courseId: courseIds[0], title: 'Proposal & Rencana Pengembangan', meetingNumber: 3, description: 'Penyusunan proposal, jadwal proyek, dan indikator keberhasilan' },

  { courseId: courseIds[1], title: 'Dasar Audit Sistem Informasi', meetingNumber: 1, description: 'Objektif, lingkup, dan standar audit (COBIT, ISO 27001)' },
  { courseId: courseIds[1], title: 'Kontrol & Tata Kelola TI', meetingNumber: 2, description: 'Kontrol internal, risk assessment, dan governance framework' },
  { courseId: courseIds[1], title: 'Pelaporan & Kepatuhan', meetingNumber: 3, description: 'Temuan audit, rekomendasi, dan pelaporan kepatuhan' },

  { courseId: courseIds[2], title: 'Pengenalan Ekosistem Big Data', meetingNumber: 1, description: 'Konsep 3V/5V dan use cases industri' },
  { courseId: courseIds[2], title: 'Pemrosesan Terdistribusi', meetingNumber: 2, description: 'HDFS, MapReduce, dan YARN' },
  { courseId: courseIds[2], title: 'Analitik & Visualisasi Data', meetingNumber: 3, description: 'Spark, dashboard, dan penerapan analitik' },

  { courseId: courseIds[3], title: 'Pengantar Enterprise Resource Planning', meetingNumber: 1, description: 'Sejarah ERP dan modul bisnis terintegrasi' },
  { courseId: courseIds[3], title: 'Implementasi & Migrasi Sistem', meetingNumber: 2, description: 'Tahapan implementasi, change management, dan integrasi data' },
  { courseId: courseIds[3], title: 'Evaluasi & Optimasi ERP', meetingNumber: 3, description: 'KPI, pemeliharaan, dan peningkatan nilai ERP' },

  { courseId: courseIds[4], title: 'Mindset & Etika Wirausaha', meetingNumber: 1, description: 'Karakter wirausaha, etika bisnis, dan ide usaha' },
  { courseId: courseIds[4], title: 'Business Model Canvas', meetingNumber: 2, description: 'Elemen BMC, value proposition, dan target pasar' },
  { courseId: courseIds[4], title: 'Rencana Bisnis & Akses Pembiayaan', meetingNumber: 3, description: 'Rencana usaha, proyeksi keuangan, dan sumber modal' },

  { courseId: courseIds[5], title: 'Identifikasi Resiko Proyek', meetingNumber: 1, description: 'Jenis resiko, brainstorming, dan registri risiko' },
  { courseId: courseIds[5], title: 'Analisis & Mitigasi', meetingNumber: 2, description: 'Analisis kualitatif/kuantitatif dan strategi mitigasi' },
  { courseId: courseIds[5], title: 'Pemantauan & Pelaporan Resiko', meetingNumber: 3, description: 'Audit risiko, KPI, dan pelaporan berkala' },

  { courseId: courseIds[6], title: 'Dasar Sistem Pendukung Keputusan', meetingNumber: 1, description: 'Konsep DSS, model keputusan, dan arsitektur' },
  { courseId: courseIds[6], title: 'Dashboard Eksekutif & Analitik', meetingNumber: 2, description: 'KPI, visualisasi, dan business intelligence' },
  { courseId: courseIds[6], title: 'Data Warehouse & Permodelan', meetingNumber: 3, description: 'ETL, OLAP, dan data marts' }
];

const insertMeeting = db.prepare(`
  INSERT INTO meetings (course_id, title, meeting_number, description) VALUES (?, ?, ?, ?)
`);
const meetingIds = [];
meetingsData.forEach(m => {
  const res = insertMeeting.run(m.courseId, m.title, m.meetingNumber, m.description);
  meetingIds.push({ courseId: m.courseId, meetingId: res.lastInsertRowid, meetingNumber: m.meetingNumber });
});

// 14 materi (2 per mata kuliah). status 'Sudah Dibaca' = progres baca akun demo Ilham,
// sehingga jumlahnya cocok dengan progress.completed_materials per mata kuliah (10 dari 14).
const materialsData = [
  { courseId: courseIds[0], meetingNumber: 1, title: 'Proposal Capstone: Format & Panduan', type: 'PDF', status: 'Sudah Dibaca', content: 'Panduan penulisan proposal capstone: struktur laporan, kriteria penilaian, dan contoh format.' },
  { courseId: courseIds[0], meetingNumber: 2, title: 'Metodologi Penelitian Terapan', type: 'Teks', status: 'Sudah Dibaca', content: 'Pemilihan metode penelitian, instrumen pengumpulan data, dan teknik validasi hasil.' },

  { courseId: courseIds[1], meetingNumber: 1, title: 'Standar Audit IT: COBIT & ISO 27001', type: 'PDF', status: 'Sudah Dibaca', content: 'Kerangka kerja COBIT 2019 dan ISO/IEC 27001 untuk kontrol dan jaminan sistem informasi.' },
  { courseId: courseIds[1], meetingNumber: 2, title: 'Checklist Kontrol Internal TI', type: 'Teks', status: 'Sudah Dibaca', content: 'Daftar periksa kontrol akses, perubahan sistem, dan pemeliharaan infrastruktur.' },

  { courseId: courseIds[2], meetingNumber: 1, title: 'Konsep 3V dan Use Cases Big Data', type: 'PDF', status: 'Sudah Dibaca', content: 'Volume, Velocity, Variety beserta contoh penerapan Big Data di industri.' },
  { courseId: courseIds[2], meetingNumber: 2, title: 'Hadoop & MapReduce Overview', type: 'Video', status: 'Sudah Dibaca', content: 'Video pengantar arsitektur Hadoop: HDFS untuk storage, MapReduce untuk processing, dan YARN.' },

  { courseId: courseIds[3], meetingNumber: 1, title: 'Modul Bisnis pada Sistem ERP', type: 'PDF', status: 'Sudah Dibaca', content: 'Modul keuangan, rantai pasok, SDM, dan produksi dalam satu paket ERP.' },
  { courseId: courseIds[3], meetingNumber: 2, title: 'Studi Kasus Implementasi ERP', type: 'Teks', status: 'Sudah Dibaca', content: 'Tahapan implementasi ERP, migrasi data, dan change management pada organisasi.' },

  { courseId: courseIds[4], meetingNumber: 2, title: 'Business Model Canvas Lengkap', type: 'PDF', status: 'Sudah Dibaca', content: 'Sembilan elemen BMC: pelanggan, nilai, aktivitas, sumber daya, dan struktur biaya.' },
  { courseId: courseIds[4], meetingNumber: 3, title: 'Rencana Bisnis & Proyeksi Keuangan', type: 'Teks', status: 'Belum Dibaca', content: 'Struktur rencana bisnis, analisis break-even, dan proyeksi arus kas.' },

  { courseId: courseIds[5], meetingNumber: 1, title: 'Registri Risiko Proyek', type: 'Teks', status: 'Sudah Dibaca', content: 'Template registri risiko: identifikasi, pemilik risiko, dan tingkat dampak.' },
  { courseId: courseIds[5], meetingNumber: 2, title: 'Teknik Analisis & Mitigasi Risiko', type: 'Video', status: 'Belum Dibaca', content: 'Analisis probabilitas-dampak serta strategi hindari, mitigasi, transfer, dan terima.' },

  { courseId: courseIds[6], meetingNumber: 1, title: 'Arsitektur Sistem Pendukung Keputusan', type: 'PDF', status: 'Belum Dibaca', content: 'Komponen DSS: basis data, model keputusan, dan antarmuka pengguna.' },
  { courseId: courseIds[6], meetingNumber: 2, title: 'Dashboard Eksekutif dengan KPI', type: 'Video', status: 'Belum Dibaca', content: 'Penyusunan KPI, visualisasi data, dan praktik business intelligence.' }
];

const insertMaterial = db.prepare(`
  INSERT INTO materials (course_id, meeting_id, title, type, content, status) VALUES (?, ?, ?, ?, ?, ?)
`);
materialsData.forEach(m => {
  const meeting = meetingIds.find(x => x.courseId === m.courseId && x.meetingNumber === m.meetingNumber);
  if (meeting) {
    insertMaterial.run(m.courseId, meeting.meetingId, m.title, m.type, m.content, m.status);
  }
});

// Source of truth: total_materials dihitung dari jumlah baris materials yang baru di-seed,
// sehingga selalu konsisten dengan data materi aktual (bukan angka hard-coded).
db.prepare(`
  UPDATE courses
  SET total_materials = (SELECT COUNT(*) FROM materials WHERE materials.course_id = courses.id)
`).run();

// 19 tugas (3+3+3+3+3+2+2). Empat tugas berstatus 'Sudah Dikumpulkan' — satu di tiap mata kuliah
// yang punya progres tugas pada tabel progress (konsisten antar halaman).
const tasksData = [
  { courseId: courseIds[0], meetingNumber: 1, title: 'Tugas 1: Proposal Capstone', description: 'Susun proposal capstone: rumusan masalah, tujuan, dan rencana metodologi.', deadline: '2026-10-16', status: 'Belum Dikerjakan' },
  { courseId: courseIds[0], meetingNumber: 2, title: 'Tugas 2: Tinjauan Pustaka', description: 'Kajian pustaka 5 referensi utama beserta matriks perbandingan penelitian.', deadline: '2026-10-30', status: 'Belum Dikerjakan' },
  { courseId: courseIds[0], meetingNumber: 3, title: 'Tugas 3: Presentasi Proposal', description: 'Presentasikan proposal capstone 10 menit + sesi tanya jawab.', deadline: '2026-11-13', status: 'Belum Dikerjakan' },

  { courseId: courseIds[1], meetingNumber: 1, title: 'Tugas 1: Checklist Kontrol TI', description: 'Isi checklist kontrol TI untuk satu unit kerja kampus.', deadline: '2026-10-14', status: 'Sudah Dikumpulkan' },
  { courseId: courseIds[1], meetingNumber: 2, title: 'Tugas 2: Studi Kasus COBIT', description: 'Terapkan domain COBIT 2019 pada studi kasus sistem akademik.', deadline: '2026-10-28', status: 'Belum Dikerjakan' },
  { courseId: courseIds[1], meetingNumber: 3, title: 'Tugas 3: Laporan Temuan Audit', description: 'Tulis laporan temuan audit beserta rekomendasi perbaikan.', deadline: '2026-11-11', status: 'Belum Dikerjakan' },

  { courseId: courseIds[2], meetingNumber: 1, title: 'Tugas 1: Paper Review Big Data', description: 'Tulis review 1 halaman tentang paper Big Data terbaru (tahun 2024-2025).', deadline: '2026-10-15', status: 'Belum Dikerjakan' },
  { courseId: courseIds[2], meetingNumber: 2, title: 'Tugas 2: Analisis Dataset Terbuka', description: 'Analisis dataset terbuka menggunakan Hadoop/Spark dan sertakan insight utama.', deadline: '2026-10-29', status: 'Belum Dikerjakan' },
  { courseId: courseIds[2], meetingNumber: 3, title: 'Tugas 3: Dashboard Analitik', description: 'Buat dashboard visualisasi data sederhana dari hasil analisis dataset.', deadline: '2026-11-12', status: 'Belum Dikerjakan' },

  { courseId: courseIds[3], meetingNumber: 1, title: 'Tugas 1: Peta Proses Bisnis ERP', description: 'Gambarkan peta proses bisnis inti yang tercakup modul ERP.', deadline: '2026-10-21', status: 'Sudah Dikumpulkan' },
  { courseId: courseIds[3], meetingNumber: 2, title: 'Tugas 2: Studi Kasus Implementasi ERP', description: 'Analisis tahapan implementasi ERP pada satu perusahaan.', deadline: '2026-11-04', status: 'Belum Dikerjakan' },
  { courseId: courseIds[3], meetingNumber: 3, title: 'Tugas 3: Evaluasi Vendor ERP', description: 'Bandingkan 3 vendor ERP berdasarkan fitur, biaya, dan risiko.', deadline: '2026-11-18', status: 'Belum Dikerjakan' },

  { courseId: courseIds[4], meetingNumber: 2, title: 'Tugas 1: Business Model Canvas', description: 'Susun BMC lengkap untuk usaha kampus yang dipilih.', deadline: '2026-10-13', status: 'Sudah Dikumpulkan' },
  { courseId: courseIds[4], meetingNumber: 3, title: 'Tugas 2: Rencana Bisnis', description: 'Tulis rencana bisnis 1 halaman: target pasar, strategi, dan proyeksi biaya.', deadline: '2026-10-27', status: 'Belum Dikerjakan' },
  { courseId: courseIds[4], meetingNumber: 3, title: 'Tugas 3: Pitch Deck Usaha', description: 'Buat pitch deck 8 slide untuk presentasi usaha.', deadline: '2026-11-10', status: 'Belum Dikerjakan' },

  { courseId: courseIds[5], meetingNumber: 1, title: 'Tugas 1: Registri Risiko Proyek', description: 'Buat registri risiko untuk proyek tim: dampak, probabilitas, dan pemilik risiko.', deadline: '2026-10-20', status: 'Sudah Dikumpulkan' },
  { courseId: courseIds[5], meetingNumber: 2, title: 'Tugas 2: Analisis Mitigasi Risiko', description: 'Pilih 3 risiko prioritas dan susun rencana mitigasinya.', deadline: '2026-11-03', status: 'Belum Dikerjakan' },

  { courseId: courseIds[6], meetingNumber: 2, title: 'Tugas 1: Rancangan Dashboard DSS', description: 'Rancang wireframe dashboard eksekutif dengan 5 KPI utama.', deadline: '2026-10-22', status: 'Belum Dikerjakan' },
  { courseId: courseIds[6], meetingNumber: 3, title: 'Tugas 2: Studi Kasus Keputusan Investasi', description: 'Bandingkan 2 alternatif keputusan menggunakan model DSS sederhana.', deadline: '2026-11-05', status: 'Belum Dikerjakan' }
];

const insertTask = db.prepare(`
  INSERT INTO tasks (course_id, meeting_id, title, description, deadline, status) VALUES (?, ?, ?, ?, ?, ?)
`);
tasksData.forEach(t => {
  const meeting = meetingIds.find(x => x.courseId === t.courseId && x.meetingNumber === t.meetingNumber);
  if (meeting) {
    insertTask.run(t.courseId, meeting.meetingId, t.title, t.description, t.deadline, t.status);
  }
});

// Jadwal kuliah mingguan — 7 baris, satu per mata kuliah (data akademik yang diberikan).
const scheduleData = [
  { courseId: courseIds[0], day: 'Senin', timeStart: '14:40', timeEnd: '16:20', room: 'FT305' },
  { courseId: courseIds[1], day: 'Selasa', timeStart: '09:30', timeEnd: '12:00', room: 'FT305' },
  { courseId: courseIds[2], day: 'Rabu', timeStart: '07:50', timeEnd: '10:20', room: 'FT401' },
  { courseId: courseIds[3], day: 'Senin', timeStart: '13:00', timeEnd: '14:40', room: 'FT403' },
  { courseId: courseIds[4], day: 'Selasa', timeStart: '13:00', timeEnd: '15:30', room: 'FT403' },
  { courseId: courseIds[5], day: 'Rabu', timeStart: '15:30', timeEnd: '18:00', room: 'FT404' },
  { courseId: courseIds[6], day: 'Kamis', timeStart: '09:30', timeEnd: '12:00', room: 'FT305' }
];

const insertSchedule = db.prepare(`
  INSERT INTO schedule (course_id, day, time_start, time_end, room) VALUES (?, ?, ?, ?, ?)
`);
scheduleData.forEach(s => insertSchedule.run(s.courseId, s.day, s.timeStart, s.timeEnd, s.room));

const announcementsData = [
  { title: 'Selamat Datang di Semester Ganjil 2026/2027', content: 'Semester baru dimulai minggu ini. Silakan cek jadwal dan materi masing-masing mata kuliah.' },
  { title: 'Pengumuman UTS', content: 'UTS akan dilaksanakan pada minggu ke-8 (16-20 November 2026). Detail jadwal per mata kuliah akan diumumkan di kelas.' },
  { title: 'Batas Pengumpulan Tugas Akhir', content: 'Semua tugas akhir harus dikumpulkan paling lambat 19 Desember 2026 pukul 23:59 WIB. Tidak ada perpanjangan.' }
];

const insertAnnouncement = db.prepare(`
  INSERT INTO announcements (title, content) VALUES (?, ?)
`);
announcementsData.forEach(a => insertAnnouncement.run(a.title, a.content));

const notificationsData = [
  { userId, title: 'Selamat Datang di Learnova', message: 'Semester baru dimulai minggu ini. Silakan cek jadwal dan materi masing-masing mata kuliah.', status: 'belum_dibaca' },
  { userId, title: 'Pengumuman UTS', message: 'UTS akan dilaksanakan pada minggu ke-8 (16-20 November 2026). Detail jadwal per mata kuliah akan diumumkan di kelas.', status: 'belum_dibaca' },
  { userId, title: 'Batas Pengumpulan Tugas Akhir', message: 'Semua tugas akhir harus dikumpulkan paling lambat 19 Desember 2026 pukul 23:59 WIB. Tidak ada perpanjangan.', status: 'sudah_dibaca' },
  { userId, title: 'Materi Baru: Big Data', message: 'Materi "Hadoop & MapReduce Overview" telah ditambahkan ke mata kuliah Big Data.', status: 'sudah_dibaca' },
  { userId, title: 'Tugas Baru: Audit System & IT Governance', message: 'Tugas "Tugas 2: Studi Kasus COBIT" telah dibuka. Deadline: 28 Oktober 2026.', status: 'belum_dibaca' }
];

const insertNotification = db.prepare(`
  INSERT INTO notifications (user_id, title, message, status) VALUES (?, ?, ?, ?)
`);
notificationsData.forEach(n => insertNotification.run(n.userId, n.title, n.message, n.status));

// Progres akun demo Ilham (user_id = 1). Angka sengaja dibuat konsisten dengan data nyata:
//   percentage = round(100 * (completed_materials + completed_tasks) / (total_materials + total_tasks))
//   -> rata-rata 7 mata kuliah = 41% (cocok dengan angka statis di landing page & banner).
//   completed_materials per MK = jumlah materi berstatus 'Sudah Dibaca' (total 10 dari 14).
//   completed_tasks per MK = jumlah tugas berstatus 'Sudah Dikumpulkan' (total 4 dari 19).
const progressData = courses.map((_, i) => {
  const totalMaterials = materialsData.filter(m => m.courseId === courseIds[i]).length;
  const totalTasks = tasksData.filter(t => t.courseId === courseIds[i]).length;
  const completedMaterials = materialsData.filter(m => m.courseId === courseIds[i] && m.status === 'Sudah Dibaca').length;
  const completedTasks = tasksData.filter(t => t.courseId === courseIds[i] && t.status === 'Sudah Dikumpulkan').length;
  const percentage = Math.round(100 * (completedMaterials + completedTasks) / (totalMaterials + totalTasks));
  return { userId, courseId: courseIds[i], percentage, completedMaterials, completedTasks };
});

const insertProgress = db.prepare(`
  INSERT INTO progress (user_id, course_id, percentage, completed_materials, completed_tasks) VALUES (?, ?, ?, ?, ?)
`);
progressData.forEach(p => insertProgress.run(p.userId, p.courseId, p.percentage, p.completedMaterials, p.completedTasks));

console.log('✅ Database seeded successfully!');
demoUsers.forEach(u => console.log(`   - User: ${u.name} (${u.email}) — ${u.role}`));
console.log(`   - Courses: ${courses.length}`);
console.log(`   - Meetings: ${meetingsData.length}`);
console.log(`   - Materials: ${materialsData.length}`);
console.log(`   - Tasks: ${tasksData.length}`);
console.log(`   - Schedule entries: ${scheduleData.length}`);
console.log(`   - Announcements: ${announcementsData.length}`);
console.log(`   - Notifications: ${notificationsData.length}`);
console.log(`   - Progress records: ${progressData.length}`);
