const db = require('../db/connection');

const getAllProgress = (req, res) => {
  const { user_id, matakuliah_id } = req.query;
  
  let query = `
    SELECT 
      p.id,
      p.user_id,
      p.course_id AS matakuliah_id,
      p.percentage AS persentase,
      p.completed_materials,
      p.completed_tasks,
      p.updated_at
    FROM progress p
  `;
  
  const params = [];
  const conditions = [];
  
  if (user_id) {
    conditions.push('p.user_id = ?');
    params.push(user_id);
  }
  
  if (matakuliah_id) {
    conditions.push('p.course_id = ?');
    params.push(matakuliah_id);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY p.id';
  
  const stmt = db.prepare(query);
  const progress = stmt.all(...params);
  
  res.json({ success: true, data: progress });
};

const getProgressById = (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare(`
    SELECT 
      p.id,
      p.user_id,
      p.course_id AS matakuliah_id,
      p.percentage AS persentase,
      p.completed_materials,
      p.completed_tasks,
      p.updated_at
    FROM progress p
    WHERE p.id = ?
  `);
  
  const progress = stmt.get(id);
  
  if (!progress) {
    return res.status(404).json({
      success: false,
      message: `Progress dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: progress });
};

module.exports = {
  getAllProgress,
  getProgressById
};