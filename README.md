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

### Prerequisites
- Node.js >= 20
- pnpm >= 10

### Installation

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd api
pnpm install
cd ..
```

### Running the App

```bash
# Start backend API server (port 3001)
cd api
npm run dev

# Start frontend dev server (port 5173)
npm run dev
```

### Access URLs
- Frontend: http://localhost:5173
- Admin Panel: http://localhost:5173/admin/login

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
