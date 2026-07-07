import { useSettings } from '../context/SettingsContext'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
}

export default function Hero({ title, subtitle, description }: HeroProps = {}) {
  const { settings } = useSettings()
  
  const heroTags = ['AI Agent', '工作流自动化', '内容创作', 'Prompt', 'ComfyUI', 'Coze']
  
  if (title) {
    return (
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              {subtitle && <span className="hero-eyebrow">{subtitle}</span>}
              <h1 className="hero-title">{title}</h1>
              {description && <p className="hero-desc">{description}</p>}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow">{settings.site_name || 'CloudJay'}</span>
            
            <h1 className="hero-title">
              用 <em>AI</em> 创造价值<br />
              用代码改变世界
            </h1>
            
            <p className="hero-desc">
              {settings.site_description || '专注于 AI Agent、工作流自动化和内容创作，探索 AI 与创意的无限可能。'}
            </p>
            
            <div className="hero-pills">
              <span className="pill">AI Agent</span>
              <span className="pill">工作流自动化</span>
              <span className="pill">内容创作</span>
            </div>
          </div>
          
          <div className="hero-card">
            <div className="hero-photo-wrap">
              <img 
                src={settings.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20young%20asian%20male%20developer%20wearing%20glasses%20black%20hoodie%20outdoor%20natural%20lighting&image_size=portrait_4_3'}
                alt="Profile"
                className="hero-photo"
              />
            </div>
            
            <h3>{settings.site_name || 'CloudJay'}</h3>
            <p className="hero-card-sub">{settings.site_description || 'AI 开发者 & 创作者'}</p>
            
            <div className="hero-tags">
              {heroTags.map((tag) => (
                <span key={tag} className="hero-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}