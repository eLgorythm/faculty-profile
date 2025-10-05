/*
  # Create Banners Table for Hero Slider

  1. New Tables
    - `banners`
      - `id` (uuid, primary key)
      - `image_url` (text, not null) - URL of the banner image
      - `title` (text) - Optional title for the banner
      - `order_index` (integer, default 0) - Sort order for banners
      - `is_active` (boolean, default true) - Active/inactive status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on banners table
    - Public read access for active banners
    - Authenticated users can manage banners (insert, update, delete)

  3. Notes
    - Banners will be displayed in order of `order_index`
    - Only active banners will be shown on the public website
*/

-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text DEFAULT '',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Policies for banners
CREATE POLICY "Anyone can read active banners"
  ON banners FOR SELECT
  USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert banners"
  ON banners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update banners"
  ON banners FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete banners"
  ON banners FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample banner data
INSERT INTO banners (image_url, title, order_index, is_active) VALUES
('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Banner 1', 1, true),
('https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Banner 2', 2, true),
('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Banner 3', 3, true)
ON CONFLICT DO NOTHING;
