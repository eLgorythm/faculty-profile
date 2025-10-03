# Getting Started with Faculty Website

## Project Overview

This is a complete faculty website application built with React, TailwindCSS, and Supabase, featuring:

- **Public pages**: Home, Profil, Program Studi, Berita, and Kontak
- **Admin dashboard**: Full CRUD management for content
- **Authentication**: Secure login system with Supabase Auth
- **Database**: PostgreSQL with Row Level Security via Supabase

## Quick Start

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### 3. Create an Admin Account

To access the admin dashboard at `/admin`, you need to create a user account.

**Option A: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add User" and create credentials

**Option B: Programmatically (Recommended)**

Create a temporary signup page or use the browser console on `/login`:

```javascript
// In browser console on the login page
import { supabase } from './src/lib/supabase';

await supabase.auth.signUp({
  email: 'admin@example.com',
  password: 'yourSecurePassword123'
});
```

**Option C: Add signup functionality temporarily**

Add this to the Login page temporarily:
- A "Sign Up" button that calls `signUp(email, password)` from AuthContext
- After creating account, remove the signup functionality

### 4. Access the Admin Panel

1. Visit `http://localhost:5173/login`
2. Enter your credentials
3. You'll be redirected to `/admin`

## Features Overview

### Public Pages

- **Home (/)**: Hero section, Visi & Misi, Program Studi grid, latest news
- **Profil (/profil)**: Faculty profile with Visi, Misi, Struktur Organisasi, Akreditasi
- **Program Studi (/prodi)**: List all study programs
- **Berita (/berita)**: Paginated news with detail pages
- **Kontak (/kontak)**: Contact form (submissions saved to database)

### Admin Dashboard (/admin)

- **Dashboard**: Overview statistics
- **Berita Management**: Create, edit, delete news articles
- **Prodi Management**: Manage study programs
- **Profil Fakultas**: Edit faculty information
- **Users**: View registered users

## Sample Data

The database has been pre-populated with:
- 1 Profil Fakultas entry
- 4 Program Studi (Teknik Informatika, Sistem Informasi, Teknik Komputer, Desain Komunikasi Visual)
- 5 Berita articles

## Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: TailwindCSS 3
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Card.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── contexts/         # React contexts
│   └── AuthContext.jsx
├── layouts/          # Layout wrappers
│   ├── PublicLayout.jsx
│   └── AdminLayout.jsx
├── lib/             # Library configs
│   └── supabase.js
├── pages/           # Page components
│   ├── admin/       # Admin pages
│   │   ├── Dashboard.jsx
│   │   ├── BeritaAdmin.jsx
│   │   ├── ProdiAdmin.jsx
│   │   ├── ProfilAdmin.jsx
│   │   └── UsersAdmin.jsx
│   ├── Home.jsx
│   ├── Profil.jsx
│   ├── Prodi.jsx
│   ├── Berita.jsx
│   ├── BeritaDetail.jsx
│   ├── Kontak.jsx
│   └── Login.jsx
├── App.jsx          # Main app with routes
└── main.jsx         # Entry point
```

## Customization

### Colors
Edit `tailwind.config.js` to change the primary color scheme (currently dark blue).

### Content
Use the admin dashboard to manage:
- Faculty profile information
- Study programs
- News articles

## Security Notes

- All tables have Row Level Security (RLS) enabled
- Public content is readable by anyone
- Authenticated users can manage content
- Contact form submissions require no authentication

## Support

For issues or questions, refer to the documentation:
- React: https://react.dev
- TailwindCSS: https://tailwindcss.com
- Supabase: https://supabase.com/docs
