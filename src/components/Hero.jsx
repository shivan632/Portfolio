import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github, Linkedin, Mail, ArrowRight, Download, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';
import heroImage from '../assets/hero.jpg';
import HeroBackground from './HeroBackground';

// Custom lightweight Typing Effect
const TypingEffect = ({ words, speed = 100, delay = 2000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const waitTimeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(waitTimeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(typeTimeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return (
    <span className="text-brand-gradient font-extrabold font-heading">
      {words[index].substring(0, subIndex)}
      <span className={`inline-block font-light text-brand-glow ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Hero = ({ darkMode }) => {
  const { name, subtitle, bio, resumeUrl, github, linkedin, email } = portfolioData.personalInfo;

  const roles = [
    "Data Science & AI/ML Engineer",
    "Full Stack Developer",
    "Creative Engineer",
    "Problem Solver"
  ];

  return (
    <section id="home" className="min-h-screen d-flex align-items-center py-5 relative overflow-hidden">
      {/* 3D Wireframe Grid Background */}
      <HeroBackground darkMode={darkMode} />

      {/* Soft Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-brand-glow/5 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-brand-accent/5 blur-[140px] pointer-events-none animate-pulse-slow"></div>

      <Container className="relative" style={{ zIndex: 10 }}>
        <Row className="align-items-center gy-5">
          {/* Hero text */}
          <Col lg={7} className="text-start">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={itemVariants} className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-glow/10 text-brand-glow border border-brand-glow/20 mb-4">
                Available for projects
              </motion.span>

              <motion.h1 variants={itemVariants} className="display-4 font-heading font-black tracking-tight mb-3 text-slate-900 dark:text-white leading-tight">
                Creative <span className="text-brand-gradient">Developer</span>
                <br />
                & Designer.
              </motion.h1>

              <motion.h2 variants={itemVariants} className="h4 font-heading font-medium text-slate-700 dark:text-slate-300 mb-4">
                I am a <TypingEffect words={roles} />
              </motion.h2>

              <motion.p variants={itemVariants} className="lead text-slate-600 dark:text-slate-400 mb-3 font-normal max-w-xl text-[17px] leading-relaxed">
                {subtitle}
              </motion.p>

              <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-500 mb-5 max-w-lg text-[15px] leading-relaxed">
                {Array.isArray(bio) ? bio[0] : bio}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3 align-items-center mb-5">
                <a
                  href="#projects"
                  className="btn d-flex align-items-center gap-2 px-4 py-3 rounded-full font-heading font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 no-underline text-white"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #6366f1)',
                    border: 'none',
                    boxShadow: '0 8px 24px -6px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  <span>Explore My Work</span>
                  <ArrowRight size={18} />
                </a>

                <a
                  href={resumeUrl}
                  download
                  className="btn d-flex align-items-center gap-2 px-4 py-3 rounded-full font-heading font-bold hover:scale-105 active:scale-95 transition-all duration-300 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900 no-underline"
                >
                  <Download size={18} />
                  <span>Get Resume</span>
                </a>
              </motion.div>

              {/* Social Icons */}
              <motion.div variants={itemVariants} className="d-flex align-items-center gap-4 pt-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-extrabold">
                  Follow Me
                </span>
                <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800"></div>
                <div className="d-flex gap-2">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 text-slate-500 hover:text-brand-glow dark:text-slate-400 dark:hover:text-brand-glow transition-all hover:scale-110"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 text-slate-500 hover:text-brand-glow dark:text-slate-400 dark:hover:text-brand-glow transition-all hover:scale-110"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 text-slate-500 hover:text-brand-glow dark:text-slate-400 dark:hover:text-brand-glow transition-all hover:scale-110"
                    aria-label="Send Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Hero Visual Dashboard Graphic */}
          <Col lg={5} className="d-flex justify-content-center align-items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-80 h-80 md:w-[420px] md:h-[420px] d-flex justify-content-center align-items-center animate-float-slow"
            >

              {/* Spinning background rings */}
              <div className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-brand-glow/20 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dotted border-brand-accent/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

              {/* Radial gradient backing */}
              <div
                className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-br from-brand-glow to-brand-accent opacity-15 dark:opacity-20 blur-[50px] pointer-events-none"
              ></div>

              {/* Profile Image Wrapper */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/20 dark:border-slate-800/40 z-10 hover:scale-102 transition-transform duration-500 bg-slate-100 dark:bg-slate-900">
                <img
                  src={heroImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="d-flex justify-content-center mt-5"
        >
          <a href="#about" className="scroll-down-indicator text-slate-400 dark:text-slate-600 hover:text-brand-glow transition-colors" aria-label="Scroll down">
            <ChevronDown size={28} />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
