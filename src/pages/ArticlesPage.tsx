import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import ContentModal from '@/components/ContentModal'
import Footer from '@/components/Footer'
import { apiClient } from '@/api/client'
import { normalizeImageUrl } from '@/utils/imageUrl'

interface ContentItem {
  id: number
  title: string
  cover: string
  summary: string
  tags: string[]
  publish_time: string
  content?: string
}

interface Pagination {
  page: number
  pageSize: number
  total: number
}

const PAGE_SIZE = 10

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ContentItem[]>([])
  const [allTags, setAllTags] = useState<string[]>(['全部'])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [activeTag, setActiveTag] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: PAGE_SIZE, total: 0 })
  
  useEffect(() => {
    fetchAllTags()
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [activeTag, currentPage])
  
  const fetchAllTags = async () => {
    try {
      const response = await apiClient.get('/content?type=articles&status=published&pageSize=0') as any
      const items = response.data || []
      const tagSet = new Set<string>()
      items.forEach((item: any) => {
        if (item.tags) {
          const tags = JSON.parse(item.tags)
          tags.forEach((tag: string) => tagSet.add(tag))
        }
      })
      setAllTags(['全部', ...Array.from(tagSet)])
    } catch (err) {
      console.error('Failed to fetch tags:', err)
    }
  }

  const fetchArticles = async () => {
    try {
      let url = `/content?type=articles&status=published&page=${currentPage}&pageSize=${PAGE_SIZE}`
      if (activeTag !== '全部') {
        url += `&tag=${encodeURIComponent(activeTag)}`
      }
      const response = await apiClient.get(url) as any
      const items = response.data || []
      setArticles(items.map((item: any) => ({
        id: item.id,
        title: item.title,
        cover: item.cover || '',
        summary: item.summary || '',
        tags: item.tags ? JSON.parse(item.tags) : [],
        publish_time: item.publish_time || '',
        content: item.content
      })))
      if (response.pagination) {
        setPagination(response.pagination)
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    }
  }

  const totalPages = Math.max(1, Math.ceil(pagination.total / PAGE_SIZE))

  const handleTagChange = (tag: string) => {
    setActiveTag(tag)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (pagination.total === 0) return null
    
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '8px',
        marginTop: '48px',
        paddingBottom: '24px'
      }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            background: 'var(--bg-white)',
            color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: 'var(--text-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)'
          }}
        >
          ‹
        </button>
        
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                border: page === currentPage ? 'none' : '1px solid var(--border)',
                background: page === currentPage ? 'var(--primary)' : 'var(--bg-white)',
                color: page === currentPage ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                fontWeight: page === currentPage ? '700' : '400',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-sm)'
              }}
            >
              {page}
            </span>
          )
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            background: 'var(--bg-white)',
            color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-secondary)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: 'var(--text-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)'
          }}
        >
          ›
        </button>
      </div>
    )
  }
  
  return (
    <div>
      <NavBar />
      
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: 'var(--text-3xl)', 
              fontWeight: '700', 
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}>
              文章
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: activeTag === tag ? 'var(--text-primary)' : 'var(--bg-white)',
                    color: activeTag === tag ? '#fff' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedContent(article)}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-white)'
                  const title = e.currentTarget.querySelector('.article-title') as HTMLElement
                  if (title) title.style.color = 'var(--primary)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                  const title = e.currentTarget.querySelector('.article-title') as HTMLElement
                  if (title) title.style.color = 'var(--text-primary)'
                }}
              >
                {article.cover && (
                  <div style={{ 
                    flexShrink: '0',
                    width: '200px',
                    height: '120px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={normalizeImageUrl(article.cover)}
                      alt={article.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                )}
                <div style={{ 
                  flex: '1', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  minWidth: '0'
                }}>
                  <div>
                    {article.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--primary)',
                              fontWeight: '600'
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 
                      className="article-title"
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-display)',
                        transition: 'var(--transition)'
                      }}
                    >
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                        lineHeight: '1.6',
                        margin: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {article.summary}
                      </p>
                    )}
                  </div>
                  <span style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--text-muted)',
                    marginTop: '8px'
                  }}>
                    {article.publish_time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {renderPagination()}
        </div>
      </section>
      
      <Footer />
      
      <ContentModal 
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
      />
    </div>
  )
}
