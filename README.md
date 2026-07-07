# AI Portfolio Website

A modern personal portfolio website with a complete CMS admin system.

[简体中文](./README.zh-CN.md)

## Preview

![Website Demo](./public/小柠AI-07-07-2026_09_32_PM.png)

<p align="center"><em>Website running demo</em></p>

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Icons**: Lucide React
- **Rich Text Editor**: Tiptap

### Backend
- **Framework**: Express + TypeScript
- **Database**: SQLite (Drizzle ORM)
- **Authentication**: JWT
- **Image Processing**: Multer

## Features

### Frontend Display
- ✅ Responsive design for mobile and desktop
- ✅ Theme switching (dark/light mode)
- ✅ Navigation: Home, About, Portfolio, Skills, Certificates, Articles, Contact
- ✅ Portfolio showcase: card layout with click-to-view details
- ✅ Certificate display: modal preview with scrollable content
- ✅ Article display: rich text content rendering
- ✅ Contact info: QR codes and social links

### CMS Admin
- ✅ Admin login authentication
- ✅ Content management: CRUD for portfolio, skills, certificates, articles
- ✅ Rich text editor: formatting, headings, lists, image upload, hyperlinks
- ✅ Tag management
- ✅ Site settings: site name, logo, avatar, contact info, etc.
- ✅ Password change functionality

## Project Structure

```
website/
├── api/                    # Backend API
│   ├── src/
│   │   ├── controllers/    # Controllers
│   │   ├── routes/         # Routes
│   │   ├── middleware/     # Middleware
│   │   ├── schemas/        # Database models
│   │   └── db/             # Database config & migrations
│   └── dist/               # Build output
├── src/                    # Frontend source
│   ├── admin/              # Admin pages
│   ├── components/         # Shared components
│   ├── pages/              # Frontend pages
│   ├── api/                # API client
│   ├── context/            # React Context
│   ├── store/              # Zustand state management
│   └── utils/              # Utility functions
├── uploads/                # Image upload directory
├── database.sqlite         # SQLite database file
└── public/                 # Static assets
```

## Getting Started

There are two ways to run this project: **Script Mode** or **Docker Mode**.

---

### Method 1: Script Mode (Development)

This method runs the frontend and backend services directly on your machine, suitable for development and debugging.

#### Prerequisites
- Node.js >= 20
- npm or pnpm

#### Quick Start

The `scripts/` directory provides startup and shutdown scripts for both Windows and Linux/macOS:

**Windows:**
```bash
# Start services
scripts\start.bat

# Stop services
scripts\stop.bat
```

**Linux / macOS:**
```bash
# Start services (make scripts executable first)
chmod +x scripts/*.sh
./scripts/start.sh

# Stop services
./scripts/stop.sh
```

#### What the Script Does

The startup script automatically handles:
1. ✅ Checks if Node.js is installed
2. ✅ Installs frontend dependencies (if `node_modules` not found)
3. ✅ Installs backend dependencies (if `api/node_modules` not found)
4. ✅ Starts backend API service on port **3001**
5. ✅ Starts frontend dev server on port **5173**

#### Manual Start

If you prefer to start services manually:

```bash
# Terminal 1: Start backend API server (port 3001)
cd api
npm install
npm run dev

# Terminal 2: Start frontend dev server (port 5173)
npm install
npm run dev
```

#### Logs

When using the startup script, logs are saved to the `logs/` directory:
- `logs/api.log` — Backend service logs
- `logs/frontend.log` — Frontend service logs

---

### Method 2: Docker Mode (Production)

This method runs the entire application in Docker containers, suitable for production deployment or quick preview.

#### Prerequisites
- [Docker](https://www.docker.com/) >= 20.10
- [Docker Compose](https://docs.docker.com/compose/) >= 2.0

#### Quick Start

```bash
# Build and start all services
docker compose up -d --build

# View running containers
docker compose ps

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

#### Docker Architecture

The Docker Compose configuration defines two services:

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| `api` | website-api | 3001 | Backend API server (Express + SQLite) |
| `frontend` | website-frontend | 80 | Frontend static files (Nginx) |

```
┌─────────────────────────────────────────┐
│              Docker Network              │
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

#### Docker Volumes

The following directories/files are mounted into the `api` container for data persistence:
- `./uploads` → `/app/uploads` — Uploaded images
- `./database.sqlite` → `/app/database.sqlite` — SQLite database

#### Docker Commands Reference

```bash
# Build images only (without starting)
docker compose build

# Start services in background
docker compose up -d

# Start services and view logs in real-time
docker compose up

# Restart a specific service
docker compose restart api

# View resource usage
docker compose top

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (⚠️ deletes data)
docker compose down -v
```

#### Production Deployment Notes

For production use, consider:
1. **Build frontend first**: Run `npm run build` to generate the `dist/` directory
2. **Environment variables**: Configure `NODE_ENV=production` (already set in docker-compose.yml)
3. **Reverse proxy**: The Nginx config handles API proxying automatically
4. **Data backup**: Regularly backup `database.sqlite` and `uploads/` directory

---

### Access URLs

| Page | URL |
|------|-----|
| Frontend Website | http://localhost:5173 (script) / http://localhost (docker) |
| Admin Panel | http://localhost:5173/admin/login (script) / http://localhost/admin/login (docker) |
| Backend API | http://localhost:3001 |

## Database

The database is a single SQLite file located at the project root: `database.sqlite`

### Tables
- `content` - Content table (portfolio, skills, certificates, articles)
- `setting` - Settings table (site configuration)
- `tag` - Tags table
- `admin_user` - Admin users table

### Database Operations

```bash
# Generate migration files
cd api
npx drizzle-kit generate

# Run migrations
npx drizzle-kit push

# View database
# Use SQLiteStudio, DB Browser for SQLite, or similar tools to open database.sqlite
```

## Deployment

### Frontend Build

```bash
npm run build
```

Build output is in the `dist/` directory.

### Backend Build

```bash
cd api
npm run build
```

## Development Notes

### Proxy Configuration
The frontend uses Vite proxy to forward `/api` requests to the backend at `http://localhost:3001`.

### Image Upload
Uploaded images are stored in the `uploads/` directory and accessible via `/uploads/xxx.png`.

### Global Settings
Site name, logo, contact info and other global settings are managed through the CMS admin "Site Settings" page, stored in the `setting` table.

## License

MIT
