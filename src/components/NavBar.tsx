import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { settings } = useSettings()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const navLinks = [
    { name: '首页', href: '/' },
    { name: '关于我', href: '/about' },
    { name: '作品', href: '/works' },
    { name: 'Skill', href: '/skills' },
    { name: '证书', href: '/certificates' },
    { name: '文章', href: '/articles' },
    { name: '联系方式', href: '/contact' },
  ]
  
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          {settings.avatar ? (
            <img 
              src={settings.avatar.startsWith('http') ? settings.avatar : `http://localhost:3001${settings.avatar}`}
              alt="Logo"
              className="nav-avatar"
            />
          ) : (
            <div className="nav-avatar" style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
              {settings.site_name?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <div className="nav-name">{settings.site_name || 'CloudJay'}</div>
            <div className="nav-tag">{settings.site_description || 'AI Developer'}</div>
          </div>
        </Link>
        
        <button 
          className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href}
              className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}