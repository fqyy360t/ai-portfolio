import { useEffect } from 'react'
import { normalizeImageUrl } from '../utils/imageUrl'

interface ContentModalProps {
  content: {
    title: string
    cover: string
    summary: string
    tags: string[]
    publish_time: string
    content?: string
  } | null
  onClose: () => void
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  useEffect(() => {
    if (content) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [content])

  if (!content) return null
  
  return (
    <div 
      className="lightbox open"
      onClick={onClose}
    >
      <button 
        className="lightbox-close"
        onClick={onClose}
      >
        ×
      </button>
      
      <div 
      className="lightbox-content"
      style={{ maxWidth: '900px', width: '92vw', background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)' }}
      onClick={(e) => e.stopPropagation()}
    >
        {content.cover && (
          <div style={{ position: 'relative', width: '100%' }}>
            <img 
              src={normalizeImageUrl(content.cover)}
              alt={content.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#f3f4f6', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(30, 64, 175, 0.9), transparent)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                {content.title}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {content.tags.map((tag) => (
                  <span 
                    key={tag}
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: '600',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'rgba(6, 182, 212, 0.3)',
                      color: 'var(--accent)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div style={{ padding: '24px' }}>
          {!content.cover && (
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
              {content.title}
            </h2>
          )}
          
          {content.publish_time && (
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {content.publish_time}
            </div>
          )}
          
          {content.summary && (
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
              {content.summary}
            </p>
          )}
          
          {content.content && (
            <div 
              style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: '1.8' }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}