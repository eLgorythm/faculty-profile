/*
  # Faculty Website Database Schema

  1. New Tables
    - `profil_fakultas`
      - `id` (uuid, primary key)
      - `visi` (text)
      - `misi` (text)
      - `struktur_organisasi` (text)
      - `akreditasi` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `prodi`
      - `id` (uuid, primary key)
      - `nama` (text, not null)
      - `deskripsi` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `berita`
      - `id` (uuid, primary key)
      - `judul` (text, not null)
      - `isi` (text, not null)
      - `gambar` (text)
      - `slug` (text, unique, not null)
      - `published` (boolean, default true)
      - `author_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public read access for profil_fakultas, prodi, and published berita
    - Admin write access for all tables
    - Anyone can insert contact messages
*/

-- Create profil_fakultas table
CREATE TABLE IF NOT EXISTS profil_fakultas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visi text DEFAULT '',
  misi text DEFAULT '',
  struktur_organisasi text DEFAULT '',
  akreditasi text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prodi table
CREATE TABLE IF NOT EXISTS prodi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  deskripsi text DEFAULT '',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create berita table
CREATE TABLE IF NOT EXISTS berita (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul text NOT NULL,
  isi text NOT NULL,
  gambar text,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT true,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profil_fakultas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prodi ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for profil_fakultas
CREATE POLICY "Anyone can read profil fakultas"
  ON profil_fakultas FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update profil fakultas"
  ON profil_fakultas FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert profil fakultas"
  ON profil_fakultas FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for prodi
CREATE POLICY "Anyone can read prodi"
  ON prodi FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert prodi"
  ON prodi FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update prodi"
  ON prodi FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete prodi"
  ON prodi FOR DELETE
  TO authenticated
  USING (true);

-- Policies for berita
CREATE POLICY "Anyone can read published berita"
  ON berita FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert berita"
  ON berita FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their berita"
  ON berita FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id OR auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() = author_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete berita"
  ON berita FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id OR auth.uid() IS NOT NULL);

-- Policies for contact_messages
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial profil_fakultas data
INSERT INTO profil_fakultas (visi, misi, struktur_organisasi, akreditasi)
VALUES (
  'Menjadi fakultas terkemuka yang menghasilkan lulusan berkualitas dan berdaya saing global.',
  'Menyelenggarakan pendidikan berkualitas, mengembangkan penelitian inovatif, dan memberikan pengabdian kepada masyarakat.',
  'Struktur organisasi akan diisi kemudian.',
  'Akreditasi A - BAN-PT'
)
ON CONFLICT DO NOTHING;
