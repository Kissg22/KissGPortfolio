import React from 'react'
import { extractYouTubeId } from '@/utils/media'

export default function VideoEmbed({ url, title }: { url: string; title: string }) {
  const ytId = extractYouTubeId(url)
  if (ytId) {
    const src = `https://www.youtube-nocookie.com/embed/${ytId}`
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
        <iframe
          src={src}
          title={`${title} – videó`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }
  return <video src={url} controls className="w-full rounded-lg shadow" preload="metadata" />
}
