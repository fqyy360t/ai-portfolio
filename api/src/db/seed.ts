import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { content, setting, tag, adminUser } from '../schemas'
import bcrypt from 'bcryptjs'

async function seed() {
  const client = createClient({ url: 'file:./database.sqlite' })
  const db = drizzle(client)

  const existingSettings = await db.select().from(setting)
  if (existingSettings.length === 0) {
    await db.insert(setting).values([
      { key: 'site_name', value: 'CloudJay', description: '网站名称' },
      { key: 'site_description', value: '用 AI 创造价值，用代码改变世界', description: '网站描述' },
      { key: 'logo', value: '', description: '网站Logo' },
      { key: 'avatar', value: '', description: '头像URL' },
      { key: 'github', value: '', description: 'GitHub链接' },
      { key: 'email', value: '', description: '邮箱' },
      { key: 'wechat', value: '', description: '微信二维码URL' },
      { key: 'wechat_id', value: '', description: '微信号' },
    ])
    console.log('Settings seeded successfully')
  }

  const existingTags = await db.select().from(tag)
  if (existingTags.length === 0) {
    await db.insert(tag).values([
      { name: 'AI', color: '#FF6B6B' },
      { name: 'Web', color: '#4ECDC4' },
      { name: 'Python', color: '#4584B6' },
      { name: 'React', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Node.js', color: '#339933' },
    ])
    console.log('Tags seeded successfully')
  }

  const existingAdmin = await db.select().from(adminUser)
  if (existingAdmin.length === 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    await db.insert(adminUser).values([
      { username: 'admin', password: hashedPassword, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ])
    console.log('Admin user seeded successfully')
  }

  const existingContent = await db.select().from(content)
  if (existingContent.length === 0) {
    await db.insert(content).values([
      {
        title: 'AI Agent 智能助手',
        type: 'works',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20chatbot%20interface%20futuristic%20design%20blue%20gradient&image_size=landscape_16_9',
        summary: '基于大语言模型构建的智能助手，支持多轮对话、知识库问答、任务自动化等功能。',
        content: '这是一个基于大语言模型构建的智能助手项目。\n\n功能特点：\n- 多轮对话支持\n- 知识库问答\n- 任务自动化\n- 插件扩展系统\n\n技术栈：React + TypeScript + Node.js',
        tags: JSON.stringify(['AI', 'React']),
        publish_time: '2024-01-15',
        is_featured: 1,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        title: '工作流自动化平台',
        type: 'works',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=workflow%20automation%20dashboard%20modern%20UI&image_size=landscape_16_9',
        summary: '可视化工作流编辑器，支持拖拽创建自动化流程，连接各种业务系统。',
        content: '工作流自动化平台，让业务流程更高效。\n\n核心功能：\n- 可视化流程设计器\n- 丰富的连接器\n- 实时监控\n- 智能调度',
        tags: JSON.stringify(['Web', 'Node.js']),
        publish_time: '2024-02-20',
        is_featured: 1,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        title: 'React 入门指南',
        type: 'articles',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%20programming%20tutorial%20code%20editor&image_size=landscape_16_9',
        summary: '从零开始学习 React，掌握组件化开发、状态管理、hooks 等核心概念。',
        content: 'React 是一个用于构建用户界面的 JavaScript 库。\n\n本文将带你从基础开始学习：\n1. React 基础概念\n2. 组件化开发\n3. Hooks 详解\n4. 状态管理方案',
        tags: JSON.stringify(['React', 'TypeScript']),
        publish_time: '2024-03-10',
        is_featured: 0,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        title: 'Python 数据分析实战',
        type: 'articles',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analysis%20charts%20dashboard%20Python&image_size=landscape_16_9',
        summary: '使用 Python 进行数据清洗、分析和可视化，掌握 pandas、numpy、matplotlib 等工具。',
        content: '数据分析是数据科学的核心技能。\n\n通过实战项目学习：\n- pandas 数据处理\n- numpy 数值计算\n- matplotlib 数据可视化\n- 真实案例分析',
        tags: JSON.stringify(['Python', 'AI']),
        publish_time: '2024-03-15',
        is_featured: 0,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        title: 'AWS 认证云从业者',
        type: 'certificates',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AWS%20certification%20badge%20cloud%20computing&image_size=landscape_16_9',
        summary: '通过 AWS Cloud Practitioner 认证，掌握云计算基础概念和 AWS 服务。',
        content: 'AWS Cloud Practitioner 认证证明了对云计算基本概念的理解。',
        tags: JSON.stringify(['Web']),
        publish_time: '2023-12-01',
        is_featured: 0,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        title: 'JavaScript',
        type: 'skills',
        cover: '',
        summary: '熟练掌握 JavaScript ES6+ 特性，异步编程，模块化开发。',
        content: 'JavaScript 是前端开发的核心语言。',
        tags: JSON.stringify(['Web']),
        publish_time: '2024-01-01',
        is_featured: 0,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ])
    console.log('Content seeded successfully')
  }

  console.log('Database seed completed')
}

seed().catch(console.error)