# Faculty Website - Fakultas Teknologi Informasi

A modern, minimalistic faculty website built with React, TailwindCSS, and Supabase.

## Features

### Public Pages
- **Home**: Hero section with faculty information, Visi & Misi, Program Studi grid, and latest news
- **Profil**: Complete faculty profile including Visi, Misi, Struktur Organisasi, and Akreditasi
- **Program Studi**: Grid display of all study programs with descriptions
- **Berita**: Paginated news list with detail views
- **Kontak**: Contact form for visitor inquiries

### Admin Dashboard
- **Authentication**: Secure login system using Supabase Auth
- **Dashboard**: Statistics overview (Total Berita, Prodi, Users, Messages)
- **Berita Management**: Full CRUD operations for news articles
- **Prodi Management**: Full CRUD operations for study programs
- **Profil Fakultas**: Edit faculty profile information
- **User Management**: View registered users

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom primary color theme
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. The `.env` file is already configured with Supabase credentials

4. Run development server:
   ```bash
   npm run dev
   ```

## Creating an Admin Account

To access the admin dashboard, you need to create an account:

1. Use Supabase dashboard or run this SQL in Supabase SQL Editor:
   ```sql
   -- This will be done automatically via Supabase Auth signup
   ```

2. Or create account programmatically by temporarily enabling signup in the app

3. Default demo credentials (you need to create this user first):
   - Email: admin@example.com
   - Password: password123

## Database Schema

The application uses the following tables:

- `profil_fakultas`: Faculty profile information
- `prodi`: Study programs
- `berita`: News articles
- `contact_messages`: Contact form submissions

All tables have Row Level Security (RLS) enabled for data protection.

## Project Structure

```
src/
├── components/       # Reusable components (Card, Navbar, Footer, etc.)
├── contexts/         # React contexts (AuthContext)
├── layouts/          # Layout components (PublicLayout, AdminLayout)
├── lib/             # Library configurations (Supabase client)
├── pages/           # Page components
│   ├── admin/       # Admin dashboard pages
│   └── ...          # Public pages
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Design Features

- Clean, minimalistic design with dark blue & white primary colors
- Fully responsive for mobile, tablet, and desktop
- Modern dashboard layout with sidebar for admin
- Smooth transitions and hover effects
- Professional card-based layouts
- Accessible form inputs with TailwindCSS forms plugin

## Admin Features

### Berita Management
- Create, edit, and delete news articles
- Auto-generate URL slugs from titles
- Image URL support
- Published/Draft status toggle
- Rich preview with publication date

### Prodi Management
- Add, edit, and delete study programs
- Support for program images
- Detailed descriptions

### Profil Fakultas
- Edit Visi, Misi, Struktur Organisasi, and Akreditasi
- Single-page editing with auto-save

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for published content
- Authenticated write access for admin
- Protected admin routes
- Secure authentication with Supabase

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

This project is created for educational purposes.
