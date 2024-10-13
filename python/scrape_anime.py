import requests
from bs4 import BeautifulSoup
import json

def scrape_anime_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    anime_data = []

    # Contoh scraping judul, deskripsi, dan link streaming
    for anime in soup.find_all('div', class_='anime-card'):
        title = anime.find('h3', class_='anime-title').text
        description = anime.find('p', class_='anime-description').text
        link = anime.find('a', class_='stream-link')['href']
        genre = [g.text for g in anime.find_all('span', class_='genre')]

        anime_data.append({
            'title': title,
            'description': description,
            'link': link,
            'genre': genre
        })

    return anime_data

# Contoh penggunaan
url = 'https://example-anime-site.com'
anime_list = scrape_anime_data(url)

# Simpan data ke file JSON
with open('anime_data.json', 'w') as f:
    json.dump(anime_list, f, indent=4)
