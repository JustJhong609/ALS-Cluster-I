# ALS Cluster 1 - React Website

A modern, dynamic React application for the Alternative Learning System (ALS) Cluster 1 in Bukidnon, Philippines.

## Features

- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Dynamic Content**: Integration with Supabase for dynamic data management
- **Interactive Components**: Smooth scrolling, mobile navigation, contact forms
- **Modern UI**: Clean, professional design with ALS branding
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service for data management
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd als-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Supabase Database Schema

The application expects the following tables in your Supabase database:

### Announcements Table
```sql
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Teachers Table
```sql
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  experience TEXT,
  specialization TEXT,
  image VARCHAR(255),
  email VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Materials Table
```sql
CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50) NOT NULL, -- 'elementary' or 'secondary'
  download_url VARCHAR(255),
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation component
│   ├── Hero.jsx        # Hero section
│   ├── Announcements.jsx # Dynamic announcements
│   ├── About.jsx       # About section with team
│   ├── Materials.jsx   # Learning materials
│   ├── Forms.jsx       # Google Forms section
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer component
│   └── BackToTop.jsx   # Back to top button
├── lib/
│   └── supabase.js     # Supabase configuration
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles with Tailwind
```

## Customization

### Colors
The app uses custom ALS colors defined in `tailwind.config.js`:
- `als-blue`: Primary blue colors
- `als-yellow`: Accent yellow colors  
- `als-red`: Accent red for headings

### Images
Replace the images in the `public/` folder:
- `ALSLOGO.png` - ALS logo
- `BUKIDNONOLOGO.png` - Bukidnon logo
- `alsbac.jpg` - Hero background image
- `SIRgigi2.jpg` - Teacher photo

## Deployment

The application can be deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **Firebase Hosting**: Use Firebase CLI to deploy

Remember to set your environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
