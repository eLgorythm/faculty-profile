# Banner Hero Slider Feature

## Overview

The faculty website now includes a full-width hero banner slider on the homepage with auto-sliding functionality and a clean admin interface for management.

## Public-Facing Features

### Hero Banner Slider
- **Location**: Homepage top section
- **Display**: Full-width (100% viewport width), 500px height
- **Text Overlay**:
  - "Program Studi Teknik Informatika" (main heading)
  - "Mencetak lulusan berkualitas dan berdaya saing global di era digital" (subtitle)
- **Auto-Slide**: Changes every 5 seconds automatically
- **Pause on Hover**: Stops sliding when mouse is over the banner
- **Navigation**:
  - Left/Right arrow buttons for manual navigation
  - Dot indicators at the bottom showing current slide
- **Image Overlay**: Dark gradient overlay (40% opacity) for better text readability
- **Smooth Transitions**: 1-second fade effect between slides

## Admin Features

### Access
Navigate to `/admin/banner` in the admin dashboard or click "Banner Hero" in the sidebar menu.

### Banner Management Interface

#### Adding New Banner
1. Click "Tambah Banner" button
2. Fill in the form:
   - **URL Gambar** (required): Enter the full URL of the banner image
   - **Preview**: Live preview of the image appears automatically
   - **Judul** (optional): Internal reference name for the banner
   - **Urutan**: Display order (lower numbers show first)
   - **Aktifkan banner**: Check to make banner visible on the website
3. Click "Simpan" to save

#### Managing Existing Banners
Each banner card displays:
- Banner image preview
- Status badge (Aktif/Nonaktif)
- Title and order index
- Action buttons:
  - **Eye icon**: Toggle active/inactive status
  - **Up/Down arrows**: Reorder banners
  - **Edit**: Modify banner details
  - **Hapus**: Delete banner

#### Banner Display Rules
- Only active banners are shown on the public website
- Banners are displayed in order of `order_index` (ascending)
- If no banners exist, a default gradient background with text is shown

## Technical Details

### Database Schema

**Table**: `banners`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| image_url | text | URL of the banner image (required) |
| title | text | Optional title for admin reference |
| order_index | integer | Display order (default: 0) |
| is_active | boolean | Active status (default: true) |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### Security (Row Level Security)

**Public Access**:
- Anyone can read active banners (`is_active = true`)

**Authenticated Access**:
- Can read all banners (including inactive)
- Can insert, update, and delete banners

### Components

**BannerSlider** (`src/components/BannerSlider.jsx`):
- Fetches active banners from database
- Implements auto-slide functionality
- Handles manual navigation
- Responsive design with mobile support

**BannerAdmin** (`src/pages/admin/BannerAdmin.jsx`):
- Full CRUD operations for banner management
- Image preview functionality
- Drag-and-drop style ordering
- Active/inactive toggle

## Recommended Image Specifications

For best results, use images with the following specifications:

- **Minimum Resolution**: 1920x500px
- **Aspect Ratio**: 3.84:1 (wide format)
- **Format**: JPG or PNG
- **File Size**: Optimized for web (under 500KB recommended)
- **Content**: Ensure important content is centered, as text overlays the center

## Usage Tips

1. **Image Sources**:
   - Use high-quality stock photos from Pexels, Unsplash, or similar
   - Ensure you have rights to use the images
   - Upload images to a CDN or image hosting service

2. **Number of Banners**:
   - Recommended: 3-5 active banners
   - Too many can slow down the page
   - Too few may look repetitive

3. **Content Placement**:
   - Keep important visual elements centered
   - Avoid placing critical content at the edges
   - Test on mobile devices to ensure text remains readable

4. **Order Management**:
   - Set `order_index` starting from 1, 2, 3, etc.
   - Or use the up/down arrows to reorder visually

5. **Testing**:
   - Always preview banners before activating
   - Check on different screen sizes
   - Ensure text contrast is sufficient

## Fallback Behavior

If no active banners exist:
- A default gradient background is displayed (primary-700 to primary-600)
- The same text overlay is shown
- No loading errors or blank spaces

## Sample Banner URLs

The database is pre-populated with 3 sample banners:
1. `https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1920`
2. `https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1920`
3. `https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920`

## Troubleshooting

**Banner not showing:**
- Check if `is_active` is set to `true`
- Verify the image URL is valid and accessible
- Check browser console for errors

**Images loading slowly:**
- Use optimized images (compress before uploading)
- Consider using a CDN
- Use appropriate image formats

**Text not readable:**
- The component applies a 40% dark overlay automatically
- Ensure images aren't too light in the center
- Consider using images with darker tones

**Auto-slide not working:**
- Check if JavaScript is enabled
- Verify no console errors
- Try refreshing the page

## Future Enhancements

Potential features for future development:
- Image upload directly to Supabase Storage
- Caption/description fields for each banner
- Link/CTA button support on banners
- Animation style options
- Slide duration customization
- Mobile-specific images
