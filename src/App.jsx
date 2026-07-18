import React, { useState, useEffect } from 'react';
import Navigation from './components/Navbar';
import BackgroundAnimation from './components/BackgroundAnimation';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

function App() {
  // Read preference from localStorage, default to system preference if not found
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark-theme-bg' : 'light-theme-bg'} relative`}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Ambient background particles canvas */}
      <BackgroundAnimation darkMode={darkMode} />

      {/* Navigation bar with theme toggle controls */}
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Core Sections */}
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills />
        <Projects darkMode={darkMode} />
        <Certificates />
        <Testimonials />
        <Contact />
      </main>

      {/* Page Footer */}
      <Footer darkMode={darkMode} />

      {/* AI Chatbot Widget */}
      <AIChatbot />
    </div>
  );
}

export default App;
