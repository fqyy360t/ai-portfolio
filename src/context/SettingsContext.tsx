import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '../api/client'

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

interface SettingsContextType {
  settings: SettingsData
  loading: boolean
  refresh: () => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsData>({
    site_name: 'CloudJay',
    site_description: '用 AI 创造价值，用代码改变世界',
    logo: '',
    avatar: '',
    github: '',
    email: '',
    wechat: '',
    wechat_id: ''
  })
  const [loading, setLoading] = useState(true)
  
  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/settings')
      setSettings(response as SettingsData)
    } catch (err) {
      console.error('Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
  return (
    <SettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}