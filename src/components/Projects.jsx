import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';
import ProjectsBackground from './ProjectsBackground';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 }
};

const Projects = ({ darkMode }) => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Data Science', 'Frontend', 'Fullstack'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="py-24 relative bg-slate-50/30 dark:bg-slate-950/20 overflow-hidden">
      {/* 3D Plexus Sphere Background */}
      <ProjectsBackground darkMode={darkMode} />
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
            Portfolio
          </span>
          <h2 className="display-6 font-heading font-black text-slate-900 dark:text-white mb-2">
            My Projects
          </h2>
          <div className="h-1.5 w-12 bg-brand-gradient mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="d-flex justify-content-center gap-3 mt-10 mb-14 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`project-filter-btn px-4 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-300 ${filter === cat
                  ? 'active bg-brand-gradient text-white shadow-md shadow-brand-glow/25 border-0 hover:scale-105'
                  : 'bg-brand-cardLight dark:bg-brand-cardDark/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-glow hover:border-brand-glow hover:scale-102'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid with AnimatePresence */}
        <Row className="gy-4 justify-content-center">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <Col lg={4} md={6} key={project.id}>
                <motion.div
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card
                    className="h-100 overflow-hidden border-slate-200/50 dark:border-slate-800/40 glass-panel glow-card shadow-sm flex-column rounded-3xl"
                  >
                    {/* Image Wrap & Hover Overlay */}
                    <div className="relative group overflow-hidden cursor-pointer" style={{ height: '210px' }} onClick={() => setSelectedProject(project)}>
                      <Card.Img
                        variant="top"
                        src={project.image}
                        className="w-100 h-100 object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 d-flex align-items-center justify-content-center">
                        <button
                          className="p-3 rounded-full bg-white text-brand-dark border-0 hover:scale-110 shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 d-flex align-items-center justify-content-center"
                          aria-label="View Details"
                        >
                          <Eye size={20} className="text-slate-800" />
                        </button>
                      </div>
                    </div>

                    <Card.Body className="p-4 text-start d-flex flex-column justify-content-between">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-brand-accent mb-2.5 d-inline-block">
                          {project.category}
                        </span>
                        <Card.Title className="h5 font-heading font-extrabold text-slate-800 dark:text-slate-100 hover:text-brand-glow transition-colors cursor-pointer mb-2.5" onClick={() => setSelectedProject(project)}>
                          {project.title}
                        </Card.Title>
                        <Card.Text className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {project.shortDescription}
                        </Card.Text>
                      </div>

                      <div>
                        {/* Tech Badges */}
                        <div className="d-flex flex-wrap gap-1.5 mb-4">
                          {project.tech.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/40"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-900/40 text-slate-400">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Bottom Action Links */}
                        <div className="d-flex align-items-center justify-content-between pt-3.5 border-t border-slate-100 dark:border-slate-800/60">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-xs font-bold text-brand-glow hover:text-emerald-400 bg-transparent border-0 p-0 transition-colors"
                          >
                            Learn More
                          </button>
                          <div className="d-flex gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-brand-accent dark:text-slate-500 dark:hover:text-brand-accent transition-colors"
                              aria-label="GitHub Repository"
                            >
                              <Github size={18} />
                            </a>
                            {project.vercel && (
                              <a
                                href={project.vercel}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-brand-glow dark:text-slate-500 dark:hover:text-brand-glow transition-colors"
                                aria-label="Deployed Demo"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Modal
              show={!!selectedProject}
              onHide={() => setSelectedProject(null)}
              centered
              size="lg"
              className="custom-project-modal"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-3xl border-slate-200/50 dark:border-slate-800/40 overflow-hidden shadow-2xl p-0"
              >
                <Row className="g-0">
                  {/* Image Column */}
                  <Col md={5} className="relative overflow-hidden bg-slate-100 dark:bg-slate-900 d-flex">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full object-cover min-h-[250px] md:min-h-full"
                    />
                    <div className="absolute inset-0 bg-slate-950/10 pointer-events-none"></div>
                  </Col>

                  {/* Details Column */}
                  <Col md={7}>
                    <div className="p-4 p-md-5 text-start bg-brand-cardLight dark:bg-brand-cardDark relative">
                      {/* Header Row: Category & Close Button */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="badge bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {selectedProject.category}
                        </span>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 border-0 transition-all"
                          aria-label="Close modal"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-3">
                        {selectedProject.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed mb-4">
                        {selectedProject.longDescription}
                      </p>

                      {/* Tech List */}
                      <h4 className="font-heading font-bold text-slate-800 dark:text-slate-300 text-xs uppercase tracking-wider mb-2.5">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {selectedProject.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.vercel && (
                          <a
                            href={selectedProject.vercel}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn d-inline-flex align-items-center gap-2 px-4 py-2.5 rounded-full font-heading font-bold hover:scale-105 active:scale-95 transition-all text-sm no-underline text-white"
                            style={{ background: 'linear-gradient(135deg, #10b981, #6366f1)', border: 'none' }}
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn d-inline-flex align-items-center gap-2 px-4 py-2.5 rounded-full font-heading font-bold hover:scale-105 active:scale-95 transition-all text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 no-underline"
                        >
                          <Github size={16} />
                          <span>Source Code</span>
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Container>

      <style>{`
        .custom-project-modal .modal-dialog {
          max-width: 850px;
        }
        .custom-project-modal .modal-content {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
