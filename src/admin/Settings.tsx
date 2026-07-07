import { useState, useEffect } from 'react'
import { apiClient } from '../api/client'
import { useAuthStore } from '../store/auth'
import { useSettings } from '../context/SettingsContext'

interface SettingsData {
  site_name: string
  site_description: string
  logo: string
  avatar: string
  github: string
  email: string
  wechat: string
  wechat_id: string
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    site_name: '',
    site_description: '',
    logo: '',
    avatar: '',
    github: '',
    email: '',
    wechat: '',
    wechat_id: ''
  })
  
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const token = useAuthStore((state) => state.token)
  const { refresh } = useSettings()
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
  const fetchSettings = async () => {
    try {
      const response = await apiClient.get('/settings', token || '')
      setSettings(response as SettingsData)
    } catch (err) {
      console.error('Failed to fetch settings')
    }
  }
  
  const handleSave = async () => {
    setSaving(true)
    
    try {
      for (const [key, value] of Object.entries(settings)) {
        await apiClient.put(`/settings/${key}`, { value }, token || '')
      }
      setSaved(true)
      await refresh()
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof SettingsData) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await apiClient.post('/media/upload', formData, token || '', true)
      setSettings((prev) => ({ ...prev, [field]: (response as { url: string }).url }))
    } catch (err) {
      console.error('Failed to upload file')
    }
  }
  
  const renderUploadField = (field: keyof SettingsData, label: string, hint?: string) => (
    <div key={field}>
      <label style={{ 
        display: 'block', 
        fontSize: 'var(--text-sm)', 
        fontWeight: '600', 
        color: 'var(--text-secondary)', 
        marginBottom: '8px' 
      }}>
        {label}
        {hint && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '8px' }}>
            ({hint})
          </span>
        )}
      </label>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={settings[field]}
          onChange={(e) => setSettings((prev) => ({ ...prev, [field]: e.target.value }))}
          style={{ 
            flex: 1, 
            padding: '12px 16px', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: 'var(--text-base)',
            transition: 'var(--transition)'
          }}
          onFocus={(e) => {
            const el = e.currentTarget as HTMLInputElement;
            el.style.setProperty('border-color', 'var(--primary)');
            el.style.setProperty('box-shadow', '0 0 0 3px rgba(30, 64, 175, 0.1)');
          }}
          onBlur={(e) => {
            const el = e.currentTarget as HTMLInputElement;
            el.style.setProperty('border-color', 'var(--border)');
            el.style.setProperty('box-shadow', 'none');
          }}
          placeholder={`输入${label}URL`}
        />
        <label style={{ 
          padding: '12px 24px', 
          background: 'var(--bg-gray)', 
          color: 'var(--text-secondary)', 
          borderRadius: 'var(--radius-md)', 
          cursor: 'pointer',
          transition: 'var(--transition)',
          fontSize: 'var(--text-base)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLLabelElement).style.background = 'var(--border)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLLabelElement).style.background = 'var(--bg-gray)'
        }}
        >
          上传
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e, field)}
            accept="image/*"
          />
        </label>
      </div>
      {settings[field] && (
        <div style={{ marginTop: '8px' }}>
          <img 
            src={settings[field].startsWith('http') ? settings[field] : `http://localhost:3001${settings[field]}`}
            alt={label}
            style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
          />
        </div>
      )}
    </div>
  )
  
  const settingsFields = [
    { key: 'site_name', label: '网站名称', placeholder: 'CloudJay', hint: '同时作为浏览器标签标题' },
    { key: 'site_description', label: '网站描述', placeholder: '用 AI 创造价值，用代码改变世界' },
    { key: 'avatar', label: '头像', placeholder: '输入头像图片URL' },
    { key: 'github', label: 'GitHub链接', placeholder: 'https://github.com/...' },
    { key: 'email', label: '邮箱', placeholder: 'your@email.com' },
    { key: 'wechat', label: '微信二维码', placeholder: '输入二维码图片URL' },
    { key: 'wechat_id', label: '微信号', placeholder: 'your_wechat_id' },
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ 
          fontSize: 'var(--text-3xl)', 
          fontWeight: '700', 
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)'
        }}>网站设置</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', marginTop: '8px' }}>配置网站的基本信息</p>
      </div>
      
      <div style={{ 
        background: 'var(--bg-white)', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-sm)', 
        border: '1px solid var(--border)',
        padding: '24px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {renderUploadField('logo', '网站Logo', '同时作为浏览器标签图标')}
          
          {settingsFields.map((field) => {
            if (field.key === 'avatar' || field.key === 'wechat') {
              return renderUploadField(field.key as keyof SettingsData, field.label)
            }
            return (
              <div key={field.key}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: '600', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '8px' 
                }}>
                  {field.label}
                  {field.hint && (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '8px' }}>
                      ({field.hint})
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={settings[field.key as keyof SettingsData]}
                  onChange={(e) => setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: 'var(--text-base)',
                    transition: 'var(--transition)'
                  }}
                  onFocus={(e) => {
                    const el = e.currentTarget as HTMLInputElement;
                    el.style.setProperty('border-color', 'var(--primary)');
                    el.style.setProperty('box-shadow', '0 0 0 3px rgba(30, 64, 175, 0.1)');
                  }}
                  onBlur={(e) => {
                    const el = e.currentTarget as HTMLInputElement;
                    el.style.setProperty('border-color', 'var(--border)');
                    el.style.setProperty('box-shadow', 'none');
                  }}
                  placeholder={field.placeholder}
                />
              </div>
            )
          })}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
          <button
            onClick={fetchSettings}
            style={{ 
              padding: '12px 24px', 
              border: '1px solid var(--border)', 
              color: 'var(--text-secondary)', 
              borderRadius: 'var(--radius-md)', 
              background: 'transparent',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontSize: 'var(--text-base)',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.setProperty('background', 'var(--bg-gray)');
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.setProperty('background', 'transparent');
            }}
          >
            重置
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ 
              padding: '12px 24px', 
              fontWeight: '700', 
              borderRadius: 'var(--radius-md)', 
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontSize: 'var(--text-base)',
              background: saved ? 'var(--green)' : 'var(--gradient-primary)',
              color: '#fff',
              opacity: saving ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!saving && !saved) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.setProperty('transform', 'translateY(-2px)');
                el.style.setProperty('box-shadow', 'var(--shadow-primary)');
              }
            }}
            onMouseLeave={(e) => {
              if (!saving && !saved) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.setProperty('transform', 'translateY(0)');
                el.style.setProperty('box-shadow', 'none');
              }
            }}
          >
            {saving ? '保存中...' : saved ? '已保存' : '保存设置'}
          </button>
        </div>
      </div>
    </div>
  )
}