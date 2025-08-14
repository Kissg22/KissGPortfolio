  export function ensureMeta(name: string): HTMLMetaElement {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', name)
      document.head.appendChild(meta)
    }
    return meta!
  }

  export function setDynamicFavicon(theme: 'light' | 'dark') {
    const svg = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme === 'dark' ? '#4338ca' : '#6366f1'}"/>
      <stop offset="100%" stop-color="${theme === 'dark' ? '#0ea5e9' : '#22d3ee'}"/>
    </linearGradient>
  </defs>
  <rect rx="28" width="128" height="128" fill="url(#g)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="64" fill="white">KG</text>
</svg>`)

    let link = document.getElementById('app-favicon') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = 'app-favicon'
      link.rel = 'icon'
      link.type = 'image/svg+xml'
      document.head.appendChild(link)
    }
    link.href = `data:image/svg+xml;charset=UTF-8,${svg}`
  }
