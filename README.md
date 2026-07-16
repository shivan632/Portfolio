# ✨ Shivan Mishra | Personal Portfolio Website

Welcome to my personal portfolio repository! This is a modern, premium, and highly interactive single-page portfolio website designed to showcase my journey, projects, certifications, and technical skillset as a **Data Science, AI/ML & Full Stack Developer**.

It features an elegant obsidian dark/light mode, custom glassmorphism panels, interactive timeline tracks, dynamic count-up statistics, and a customized project showcase with details popups.

---

## 🚀 Live Demo

Check out the live deployment of my portfolio here: **[Live Link/Demo](http://localhost:5173/)** *(or your custom domain)*

---

## 🎨 Key Features

*   **Premium Glassmorphism**: Clean layouts using Tailwind CSS v4 and custom glass-blur configurations for cards and containers.
*   **Obsidian Dark/Light Mode**: Persistent state theme toggling with smooth transitions that update both HTML classes, Three.js coordinates, and canvas color parameters.
*   **Dynamic Animated Counters**: In-view numeric stats that count up smoothly using custom React animation hooks and Framer Motion logic.
*   **Interactive Projects Hub**: Categorized projects grid with real-time filtering, detailed modal slideouts, and custom badges.
*   **Experience & Education Timelines**: Elegant side-by-side timeline cards with glowing interactive hover states.
*   **Interactive Feedback Footer**: Advanced multi-column footer containing quick-feedback fields that support real-time state feedback (mock submit transitions).
*   **AI Chatbot Widget**: An embedded interactive chat assistant designed to guide users through my resume, skillsets, and projects.

---

## 🛠️ Technology Stack

*   **Framework**: React (v19)
*   **Bundler**: Vite (v8)
*   **Styling**: Tailwind CSS (v4) with `@tailwindcss/postcss`, Bootstrap (v5), Custom CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Background Animations**: HTML5 Canvas, custom mathematical particles, and wireframe meshes

---

## 📂 Project Structure

```bash
├── public/                 # Static assets (favicons, resume file, images)
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Core reusable React components
│   │   ├── AIChatbot.jsx            # AI chat widget
│   │   ├── About.jsx                # Journeys and side-by-side timelines
│   │   ├── BackgroundAnimation.jsx  # Floating particle animations
│   │   ├── Footer.jsx               # Premium multi-column interactive footer
│   │   ├── Hero.jsx                 # Heading, typewriter role effect, and CTAs
│   │   ├── Navbar.jsx               # Navigation bar and dark/light theme switch
│   │   ├── Projects.jsx             # Grid portfolio and detail modals
│   │   └── Skills.jsx               # Skill tab decks and level charts
│   ├── config/
│   │   └── portfolioData.js         # Central config for bio, timeline, skills, and projects
│   ├── App.css             # Vite template styling
│   ├── App.jsx             # Root layout and theme state provider
│   ├── index.css           # Custom theme variables and glassmorphism styling
│   └── main.jsx            # Entry point
├── index.html              # Template base
├── tailwind.config.js      # Legacy config translation compatibility wrapper
├── postcss.config.js       # PostCSS compiler mapping
└── package.json            # Project dependencies and npm scripts
```

---

## 💻 Local Setup & Installation

Follow these steps to run the portfolio on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/shivan632/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` to view the page.

### 4. Build for production
```bash
npm run build
```
This will compile and optimize the assets into the `dist/` directory, ready to be deployed to platforms like GitHub Pages, Vercel, Netlify, or Hostinger.

---

## ✉️ Let's Connect!

I am actively looking for new opportunities in full-stack engineering, machine learning, and data science. Feel free to reach out to me:

*   **Email**: [shivrom.2020@gmail.com](mailto:shivrom.2020@gmail.com)
*   **LinkedIn**: [Shivan Mishra](https://www.linkedin.com/in/shivan-mishra-b7156a317)
*   **GitHub**: [@shivan632](https://github.com/shivan632)
