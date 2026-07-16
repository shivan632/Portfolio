import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Briefcase, GraduationCap, Compass } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';
import AboutBackground from './AboutBackground';

// Animated Counter Hook
const useCounter = (end, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end);

  useEffect(() => {
    if (!startCounting || isNaN(numericEnd)) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [startCounting, numericEnd, duration]);

  return count;
};

const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Extract number and suffix (e.g., "15+" -> 15 and "+")
  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = value.replace(/\d+/, '');
  const animatedCount = useCounter(num, 1800, isInView);

  return (
    <div ref={ref} className="glass-panel p-4 rounded-3xl glow-card text-center border-slate-200/50 dark:border-slate-800/40">
      <span className="display-6 font-heading font-black text-brand-gradient d-block mb-1">
        {isInView ? animatedCount : 0}{suffix}
      </span>
      <span className="text-[11px] font-extrabold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
        {label}
      </span>
    </div>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const About = ({ darkMode }) => {
  const { bio, stats } = portfolioData.personalInfo;
  const { experience, education } = portfolioData;

  return (
    <section id="about" className="py-24 relative bg-slate-50/30 dark:bg-slate-950/20 overflow-hidden">
      {/* 3D Floating Cubes Background */}
      <AboutBackground darkMode={darkMode} />

      <Container>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-glow/10 text-brand-glow border border-brand-glow/20 mb-3">
            Biography
          </span>
          <h2 className="display-6 font-heading font-black text-slate-900 dark:text-white mb-2">
            About Me
          </h2>
          <div className="h-1.5 w-12 bg-brand-gradient mx-auto rounded-full"></div>
        </motion.div>

        {/* Bio and Stats */}
        <Row className="align-items-center mb-24 gy-5">
          <Col lg={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="pe-lg-4 text-start"
            >
              <h3 className="h4 font-heading font-bold text-slate-800 dark:text-slate-200 mb-4 d-flex align-items-center gap-2">
                <Compass className="text-brand-glow" size={22} />
                <span>My Journey and Purpose</span>
              </h3>
              {Array.isArray(bio) ? (
                bio.map((p, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed text-[15px]">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-[15px]">
                  {bio}
                </p>
              )}
            </motion.div>
          </Col>

          <Col lg={6}>
            <Row className="g-4">
              {stats.map((stat, idx) => (
                <Col sm={6} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <AnimatedStat value={stat.value} label={stat.label} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Timeline Row (Work Experience & Education side-by-side) */}
        <Row className="gy-5">
          {/* Work Experience Column */}
          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={sectionVariants}
            >
              <h3 className="h4 font-heading font-bold text-slate-800 dark:text-slate-200 mb-5 d-flex align-items-center gap-2 text-start">
                <Briefcase className="text-brand-accent" size={22} />
                <span>Professional Experience</span>
              </h3>
            </motion.div>

            <motion.div
              className="d-flex flex-column gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {experience.map((exp) => (
                <motion.div key={exp.id} variants={itemVariants} className="timeline-item text-start">
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-brand-cardDark/30 border border-slate-200/40 dark:border-slate-800/40 glow-card">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                      <h4 className="h6 font-heading font-bold text-slate-800 dark:text-slate-100 mb-0">
                        {exp.role}
                      </h4>
                      <span className="badge bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {exp.duration}
                      </span>
                    </div>
                    <h5 className="text-sm font-semibold text-brand-glow mb-3">
                      {exp.company}
                    </h5>
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] mb-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="d-flex flex-wrap gap-1.5">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Col>

          {/* Education Column */}
          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={sectionVariants}
            >
              <h3 className="h4 font-heading font-bold text-slate-800 dark:text-slate-200 mb-5 d-flex align-items-center gap-2 text-start">
                <GraduationCap className="text-brand-glow" size={22} />
                <span>Education</span>
              </h3>
            </motion.div>

            <motion.div
              className="d-flex flex-column gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {education.map((edu) => (
                <motion.div key={edu.id} variants={itemVariants} className="timeline-item text-start">
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-brand-cardDark/30 border border-slate-200/40 dark:border-slate-800/40 glow-card">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                      <h4 className="h6 font-heading font-bold text-slate-800 dark:text-slate-100 mb-0">
                        {edu.degree}
                      </h4>
                      <span className="badge bg-brand-glow/10 text-brand-glow border border-brand-glow/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {edu.duration}
                      </span>
                    </div>
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      {edu.institution}
                    </h5>
                    
                    {(edu.specialisation || edu.CGPA || edu.percentage) && (
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        {edu.specialisation && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/40">
                            Spec: {edu.specialisation}
                          </span>
                        )}
                        {edu.CGPA && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-brand-glow border border-emerald-500/20">
                            CGPA: {edu.CGPA}
                          </span>
                        )}
                        {edu.percentage && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-brand-glow border border-emerald-500/20">
                            Percentage: {edu.percentage}
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed mb-0">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
