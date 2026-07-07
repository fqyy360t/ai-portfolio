import { normalizeImageUrl } from '../utils/imageUrl'

interface ArticleCardProps {
  image: string
  title: string
  tags: string[]
  date: string
  onClick?: () => void
}

export default function ArticleCard({ image, title, tags, date, onClick }: ArticleCardProps) {
  return (
    <div 
      className="proof-item"
      onClick={onClick}
    >
      <img 
        src={normalizeImageUrl(image)}
        alt={title}
        className="proof-img"
      />
      <div className="proof-caption">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '500' }}>#{tag}</span>
          ))}
        </div>
        <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>{date}</div>
      </div>
    </div>
  )
}