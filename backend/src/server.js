const express = require('express');
const cors = require('cors');
const path = require('path');

const { getAllMatakuliah, getMatakuliahById } = require('./controllers/matakuliahController');
const { getAllMateri, getMateriById } = require('./controllers/materiController');
const { getAllTugas, getTugasById } = require('./controllers/tugasController');
const { getAllProgress, getProgressById } = require('./controllers/progressController');
const { getAllJadwal, getJadwalById } = require('./controllers/jadwalController');
const { getAllNotifikasi, getNotifikasiById } = require('./controllers/notifikasiController');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// W2 - CORS berbasis environment variable, BUKAN allow-all permanen:
// - Produksi: set CORS_ORIGIN="https://<frontend>.vercel.app"
//   (pisahkan banyak origin dengan koma) - tanpa URL fiktif, tanpa credential.
// - Fallback tanpa env = local-development yang aman: hanya origin
//   localhost / 127.0.0.1 (termasuk http://localhost:3000, port apa pun)
//   dan file:// (Origin "null"). Origin remote lain TIDAK diizinkan
//   sampai CORS_ORIGIN diisi. Request tanpa Origin (curl, server-to-server,
//   test lokal) tetap diterima sehingga API lokal tidak pernah rusak.
const corsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = corsOrigins.length > 0
  ? { origin: corsOrigins }
  : {
      origin: (requestOrigin, callback) => {
        const isLocal = !requestOrigin
          || requestOrigin === 'null'
          || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(requestOrigin);
        callback(null, isLocal);
      }
    };

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'learnova-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

app.get('/api/matakuliah', getAllMatakuliah);
app.get('/api/matakuliah/:id', getMatakuliahById);

app.get('/api/materi', getAllMateri);
app.get('/api/materi/:id', getMateriById);

app.get('/api/tugas', getAllTugas);
app.get('/api/tugas/:id', getTugasById);

app.get('/api/progress', getAllProgress);
app.get('/api/progress/:id', getProgressById);

app.get('/api/jadwal', getAllJadwal);
app.get('/api/jadwal/:id', getJadwalById);

app.get('/api/notifikasi', getAllNotifikasi);
app.get('/api/notifikasi/:id', getNotifikasiById);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server'
  });
});

// Jalankan server HANYA saat file dijalankan langsung (`npm start` /
// `node src/server.js`). Saat di-import sebagai Vercel function, cukup
// export app tanpa membuka port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Learnova Backend running on http://localhost:${PORT}`);
    console.log(`   Health check: GET http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;