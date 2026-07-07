import { normalizeImageUrl } from '../utils/imageUrl'

interface ContentCardProps {
  image: string
  title: string
  summary: string
  tags: string[]
  date: string
  onClick?: () => void
}

export default function ContentCard({ image, title, summary, tags, date, onClick }: ContentCardProps) {
  return (
    <div 
      className="project"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="project-info">
        <span className="project-kicker">{tags[0] || 'Project'}</span>
        <h3>{title}</h3>
        <p className="project-pain">{summary}</p>
        <p className="project-solution">
          技术栈：<em>{tags.join(', ')}</em>
        </p>
        <span className="project-result">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
          {date}
        </span>
      </div>
      
      <div className="project-media">
        <img 
          src={normalizeImageUrl(image)}
          alt={title}
        />
      </div>
    </div>
  )
}