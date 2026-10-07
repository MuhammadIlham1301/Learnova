const db = require('../db/connection');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email dan password wajib diisi'
    });
  }

  const stmt = db.prepare('SELECT id, email, password, name, role FROM users WHERE email = ?');
  const user = stmt.get(email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email tidak ditemukan'
    });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: 'Password salah'
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Login berhasil',
    user: userWithoutPassword
  });
};

module.exports = {
  login
};