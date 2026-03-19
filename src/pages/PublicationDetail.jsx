import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatButton from '../components/FloatButton'
import { usePublications, getImageUrl, formatDate } from '../hooks/usePublications'

const BASE = import.meta.env.BASE_URL

export default function PublicationDetail() {
  const { slug } = useParams()
  const { publications, loading } = usePublications()
  const [imgError, setImgError] = useState(false)

  const pub = publications.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar solid />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
          <p>Loading…</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!pub) {
    return (
      <>
        <Navbar solid />
        <div className="not-found">
          <h1>404</h1>
          <h2>Publication Not Found</h2>
          <p>This publication may have been moved or doesn't exist.</p>
          <Link to={`${BASE}#news`} className="btn btn-primary" style={{ marginTop: 8 }}>
            Back to Publications
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const imgUrl = getImageUrl(pub.image)
  const formattedDate = formatDate(pub.date)

  // Related posts (same category, excluding current)
  const related = publications
    .filter(p => p.cat_id === pub.cat_id && p.id !== pub.id)
    .slice(0, 3)

  const goBackToPublications = () => {
    window.location.href = `${BASE}#news`
  }

  return (
    <>
      <Helmet>
        <title>{pub.title} - Cambodia Urology Center</title>
        <meta name="description" content={pub.content_preview?.slice(0, 155) || pub.title} />
        <meta property="og:title" content={`${pub.title} - Cambodia Urology Center`} />
        <meta property="og:description" content={pub.content_preview?.slice(0, 155) || ''} />
        {imgUrl && <meta property="og:image" content={imgUrl} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://cambodiaurologycenter.com/publication/${pub.slug}`} />
      </Helmet>

      <Navbar solid />

      {/* Hero strip */}
      <div className="pub-detail-hero">
        <div className="container">
          <button className="back-btn" onClick={goBackToPublications}>
            <i className="fas fa-arrow-left" />
            Back
          </button>
          <div className="pub-detail-cat">
            <i className="fas fa-tag" />
            {pub.category}
          </div>
          <h1 className="pub-detail-title">{pub.title}</h1>
          {formattedDate ? <div className="pub-detail-date">{formattedDate}</div> : null}
        </div>
      </div>

      {/* Content */}
      <div className="container">
        {imgUrl && !imgError ? (
          <img
            className="pub-detail-img"
            src={imgUrl}
            alt={pub.title}
            onError={() => setImgError(true)}
          />
        ) : null}

        <div className="pub-detail-content">
          {pub.content_preview ? (
            <div dangerouslySetInnerHTML={{ __html: pub.content_preview }} />
          ) : (
            <p>No content preview available for this publication.</p>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background: 'var(--light-bg)', padding: '60px 0' }}>
          <div className="container">
            <h3 style={{ marginBottom: 28 }}>Related in {pub.category}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {related.map(r => (
                <RelatedCard key={r.id} pub={r} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatButton />
    </>
  )
}

function RelatedCard({ pub }) {
  const navigate = useNavigate()
  const imgUrl = getImageUrl(pub.image)
  const [imgError, setImgError] = useState(false)
  const formattedDate = formatDate(pub.date)

  return (
    <article
      className="pub-card"
      onClick={() => navigate(`/publication/${pub.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/publication/${pub.slug}`)}
    >
      {imgUrl && !imgError ? (
        <img className="pub-card-img" src={imgUrl} alt={pub.title} loading="lazy" onError={() => setImgError(true)} />
      ) : (
        <div className="pub-card-img-placeholder"><i className="fas fa-stethoscope" /></div>
      )}
      <div className="pub-card-body">
        <div className="pub-card-cat">{pub.category}</div>
        <h3 className="pub-card-title">{pub.title}</h3>
        {formattedDate ? <div className="pub-card-date">{formattedDate}</div> : null}
      </div>
    </article>
  )
}
