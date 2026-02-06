# Cave Wall

A beautiful and responsive wallpaper gallery application that allows users to browse, view, and upload wallpapers stored in the cloud.

## Features

- **Responsive Grid Layout**: Displays wallpapers in an adaptive grid that adjusts based on screen size (1 column on mobile, up to 6 columns on large screens)
- **Image Preview**: Hover over any wallpaper to reveal a "View Fullscreen" button for detailed viewing
- **Cloud Storage**: Securely stores uploaded wallpapers using Supabase storage
- **Upload Functionality**: Easy drag-and-drop or file selection for adding new wallpapers
- **Modal System**: Clean modal interface for both image previews and upload forms
- **Real-time Updates**: Automatically fetches and displays newly added wallpapers

## Dependencies & Their Purpose

### Core Libraries
- **React 19**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Zustand**: Lightweight state management solution

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Tailwind Merge & CLSX**: Utilities for conditionally joining Tailwind CSS classes
- **Lucide React**: Beautiful icon library for UI elements
- **Class Variance Authority**: Utility for managing component variants
- **tw-animate-css**: Animation utilities for enhanced user experience

### Backend Integration
- **Supabase JS**: Real-time database and authentication service client
- **@supabase/supabase-js**: Official Supabase client library for JavaScript

### Development Tools
- **ESLint**: Code linting and quality assurance
- **@types/node, @types/react, @types/react-dom**: TypeScript definitions for development
- **@vitejs/plugin-react**: Vite plugin for React support with Fast Refresh

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd caveWalls
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173` to view the application

## How to Use

- **Browse Wallpapers**: View all uploaded wallpapers in the responsive grid layout
- **Preview Fullscreen**: Click "View Fullscreen" when hovering over any wallpaper
- **Upload New Wallpaper**: Click the "+" button in the bottom-right corner to add new wallpapers
- **Image Preview**: Uploaded images are automatically displayed in the gallery

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Library configurations (Supabase client)
├── pages/         # Page-level components
├── store/         # Global state management (Zustand)
```

## Technologies Used

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom utilities