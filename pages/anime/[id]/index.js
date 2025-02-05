// pages/anime/[id]/index.js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnimeDetail() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`https://api.mutasikita.my.id/anime.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setAnime(data)
          setIsLoading(false)
        })
    }
  }, [id])

  if (isLoading) return <div className="text-center text-white">Loading...</div>
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          ← Back
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={anime.thumbnail} 
            alt={anime.title}
            className="w-full md:w-64 h-96 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
            <div className="space-y-2">
              <p><span className="text-gray-400">Genre:</span> {anime.genre}</p>
              <p><span className="text-gray-400">Status:</span> {anime.status}</p>
              <p><span className="text-gray-400">Total Episode:</span> {anime.total_episode}</p>
              <p className="text-gray-300">{anime.description}</p>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
              {anime.episode_list.map(episode => (
                <Link
                  href={`/watch/${episode.id}`}
                  key={episode.id}
                  className="bg-gray-800 p-3 rounded text-center hover:bg-gray-700"
                >
                  Episode {episode.episode}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}