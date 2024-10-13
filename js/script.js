async function fetchAnimeData() {
    const response = await fetch('php/api.php');
    const animeList = await response.json();

    const animeContainer = document.getElementById('anime-list');
    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow', 'duration-300');

        animeCard.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-800 mb-2">${anime.title}</h2>
            <p class="text-gray-600 mb-4">${anime.description}</p>
            <p class="text-sm text-gray-500 mb-4">Genre: ${anime.genre.join(', ')}</p>
            <a href="${anime.link}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">Watch Now</a>
        `;

        animeContainer.appendChild(animeCard);
    });
}

fetchAnimeData();
