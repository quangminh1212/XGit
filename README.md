# XGit - GitHub Portfolio Builder

Transform your GitHub profile into a stunning developer portfolio. Login with GitHub, customize everything, and share your work with the world.

## ✨ Features

- **🔐 GitHub OAuth** - One-click sign-in with GitHub
- **🎨 6 Themes** - Midnight, Aurora, Sunset, Ocean, Forest, or fully custom
- **📝 5 Templates** - Developer, Designer, Minimal, Creative, or Custom Code
- **💻 Custom Code Editor** - Write HTML/CSS/JS for full control
- **🌍 10+ Languages** - EN, VI, JA, KO, ZH, FR, DE, ES, PT, RU
- **📊 Auto Language Stats** - Detected from your repos
- **⭐ Featured Projects** - Handpick repos to showcase
- **🔍 SEO Optimized** - Meta tags, OG images, structured data
- **📱 Responsive** - Looks great on all devices
- **🚀 Instant Publish** - One click to go live

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm
- A GitHub OAuth App

### Setup GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - Application name: `XGit`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret

### Installation

```bash
cd xgit-app
npm install
```

### Configuration

Edit `.env.local` and fill in your GitHub OAuth credentials:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
AUTH_SECRET=generate_random_secret_here
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
xgit-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth handlers
│   │   │   ├── github/              # GitHub data API
│   │   │   └── portfolio/           # Portfolio CRUD API
│   │   ├── dashboard/               # Dashboard (editor)
│   │   ├── login/                   # Login page
│   │   ├── p/[username]/            # Public portfolio page
│   │   ├── globals.css              # Design system
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── auth.ts                      # NextAuth config
│   ├── middleware.ts                # Route protection
│   └── types/                       # TypeScript types
├── data/portfolios/                 # Portfolio configs (runtime)
└── .env.local                       # Environment variables
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js v5 (GitHub OAuth)
- **GitHub API**: Octokit
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript

## 📝 License

MIT
