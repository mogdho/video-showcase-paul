<h1 align="center">Paul's Video Showcase</h1>

<p align="center">
  <em>A sleek, modern portfolio website for showcasing video editing work — built with ❤️ using <a href="https://lovable.dev">Lovable AI</a></em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/My%201st-Lovable%20AI%20Project-ff69b4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+" alt="1st Lovable AI Project" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <a href="https://github.com/mogdho/video-showcase-paul">
    <img src="https://img.shields.io/badge/View%20on-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

---

## ✨ About

**Paul's Video Showcase** is a fully dynamic, single-page portfolio website designed to showcase video editing work in a cinematic, visually immersive style. It features smooth animations, a particle background, scroll-reveal effects, and a dark premium aesthetic.

> 🎉 **This is my very first project built with [Lovable AI](https://lovable.dev)** — an AI-powered full-stack development platform that lets you build production-ready web apps through natural language prompts.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🎬 **Video Grid** | Showcase your best video work in a responsive, filterable grid layout |
| 🎥 **Showreel Section** | Highlight your showreel with a dedicated, cinematic presentation |
| 🌟 **Hero Section** | Eye-catching animated hero with dynamic text and call-to-action |
| 💡 **Skills Section** | Display your editing skills and expertise with visual flair |
| 💬 **Reviews Section** | Client testimonials and reviews carousel |
| 📊 **Stats Display** | Animated counters for key metrics (projects, clients, etc.) |
| ✨ **Particle Background** | Immersive floating particle animation across the site |
| 📱 **Fully Responsive** | Looks great on desktop, tablet, and mobile |
| 🔒 **DevTools Protection** | Built-in anti-inspect and console-disable protections |
| 🎨 **Smooth Animations** | Powered by Framer Motion with scroll-reveal effects |

---

## 🛠️ Dedicated Admin Panel

One of the standout features of this project is the **fully-featured admin panel** accessible at `/admin`. It gives you complete control over **every element** of the website — no code changes needed.

### Admin Panel Managers:

| Manager | What You Can Control |
|---|---|
| 🎬 **Hero Manager** | Hero title, subtitle, background video/image, CTA buttons |
| 🎥 **Video Manager** | Add, edit, remove, and reorder showcase videos |
| 🎞️ **Showreel Manager** | Update the featured showreel video and description |
| 💡 **Skills Manager** | Manage the skills section — add/edit/remove skills |
| 💬 **Reviews Manager** | Manage client testimonials and review cards |
| 📊 **Stats Manager** | Edit the animated stats counters and their values |
| 🔗 **Links Manager** | Update social media links and external URLs |

> All content is stored in **Supabase** and updates reflect on the live site in real-time.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type-safe JavaScript |
| [Vite](https://vitejs.dev) | Lightning-fast build tool |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com) | Beautifully designed UI components |
| [Framer Motion](https://www.framer.com/motion) | Smooth animations & transitions |
| [Supabase](https://supabase.com) | Backend-as-a-Service (database + auth) |
| [React Router](https://reactrouter.com) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Data fetching & caching |
| [Lucide React](https://lucide.dev) | Beautiful icon library |
| [Recharts](https://recharts.org) | Data visualization |
| [Lovable AI](https://lovable.dev) | AI-powered development platform |

---

## 📂 Project Structure

```
video-showcase-paul/
├── public/                     # Static assets (favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── admin/              # Admin panel managers
│   │   │   ├── HeroManager     # Manage hero section content
│   │   │   ├── VideoManager    # Manage video grid entries
│   │   │   ├── ShowreelManager # Manage showreel section
│   │   │   ├── SkillsManager   # Manage skills display
│   │   │   ├── ReviewsManager  # Manage client reviews
│   │   │   ├── StatsManager    # Manage stat counters
│   │   │   └── LinksManager    # Manage social/external links
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── HeroSection         # Animated hero section
│   │   ├── VideoGrid           # Video showcase grid
│   │   ├── ShowreelSection     # Featured showreel
│   │   ├── SkillsSection       # Skills & expertise
│   │   ├── ReviewsSection      # Client testimonials
│   │   ├── AboutSection        # About info
│   │   ├── Navbar              # Navigation bar
│   │   ├── Footer              # Site footer
│   │   ├── ParticleBackground  # Floating particles effect
│   │   ├── LoadingScreen       # Animated loading screen
│   │   └── ScrollReveal        # Scroll-triggered animations
│   ├── hooks/                  # Custom React hooks
│   ├── integrations/           # Supabase client & types
│   ├── lib/                    # Utility functions
│   ├── pages/
│   │   ├── Index               # Main showcase page
│   │   ├── AdminPanel          # Admin dashboard
│   │   └── NotFound            # 404 page
│   ├── App.tsx                 # Root app with routing
│   └── main.tsx                # Entry point
├── supabase/                   # Supabase migrations & config
├── index.html                  # HTML entry with protections
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies & scripts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v18+) — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mogdho/video-showcase-paul.git

# Navigate to the project directory
cd video-showcase-paul

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173` 🎉

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run tests |

---

## 🌐 Deployment

This project is configured for **Vercel** deployment (see `vercel.json`). Simply connect your GitHub repository to Vercel for automatic deployments on every push.

You can also deploy via [Lovable](https://lovable.dev) by clicking **Share → Publish**.

---

## 📜 License

This project is open source and available for personal use and learning.

---

<p align="center">
  Built with ❤️ by <strong>Paul</strong> using <a href="https://lovable.dev">Lovable AI</a>
</p>
