// server
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors');
const routes = require('./src/routes');
const jwt = require('jsonwebtoken');

const server = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
server.use(logger('dev'));

// frontend supaya bisa mengirimkan request dan cookie beserta credentialsnya
server.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

server.use(cookieParser());

// Konfigurasi parser
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.use(express.static(path.join(__dirname, 'client')));
// Routes
server.use('/', routes);

// Middleware untuk autentikasi dengan JWT
server.use((req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  // Verifikasi token menggunakan kunci rahasia
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
});

// Rute yang memerlukan autentikasi
server.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


// Run server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;