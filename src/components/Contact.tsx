import { useSettings } from '../context/SettingsContext'
import { normalizeImageUrl } from '../utils/imageUrl'

export default function Contact() {
  const { settings } = useSettings()
  
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <h2>有想法想交流？</h2>
            <p>欢迎随时联系我，一起探讨 AI 的无限可能。无论是合作机会、技术交流还是项目咨询，我都很乐意倾听。</p>
            
            <ul className="contact-list">
              {settings.email && (
                <li>
                  <span className="dot"></span>
                  <span className="contact-label">邮箱：</span>
                  <a href={`mailto:${settings.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{settings.email}</a>
                </li>
              )}
              {settings.github && (
                <li>
                  <span className="dot"></span>
                  <span className="contact-label">GitHub：</span>
                  <a href={settings.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{settings.github}</a>
                </li>
              )}
              {settings.wechat_id && (
                <li>
                  <span className="dot"></span>
                  <span className="contact-label">微信：</span>
                  <span>{settings.wechat_id}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="qr-card">
            <img 
              src={settings.wechat ? normalizeImageUrl(settings.wechat) : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20simple%20black%20white%20clean%20design&image_size=square'}
              alt="WeChat QR Code"
            />
            <h3>扫码添加微信</h3>
            <p>期待与你交流 AI 技术和创意想法</p>
          </div>
        </div>
      </div>
    </section>
  )
}