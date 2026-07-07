import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import GridCard from '@/components/GridCard'
import ContentModal from '@/components/ContentModal'
import Footer from '@/components/Footer'
import { apiClient } from '@/api/client'

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

export default function SkillsPage() {
  const [skills, setSkills] = useState<ContentItem[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: PAGE_SIZE, total: 0 })
  
  useEffect(() => {
    fetchContent()
  }, [currentPage])
  
  const fetchContent = async () => {
    try {
      const response = await apiClient.get(`/content?type=skills&status=published&page=${currentPage}&pageSize=${PAGE_SIZE}`) as any
      const items = response.data || []
      setSkills(items.map((item: any) => ({
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
      console.error('Failed to fetch skills:', err)
      setSkills([
        {
          id: 1,
          title: 'AI 知识库问答系统',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20knowledge%20base%20search%20semantic%20network%20visualization&image_size=landscape_16_9',
          summary: '基于 RAG 技术构建的智能问答系统，支持语义搜索和多轮对话。',
          tags: ['RAG', 'LLM'],
          publish_time: '2024-05-20',
          content: '掌握 RAG（检索增强生成）技术，能够构建基于知识库的智能问答系统。'
        },
        {
          id: 2,
          title: 'ComfyUI 高级图像生成',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ComfyUI%20workflow%20node%20graph%20image%20generation%20interface&image_size=landscape_16_9',
          summary: '掌握 ComfyUI 的高级图像生成技巧，构建复杂的视觉创作工作流。',
          tags: ['ComfyUI', 'AI Art'],
          publish_time: '2024-05-15',
          content: '深入学习 ComfyUI 的节点系统，掌握 ControlNet、IP-Adapter、LoRA 等高级技术。'
        },
        {
          id: 3,
          title: 'Prompt 工程最佳实践',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prompt%20engineering%20formula%20code%20snippets%20documentation&image_size=landscape_16_9',
          summary: '深入探索 Prompt 设计的方法论和技巧，提升 AI 交互效果。',
          tags: ['Prompt', '技巧'],
          publish_time: '2024-05-10',
          content: '学习 Prompt 工程的核心原则，掌握角色设定、思维链、Few-shot 等技术。'
        },
        {
          id: 4,
          title: 'Claude 高级使用技巧',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Claude%20AI%20interface%20chat%20conversation%20blue%20theme&image_size=landscape_16_9',
          summary: '深入探索 Claude 模型的高级使用技巧和最佳实践。',
          tags: ['Claude', 'Skill'],
          publish_time: '2024-05-05',
          content: '掌握 Claude 模型的 XML 格式、工具调用、长上下文等高级功能。'
        }
      ])
    }
  }

  const totalPages = Math.max(1, Math.ceil(pagination.total / PAGE_SIZE))

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
      <Hero 
        title="Skill 分享" 
        subtitle="Skills"
        description="分享我在 AI 技术领域的学习心得和实战经验，包括 RAG、Prompt 工程、ComfyUI 等热门技术。"
      />
      <section className="section">
        <div className="container">
          <div className="proof-grid">
            {skills.map((skill) => (
              <GridCard 
                key={skill.id} 
                image={skill.cover}
                title={skill.title}
                summary={skill.summary}
                tags={skill.tags}
                date={skill.publish_time}
                onClick={() => setSelectedContent(skill)}
              />
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
