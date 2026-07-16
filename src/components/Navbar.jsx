import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Sun, Moon, Menu, Code } from 'lucide-react';
import { portfolioData } from '../config/portfolioData';

const Navigation = ({ darkMode, toggleDarkMode }) => {
  const { name } = portfolioData.personalInfo;
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'certificates', 'testimonials', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`glass-panel py-3 px-2 shadow-sm border-b transition-all duration-300`}
      style={{
        zIndex: 1050,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Container>
        {/* Animated Brand Logo */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2 font-heading font-extrabold text-xl no-underline">
          <Code className="text-brand-glow animate-pulse" size={24} />
          <span className="text-brand-gradient">
            {name}
          </span>
        </Navbar.Brand>

        {/* Custom Toggle Switch for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 p-1">
          <Menu className="text-slate-800 dark:text-slate-200" size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto my-2 my-lg-0 gap-2">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.id}
                href={`#${link.id}`}
                className={`navbar-indicator-link font-semibold transition-colors py-2 no-underline ${
                  activeSection === link.id
                    ? 'text-brand-glow'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-glow dark:hover:text-brand-glow'
                }`}
                style={activeSection === link.id ? { position: 'relative' } : {}}
              >
                {link.label}
                {activeSection === link.id && (
                  <span
                    className="d-block mx-auto mt-0.5"
                    style={{
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #10b981, #6366f1)',
                      borderRadius: '999px'
                    }}
                  />
                )}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-3 justify-content-center mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full border bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/50 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all duration-200 d-flex align-items-center justify-content-center"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-brand-accent" />}
            </button>

            {/* CTA Connect Button */}
            <a
              href="#contact"
              className="btn font-heading font-semibold px-4 py-2.5 rounded-full transition-all duration-300 text-sm no-underline shadow-sm hover:shadow-md"
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid #10b981',
                color: darkMode ? '#ffffff' : '#070a13'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#10b981';
                e.target.style.color = '#ffffff';
                e.target.style.boxShadow = '0 8px 20px -6px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = darkMode ? '#ffffff' : '#070a13';
                e.target.style.boxShadow = 'none';
              }}
            >
              Let's Connect
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
