const db = require('../db/connection');

const getAllMatakuliah = (req, res) => {
  const stmt = db.prepare('SELECT id, name, lecturer, lecturer_email, description, total_materials, total_tasks FROM courses ORDER BY id');
  const courses = stmt.all();
  res.json({ success: true, data: courses });
};

const getMatakuliahById = (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT id, name, lecturer, lecturer_email, description, total_materials, total_tasks FROM courses WHERE id = ?');
  const course = stmt.get(id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Mata kuliah dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: course });
};

module.exports = {
  getAllMatakuliah,
  getMatakuliahById
};