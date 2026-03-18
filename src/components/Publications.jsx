import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePublications, CATEGORIES, getImageUrl, formatDate } from '../hooks/usePublications'

const PER_PAGE = 6

export default function Publications() {
  const { publications, loading } = usePublications()
  const [activecat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return publications.filter(p => {
      const catMatch = activecat === 'all' || p.cat_id === activecat
      const searchMatch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.content_preview || '').toLowerCase().includes(search.toLowerCase())
      return catMatch && searchMatch
    })
  }, [publications, activecat, search])

  const visible = filtered.slice(0, page * PER_PAGE)
  const hasMore = visible.length < filtered.length

  const handleCatChange = (id) => {
    setActiveCat(id)
    setPage(1)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <section className="publications-section" id="news">
      <div className="container">
        {/* Heading */}
        <div className="fade-up" style={{ marginBottom: 32 }}>
          <h2>PUBLICATIONS</h2>
        </div>

        {/* Controls */}
        <div className="pub-controls">
          {/* Category tabs — sticky */}
          <div className="tab-strip">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`tab-btn ${activecat === cat.id ? 'active' : ''}`}
                onClick={() => handleCatChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="pub-search-wrap">
            <i className="fas fa-search pub-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="pub-empty">Loading publications…</div>
        ) : filtered.length === 0 ? (
          <div className="pub-empty">No publications found.</div>
        ) : (
          <>
            <div className="pub-grid">
              {visible.map(pub => (
                <PubCard
                  key={pub.id}
                  pub={pub}
                  onClick={() => navigate(`/publication/${pub.slug}`)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="pub-load-more">
                <button
                  className="btn btn-primary"
                  onClick={() => setPage(p => p + 1)}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function PubCard({ pub, onClick }) {
  const imgUrl = getImageUrl(pub.image)
  const [imgError, setImgError] = useState(false)
  const formattedDate = formatDate(pub.date)

  return (
    <article className="pub-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      {imgUrl && !imgError ? (
        <img
          className="pub-card-img"
          src={imgUrl}
          alt={pub.title}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="pub-card-img-placeholder">
          <i className="fas fa-stethoscope" />
        </div>
      )}
      <div className="pub-card-body">
        <div className="pub-card-cat">{pub.category}</div>
        <h3 className="pub-card-title">{pub.title}</h3>
        {formattedDate ? <div className="pub-card-date">{formattedDate}</div> : null}
      </div>
    </article>
  )
}
