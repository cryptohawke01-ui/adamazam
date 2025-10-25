# Adam Azam Website - SERN Stack

A modern website for Adam Muhammad Azam with an admin panel for content management, built using Supabase, Express.js, React, and Node.js.

## Features

- **Modern Dark Theme**: Solid black background with white text and blue accents
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Admin Panel**: WordPress-style content management system
- **Dynamic Content**: All content managed through Supabase database
- **Menu Management**: Dynamic navigation menu with admin controls
- **Authentication**: Secure admin login system
- **Image Integration**: GitHub-hosted images for author and book

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens
- **Styling**: Styled Components
- **State Management**: React Query
- **Deployment**: Vercel

## Project Structure

```
adamazam-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # Global styles
├── server/                 # Express backend
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   └── index.js           # Server entry point
├── database/               # Database schema
└── vercel.json            # Deployment config
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### 2. Clone and Install

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Get your project URL and API keys

### 4. Environment Variables

Create `server/.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Create `client/.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Development

```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run server  # Backend only
npm run client  # Frontend only
```

### 6. Production Build

```bash
npm run build
```

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### 3. Environment Variables in Vercel

Add these environment variables in your Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `NODE_ENV=production`

## Admin Panel

### Access
- URL: `/admin/login`
- Default admin user will need to be created through the registration endpoint

### Features
- **Dashboard**: Overview of content and menu items
- **Content Management**: Create, edit, delete website content
- **Menu Management**: Manage navigation menu items
- **Authentication**: Secure login system

### Creating Admin User

Use the registration endpoint to create the first admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@adamazam.com",
    "password": "your_password",
    "name": "Admin User"
  }'
```

## Website Pages

- **Home**: Hero section with author image and book cover
- **About The Book**: Book information and description
- **About The Author**: Author biography and achievements
- **Blog**: Coming soon section
- **Contact**: Contact form and information

## Images

The website uses GitHub-hosted images:
- Author Image: `https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/author_new_img.jpg?raw=true`
- Book Cover: `https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/book-mock-467x800.png?raw=true`
- Logo: `https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/logo.png?raw=true`

## API Endpoints

### Public Endpoints
- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific content section
- `GET /api/content/menu/items` - Get menu items

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration
- `GET /api/auth/me` - Get current user
- `GET /api/admin/content` - Get all content (admin)
- `POST /api/admin/content` - Create content
- `PUT /api/admin/content/:id` - Update content
- `DELETE /api/admin/content/:id` - Delete content
- `GET /api/admin/menu` - Get menu items (admin)
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details