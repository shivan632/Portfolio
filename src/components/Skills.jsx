import React, { useRef } from 'react';
import { Container, Tab, Tabs, Row, Col, ProgressBar } from 'react-bootstrap';
import { Terminal, Cpu, Settings, Brain } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';

// Animated progress bar that fills from 0 when in view
const AnimatedProgressBar = ({ level, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref}>
      <ProgressBar
        now={isInView ? level : 0}
        style={{
          height: '6px',
          backgroundColor: 'rgba(226, 232, 240, 0.4)',
          borderRadius: '999px',
          transition: 'none'
        }}
        className="overflow-hidden"
      >
        <ProgressBar
          now={isInView ? level : 0}
          style={{
            backgroundColor: color,
            borderRadius: '999px',
            transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </ProgressBar>
    </div>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }
  })
};

const Skills = () => {
  const { skills } = portfolioData;

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'data science & ai/ml':
        return <Brain size={16} className="text-brand-accent" />;
      case 'frontend':
        return <Cpu size={16} className="text-brand-glow" />;
      case 'backend & database':
        return <Terminal size={16} className="text-brand-accent" />;
      default:
        return <Settings size={16} className="text-amber-500" />;
    }
  };

  const getProgressBarColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('data science') || cat.includes('ai') || cat.includes('ml')) {
      return '#6366f1';
    }
    return cat === 'frontend' ? '#10b981' : '#6366f1';
  };

  return (
    <section id="skills" className="py-24 relative">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-glow/5 blur-[100px] pointer-events-none"></div>

      <Container className="relative" style={{ zIndex: 5 }}>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-3">
            Expertise
          </span>
          <h2 className="display-6 font-heading font-black text-slate-900 dark:text-white mb-2">
            My Skills
          </h2>
          <div className="h-1.5 w-12 bg-brand-gradient mx-auto rounded-full"></div>
        </motion.div>

        {/* Tabbed Skills View */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="glass-panel p-4 md:p-5 rounded-3xl border-slate-200/50 dark:border-slate-800/40 shadow-lg"
        >
          <Tabs
            defaultActiveKey={skills[0]?.category || "Frontend"}
            id="skills-tabs"
            className="mb-5 border-0 justify-content-center gap-2 custom-skills-tabs"
          >
            {skills.map((category) => (
              <Tab
                eventKey={category.category}
                title={category.category}
                key={category.category}
                tabClassName="rounded-full px-4 py-2 font-heading font-bold text-slate-500 border border-slate-200/60 dark:border-slate-800 hover:text-brand-glow transition-all"
              >
                <Row className="gy-4">
                  {category.items.map((skill, index) => (
                    <Col lg={4} md={6} key={index}>
                      <motion.div
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="p-4 rounded-2xl bg-brand-cardLight dark:bg-brand-cardDark/20 border border-slate-200/50 dark:border-slate-800/40 glow-card text-start"
                      >
                        <div className="d-flex align-items-center justify-content-between mb-2.5">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 d-flex align-items-center gap-2">
                            {getCategoryIcon(category.category)}
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <AnimatedProgressBar
                          level={skill.level}
                          color={getProgressBarColor(category.category)}
                        />
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </Tab>
            ))}
          </Tabs>
        </motion.div>
      </Container>

      {/* Global CSS override for bootstrap tabs in components */}
      <style>{`
        .custom-skills-tabs .nav-link {
          color: #64748b !important;
          background: transparent !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
          font-size: 14px;
        }
        .dark .custom-skills-tabs .nav-link {
          color: #94a3b8 !important;
          border: 1px solid rgba(31, 41, 55, 0.6) !important;
        }
        .custom-skills-tabs .nav-link.active {
          color: #fff !important;
          background: linear-gradient(135deg, #10b981, #6366f1) !important;
          border-color: transparent !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25) !important;
        }
      `}</style>
    </section>
  );
};

export default Skills;
