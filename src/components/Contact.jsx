import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../config/portfolioData';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const Contact = () => {
  const { email, location, github, linkedin } = portfolioData.personalInfo;

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    // Formspree submission
    fetch("https://formspree.io/f/mnjeayyr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      setIsSubmitting(false);
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidated(false);
      } else {
        setSubmitStatus('error');
      }
      // Auto-dismiss status alert after 6 seconds
      setTimeout(() => setSubmitStatus(null), 6000);
    })
    .catch((error) => {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 6000);
    });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-glow/5 blur-[100px] pointer-events-none"></div>

      <Container className="relative" style={{ zIndex: 5 }}>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-glow/10 text-brand-glow border border-brand-glow/20 mb-3">
            Get In Touch
          </span>
          <h2 className="display-6 font-heading font-black text-slate-900 dark:text-white mb-2">
            Contact Me
          </h2>
          <div className="h-1.5 w-12 bg-brand-gradient mx-auto rounded-full"></div>
        </motion.div>

        <Row className="gy-5">
          {/* Contact Details Column */}
          <Col lg={5} className="text-start text-slate-700 dark:text-slate-300">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="pe-lg-4 d-flex flex-column gap-4"
            >
              <h3 className="h4 font-heading font-bold text-slate-800 dark:text-slate-100 mb-2">
                Let's discuss something great
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed text-[15px]">
                I am open to discuss web development projects, freelance opportunities, or employment collaborations. Drop a line and I will reply as soon as possible.
              </p>

              {/* Email Card */}
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="d-flex align-items-start gap-3.5 p-4 rounded-3xl glass-panel border-slate-200/50 dark:border-slate-800/40 glow-card"
              >
                <div className="p-3 rounded-2xl bg-brand-glow/10 text-brand-glow d-flex align-items-center justify-content-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Email Me
                  </h4>
                  <a href={`mailto:${email}`} className="font-heading font-bold text-[15px] text-slate-800 dark:text-slate-200 no-underline hover:text-brand-glow transition-colors">
                    {email}
                  </a>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="d-flex align-items-start gap-3.5 p-4 rounded-3xl glass-panel border-slate-200/50 dark:border-slate-800/40 glow-card"
              >
                <div className="p-3 rounded-2xl bg-brand-accent/10 text-brand-accent d-flex align-items-center justify-content-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Location
                  </h4>
                  <span className="font-heading font-bold text-[15px] text-slate-800 dark:text-slate-200">
                    {location}
                  </span>
                </div>
              </motion.div>

              {/* Social Channels */}
              <div className="pt-3">
                <h4 className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-extrabold mb-3">
                  Connect Socially
                </h4>
                <div className="d-flex gap-2">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-panel border-slate-200/60 dark:border-slate-800/40 text-slate-600 dark:text-slate-300 hover:text-brand-glow hover:border-brand-glow hover:scale-110 active:scale-95 transition-all d-flex align-items-center justify-content-center"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-panel border-slate-200/60 dark:border-slate-800/40 text-slate-600 dark:text-slate-300 hover:text-brand-glow hover:border-brand-glow hover:scale-110 active:scale-95 transition-all d-flex align-items-center justify-content-center"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Contact Form Column */}
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-4 p-md-5 rounded-3xl border-slate-200/50 dark:border-slate-800/40 shadow-lg text-start"
            >
              {submitStatus === 'success' && (
                <Alert variant="success" className="d-flex align-items-center gap-2 rounded-2xl border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-4 mb-4">
                  <CheckCircle size={20} className="shrink-0" />
                  <div>
                    <strong className="d-block font-extrabold">Message Sent Successfully!</strong>
                    <span className="text-sm">Thank you for reaching out. I'll get back to you shortly.</span>
                  </div>
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert variant="danger" className="d-flex align-items-center gap-2 rounded-2xl border-0 bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 mb-4">
                  <CheckCircle size={20} className="shrink-0 rotate-45 text-rose-500" />
                  <div>
                    <strong className="d-block font-extrabold">Failed to Send Message</strong>
                    <span className="text-sm">Something went wrong while sending your message. Please try again.</span>
                  </div>
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Your Name
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="custom-input py-3 px-4 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600"
                      />
                      <Form.Control.Feedback type="invalid" className="text-xs mt-1 text-rose-500">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Your Email
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="custom-input py-3 px-4 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600"
                      />
                      <Form.Control.Feedback type="invalid" className="text-xs mt-1 text-rose-500">
                        Please provide a valid email address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formSubject">
                  <Form.Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Subject
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="custom-input py-3 px-4 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600"
                  />
                  <Form.Control.Feedback type="invalid" className="text-xs mt-1 text-rose-500">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Message
                  </Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Shivan, I would like to discuss..."
                    className="custom-input py-3 px-4 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600"
                  />
                  <Form.Control.Feedback type="invalid" className="text-xs mt-1 text-rose-500">
                    Please enter your message.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-end mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn d-inline-flex align-items-center gap-2 px-5 py-3 rounded-full font-heading font-bold hover:scale-105 active:scale-95 transition-all border-0 text-white"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #6366f1)',
                      boxShadow: '0 8px 20px -6px rgba(99, 102, 241, 0.35)'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm shrink-0" role="status" aria-hidden="true"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
