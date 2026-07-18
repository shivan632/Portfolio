import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Heart, Github, Linkedin, Mail, ArrowUp, Send, CheckCircle2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';

const Footer = ({ darkMode }) => {
  const { name, github, linkedin, email, location } = portfolioData.personalInfo;
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Feedback interactive state
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFeedback('');
      // Reset success message after 4s
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className={`back-to-top-btn ${darkMode ? 'dark-btn' : 'light-btn'}`}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pt-16 pb-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/80 backdrop-blur-md relative"
      >
        {/* Decorative background glows */}
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-brand-glow/3 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none"></div>

        <Container className="relative" style={{ zIndex: 5 }}>
          <Row className="gy-5 justify-content-between mb-12">
            {/* Column 1: Brand & Status */}
            <Col lg={4} md={12} className="text-start">
              <span className="font-heading font-black text-2xl text-brand-gradient mb-3 d-inline-block">
                {name}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed max-w-sm">
                Crafting modern web applications with a focus on data science, artificial intelligence, and premium user experiences.
              </p>
              
              {/* Dynamic Availability Indicator */}
              <div className="d-flex align-items-center gap-2 mb-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-2xl w-fit">
                <span className="relative d-flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-glow"></span>
                </span>
                <span className="text-[11px] font-bold text-brand-glow uppercase tracking-wider">
                  Open to new opportunities
                </span>
              </div>

              {/* Location */}
              <div className="d-flex align-items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
                <MapPin size={13} />
                <span>{location}</span>
              </div>
            </Col>

            {/* Column 2: Navigation Links */}
            <Col lg={2} md={4} className="text-start">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-300 mb-4 font-heading">
                Explore
              </h4>
              <ul className="list-unstyled d-flex flex-column gap-2.5 text-sm font-semibold">
                <li>
                  <a href="#home" className="text-slate-500 hover:text-brand-glow no-underline transition-colors navbar-indicator-link pb-1 d-inline-block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-slate-500 hover:text-brand-glow no-underline transition-colors navbar-indicator-link pb-1 d-inline-block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-slate-500 hover:text-brand-glow no-underline transition-colors navbar-indicator-link pb-1 d-inline-block">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#certificates" className="text-slate-500 hover:text-brand-glow no-underline transition-colors navbar-indicator-link pb-1 d-inline-block">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-slate-500 hover:text-brand-glow no-underline transition-colors navbar-indicator-link pb-1 d-inline-block">
                    Contact
                  </a>
                </li>
              </ul>
            </Col>

            {/* Column 3: Connect socials */}
            <Col lg={3} md={4} className="text-start">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-300 mb-4 font-heading">
                Connect
              </h4>
              <div className="d-flex flex-column gap-3">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-3 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 text-slate-600 dark:text-slate-300 hover:border-brand-glow hover:text-brand-glow hover:scale-103 transition-all duration-200 no-underline"
                >
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Github size={16} />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">GitHub</span>
                    <span className="text-xs font-semibold">@shivan632</span>
                  </div>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-3 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 text-slate-600 dark:text-slate-300 hover:border-brand-glow hover:text-brand-glow hover:scale-103 transition-all duration-200 no-underline"
                >
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Linkedin size={16} />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">LinkedIn</span>
                    <span className="text-xs font-semibold">Shivan Mishra</span>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="d-flex align-items-center gap-3 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 text-slate-600 dark:text-slate-300 hover:border-brand-glow hover:text-brand-glow hover:scale-103 transition-all duration-200 no-underline"
                >
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Mail size={16} />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">Email</span>
                    <span className="text-xs font-semibold truncate max-w-[150px]">{email}</span>
                  </div>
                </a>
              </div>
            </Col>

            {/* Column 4: Quick Feedback Input */}
            <Col lg={3} md={4} className="text-start">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-300 mb-4 font-heading">
                Quick Feedback
              </h4>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="feedback-form"
                    onSubmit={handleFeedbackSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="d-flex flex-column gap-2"
                  >
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Say something nice or drop a suggestion..."
                      className="custom-input rounded-2xl text-xs p-3 border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100"
                      style={{ resize: 'none' }}
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !feedback.trim()}
                      className="btn bg-brand-gradient text-white border-0 py-2 rounded-xl text-xs font-bold d-flex align-items-center justify-content-center gap-2 hover:scale-103 active:scale-97 disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Send Quick Note</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-center d-flex flex-column align-items-center gap-2"
                  >
                    <CheckCircle2 className="text-brand-glow animate-bounce" size={24} />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">Thank You!</h5>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 m-0">Your feedback has been received.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>
          </Row>

          {/* Bottom Row */}
          <div className="pt-8 mt-8 border-t border-slate-200/50 dark:border-slate-800/40 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-xs">
            <p className="text-slate-400 dark:text-slate-500 m-0">
              &copy; {currentYear} {name}. All rights reserved.
            </p>
            <span className="text-slate-400 dark:text-slate-500 d-flex align-items-center gap-1">
              Made with <Heart size={10} className="text-red-500 animate-pulse" /> using React, Bootstrap & Tailwind
            </span>
          </div>
        </Container>
      </motion.footer>
    </>
  );
};

export default Footer;
