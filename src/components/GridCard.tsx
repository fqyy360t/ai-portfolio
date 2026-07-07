import { normalizeImageUrl } from '../utils/imageUrl'

interface GridCardProps {
  image: string
  title: string
  summary: string
  tags: string[]
  date: string
  onClick?: () => void
}

export default function GridCard({ image, title, summary, tags, date, onClick }: GridCardProps) {
  return (
    <div 
      className="proof-item"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="grid-card-media">
        <img 
          src={normalizeImageUrl(image)}
          alt={title}
        />
      </div>
      <div className="proof-caption">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '500' }}>#{tag}</span>
          ))}
        </div>
        <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '8px', fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)' }}>{title}</div>
        {summary && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {summary}
          </p>
        )}
        <div style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>{date}</div>
      </div>
    </div>
  )
}