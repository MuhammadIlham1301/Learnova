const db = require('../db/connection');

const getAllJadwal = (req, res) => {
  const { hari, matakuliah_id } = req.query;
  
  let query = `
    SELECT 
      j.id,
      j.course_id AS matakuliah_id,
      c.name AS matakuliah,
      c.lecturer,
      c.lecturer_email,
      j.day AS hari,
      j.time_start AS jam_mulai,
      j.time_end AS jam_selesai,
      j.room AS ruang
    FROM schedule j
    JOIN courses c ON c.id = j.course_id
  `;
  
  const params = [];
  const conditions = [];
  
  if (hari) {
    conditions.push('j.day = ?');
    params.push(hari);
  }
  
  if (matakuliah_id) {
    conditions.push('j.course_id = ?');
    params.push(matakuliah_id);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY j.id';
  
  const stmt = db.prepare(query);
  const jadwal = stmt.all(...params);
  
  res.json({ success: true, data: jadwal });
};

const getJadwalById = (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare(`
    SELECT 
      j.id,
      j.course_id AS matakuliah_id,
      c.name AS matakuliah,
      c.lecturer,
      c.lecturer_email,
      j.day AS hari,
      j.time_start AS jam_mulai,
      j.time_end AS jam_selesai,
      j.room AS ruang
    FROM schedule j
    JOIN courses c ON c.id = j.course_id
    WHERE j.id = ?
  `);
  
  const jadwal = stmt.get(id);
  
  if (!jadwal) {
    return res.status(404).json({
      success: false,
      message: `Jadwal dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: jadwal });
};

module.exports = {
  getAllJadwal,
  getJadwalById
};