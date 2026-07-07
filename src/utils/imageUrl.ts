export const normalizeImageUrl = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `http://localhost:3001${url}`
}