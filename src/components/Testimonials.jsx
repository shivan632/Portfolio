import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';

const Testimonials = () => {
  const { testimonials } = portfolioData;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return (prev - 1 + testimonials.length) % testimonials.length;
    });
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 })
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-1/3 right-20 w-72 h-72 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500 border border-purple-500/20 mb-3">
              Kind Words
            </span>
            <h2 className="display-6 font-heading font-black text-slate-900 dark:text-white mb-2">
              Testimonials
            </h2>
            <div className="h-1.5 w-12 bg-brand-gradient mx-auto rounded-full"></div>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-3xl mx-auto relative">
            <div className="glass-panel p-5 md:p-8 rounded-3xl border-slate-200/50 dark:border-slate-800/40 shadow-lg min-h-[280px] d-flex flex-column justify-content-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote size={36} className="text-brand-accent/30" />
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed mb-6 italic font-light">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="d-flex align-items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-gradient d-flex align-items-center justify-content-center text-white font-heading font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 dark:text-slate-100 mb-0 text-[15px]">
                        {t.name}
                      </h4>
                      <span className="text-[12px] text-slate-500 dark:text-slate-400">
                        {t.role} • {t.company}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="d-flex align-items-center justify-content-center gap-4 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 rounded-full glass-panel border-slate-200/50 dark:border-slate-800/40 text-slate-500 dark:text-slate-400 hover:text-brand-glow hover:scale-110 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="d-flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                    }}
                    className={`rounded-full border-0 transition-all duration-300 ${
                      idx === current
                        ? 'w-6 h-2.5 bg-brand-gradient'
                        : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="p-2.5 rounded-full glass-panel border-slate-200/50 dark:border-slate-800/40 text-slate-500 dark:text-slate-400 hover:text-brand-glow hover:scale-110 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
