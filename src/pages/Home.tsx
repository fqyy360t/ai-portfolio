import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Section from '@/components/Section'
import ContentCard from '@/components/ContentCard'
import ArticleCard from '@/components/ArticleCard'
import CertificateCard from '@/components/CertificateCard'
import ContentModal from '@/components/ContentModal'
import Contact from '@/components/Contact'
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

export default function Home() {
  const [works, setWorks] = useState<ContentItem[]>([])
  const [skills, setSkills] = useState<ContentItem[]>([])
  const [articles, setArticles] = useState<ContentItem[]>([])
  const [certificates, setCertificates] = useState<ContentItem[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  
  useEffect(() => {
    fetchContent()
  }, [])
  
  const fetchContent = async () => {
    try {
      const worksRes = await apiClient.get('/content?type=works&status=published')
      const skillsRes = await apiClient.get('/content?type=skills&status=published')
      const articlesRes = await apiClient.get('/content?type=articles&status=published')
      const certsRes = await apiClient.get('/content?type=certificates&status=published')
      
      setWorks(transformContent(worksRes))
      setSkills(transformContent(skillsRes))
      setArticles(transformContent(articlesRes))
      setCertificates(transformContent(certsRes))
    } catch (err) {
      console.error('Failed to fetch content:', err)
      setWorks(getDefaultWorks())
      setSkills(getDefaultSkills())
      setArticles(getDefaultArticles())
      setCertificates(getDefaultCertificates())
    }
  }
  
  const transformContent = (response: any): ContentItem[] => {
    const items = response.data || response
    if (!Array.isArray(items)) return []
    return items.map((item: any) => ({
      id: item.id,
      title: item.title,
      cover: item.cover || '',
      summary: item.summary || '',
      tags: item.tags ? JSON.parse(item.tags) : [],
      publish_time: item.publish_time || '',
      content: item.content
    }))
  }
  
  const getDefaultWorks = (): ContentItem[] => [
    {
      id: 1,
      title: '智能内容创作 Agent',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20agent%20dashboard%20dark%20theme%20futuristic%20interface&image_size=landscape_16_9',
      summary: '基于大语言模型的内容创作助手，自动生成高质量文章和创意内容。',
      tags: ['AI Agent', 'LLM'],
      publish_time: '2024-06-15',
      content: '这是一个基于大语言模型的智能内容创作平台，支持多种内容类型的自动生成。'
    },
    {
      id: 2,
      title: '企业数据自动化工作流',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=workflow%20automation%20diagram%20flowchart%20nodes%20connections&image_size=landscape_16_9',
      summary: '使用 n8n 构建的自动化工作流，实现数据处理和业务流程自动化。',
      tags: ['n8n', '自动化'],
      publish_time: '2024-06-10',
      content: '基于 n8n 平台构建的企业级自动化解决方案，支持定时任务、触发器、数据转换等功能。'
    },
    {
      id: 3,
      title: 'AI 电影分镜生成系统',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20movie%20scene%20generation%20cinematic%20dark%20fantasy&image_size=landscape_16_9',
      summary: '利用 AI 技术自动生成电影分镜和视觉风格描述，提升创作效率。',
      tags: ['AI', '影视'],
      publish_time: '2024-06-05',
      content: '结合 AI 图像生成和大语言模型，为影视创作者提供分镜设计和场景描述的智能辅助。'
    },
    {
      id: 4,
      title: '智能客服 Agent',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20chatbot%20robot%20friendly%20interface%20minimal%20design&image_size=landscape_16_9',
      summary: '基于 Coze 平台构建的智能客服机器人，支持多轮对话和知识问答。',
      tags: ['Coze', 'Bot'],
      publish_time: '2024-05-28',
      content: '基于 Coze 平台快速搭建的智能客服系统，支持自定义知识库和多轮对话能力。'
    }
  ]
  
  const getDefaultSkills = (): ContentItem[] => [
    {
      id: 5,
      title: 'AI 知识库问答系统',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20knowledge%20base%20search%20semantic%20network%20visualization&image_size=landscape_16_9',
      summary: '基于 RAG 技术构建的智能问答系统，支持语义搜索和多轮对话。',
      tags: ['RAG', 'LLM'],
      publish_time: '2024-05-20',
      content: '掌握 RAG（检索增强生成）技术，能够构建基于知识库的智能问答系统。'
    },
    {
      id: 6,
      title: 'ComfyUI 高级图像生成',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ComfyUI%20workflow%20node%20graph%20image%20generation%20interface&image_size=landscape_16_9',
      summary: '掌握 ComfyUI 的高级图像生成技巧，构建复杂的视觉创作工作流。',
      tags: ['ComfyUI', 'AI Art'],
      publish_time: '2024-05-15',
      content: '深入学习 ComfyUI 的节点系统，掌握 ControlNet、IP-Adapter、LoRA 等高级技术。'
    },
    {
      id: 7,
      title: 'Prompt 工程最佳实践',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prompt%20engineering%20formula%20code%20snippets%20documentation&image_size=landscape_16_9',
      summary: '深入探索 Prompt 设计的方法论和技巧，提升 AI 交互效果。',
      tags: ['Prompt', '技巧'],
      publish_time: '2024-05-10',
      content: '学习 Prompt 工程的核心原则，掌握角色设定、思维链、Few-shot 等技术。'
    },
    {
      id: 8,
      title: 'Claude 高级使用技巧',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Claude%20AI%20interface%20chat%20conversation%20blue%20theme&image_size=landscape_16_9',
      summary: '深入探索 Claude 模型的高级使用技巧和最佳实践。',
      tags: ['Claude', 'Skill'],
      publish_time: '2024-05-05',
      content: '掌握 Claude 模型的 XML 格式、工具调用、长上下文等高级功能。'
    }
  ]
  
  const getDefaultArticles = (): ContentItem[] => [
    {
      id: 9,
      title: '如何构建一个高效的 AI Agent',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20technology%20article%20writing%20code%20editor&image_size=landscape_16_9',
      summary: '详解 AI Agent 的架构设计和实现方法',
      tags: ['AI', 'Agent'],
      publish_time: '2024-06-15',
      content: '本文详细介绍了构建 AI Agent 的核心组件和架构设计原则。'
    },
    {
      id: 10,
      title: 'n8n 工作流实战：自动化生成日报和周报',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=n8n%20workflow%20automation%20diagram%20visual&image_size=landscape_16_9',
      summary: '手把手教你用 n8n 实现办公自动化',
      tags: ['n8n', '自动化'],
      publish_time: '2024-06-10',
      content: '通过实际案例学习 n8n 工作流的设计和实现方法。'
    },
    {
      id: 11,
      title: '用 ComfyUI + ControlNet 制作电影级画面',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ComfyUI%20ControlNet%20image%20generation%20artistic&image_size=landscape_16_9',
      summary: '掌握 AI 图像生成的高级技巧',
      tags: ['ComfyUI', 'ControlNet'],
      publish_time: '2024-06-05',
      content: '学习如何使用 ControlNet 控制 AI 图像生成的细节。'
    },
    {
      id: 12,
      title: 'Claude 3 入门：从零开始构建智能应用',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Claude%203%20AI%20model%20interface%20futuristic&image_size=landscape_16_9',
      summary: '快速上手 Anthropic 的最新模型',
      tags: ['Claude', '入门'],
      publish_time: '2024-05-28',
      content: 'Claude 3 系列模型的全面介绍和使用指南。'
    },
    {
      id: 13,
      title: '提升 Prompt 效果的 10 个技巧',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prompt%20engineering%20guide%20technical%20documentation&image_size=landscape_16_9',
      summary: '实战经验分享，让你的 Prompt 更有效',
      tags: ['Prompt', '技巧'],
      publish_time: '2024-05-20',
      content: '总结了提升 Prompt 效果的 10 个实用技巧。'
    }
  ]
  
  const getDefaultCertificates = (): ContentItem[] => [
    {
      id: 14,
      title: 'AI 创新大赛一等奖',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20competition%20award%20certificate%20gold%20medal%20digital&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2024年6月'
    },
    {
      id: 15,
      title: '机器学习专业认证',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=machine%20learning%20certification%20professional%20blue%20tech&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2024年3月'
    },
    {
      id: 16,
      title: 'Prompt 工程专家认证',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prompt%20engineering%20certificate%20purple%20gradient%20modern&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2024年1月'
    },
    {
      id: 17,
      title: '云计算专业认证',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20computing%20certificate%20green%20tech%20design&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2023年12月'
    },
    {
      id: 18,
      title: '数据科学基础认证',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20science%20certificate%20orange%20gradient%20professional&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2023年10月'
    },
    {
      id: 19,
      title: 'AI 应用开发大赛',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20application%20certificate%20pink%20modern%20design&image_size=portrait_4_3',
      summary: '',
      tags: [],
      publish_time: '2023年9月'
    }
  ]
  
  const handleContentClick = (item: ContentItem) => {
    setSelectedContent(item)
  }
  
  return (
    <div>
      <NavBar />
      <Hero />
      <Stats />
      
      <Section 
        id="works"
        title="精选作品"
        subtitle="Projects"
        showMore={true}
        moreHref="/works"
      >
        {works.map((work) => (
          <ContentCard 
            key={work.id} 
            image={work.cover}
            title={work.title}
            summary={work.summary}
            tags={work.tags}
            date={work.publish_time}
            onClick={() => handleContentClick(work)}
          />
        ))}
      </Section>
      
      <Section 
        id="skills"
        title="Skill 分享"
        subtitle="Skills"
        showMore={true}
        moreHref="/skills"
      >
        {skills.map((skill) => (
          <ContentCard 
            key={skill.id} 
            image={skill.cover}
            title={skill.title}
            summary={skill.summary}
            tags={skill.tags}
            date={skill.publish_time}
            onClick={() => handleContentClick(skill)}
          />
        ))}
      </Section>
      
      <Section 
        id="articles"
        title="最新文章"
        subtitle="Articles"
        showMore={true}
        moreHref="/articles"
      >
        <div className="proof-grid">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              image={article.cover}
              title={article.title}
              tags={article.tags}
              date={article.publish_time}
              onClick={() => handleContentClick(article)}
            />
          ))}
        </div>
      </Section>
      
      <Section 
        id="certificates"
        title="证书荣誉"
        subtitle="Certificates"
        showMore={certificates.length > 6}
        moreHref="/certificates"
      >
        <div className="proof-grid">
          {certificates.slice(0, 6).map((cert) => (
            <CertificateCard 
              key={cert.id} 
              image={cert.cover}
              title={cert.title}
              date={cert.publish_time}
              onClick={() => handleContentClick(cert)}
            />
          ))}
        </div>
      </Section>
      
      <Contact />
      <Footer />
      
      <ContentModal 
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
      />
    </div>
  )
}