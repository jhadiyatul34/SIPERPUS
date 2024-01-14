const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { User } = require('../models')

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Contoh: Ambil data pengguna dari database berdasarkan username
    const user = await User.findOne({ where: { username } });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Jika kata sandi cocok, buat token JWT
      const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/register', (req, res) => {
  // Logika registrasi
});

module.exports = router;

