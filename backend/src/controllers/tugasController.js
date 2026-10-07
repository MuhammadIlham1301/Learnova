const db = require('../db/connection');

const getAllTugas = (req, res) => {
  const { matakuliah_id } = req.query;
  
  let query = `
    SELECT 
      t.id,
      t.course_id AS matakuliah_id,
      t.title AS judul,
      mt.meeting_number AS pertemuan,
      t.deadline,
      t.status
    FROM tasks t
    LEFT JOIN meetings mt ON t.meeting_id = mt.id
  `;
  
  const params = [];
  
  if (matakuliah_id) {
    query += ' WHERE t.course_id = ?';
    params.push(matakuliah_id);
  }
  
  query += ' ORDER BY t.id';
  
  const stmt = db.prepare(query);
  const tugas = stmt.all(...params);
  
  res.json({ success: true, data: tugas });
};

const getTugasById = (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare(`
    SELECT 
      t.id,
      t.course_id AS matakuliah_id,
      t.title AS judul,
      mt.meeting_number AS pertemuan,
      t.deadline,
      t.status
    FROM tasks t
    LEFT JOIN meetings mt ON t.meeting_id = mt.id
    WHERE t.id = ?
  `);
  
  const tugas = stmt.get(id);
  
  if (!tugas) {
    return res.status(404).json({
      success: false,
      message: `Tugas dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: tugas });
};

module.exports = {
  getAllTugas,
  getTugasById
};