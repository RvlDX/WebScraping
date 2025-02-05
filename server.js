const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware untuk logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).render('error', { 
    message: err.message || 'Terjadi kesalahan pada server' 
  });
};

// Route utama
router.get('/', async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.mutasikita.my.id/');
    console.log('Data anime berhasil diambil:', data.length, 'anime');
    res.render('index', { animeList: data });
  } catch (err) {
    console.error('Gagal memuat data anime:', err.message);
    next(new Error('Gagal memuat data anime'));
  }
});

// Route detail anime
router.get('/anime/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://api.mutasikita.my.id/anime.php?id=${id}`);
    console.log('Detail anime berhasil diambil:', data.title);
    res.render('detail', { anime: data });
  } catch (err) {
    console.error('Gagal memuat detail anime:', err.message);
    next(new Error('Anime tidak ditemukan'));
  }
});

// Route streaming
router.get('/watch/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://api.mutasikita.my.id/video.php?id=${id}`);
    console.log('Data video berhasil diambil:', data.video);
    res.render('watch', { videoData: data });
  } catch (err) {
    console.error('Gagal memuat video:', err.message);
    next(new Error('Video tidak tersedia'));
  }
});

// Route pencarian
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    const { data } = await axios.get('https://api.mutasikita.my.id/');
    const filtered = data.filter(anime => 
      anime.title.toLowerCase().includes(q.toLowerCase())
    );
    console.log('Hasil pencarian:', filtered.length, 'anime');
    res.render('index', { animeList: filtered });
  } catch (err) {
    console.error('Gagal melakukan pencarian:', err.message);
    next(new Error('Gagal melakukan pencarian'));
  }
});

// Pasang router dan error handler
app.use(router);
app.use(errorHandler);

module.exports = app;