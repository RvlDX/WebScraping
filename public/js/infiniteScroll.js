let page = 1;
const loadingElement = document.getElementById('loading');

const loadMoreAnime = async () => {
  try {
    const response = await fetch(`https://api.mutasikita.my.id/?page=${page}`);
    const data = await response.json();
    const animeList = document.getElementById('anime-list');

    data.forEach(anime => {
      const animeCard = document.createElement('a');
      animeCard.href = `/anime/${anime.id}`;
      animeCard.className = 'anime-card';
      animeCard.innerHTML = `
        <img src="${anime.thumbnail}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.genre}</p>
      `;
      animeList.appendChild(animeCard);
    });

    page++;
  } catch (error) {
    console.error('Error loading more anime:', error);
  }
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreAnime();
  }
});

observer.observe(loadingElement);