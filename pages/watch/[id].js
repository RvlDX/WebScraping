// pages/watch/[id].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function WatchPage() {
  const router = useRouter()
  const { id } = router.query
  const [videoData, setVideoData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`https://api.mutasikita.my.id/video.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setVideoData(data)
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
        
        <div className="aspect-video bg-black">
          <iframe
            src={videoData.video}
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Download Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {videoData.download.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded hover:bg-gray-700"
              >
                {link.quality} - {link.provider}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}