const db = require('../db/connection');

const getAllNotifikasi = (req, res) => {
  const { user_id, status } = req.query;
  
  let query = `
    SELECT 
      n.id,
      n.user_id,
      n.title AS judul,
      n.message AS pesan,
      n.status,
      n.created_at
    FROM notifications n
  `;
  
  const params = [];
  const conditions = [];
  
  if (user_id) {
    conditions.push('n.user_id = ?');
    params.push(user_id);
  }
  
  if (status) {
    conditions.push('n.status = ?');
    params.push(status);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY n.created_at DESC';
  
  const stmt = db.prepare(query);
  const notifikasi = stmt.all(...params);
  
  res.json({ success: true, data: notifikasi });
};

const getNotifikasiById = (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare(`
    SELECT 
      n.id,
      n.user_id,
      n.title AS judul,
      n.message AS pesan,
      n.status,
      n.created_at
    FROM notifications n
    WHERE n.id = ?
  `);
  
  const notifikasi = stmt.get(id);
  
  if (!notifikasi) {
    return res.status(404).json({
      success: false,
      message: `Notifikasi dengan ID ${id} tidak ditemukan`
    });
  }
  
  res.json({ success: true, data: notifikasi });
};

module.exports = {
  getAllNotifikasi,
  getNotifikasiById
};