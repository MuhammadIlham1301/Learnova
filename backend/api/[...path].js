// Entry point Vercel untuk backend Learnova (Root Directory: backend/).
// File ini menangkap semua request /api/* (filesystem routing Vercel)
// dan meneruskannya ke Express app. server.js hanya mengekspor `app`;
// app.listen() hanya dipanggil saat `npm start` (require.main === module).
// Database learnova.db ikut terbundel lewat includeFiles di vercel.json.
module.exports = require('../src/server.js');
