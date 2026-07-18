// assets/js/projects.js
// Projects Section JavaScript - Horizontal Scrolling & Dynamic Loading

/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. Projects Data (Optional JSON loading)
   2. Horizontal Scroll Functionality
   3. Scroll Indicators & Dots
   4. Keyboard Navigation
   5. Touch/Swipe Support for Mobile
   6. Dynamic Project Card Creation
   7. Animation on Scroll
   ============================================ */

// ============================================
// 1. PROJECTS DATA (Fallback if JSON not loaded)
// ============================================

const defaultProjectsData = [
    {
        id: 1,
        title: "Food Ordering Platform",
        description: "A full-featured online food ordering platform with menu listings, cart functionality, and secure checkout.",
        image: "assets/images/projects/project1.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        liveLink: "https://project-food-website.vercel.app/",
        codeLink: "https://github.com/shivan632/Project-Food-Website.git",
        featured: true
    },
    {
        id: 2,
        title: "University Selector",
        description: "A group project that helps students discover the best universities based on their academic performance and personal preferences.",
        image: "assets/images/projects/project2.png",
        tags: ["HTML5", "CSS3", "JavaScript", "MySQL", "Express.js"],
        liveLink: "https://university-selector.vercel.app/",
        codeLink: "https://github.com/shivan632/University-Selector.git",
        featured: true
    },
    {
        id: 3,
        title: "Adventure Explorer",
        description: "A travel-themed website showcasing a platform dedicated to adventure travel, exploration, and inspiring journeys around the world.",
        image: "assets/images/projects/project3.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        liveLink: "https://advanture-nu.vercel.app/",
        codeLink: "https://github.com/shivan632/Advanture.git",
        featured: true
    },
    {
        id: 4,
        title: "AniFlix",
        description: "Anime streaming platform delivering bite-sized anime clips and summaries from a wide range of series, featuring interactive quiz games.",
        image: "assets/images/projects/project4.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        liveLink: "https://ani-flix-two.vercel.app/",
        codeLink: "https://github.com/shivan632/AniFlix.git",
        featured: true
    },
    {
        id: 5,
        title: "QuickDoc AI",
        description: "Online telehealth platform connecting users with certified doctors via secure video consultations, personalized medical advice, and online prescriptions.",
        image: "assets/images/projects/project5.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        liveLink: "https://quick-doc-ai-rho.vercel.app/",
        codeLink: "https://github.com/shivan632/QuickDocAI.git",
        featured: true
    },
    {
        id: 6,
        title: "Brain Tumor Detection",
        description: "Deep learning-based medical imaging project that classifies brain MRI scans into different categories to assist in early tumor diagnosis.",
        image: "assets/images/projects/Project6.jpeg",
        tags: ["Python", "Machine Learning", "Deep Learning"],
        liveLink: null,
        codeLink: "https://github.com/shivan632/Brain-Tumor-MRI-Classifierr",
        featured: true
    },
    {
        id: 7,
        title: "Fish Classification",
        description: "Computer vision deep learning project that identifies and classifies different fish species from underwater images.",
        image: "assets/images/projects/Project7.png",
        tags: ["Python", "Machine Learning", "Deep Learning"],
        liveLink: null,
        codeLink: "https://github.com/shivan632/Fish-Classification.git",
        featured: true
    }
];

// ============================================
// 2. HORIZONTAL SCROLL FUNCTIONALITY
// ============================================

class ProjectsScroller {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.options = {
            cardWidth: 360,      // Width of each card in pixels
            cardGap: 25,         // Gap between cards
            scrollBehavior: 'smooth',
            autoScrollInterval: null,
            ...options
        };
        
        this.currentIndex = 0;
        this.totalCards = 0;
        this.isScrolling = false;
        this.autoScrollTimer = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.updateCardDimensions();
        this.totalCards = this.container.children.length;
        
        if (this.totalCards === 0) return;
        
        this.createScrollIndicators();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupTouchSwipe();
        this.updateButtonsState();
        
        // Initial position check
        this.checkScrollPosition();
        
        // Start auto-scroll if enabled
        if (this.options.autoScrollInterval) {
            this.startAutoScroll();
        }
    }
    
    updateCardDimensions() {
        const firstCard = this.container.querySelector('.project-card');
        if (firstCard) {
            const cardRect = firstCard.getBoundingClientRect();
            this.options.cardWidth = cardRect.width;
            // Get gap from computed style
            const containerStyle = getComputedStyle(this.container);
            const gap = containerStyle.gap;
            if (gap) {
                this.options.cardGap = parseInt(gap) || 25;
            }
        }
    }
    
    getScrollStep() {
        const containerWidth = this.container.clientWidth;
        const visibleCards = Math.floor(containerWidth / (this.options.cardWidth + this.options.cardGap));
        return Math.max(1, visibleCards);
    }
    
    getMaxScrollIndex() {
        const visibleCards = this.getScrollStep();
        return Math.max(0, this.totalCards - visibleCards);
    }
    
    scrollToIndex(index, behavior = this.options.scrollBehavior) {
        const maxIndex = this.getMaxScrollIndex();
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const scrollPosition = this.currentIndex * (this.options.cardWidth + this.options.cardGap);
        
        this.container.scrollTo({
            left: scrollPosition,
            behavior: behavior
        });
        
        this.updateButtonsState();
        this.updateActiveDot();
    }
    
    scrollNext() {
        const step = this.getScrollStep();
        this.scrollToIndex(this.currentIndex + step);
    }
    
    scrollPrev() {
        const step = this.getScrollStep();
        this.scrollToIndex(this.currentIndex - step);
    }
    
    checkScrollPosition() {
        const scrollLeft = this.container.scrollLeft;
        const cardStep = this.options.cardWidth + this.options.cardGap;
        const newIndex = Math.round(scrollLeft / cardStep);
        
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateButtonsState();
            this.updateActiveDot();
        }
    }
    
    updateButtonsState() {
        const prevBtn = document.getElementById('projectsPrevBtn');
        const nextBtn = document.getElementById('projectsNextBtn');
        const maxIndex = this.getMaxScrollIndex();
        
        if (prevBtn) {
            prevBtn.disabled = this.currentIndex <= 0;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentIndex >= maxIndex;
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('projectsPrevBtn');
        const nextBtn = document.getElementById('projectsNextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.scrollPrev());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.scrollNext());
        }
        
        // Scroll event with throttling
        let scrollTimeout;
        this.container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.checkScrollPosition();
            }, 100);
        });
        
        // Window resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateCardDimensions();
                this.scrollToIndex(this.currentIndex, 'auto');
            }, 250);
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Check if projects section is visible
            const projectsSection = document.getElementById('projects');
            if (!projectsSection) return;
            
            const rect = projectsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !e.target.matches('input, textarea, select')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.scrollPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.scrollNext();
                }
            }
        });
    }
    
    setupTouchSwipe() {
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const dx = this.touchEndX - this.touchStartX;
        const dy = this.touchEndY - this.touchStartY;
        
        // Horizontal swipe only
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
            if (dx > 0) {
                this.scrollPrev();
            } else {
                this.scrollNext();
            }
        }
    }
    
    createScrollIndicators() {
        const indicatorContainer = document.getElementById('projectsScrollIndicator');
        if (!indicatorContainer) return;
        
        indicatorContainer.innerHTML = '';
        const dotCount = this.getMaxScrollIndex() + 1;
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('scroll-dot');
            if (i === this.currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => this.scrollToIndex(i));
            indicatorContainer.appendChild(dot);
        }
    }
    
    updateActiveDot() {
        const dots = document.querySelectorAll('#projectsScrollIndicator .scroll-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoScroll() {
        if (this.autoScrollTimer) clearInterval(this.autoScrollTimer);
        
        this.autoScrollTimer = setInterval(() => {
            const maxIndex = this.getMaxScrollIndex();
            if (this.currentIndex >= maxIndex) {
                this.scrollToIndex(0);
            } else {
                this.scrollNext();
            }
        }, this.options.autoScrollInterval);
    }
    
    stopAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
            this.autoScrollTimer = null;
        }
    }
    
    destroy() {
        this.stopAutoScroll();
        // Remove event listeners if needed
    }
}

// ============================================
// 3. DYNAMIC PROJECT CARD CREATION
// ============================================

class ProjectsLoader {
    constructor(containerId, dataSource = null) {
        this.container = document.getElementById(containerId);
        this.dataSource = dataSource || defaultProjectsData;
        this.scroller = null;
    }
    
    async loadProjects() {
        if (!this.container) return;
        
        let projects = [];
        
        // Try to load from JSON if dataSource is a URL
        if (typeof this.dataSource === 'string') {
            try {
                const response = await fetch(this.dataSource);
                projects = await response.json();
            } catch (error) {
                console.warn('Failed to load projects from JSON, using default data:', error);
                projects = defaultProjectsData;
            }
        } else {
            projects = this.dataSource;
        }
        
        this.renderProjects(projects);
        this.initScroller();
    }
    
    renderProjects(projects) {
        this.container.innerHTML = '';
        
        projects.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            this.container.appendChild(card);
        });
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', project.id);
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Determine gradient colors based on index
        const gradientStart = `var(--project-${(index % 5) + 1})`;
        const gradientEnd = `var(--project-${((index + 1) % 5) + 1})`;
        card.style.setProperty('--project-gradient-start', gradientStart);
        card.style.setProperty('--project-gradient-end', gradientEnd);
        
        // Image HTML
        const imageHtml = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
        `;
        
        // Tags HTML
        const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
        
        // Links HTML
        const linksHtml = `
            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-btn live">Live Demo</a>` : ''}
            ${project.codeLink ? `<a href="${project.codeLink}" target="_blank" class="project-btn code">Code</a>` : ''}
        `;
        
        // Card content
        card.innerHTML = `
            ${imageHtml}
            <div class="project-info">
                <div class="project-tags">${tagsHtml}</div>
                <h3 class="project-title">${this.escapeHtml(project.title)}</h3>
                <p class="project-description">${this.escapeHtml(project.description)}</p>
                <div class="project-links">${linksHtml}</div>
            </div>
        `;
        
        return card;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    initScroller() {
        this.scroller = new ProjectsScroller('projectsScrollContainer', {
            autoScrollInterval: null  // Set to 5000 for auto-scroll
        });
    }
    
    destroy() {
        if (this.scroller) {
            this.scroller.destroy();
        }
    }
}

// ============================================
// 4. ANIMATION ON SCROLL FOR PROJECTS
// ============================================

function initProjectsScrollAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// 5. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if projects container exists
    const projectsContainer = document.getElementById('projectsScrollContainer');
    
    if (projectsContainer) {
        // If container has child elements (static HTML), use scroller only
        if (projectsContainer.children.length > 0) {
            window.projectsScroller = new ProjectsScroller('projectsScrollContainer', {
                autoScrollInterval: null
            });
        } else {
            // Otherwise load projects dynamically
            const projectsLoader = new ProjectsLoader('projectsScrollContainer');
            projectsLoader.loadProjects();
            window.projectsLoader = projectsLoader;
        }
        
        // Initialize scroll animation
        initProjectsScrollAnimation();
    }
});

// ============================================
// EXPORT FOR MODULE USE
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsScroller, ProjectsLoader, defaultProjectsData };
}