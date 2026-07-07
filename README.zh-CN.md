# 个人作品集网站

一个现代化的个人作品集展示网站，包含完整的 CMS 后台管理系统。

[English](./README.md)

## 运行效果

![网站运行效果](./public/小柠AI-07-07-2026_09_32_PM.png)

<p align="center"><em>网站运行效果展示</em></p>

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **路由**: React Router DOM
- **状态管理**: Zustand
- **图标**: Lucide React
- **富文本编辑器**: Tiptap

### 后端
- **框架**: Express + TypeScript
- **数据库**: SQLite (Drizzle ORM)
- **认证**: JWT
- **图片处理**: Multer

## 功能特性

### 前端展示
- ✅ 响应式设计，支持移动端和桌面端
- ✅ 主题切换（深色/浅色模式）
- ✅ 导航栏：首页、关于我、作品、Skill、证书、文章、联系方式
- ✅ 作品展示：卡片式布局，支持点击查看详情
- ✅ 证书展示：弹窗预览，支持滚动查看完整内容
- ✅ 文章展示：富文本内容渲染
- ✅ 联系方式：二维码展示、社交链接

### CMS 后台管理
- ✅ 管理员登录认证
- ✅ 内容管理：作品、Skill、证书、文章的增删改查
- ✅ 富文本编辑器：支持格式化、标题、列表、图片上传、超链接
- ✅ 标签管理
- ✅ 网站设置：网站名称、Logo、头像、联系方式等
- ✅ 修改密码功能

## 项目结构

```
website/
├── api/                    # 后端 API
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── routes/         # 路由
│   │   ├── middleware/     # 中间件
│   │   ├── schemas/        # 数据库模型
│   │   └── db/             # 数据库配置和迁移
│   └── dist/               # 编译输出
├── src/                    # 前端源码
│   ├── admin/              # 后台管理页面
│   ├── components/         # 公共组件
│   ├── pages/              # 前端页面
│   ├── api/                # API 客户端
│   ├── context/            # React Context
│   ├── store/              # Zustand 状态管理
│   └── utils/              # 工具函数
├── uploads/                # 图片上传目录
├── database.sqlite         # SQLite 数据库文件
└── public/                 # 静态资源
```

## 安装与运行

### 环境要求
- Node.js >= 20
- pnpm >= 10

### 安装依赖

```bash
# 安装前端依赖
pnpm install

# 安装后端依赖
cd api
pnpm install
cd ..
```

### 启动服务

```bash
# 启动后端 API 服务 (端口 3001)
cd api
npm run dev

# 启动前端开发服务器 (端口 5173)
npm run dev
```

### 访问地址
- 前端网站：http://localhost:5173
- 后台管理：http://localhost:5173/admin/login

## 数据库

数据库为 SQLite 单文件，位于项目根目录：`database.sqlite`

### 数据表
- `content` - 内容表（作品、Skill、证书、文章）
- `setting` - 设置表（网站配置）
- `tag` - 标签表
- `admin_user` - 管理员用户表

### 数据库操作

```bash
# 生成迁移文件
cd api
npx drizzle-kit generate

# 执行迁移
npx drizzle-kit push

# 查看数据库
# 使用 SQLiteStudio、DB Browser for SQLite 等工具打开 database.sqlite
```

## 部署

### 前端构建

```bash
npm run build
```

构建产物位于 `dist/` 目录。

### 后端构建

```bash
cd api
npm run build
```

## 开发说明

### 代理配置
前端通过 Vite 代理将 `/api` 请求转发到后端 `http://localhost:3001`。

### 图片上传
上传的图片存储在 `uploads/` 目录，访问路径为 `/uploads/xxx.png`。

### 全局设置
网站名称、Logo、联系方式等全局设置通过 CMS 后台的「网站设置」页面管理，数据存储在 `setting` 表中。

## License

MIT
