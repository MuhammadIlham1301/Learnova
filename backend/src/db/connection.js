const Database = require('better-sqlite3');
const path = require('path');

// Path relatif terhadap source (bukan absolute/Windows path) sehingga aman
// untuk local development maupun bundle Vercel (Root Directory: backend/).
// File aktual: backend/learnova.db
const dbPath = path.join(__dirname, '..', '..', 'learnova.db');

// Production di Vercel (env VERCEL=1): koneksi baca-saja - semua endpoint
// hanya melakukan SELECT. Local development: baca-tulis agar `npm run seed`
// tetap berfungsi seperti biasa.
const isReadOnly = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const db = new Database(dbPath, { readonly: isReadOnly });

if (!isReadOnly) {
  db.pragma('foreign_keys = ON');
}

module.exports = db;