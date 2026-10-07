const db = require('../db/connection');

const getAllMateri = (req, res) => {
  const { matakuliah_id } = req.query;
  
  let query = `
    SELECT 
      m.id,
      m.course_id AS matakuliah_id,
      m.title AS judul,
      m.content AS deskripsi,
      mt.meeting_number AS pertemuan,
      m.type AS tipe,
      m.status AS status_baca
    FROM materials m
    LEFT JOIN meetings mt ON m.meeting_id = mt.id
  `;
  
  const params = [];
  
  if (matakuliah_id) {
    query += ' WHERE m.course_id = ?';
    params.push(matakuliah_id);
  }
  
  query += ' ORDER BY m.id';
  
  const stmt = db.prepare(query);
  const materi = stmt.all(...params);
  
  res.json({ success: true, data: materi });
};

const getMateriById = (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare(`
    SELECT 
      m.id,
      m.course_id AS matakuliah_id,
      m.title AS judul,
      m.content AS deskripsi,
      mt.meeting_number AS pertemuan,
      m.type AS tipe,
      m.status AS status_baca
    FROM materials m
    LEFT JOIN meetings mt ON m.meeting_id = mt.id
    WHERE m.id = ?
  `);
  
  const materi = stmt.get(id);
  
  if (!materi) {
    return res.status(404).json({
      success: false,
      message: `Materi dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: materi });
};

module.exports = {
  getAllMateri,
  getMateriById
};