import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const Certificates = () => {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-purple-500/5 blur-[90px] pointer-events-none"></div>

      <Container className="text-center relative" style={{ zIndex: 5 }}>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-brand-glow border border-cyan-500/20 mb-3">
            Achievements
          </span>
          <h2 className="display-5 font-heading font-extrabold text-slate-900 dark:text-white mb-2">
            Certifications
          </h2>
          <div className="h-1 w-16 bg-brand-gradient mx-auto rounded-full"></div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto glass-panel p-4 md:p-6 rounded-3xl border-slate-200/50 dark:border-slate-800/50 shadow-lg"
        >
          <Carousel
            indicators={true}
            controls={true}
            interval={5000}
            className="custom-certificates-carousel pb-4"
          >
            {certificates.map((cert) => (
              <Carousel.Item key={cert.id}>
                <div className="row gy-4 align-items-center p-3 md:p-4 text-start">
                  {/* Image Column */}
                  <div className="col-md-5 d-flex justify-content-center">
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-md aspect-video md:aspect-[4/3] w-100 max-w-sm">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-100 h-100 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="col-md-7 ps-md-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Award className="text-brand-accent animate-bounce" size={24} />
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                        Verified Credentials
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-slate-800 dark:text-slate-100 text-xl md:text-2xl mb-2 leading-tight">
                      {cert.title}
                    </h3>

                    <h4 className="text-sm font-semibold text-brand-glow mb-2">
                      Issued by {cert.issuer}
                    </h4>

                    <p className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mb-4">
                      Completed: {cert.date}
                    </p>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn d-inline-flex align-items-center gap-2 px-4 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300 text-sm no-underline"
                      style={{
                        backgroundColor: '#8b5cf6',
                        color: '#fff',
                        border: 'none'
                      }}
                    >
                      <ExternalLink size={16} />
                      <span>View Certificate</span>
                    </a>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </motion.div>
      </Container>

      <style>{`
        /* Fix Carousel controls spacing */
        .custom-certificates-carousel .carousel-control-prev,
        .custom-certificates-carousel .carousel-control-next {
          width: 5%;
        }
        .custom-certificates-carousel .carousel-indicators {
          bottom: -15px;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
