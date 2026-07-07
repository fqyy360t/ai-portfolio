import { normalizeImageUrl } from '../utils/imageUrl'

interface CertificateCardProps {
  image: string
  title: string
  date: string
  onClick?: () => void
}

export default function CertificateCard({ image, title, date, onClick }: CertificateCardProps) {
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
        <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>{date}</div>
      </div>
    </div>
  )
}