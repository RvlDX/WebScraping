// pages/index.js
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [animeList, setAnimeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.mutasikita.my.id/')
      .then(res => res.json())
      .then(data => {
        setAnimeList(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Anime List</h1>
      
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeList.map(anime => (
            <Link 
              href={`/anime/${anime.id}`}
              key={anime.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all"
            >
              <div>
                <img 
                  src={anime.thumbnail} 
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{anime.title}</h3>
                  <p className="text-sm text-gray-400">{anime.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}