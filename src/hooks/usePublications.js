import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const BASE = import.meta.env.BASE_URL
const PUBLICATIONS_CSV_URL = new URL('../data/publications.csv', import.meta.url).href

function normalizePublication(row = {}) {
  return {
    id: String(row.id || '').trim(),
    date: String(row.date || '').trim(),
    title: String(row.title || '').trim(),
    excerpt: String(row.excerpt || '').trim(),
    content_preview: String(row.content_preview || '').trim(),
    category: String(row.category || '').trim(),
    cat_id: String(row.cat_id || '').trim(),
    image: String(row.image || '').trim(),
    slug: String(row.slug || '').trim(),
  }
}

export function usePublications() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Papa.parse(PUBLICATIONS_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const normalized = (result.data || [])
          .map(normalizePublication)
          .filter((item) => item.id && item.title && item.slug)
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        setPublications(normalized)
        setLoading(false)
      },
      error: () => setLoading(false),
    })
  }, [])

  return { publications, loading }
}

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: '1', label: 'Blog' },
  { id: '55', label: 'Genito-urinary tract infection' },
  { id: '53', label: 'Man health clinic' },
  { id: '52', label: 'Prostate clinic' },
  { id: '56', label: 'Sexually transmitted infection' },
  { id: '54', label: 'Stone clinic' },
]

export function getImageUrl(imagePath) {
  if (!imagePath) return null

  const cleanedPath = String(imagePath).replace(/^\/+/, '')
  return `${BASE}${cleanedPath}`
}

export function formatDate(dateStr) {
  const date = new Date(dateStr)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
