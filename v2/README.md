# ALS Cluster I - Version 2.0

Modern, responsive website for the Alternative Learning System (ALS) Cluster I in Bukidnon, Philippines.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Database/Auth:** Supabase (prepared for future implementation)

## 📁 Project Structure

```
v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx      # Navigation with glassmorphism
│   │   │   └── Footer.tsx      # Footer component
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx        # Hero with parallax
│   │   │   ├── VideoIntro.tsx  # Video introduction
│   │   │   ├── About.tsx       # About with accordion
│   │   │   ├── Team.tsx        # Team with filters
│   │   │   ├── Materials.tsx   # Materials bento grid
│   │   │   ├── Passers.tsx     # Timeline of passers
│   │   │   └── Contact.tsx     # Contact form
│   │   └── ui/                 # Reusable UI components
│   │       └── ScrollToTop.tsx
│   ├── constants/              # Static data
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── index.ts
│   ├── lib/                    # External libraries setup
│   │   └── supabase.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   └── utils/                  # Utility functions
│       ├── animations.ts       # Framer Motion variants
│       └── helpers.ts          # Helper functions
├── public/
│   └── images/                 # Static images
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Navigate to the v2 directory:
   ```bash
   cd v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. (Optional) Add your Supabase credentials to `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Colors (DepEd Theme)

- **Primary Blue:** `#1e3a8a` - Main brand color
- **Accent Gold:** `#f9a826` - Highlights and CTAs
- **DepEd Red:** `#b91c1c` - Secondary accent

### Typography

- **Headings:** Poppins (font-heading)
- **Body:** Inter (font-sans)

### Components

- **Glassmorphism:** Used in navbar and cards
- **Bento Grid:** Materials section layout
- **Cards with Hover Lift:** Team and material cards

## 📱 Features

1. **Responsive Design** - Mobile-first approach
2. **Smooth Animations** - Scroll reveals and transitions
3. **Parallax Hero** - Immersive hero section
4. **Auto-hide Navbar** - Hides on scroll down, reveals on scroll up
5. **Accordion FAQ** - Interactive about section
6. **Tabbed Filtering** - Team and materials filtering
7. **Timeline View** - ALS passers timeline
8. **Contact Form** - Ready for Supabase integration
9. **Protected Downloads** - Login required to download materials
10. **Collapsible Team Section** - "See All Teachers" toggle

## 🚀 Vercel Deployment

### Quick Deploy

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Set the **Root Directory** to `v2`
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://certnmtfowqvnoajwlgx.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## 🔮 Future Enhancements

- [ ] Supabase authentication (backend)
- [ ] Admin dashboard
- [ ] Contact form backend
- [ ] Real-time team data
- [ ] Blog/News section
- [ ] Dark mode toggle

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Check TypeScript types
```

## 👨‍💻 Developer

Website designed and developed by [Jhong](https://github.com/JustJhong609)

## 📄 License

© 2025 Alternative Learning System - Bukidnon Cluster I. All rights reserved.
