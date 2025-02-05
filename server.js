const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware untuk error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong!' });
});

// Route untuk halaman utama
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.mutasikita.my.id/');
    const animeList = response.data;
    res.render('index', { animeList });
  } catch (error) {
    next(error);
  }
});

// Route untuk halaman detail anime
app.get('/anime/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.mutasikita.my.id/anime.php?id=${id}`);
    const anime = response.data;
    res.render('detail', { anime });
  } catch (error) {
    next(error);
  }
});

// Route untuk halaman streaming
app.get('/watch/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.mutasikita.my.id/video.php?id=${id}`);
    const videoData = response.data;
    res.render('watch', { videoData });
  } catch (error) {
    next(error);
  }
});

// Route untuk pencarian
app.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    const response = await axios.get('https://api.mutasikita.my.id/');
    const animeList = response.data.filter(anime =>
      anime.title.toLowerCase().includes(q.toLowerCase())
    );
    res.render('index', { animeList });
  } catch (error) {
    next(error);
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});