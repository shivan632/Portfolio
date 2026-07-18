// assets/js/main.js
// Main JavaScript File - Developer Portfolio

/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. DOM Ready & Initialization
   2. Theme Switcher
   3. Mobile Menu Toggle
   4. Back to Top Button
   5. Smooth Scrolling
   6. Scroll Animations
   7. Particle Background
   8. Header Scroll Effect
   9. Active Navigation Link
   10. Preloader (Optional)
   11. Keyboard Navigation
   12. Performance Optimizations
   ============================================ */

// ============================================
// 1. DOM READY & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initThemeSwitcher();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initParticleBackground();
    initHeaderScroll();
    initActiveNavLink();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ============================================
// 2. THEME SWITCHER
// ============================================

function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeOptions = document.getElementById('themeOptions');
    const body = document.body;
    
    if (!themeToggleBtn || !themeOptions) return;
    
    // Show/hide theme options
    themeToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeOptions.classList.toggle('show');
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', function(event) {
        if (!themeToggleBtn.contains(event.target) && !themeOptions.contains(event.target)) {
            themeOptions.classList.remove('show');
        }
    });
    
    // Theme selection
    const themeOptionsList = document.querySelectorAll('.theme-option');
    themeOptionsList.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove all theme classes
            body.classList.remove('theme-skyblue', 'theme-purple', 'theme-redgold', 'theme-teal');
            
            // Add selected theme class
            if (theme !== 'default') {
                body.classList.add(`theme-${theme}`);
            }
            
            // Close theme options
            themeOptions.classList.remove('show');
            
            // Save theme preference to localStorage
            localStorage.setItem('portfolio-theme', theme);
            
            // Update particle colors if needed
            if (window.updateParticleColors) {
                window.updateParticleColors();
            }
        });
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && savedTheme !== 'default') {
        body.classList.add(`theme-${savedTheme}`);
    }
}

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Close menu on window resize (if screen becomes desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ============================================
// 4. BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 5. SMOOTH SCROLLING
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================================
// 6. SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate, .fade-in, .slide-in');
    
    if (animatedElements.length === 0) return;
    
    // Set initial state for animated elements
    animatedElements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// 7. PARTICLE BACKGROUND
// ============================================

function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId = null;
    
    // Get theme colors dynamically
    function getThemeColors() {
        const styles = getComputedStyle(document.documentElement);
        return {
            accent1: styles.getPropertyValue('--accent-color').trim(),
            accent2: styles.getPropertyValue('--accent-secondary').trim()
        };
    }
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            const colors = getThemeColors();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = Math.random() > 0.5 ? colors.accent1 : colors.accent2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    // Initialize particles
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Draw connections between particles
    function drawConnections() {
        const connectionDistance = 120;
        
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.strokeStyle = getThemeColors().accent1;
                    ctx.globalAlpha = opacity;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        drawConnections();
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    // Update particle colors when theme changes
    window.updateParticleColors = function() {
        particlesArray.forEach(particle => {
            const colors = getThemeColors();
            particle.color = Math.random() > 0.5 ? colors.accent1 : colors.accent2;
        });
    };
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setCanvasSize();
            initParticles();
        }, 250);
    });
    
    // Initialize
    setCanvasSize();
    initParticles();
    animateParticles();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// ============================================
// 8. HEADER SCROLL EFFECT
// ============================================

function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.padding = '0';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '';
        }
    });
}

// ============================================
// 9. ACTIVE NAVIGATION LINK
// ============================================

function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ============================================
// 10. PRELOADER (OPTIONAL)
// ============================================

function initPreloader() {
    // Check if preloader exists
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// ============================================
// 11. KEYBOARD NAVIGATION
// ============================================

function initKeyboardNavigation() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('[data-search]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals/menus
        if (e.key === 'Escape') {
            const themeOptions = document.getElementById('themeOptions');
            if (themeOptions && themeOptions.classList.contains('show')) {
                themeOptions.classList.remove('show');
            }
            
            const mobileMenu = document.querySelector('.nav-links');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close any open modals
            const openModals = document.querySelectorAll('.modal.active, .certificate-modal.active');
            openModals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

// ============================================
// 12. PERFORMANCE OPTIMIZATIONS
// ============================================

function initPerformanceOptimizations() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Trigger any resize-dependent functions
            if (window.updateParticleColors) {
                window.updateParticleColors();
            }
        }, 250);
    });
    
    // Reduce motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-motion');
        
        // Disable CSS transitions
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// EXPORT FUNCTIONS FOR MODULE USE (Optional)
// ============================================

// For potential future module bundler usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeSwitcher,
        initMobileMenu,
        initBackToTop,
        initSmoothScroll,
        initScrollAnimations,
        initParticleBackground
    };
}