const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 8);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], (err) => {
    if (err) return res.status(500).send('Registrasi user gagal');
    res.send('Registrasi user berhasil');
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error on the server');
    if (results.length === 0) return res.status(401).send('User tidak ditemukan');

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).send('Password tidak sesuai');

    req.session.user = { id: user.id, username: user.username };
    res.send('Login berhasil');
  });
});

// Dashboard (Protected Route)
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  res.send(`Welcome ${req.session.user.username}`);
});

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 8);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashed],
    (err) => {
      if (err) {
        console.error('>>> Register Error:', err);            // ← Tambah ini
        return res
          .status(500)
          .send({ message: 'Registrasi gagal', error: err.message });
      }
      res.send({ message: 'Registrasi user berhasil' });
    }
  );
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

module.exports = router;
