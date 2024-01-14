const express = require('express');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { User } = require('../models')
const validator = new Validator();

// Definisi aturan validasi untuk login
const loginSchema = {
  username: { type: 'string', min: 3, max: 255 },
  password: { type: 'string', min: 8 },
};

router.post('/login', async (req, res) => {
  try {
    // Validasi input
    const validationResult = validator.validate(req.body, loginSchema);

    if (validationResult !== true) {
      return res.status(400).json({ message: 'Invalid input', errors: validationResult });
    }
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

// Middleware untuk memverifikasi token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Ambil informasi pengguna dari database
    const user = await User.findOne({ where: { username: decoded.username } });

    // Tambahkan informasi pengguna ke req.user
    req.user = {
      name: user.name,
      role: user.role,
      // ... tambahkan informasi lain yang Anda butuhkan
    };

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Endpoint untuk mendapatkan informasi pengguna berdasarkan token
router.get('/user', verifyToken, (req, res) => {
  // Di sini, req.user akan berisi informasi yang didekripsi dari token, seperti username dan role
  // Anda dapat mengambil informasi lain dari database atau sumber lain sesuai kebutuhan
  const { name, role } = req.user;

  // Contoh: Mengirim informasi pengguna sebagai respons dengan header anti-cache
  res.set('Cache-Control', 'no-store'); // Mencegah penyimpanan cache
  res.json({ name, role });
});

router.get('/user/:name/photo', async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.findOne({ where: { name } });

    if (user && user.filedata) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(user.filedata);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

