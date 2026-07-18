// assets/js/contact.js
// Contact Section JavaScript - Form Validation & Submission

/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. Form Validation Utilities
   2. Real-time Validation
   3. Form Submission Handler
   4. API Integration (Fetch)
   5. Success/Error Messages
   6. Newsletter Subscription
   7. Rate Limiting & Spam Protection
   8. Analytics Integration (Optional)
   ============================================ */

// ============================================
// 1. FORM VALIDATION UTILITIES
// ============================================

const ContactValidator = {
    // Name validation (minimum 2 characters, letters and spaces only)
    validateName: function(name) {
        const trimmed = name.trim();
        if (trimmed.length < 2) {
            return { isValid: false, message: 'Name must be at least 2 characters' };
        }
        if (trimmed.length > 100) {
            return { isValid: false, message: 'Name must be less than 100 characters' };
        }
        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(trimmed)) {
            return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
        }
        return { isValid: true, message: '' };
    },

    // Email validation (standard email format)
    validateEmail: function(email) {
        const trimmed = email.trim();
        if (!trimmed) {
            return { isValid: false, message: 'Email is required' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            return { isValid: false, message: 'Please enter a valid email address (e.g., name@example.com)' };
        }
        if (trimmed.length > 254) {
            return { isValid: false, message: 'Email address is too long' };
        }
        return { isValid: true, message: '' };
    },

    // Phone validation (optional, but if provided must be valid)
    validatePhone: function(phone) {
        const trimmed = phone.trim();
        if (!trimmed) {
            return { isValid: true, message: '' }; // Phone is optional
        }
        // International phone number format
        const phoneRegex = /^[+]?[\d\s\-()]{10,20}$/;
        if (!phoneRegex.test(trimmed)) {
            return { isValid: false, message: 'Please enter a valid phone number (10-20 digits, can include +, -, spaces, parentheses)' };
        }
        return { isValid: true, message: '' };
    },

    // Subject validation
    validateSubject: function(subject) {
        if (!subject) {
            return { isValid: false, message: 'Please select a subject' };
        }
        return { isValid: true, message: '' };
    },

    // Message validation (minimum 10 characters)
    validateMessage: function(message) {
        const trimmed = message.trim();
        if (trimmed.length < 10) {
            return { isValid: false, message: 'Message must be at least 10 characters' };
        }
        if (trimmed.length > 5000) {
            return { isValid: false, message: 'Message must be less than 5000 characters' };
        }
        return { isValid: true, message: '' };
    },

    // Validate entire form
    validateForm: function(formData) {
        const validations = {
            name: this.validateName(formData.name),
            email: this.validateEmail(formData.email),
            phone: this.validatePhone(formData.phone),
            subject: this.validateSubject(formData.subject),
            message: this.validateMessage(formData.message)
        };
        
        const isValid = Object.values(validations).every(v => v.isValid);
        return { isValid, errors: validations };
    }
};

// ============================================
// 2. REAL-TIME VALIDATION
// ============================================

class ContactFormHandler {
    constructor(formId, options = {}) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.options = {
            endpoint: '/api/contact',  // API endpoint for form submission
            method: 'POST',
            rateLimit: 60000,          // 60 seconds between submissions
            enableAnalytics: true,
            ...options
        };
        
        this.lastSubmitTime = 0;
        this.isSubmitting = false;
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            newsletter: document.getElementById('newsletter')
        };
        
        this.errorElements = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };
        
        this.formStatus = document.getElementById('formStatus');
        this.submitBtn = document.getElementById('submitBtn');
        
        this.init();
    }
    
    init() {
        this.setupRealTimeValidation();
        this.setupFormSubmission();
        this.setupFieldFocusEvents();
    }
    
    setupRealTimeValidation() {
        // Name field
        if (this.fields.name) {
            this.fields.name.addEventListener('input', (e) => {
                const result = ContactValidator.validateName(e.target.value);
                this.showFieldError('name', result.isValid ? '' : result.message);
            });
        }
        
        // Email field
        if (this.fields.email) {
            this.fields.email.addEventListener('input', (e) => {
                const result = ContactValidator.validateEmail(e.target.value);
                this.showFieldError('email', result.isValid ? '' : result.message);
            });
        }
        
        // Phone field
        if (this.fields.phone) {
            this.fields.phone.addEventListener('input', (e) => {
                const result = ContactValidator.validatePhone(e.target.value);
                this.showFieldError('phone', result.isValid ? '' : result.message);
            });
        }
        
        // Subject field
        if (this.fields.subject) {
            this.fields.subject.addEventListener('change', (e) => {
                const result = ContactValidator.validateSubject(e.target.value);
                this.showFieldError('subject', result.isValid ? '' : result.message);
            });
        }
        
        // Message field
        if (this.fields.message) {
            this.fields.message.addEventListener('input', (e) => {
                const result = ContactValidator.validateMessage(e.target.value);
                this.showFieldError('message', result.isValid ? '' : result.message);
            });
        }
    }
    
    setupFieldFocusEvents() {
        // Clear error on focus
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field) {
                field.addEventListener('focus', () => {
                    this.showFieldError(fieldName, '');
                    field.classList.remove('error');
                });
            }
        });
    }
    
    showFieldError(fieldName, message) {
        const errorEl = this.errorElements[fieldName];
        const fieldEl = this.fields[fieldName];
        
        if (errorEl) {
            if (message) {
                errorEl.textContent = message;
                errorEl.classList.add('show');
                if (fieldEl) fieldEl.classList.add('error');
            } else {
                errorEl.classList.remove('show');
                errorEl.textContent = '';
                if (fieldEl) fieldEl.classList.remove('error');
            }
        }
    }
    
    showFormStatus(message, type = 'success') {
        if (!this.formStatus) return;
        
        this.formStatus.textContent = message;
        this.formStatus.className = `form-status ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (this.formStatus) {
                this.formStatus.className = 'form-status';
                this.formStatus.textContent = '';
            }
        }, 5000);
    }
    
    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check rate limiting
            const now = Date.now();
            if (now - this.lastSubmitTime < this.options.rateLimit) {
                const waitTime = Math.ceil((this.options.rateLimit - (now - this.lastSubmitTime)) / 1000);
                this.showFormStatus(`Please wait ${waitTime} seconds before sending another message.`, 'error');
                return;
            }
            
            // Check if already submitting
            if (this.isSubmitting) {
                this.showFormStatus('Please wait, your message is being sent...', 'info');
                return;
            }
            
            // Get form data
            const formData = {
                name: this.fields.name?.value || '',
                email: this.fields.email?.value || '',
                phone: this.fields.phone?.value || '',
                subject: this.fields.subject?.value || '',
                message: this.fields.message?.value || '',
                newsletter: this.fields.newsletter?.checked || false,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            };
            
            // Validate form
            const validation = ContactValidator.validateForm(formData);
            
            if (!validation.isValid) {
                // Show all errors
                Object.entries(validation.errors).forEach(([field, result]) => {
                    if (!result.isValid) {
                        this.showFieldError(field, result.message);
                    }
                });
                
                // Scroll to first error
                const firstErrorField = Object.keys(validation.errors).find(
                    field => !validation.errors[field].isValid
                );
                if (firstErrorField && this.fields[firstErrorField]) {
                    this.fields[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    this.fields[firstErrorField].focus();
                }
                
                this.showFormStatus('Please fix the errors above before submitting.', 'error');
                return;
            }
            
            // Submit form
            await this.submitForm(formData);
        });
    }
    
    async submitForm(formData) {
        this.isSubmitting = true;
        this.setSubmitButtonLoading(true);
        
        try {
            // Send to API endpoint
            const response = await fetch(this.options.endpoint, {
                method: this.options.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            // Handle response
            if (response.ok) {
                const result = await response.json();
                this.handleSuccess(formData, result);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with status ${response.status}`);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleError(error);
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonLoading(false);
        }
    }
    
    handleSuccess(formData, response) {
        // Update last submit time
        this.lastSubmitTime = Date.now();
        
        // Show success message
        this.showFormStatus(
            'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.',
            'success'
        );
        
        // Reset form
        this.form.reset();
        
        // Clear all errors
        Object.keys(this.errorElements).forEach(field => {
            this.showFieldError(field, '');
        });
        
        // Track conversion (if analytics enabled)
        if (this.options.enableAnalytics && window.gtag) {
            window.gtag('event', 'form_submission', {
                'event_category': 'contact',
                'event_label': 'success',
                'value': 1
            });
        }
        
        // Log to console for debugging (remove in production)
        console.log('Form submitted successfully:', {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            timestamp: formData.timestamp
        });
        
        // Optional: Send email notification via third-party service
        this.sendNotificationEmail(formData);
    }
    
    handleError(error) {
        let errorMessage = 'Something went wrong. Please try again later.';
        
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Request timed out. Please try again.';
        } else if (error.message.includes('500')) {
            errorMessage = 'Server error. Please try again later or contact me directly via email.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        this.showFormStatus(errorMessage, 'error');
        
        // Track error (if analytics enabled)
        if (this.options.enableAnalytics && window.gtag) {
            window.gtag('event', 'form_error', {
                'event_category': 'contact',
                'event_label': error.message,
                'value': 0
            });
        }
    }
    
    setSubmitButtonLoading(isLoading) {
        if (!this.submitBtn) return;
        
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            const originalText = this.submitBtn.querySelector('.btn-text')?.textContent || 'Send Message';
            this.submitBtn.setAttribute('data-original-text', originalText);
            if (this.submitBtn.querySelector('.btn-text')) {
                this.submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            }
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            const originalText = this.submitBtn.getAttribute('data-original-text');
            if (originalText && this.submitBtn.querySelector('.btn-text')) {
                this.submitBtn.querySelector('.btn-text').textContent = originalText;
            }
        }
    }
    
    async sendNotificationEmail(formData) {
        // Optional: Send notification using a third-party service like EmailJS, SendGrid, etc.
        // This is a placeholder for future implementation
        
        // Example using EmailJS (uncomment and configure if needed)
        /*
        if (typeof emailjs !== 'undefined') {
            try {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    phone: formData.phone,
                    newsletter: formData.newsletter
                });
                console.log('Notification email sent');
            } catch (error) {
                console.warn('Failed to send notification email:', error);
            }
        }
        */
    }
}

// ============================================
// 3. NEWSLETTER SUBSCRIPTION (Separate Handler)
// ============================================

class NewsletterHandler {
    constructor(formId, options = {}) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.options = {
            endpoint: '/api/newsletter',
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = this.form.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            const validation = ContactValidator.validateEmail(email);
            
            if (!validation.isValid) {
                this.showMessage(validation.message, 'error');
                return;
            }
            
            await this.subscribe(email);
        });
    }
    
    async subscribe(email) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
        }
        
        try {
            const response = await fetch(this.options.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, timestamp: new Date().toISOString() })
            });
            
            if (response.ok) {
                this.showMessage('Successfully subscribed! Check your email for confirmation.', 'success');
                this.form.reset();
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }
    
    showMessage(message, type) {
        const messageEl = this.form.querySelector('.newsletter-message') || (() => {
            const el = document.createElement('div');
            el.className = 'newsletter-message';
            this.form.appendChild(el);
            return el;
        })();
        
        messageEl.textContent = message;
        messageEl.className = `newsletter-message ${type}`;
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'newsletter-message';
        }, 5000);
    }
}

// ============================================
// 4. GOOGLE reCAPTCHA INTEGRATION (Optional)
// ============================================

class ReCaptchaHandler {
    constructor(siteKey, options = {}) {
        this.siteKey = siteKey;
        this.options = {
            theme: 'dark',
            size: 'normal',
            ...options
        };
        this.initialized = false;
    }
    
    load() {
        return new Promise((resolve, reject) => {
            if (this.initialized) {
                resolve(window.grecaptcha);
                return;
            }
            
            // Load reCAPTCHA script
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                this.initialized = true;
                resolve(window.grecaptcha);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    async execute(action = 'submit') {
        await this.load();
        return new Promise((resolve) => {
            window.grecaptcha.ready(async () => {
                const token = await window.grecaptcha.execute(this.siteKey, { action });
                resolve(token);
            });
        });
    }
}

// ============================================
// 5. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize main contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        window.contactHandler = new ContactFormHandler('contactForm', {
            endpoint: '/api/contact',  // Update with your actual API endpoint
            method: 'POST',
            rateLimit: 60000,
            enableAnalytics: true
        });
    }
    
    // Initialize newsletter form (if exists)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        window.newsletterHandler = new NewsletterHandler('newsletterForm', {
            endpoint: '/api/newsletter'
        });
    }
});

// ============================================
// EXPORT FOR MODULE USE
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactValidator, ContactFormHandler, NewsletterHandler, ReCaptchaHandler };
}