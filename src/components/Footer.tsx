import { useSettings } from '../context/SettingsContext'

export default function Footer() {
  const { settings } = useSettings()
  
  return (
    <footer className="footer">
      <div>
        <div style={{ fontSize: 'var(--text-xl)', fontWeight: '700', marginBottom: '6px', color: '#fff', fontFamily: 'var(--font-display)' }}>
          {settings.site_name || 'CloudJay'}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255, 255, 255, 0.6)' }}>
          2024 {settings.site_name || 'CloudJay'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}