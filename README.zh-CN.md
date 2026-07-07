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

本项目提供两种运行方式：**脚本启动** 或 **Docker 启动**。

---

### 方式一：脚本启动（开发模式）

此方式在本地直接运行前端和后端服务，适合开发和调试。

#### 环境要求
- Node.js >= 20
- npm 或 pnpm

#### 快速启动

`scripts/` 目录提供了启动和停止脚本，支持 Windows 和 Linux/macOS：

**Windows：**
```bash
# 启动服务
scripts\start.bat

# 停止服务
scripts\stop.bat
```

**Linux / macOS：**
```bash
# 启动服务（需先赋予脚本执行权限）
chmod +x scripts/*.sh
./scripts/start.sh

# 停止服务
./scripts/stop.sh
```

#### 脚本功能说明

启动脚本会自动完成以下操作：
1. ✅ 检查 Node.js 是否已安装
2. ✅ 安装前端依赖（如未找到 `node_modules`）
3. ✅ 安装后端依赖（如未找到 `api/node_modules`）
4. ✅ 启动后端 API 服务（端口 **3001**）
5. ✅ 启动前端开发服务器（端口 **5173**）

#### 手动启动

如需手动启动服务：

```bash
# 终端 1：启动后端 API 服务 (端口 3001)
cd api
npm install
npm run dev

# 终端 2：启动前端开发服务器 (端口 5173)
npm install
npm run dev
```

#### 日志查看

使用启动脚本时，日志文件保存在 `logs/` 目录：
- `logs/api.log` — 后端服务日志
- `logs/frontend.log` — 前端服务日志

---

### 方式二：Docker 启动（生产模式）

此方式将整个应用运行在 Docker 容器中，适合生产部署或快速预览。

#### 环境要求
- [Docker](https://www.docker.com/) >= 20.10
- [Docker Compose](https://docs.docker.com/compose/) >= 2.0

#### 快速启动

```bash
# 构建并启动所有服务
docker compose up -d --build

# 查看运行中的容器
docker compose ps

# 查看日志
docker compose logs -f

# 停止所有服务
docker compose down
```

#### Docker 架构说明

Docker Compose 配置了两个服务：

| 服务 | 容器名 | 端口 | 说明 |
|------|--------|------|------|
| `api` | website-api | 3001 | 后端 API 服务 (Express + SQLite) |
| `frontend` | website-frontend | 80 | 前端静态文件 (Nginx) |

```
┌─────────────────────────────────────────┐
│              Docker 网络                  │
│                                          │
│  ┌──────────────┐    ┌───────────────┐  │
│  │   frontend   │    │      api      │  │
│  │  (Nginx:80)  │───▶│ (Express:3001)│  │
│  └──────────────┘    └───────────────┘  │
│         │                     │          │
│         ▼                     ▼          │
│    localhost:80        /uploads/*         │
│                      database.sqlite     │
└─────────────────────────────────────────┘
```

#### 数据卷挂载

以下目录/文件会挂载到 `api` 容器中，确保数据持久化：
- `./uploads` → `/app/uploads` — 上传的图片
- `./database.sqlite` → `/app/database.sqlite` — SQLite 数据库

#### Docker 常用命令

```bash
# 仅构建镜像（不启动）
docker compose build

# 后台启动服务
docker compose up -d

# 启动服务并实时查看日志
docker compose up

# 重启某个服务
docker compose restart api

# 查看资源占用
docker compose top

# 停止并删除容器
docker compose down

# 停止并删除容器 + 数据卷（⚠️ 会删除数据）
docker compose down -v
```

#### 生产部署注意事项

1. **先构建前端**：运行 `npm run build` 生成 `dist/` 目录
2. **环境变量**：已配置 `NODE_ENV=production`（在 docker-compose.yml 中）
3. **反向代理**：Nginx 配置已自动处理 API 代理
4. **数据备份**：定期备份 `database.sqlite` 和 `uploads/` 目录

---

### 访问地址

| 页面 | URL |
|------|-----|
| 前端网站 | http://localhost:5173（脚本）/ http://localhost（Docker） |
| 后台管理 | http://localhost:5173/admin/login（脚本）/ http://localhost/admin/login（Docker） |
| 后端 API | http://localhost:3001 |

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
