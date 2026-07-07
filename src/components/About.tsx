import { useSettings } from '../context/SettingsContext'
import { normalizeImageUrl } from '../utils/imageUrl'

export default function About() {
  const { settings } = useSettings()
  
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'Coze', level: 95 },
    { name: 'ComfyUI', level: 85 },
    { name: 'Go', level: 70 },
    { name: 'Docker', level: 80 },
  ]

  const expertise = [
    {
      icon: '🤖',
      title: 'AI Agent 开发',
      description: '基于大语言模型构建智能 Agent，支持多轮对话、工具调用和自主决策。',
      tags: ['LLM', 'Agent', 'RAG']
    },
    {
      icon: '🔄',
      title: '工作流自动化',
      description: '使用 n8n 构建自动化工作流，实现数据处理和业务流程的智能化。',
      tags: ['n8n', '自动化', '低代码']
    },
    {
      icon: '🎨',
      title: '内容创作',
      description: '结合 AI 图像生成和写作能力，创作高质量的技术内容和视觉作品。',
      tags: ['AI Art', 'Prompt', 'ComfyUI']
    },
    {
      icon: '⚡',
      title: '全栈开发',
      description: '精通前后端开发，从数据库设计到前端交互，构建完整的 Web 应用。',
      tags: ['React', 'Node.js', 'PostgreSQL']
    }
  ]
  
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="eyebrow">About</span>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>关于我</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', marginTop: '16px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            专注于 AI Agent、工作流自动化和内容创作，探索 AI 与创意的无限可能。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              width: '280px', 
              height: '280px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '4px solid var(--primary)',
              boxShadow: '0 10px 40px rgba(30, 64, 175, 0.2)'
            }}>
              <img 
                src={normalizeImageUrl(settings.avatar) || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait%20headshot%20neutral%20background&image_size=square'} 
                alt="头像"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              {settings.site_name || '小柠AI'}
            </h3>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>个人简介</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>资深系统架构师与技术专家：</strong>拥有 15+年开发经验，5 年以上大型系统架构设计。
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>深厚的行业背景：</strong>具备金融（银行/消费金融/支付/票据/理财）、政务（公积金/民生）、电信（呼叫中心/经分分析）、智慧城市（CIM/数字孪生/物联网/数据中台）及汽车/互联网出行等多行业的互联网业务经验。
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>AI 深度实践者与落地：</strong>深耕"AI + 业务"融合，熟练掌握 RAG 知识库、Dify AI Agent、MCP 插件改造及 AI 自动评价体系，具备将传统业务快速 AI 化改造的实战能力。
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>AI 赋能与技术改造：</strong>精通 Dify/Coze/N8N/百炼平台 Agent、工作流、插件、MCP 开发；熟练使用多维表格，结合外部工作流打造企业复杂场景，熟悉多维表格字段捷径开发、插件开发、API、公式、仪表盘、自动化、工作流及应用模式开发，熟悉飞书卡片，可以打造企业级复杂交互；擅长用 AI 与企业内部系统打通，打造企业内部数字员工、专属数字人、专属 RAG 知识库；擅长使用 ClawdBot 搭建企业内部私有化机器人助手；熟悉 Skills 开发，可以为企业搭建私有化专属 Skills 平台。
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>全栈数据与物联网：</strong>独立负责过日流水千万级的实时数仓、离线数仓设计，精通云原生、微服务及复杂物联网平台建设。
                </p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>懂业务、懂架构、懂 AI：</strong>不仅能从 0 到 1 构建高并发（20 万 TPS）系统，更能将 AI 理论转化为解决企业性能瓶颈和业务增长的实际工具。
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['AI Agent', '系统架构', '数据工程', '物联网', 'Dify', 'Coze', 'N8N', '飞书多维表格'].map((tag) => (
                <span 
                  key={tag}
                  style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(30, 64, 175, 0.1)', 
                    color: 'var(--primary)', 
                    borderRadius: 'var(--radius-pill)', 
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="eyebrow">Expertise</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '8px' }}>专业领域</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {expertise.map((item, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '32px', 
                  background: 'var(--bg-white)', 
                  borderRadius: 'var(--radius-lg)', 
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)',
                  transition: 'var(--transition)',
                }}
              >
                <div style={{ fontSize: 'var(--text-4xl)', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      style={{ 
                        padding: '4px 12px', 
                        background: 'var(--bg-gray)', 
                        color: 'var(--text-muted)', 
                        borderRadius: 'var(--radius-pill)', 
                        fontSize: 'var(--text-xs)',
                        fontWeight: '600'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="eyebrow">Skills</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '8px' }}>技能栈</h2>
          </div>
          
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', padding: '48px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{skill.name}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(30, 64, 175, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${skill.level}%`,
                        background: 'var(--gradient-primary)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}