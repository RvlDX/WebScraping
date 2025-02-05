const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Error handling middleware (HARUS di akhir)
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
    res.render('index', { animeList: data });
  } catch (err) {
    next(new Error('Gagal memuat data anime'));
  }
});

// Route detail anime
router.get('/anime/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://api.mutasikita.my.id/anime.php?id=${id}`);
    res.render('detail', { anime: data });
  } catch (err) {
    next(new Error('Anime tidak ditemukan'));
  }
});

// Route streaming
router.get('/watch/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://api.mutasikita.my.id/video.php?id=${id}`);
    res.render('watch', { videoData: data });
  } catch (err) {
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
    res.render('index', { animeList: filtered });
  } catch (err) {
    next(new Error('Gagal melakukan pencarian'));
  }
});

// Pasang router dan error handler
app.use(router);
app.use(errorHandler); // HARUS di akhir

module.exports = app;