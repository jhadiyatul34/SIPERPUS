const express = require('express');
const router = express.Router();

// Rute utama
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Rute untuk modul otentikasi
router.use('/auth', require('./auth'));

// Rute API lainnya
router.use('/api', require('./api'));

module.exports = router;
