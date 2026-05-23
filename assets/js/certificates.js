// assets/js/certificates.js
// Certificates Section JavaScript - Infinite Marquee & Modal Functionality

/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. Certificate Data Store
   2. Marquee / Infinite Scroll Control
   3. Certificate Modal Management
   4. Modal Interactions (Open/Close/Copy/Download)
   5. Dynamic Certificate Loading
   6. Animation Controls (Pause/Play/Reset)
   7. Responsive Adjustments
   ============================================ */

// ============================================
// 1. CERTIFICATE DATA STORE
// ============================================

const certificatesData = {
    1: {
        id: "cert1",
        name: "Web Development Fundamentals",
        issuer: "Coursera",
        date: "June 2023",
        credentialId: "CRS-WD-2023-001",
        description: "Completed comprehensive course covering HTML, CSS, and JavaScript fundamentals. This certificate validates proficiency in front-end web development technologies and responsive design principles.",
        image: "assets/images/certificates/cert1.jpg",
        verifyLink: "https://coursera.org/verify/example1",
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    2: {
        id: "cert2",
        name: "Python for Data Science",
        issuer: "IBM",
        date: "August 2023",
        credentialId: "IBM-PDS-2023-002",
        description: "Mastered Python programming for data analysis and visualization. This certificate demonstrates expertise in using Python libraries like Pandas, NumPy, and Matplotlib for data manipulation and visualization.",
        image: "assets/images/certificates/cert2.jpg",
        verifyLink: "https://ibm.com/verify/example2",
        skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization"]
    },
    3: {
        id: "cert3",
        name: "Database Management",
        issuer: "Oracle",
        date: "October 2023",
        credentialId: "ORC-DB-2023-003",
        description: "Learned SQL fundamentals and database design principles. This certificate validates skills in database normalization, SQL queries, and database administration concepts.",
        image: "assets/images/certificates/cert3.jpg",
        verifyLink: "https://oracle.com/verify/example3",
        skills: ["SQL", "MySQL", "Database Design", "Normalization", "Query Optimization"]
    },
    4: {
        id: "cert4",
        name: "JavaScript Algorithms",
        issuer: "freeCodeCamp",
        date: "December 2023",
        credentialId: "FCC-JS-2023-004",
        description: "Completed 300+ hours of JavaScript algorithm challenges. This certificate demonstrates proficiency in JavaScript programming, data structures, and algorithm implementation.",
        image: "assets/images/certificates/cert4.jpg",
        verifyLink: "https://freecodecamp.org/verify/example4",
        skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"]
    },
    5: {
        id: "cert5",
        name: "React Development",
        issuer: "Meta",
        date: "February 2024",
        credentialId: "META-RCT-2024-005",
        description: "Built interactive UIs with React and modern frontend tools. This certificate validates skills in React components, state management, hooks, and modern frontend development practices.",
        image: "assets/images/certificates/cert5.jpg",
        verifyLink: "https://meta.com/verify/example5",
        skills: ["React", "Hooks", "Components", "State Management", "Frontend"]
    },
    6: {
        id: "cert6",
        name: "Cloud Computing Basics",
        issuer: "AWS",
        date: "April 2024",
        credentialId: "AWS-CC-2024-006",
        description: "Introduction to cloud services and deployment strategies. This certificate demonstrates understanding of cloud computing concepts, AWS services, and cloud deployment methodologies.",
        image: "assets/images/certificates/cert6.jpg",
        verifyLink: "https://aws.amazon.com/verify/example6",
        skills: ["Cloud Computing", "AWS", "Deployment", "Cloud Services"]
    },
    7: {
        id: "cert7",
        name: "GenAI Academy Completion",
        issuer: "Hack2Skill",
        date: "January 2025",
        credentialId: "H2S-GENAI-2025-007",
        description: "Completed the GenAI Academy — the first phase of the GenAI Exchange Hackathon — gaining hands-on experience with generative AI concepts, tools, and real-world applications.",
        image: "assets/images/certificates/cert7.jpg",
        verifyLink: "https://hack2skill.com/verify/example7",
        skills: ["Generative AI", "LLMs", "Prompt Engineering", "AI Tools"]
    },
    8: {
        id: "cert8",
        name: "BCG Data Science Simulation",
        issuer: "BCG / Forage",
        date: "March 2025",
        credentialId: "BCG-DS-2025-008",
        description: "Completed a virtual job simulation focused on practical data science tasks, including data cleaning, exploratory analysis, and predictive modeling to solve real business problems.",
        image: "assets/images/certificates/cert8.jpg",
        verifyLink: "https://forage.com/verify/example8",
        skills: ["Data Cleaning", "EDA", "Predictive Modeling", "Business Analytics"]
    }
};

// ============================================
// 2. MARQUEE / INFINITE SCROLL CONTROL
// ============================================

class MarqueeScroller {
    constructor(trackId, options = {}) {
        this.track = document.getElementById(trackId);
        if (!this.track) return;
        
        this.options = {
            speed: 35,           // Animation duration in seconds
            pauseOnHover: true,
            autoPlay: true,
            ...options
        };
        
        this.isPaused = false;
        this.animationName = 'scrollCertificates';
        this.init();
    }
    
    init() {
        // Set animation speed
        this.track.style.animation = `${this.animationName} ${this.options.speed}s linear infinite`;
        
        // Pause on hover
        if (this.options.pauseOnHover) {
            const container = this.track.parentElement;
            if (container) {
                container.addEventListener('mouseenter', () => this.pause());
                container.addEventListener('mouseleave', () => this.play());
            }
        }
        
        // Setup control button
        this.setupControlButton();
    }
    
    setupControlButton() {
        const controlBtn = document.getElementById('toggleMarqueeBtn');
        if (!controlBtn) return;
        
        controlBtn.addEventListener('click', () => {
            if (this.isPaused) {
                this.play();
            } else {
                this.pause();
            }
        });
    }
    
    pause() {
        if (this.isPaused) return;
        this.isPaused = true;
        this.track.style.animationPlayState = 'paused';
        this.updateControlButton(true);
    }
    
    play() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.track.style.animationPlayState = 'running';
        this.updateControlButton(false);
    }
    
    updateControlButton(isPaused) {
        const controlBtn = document.getElementById('toggleMarqueeBtn');
        if (!controlBtn) return;
        
        if (isPaused) {
            controlBtn.innerHTML = '<i class="fas fa-play"></i> Play Scroll';
        } else {
            controlBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Scroll';
        }
    }
    
    setSpeed(speed) {
        this.options.speed = speed;
        this.track.style.animationDuration = `${speed}s`;
    }
    
    destroy() {
        this.track.style.animation = 'none';
        this.isPaused = false;
    }
}

// ============================================
// 3. CERTIFICATE MODAL MANAGEMENT
// ============================================

class CertificateModal {
    constructor() {
        this.modal = document.getElementById('certificateModal');
        this.isOpen = false;
        
        if (!this.modal) return;
        
        this.modalElements = {
            name: document.getElementById('modalCertName'),
            issuer: document.getElementById('modalCertIssuer'),
            date: document.getElementById('modalCertDate'),
            credentialId: document.getElementById('modalCertId'),
            description: document.getElementById('modalCertDesc'),
            image: document.getElementById('modalCertImage'),
            verifyLink: document.getElementById('verifyCertLink'),
            skillsContainer: document.getElementById('modalCertSkills'),
            downloadBtn: document.getElementById('downloadCertBtn')
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupCertificateCards();
        this.setupKeyboardNavigation();
    }
    
    setupEventListeners() {
        // Close button
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('modal-overlay')) {
                this.close();
            }
        });
        
        // Download button
        if (this.modalElements.downloadBtn) {
            this.modalElements.downloadBtn.addEventListener('click', () => this.downloadCertificate());
        }
    }
    
    setupCertificateCards() {
        // For cards with data-certificate attribute (JSON string)
        const cardsWithData = document.querySelectorAll('.certificate-card[data-certificate]');
        cardsWithData.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the button
                if (e.target.closest('.view-certificate-btn')) return;
                this.openFromDataAttribute(card);
            });
            
            const btn = card.querySelector('.view-certificate-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openFromDataAttribute(card);
                });
            }
        });
        
        // For cards with data-id attribute (reference to certificatesData)
        const cardsWithId = document.querySelectorAll('.certificate-card[data-certificate-id]');
        cardsWithId.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-certificate-id');
                this.openById(id);
            });
        });
    }
    
    openFromDataAttribute(card) {
        const certDataAttr = card.getAttribute('data-certificate');
        if (certDataAttr) {
            try {
                const certData = JSON.parse(certDataAttr);
                this.open(certData);
            } catch (err) {
                console.error('Failed to parse certificate data:', err);
            }
        }
    }
    
    openById(id) {
        const certData = certificatesData[id];
        if (certData) {
            this.open(certData);
        } else {
            console.error(`Certificate with id ${id} not found`);
        }
    }
    
    open(certData) {
        if (!this.modal) return;
        
        // Set content
        if (this.modalElements.name) {
            this.modalElements.name.textContent = certData.name;
        }
        if (this.modalElements.issuer) {
            this.modalElements.issuer.textContent = certData.issuer;
        }
        if (this.modalElements.date) {
            this.modalElements.date.textContent = certData.date;
        }
        if (this.modalElements.credentialId) {
            this.modalElements.credentialId.textContent = certData.credentialId;
        }
        if (this.modalElements.description) {
            this.modalElements.description.textContent = certData.description;
        }
        if (this.modalElements.image) {
            this.modalElements.image.src = certData.image || 'assets/images/certificates/placeholder.jpg';
            this.modalElements.image.alt = certData.name;
        }
        if (this.modalElements.verifyLink) {
            this.modalElements.verifyLink.href = certData.verifyLink || '#';
        }
        
        // Set skills
        if (this.modalElements.skillsContainer && certData.skills) {
            this.modalElements.skillsContainer.innerHTML = certData.skills.map(skill => 
                `<span>${this.escapeHtml(skill)}</span>`
            ).join('');
        }
        
        // Store current certificate data for download
        this.currentCertificate = certData;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }
    
    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        this.currentCertificate = null;
    }
    
    downloadCertificate() {
        if (!this.currentCertificate) {
            console.warn('No certificate data available for download');
            return;
        }
        
        // Create a simple PDF/Image download simulation
        // In production, you would generate a PDF or provide the actual file
        
        const certName = this.currentCertificate.name;
        const certIssuer = this.currentCertificate.issuer;
        
        // Show notification
        this.showNotification(`Downloading certificate: ${certName} from ${certIssuer}`, 'info');
        
        // Simulate download delay
        setTimeout(() => {
            // Create a blob from certificate image (if available)
            if (this.modalElements.image && this.modalElements.image.src) {
                const link = document.createElement('a');
                link.href = this.modalElements.image.src;
                link.download = `${certName.replace(/\s+/g, '_')}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Fallback: Create a text certificate
                this.generateTextCertificate();
            }
            
            this.showNotification(`Certificate "${certName}" downloaded successfully!`, 'success');
        }, 500);
    }
    
    generateTextCertificate() {
        const cert = this.currentCertificate;
        const content = `
            CERTIFICATE OF COMPLETION
            =========================
            
            This certificate is awarded to:
            SHIVAN MISHRA
            
            For successfully completing:
            ${cert.name}
            
            Issued by: ${cert.issuer}
            Date: ${cert.date}
            Credential ID: ${cert.credentialId}
            
            =========================
            Verify at: ${cert.verifyLink}
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${cert.name.replace(/\s+/g, '_')}_certificate.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showNotification(message, type = 'info') {
        // Create temporary notification element
        const notification = document.createElement('div');
        notification.className = `cert-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 8px;
            border-left: 4px solid ${type === 'success' ? '#4caf50' : 'var(--accent-color)'};
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow);
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// ============================================
// 4. COPY CREDENTIAL ID FUNCTIONALITY
// ============================================

function copyCredentialId() {
    const idElement = document.getElementById('modalCertId');
    if (!idElement) return;
    
    const credentialId = idElement.textContent;
    
    navigator.clipboard.writeText(credentialId).then(() => {
        // Show success feedback
        const copyBtn = document.querySelector('.copy-id-btn');
        if (copyBtn) {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        }
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Credential ID copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ============================================
// 5. DYNAMIC CERTIFICATE LOADING
// ============================================

class CertificatesLoader {
    constructor(containerId, dataSource = null) {
        this.container = document.getElementById(containerId);
        this.dataSource = dataSource || certificatesData;
        this.marquee = null;
    }
    
    async loadCertificates() {
        if (!this.container) return;
        
        let certificates = [];
        
        // Try to load from JSON if dataSource is a URL
        if (typeof this.dataSource === 'string') {
            try {
                const response = await fetch(this.dataSource);
                certificates = await response.json();
            } catch (error) {
                console.warn('Failed to load certificates from JSON, using default data:', error);
                certificates = Object.values(certificatesData);
            }
        } else if (Array.isArray(this.dataSource)) {
            certificates = this.dataSource;
        } else {
            certificates = Object.values(this.dataSource);
        }
        
        this.renderCertificates(certificates);
        this.initMarquee();
        this.initModal();
    }
    
    renderCertificates(certificates) {
        this.container.innerHTML = '';
        
        // Create original certificates
        certificates.forEach((cert, index) => {
            const card = this.createCertificateCard(cert, index);
            this.container.appendChild(card);
        });
        
        // Create clones for seamless scrolling (first 4 certificates)
        const clonesToCreate = Math.min(4, certificates.length);
        for (let i = 0; i < clonesToCreate; i++) {
            const cloneCard = this.createCertificateCard(certificates[i], i, true);
            cloneCard.classList.add('clone');
            this.container.appendChild(cloneCard);
        }
    }
    
    createCertificateCard(cert, index, isClone = false) {
        const card = document.createElement('div');
        card.className = 'certificate-card';
        if (isClone) card.classList.add('clone');
        card.setAttribute('data-certificate', JSON.stringify(cert));
        
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Determine icon class based on certificate name
        let iconClass = 'fas fa-certificate';
        if (cert.name.toLowerCase().includes('python')) iconClass = 'fab fa-python';
        else if (cert.name.toLowerCase().includes('web')) iconClass = 'fas fa-code';
        else if (cert.name.toLowerCase().includes('database')) iconClass = 'fas fa-database';
        else if (cert.name.toLowerCase().includes('javascript')) iconClass = 'fab fa-js';
        else if (cert.name.toLowerCase().includes('react')) iconClass = 'fab fa-react';
        else if (cert.name.toLowerCase().includes('cloud')) iconClass = 'fas fa-cloud';
        else if (cert.name.toLowerCase().includes('ai')) iconClass = 'fas fa-robot';
        else if (cert.name.toLowerCase().includes('data')) iconClass = 'fas fa-chart-line';
        
        // Skills tags
        const skillsHtml = cert.skills ? cert.skills.slice(0, 3).map(skill => 
            `<span>${this.escapeHtml(skill)}</span>`
        ).join('') : '';
        
        card.innerHTML = `
            <div class="certificate-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3 class="certificate-title">${this.escapeHtml(cert.name)}</h3>
            <p class="certificate-issuer">${this.escapeHtml(cert.issuer)}</p>
            <p class="certificate-date">${cert.date}</p>
            <div class="certificate-tags">${skillsHtml}</div>
            <button class="view-certificate-btn">View Certificate <i class="fas fa-arrow-right"></i></button>
        `;
        
        return card;
    }
    
    initMarquee() {
        const track = document.getElementById('certificatesTrack');
        if (track) {
            this.marquee = new MarqueeScroller('certificatesTrack', {
                speed: 35,
                pauseOnHover: true,
                autoPlay: true
            });
        }
    }
    
    initModal() {
        window.certificateModal = new CertificateModal();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    destroy() {
        if (this.marquee) {
            this.marquee.destroy();
        }
    }
}

// ============================================
// 6. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if certificates track exists
    const certificatesTrack = document.getElementById('certificatesTrack');
    
    if (certificatesTrack) {
        // If track has child elements (static HTML), use marquee and modal only
        if (certificatesTrack.children.length > 0) {
            window.marqueeScroller = new MarqueeScroller('certificatesTrack', {
                speed: 35,
                pauseOnHover: true,
                autoPlay: true
            });
            window.certificateModal = new CertificateModal();
        } else {
            // Otherwise load certificates dynamically
            const certificatesLoader = new CertificatesLoader('certificatesTrack');
            certificatesLoader.loadCertificates();
            window.certificatesLoader = certificatesLoader;
        }
    }
});

// ============================================
// EXPORT FOR MODULE USE
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarqueeScroller, CertificateModal, CertificatesLoader, certificatesData, copyCredentialId };
}