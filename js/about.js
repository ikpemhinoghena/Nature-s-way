// About Page JavaScript - Interactive Storytelling & Animations
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
    initializeCounters();
    initializeTeamFilter();
    initializeSustainability();
    initializeTimelineAnimations();
});

// About Page Initialization
function initializeAboutPage() {
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Load team members
    loadTeamMembers();
}

// Floating Elements Animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 1.5}s`;
    });
}

// Animated Counters
function initializeCounters() {
    const counters = [
        { element: 'yearsCounter', target: 14, duration: 2000 },
        { element: 'communitiesCounter', target: 50, duration: 2500 },
        { element: 'livesCounter', target: 10000, duration: 3000 },
        { element: 'plantsCounter', target: 500, duration: 2000 },
        { element: 'farmersCounter', target: 120, duration: 2500 },
        { element: 'landCounter', target: 250, duration: 3000 }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.element === entry.target.id);
                if (counter && !entry.target.dataset.animated) {
                    animateCounter(entry.target, counter.target, counter.duration);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        const element = document.getElementById(counter.element);
        if (element) observer.observe(element);
    });
}

function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Team Filter System
function initializeTeamFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter team members
            filterTeamMembers(filter);
        });
    });
}

function loadTeamMembers() {
    const teamData = [
        {
            name: "Dr. Oshokha Timothy",
            role: "Founder & Chief Herbalist",
            department: "herbalists",
            bio: "With over 20 years of experience in herbal medicine, Dr. Timothy combines traditional wisdom with modern scientific research to create effective healing protocols.",
            expertise: ["Traditional Medicine", "Clinical Herbalism", "Research", "Mentorship"],
            icon: "👩‍⚕️"
        },
        {
            name: "Kwame Okafor",
            role: "Head of Sustainable Sourcing",
            department: "operations",
            bio: "Kwame ensures all our herbs are ethically sourced from partner farms while maintaining the highest quality standards and supporting local communities.",
            expertise: ["Sustainable Agriculture", "Supply Chain", "Quality Control", "Community Development"],
            icon: "🌱"
        },
        {
            name: "Sarah Chen",
            role: "Education Director",
            department: "educators",
            bio: "Sarah develops our educational programs and workshops, making herbal knowledge accessible to everyone regardless of their background.",
            expertise: ["Curriculum Development", "Workshop Facilitation", "Community Education", "Digital Learning"],
            icon: "📚"
        },
        {
            name: "Michael Rodriguez",
            role: "Clinical Herbalist",
            department: "herbalists",
            bio: "Michael specializes in creating personalized wellness plans and provides one-on-one consultations to help clients achieve their health goals.",
            expertise: ["Clinical Practice", "Wellness Coaching", "Formulation", "Patient Care"],
            icon: "💊"
        },
        {
            name: "Nia Williams",
            role: "Community Outreach Manager",
            department: "operations",
            bio: "Nia builds partnerships with communities and organizations to expand access to herbal medicine and wellness education.",
            expertise: ["Partnership Development", "Community Engagement", "Event Planning", "Public Speaking"],
            icon: "🤝"
        },
        {
            name: "Dr. Ben Carter",
            role: "Research Director",
            department: "herbalists",
            bio: "Dr. Carter leads our research initiatives, validating traditional uses of herbs through scientific studies and clinical trials.",
            expertise: ["Research Methodology", "Clinical Trials", "Data Analysis", "Scientific Writing"],
            icon: "🔬"
        }
    ];

    displayTeamMembers(teamData);
    window.teamData = teamData; // Store for filtering
}

function displayTeamMembers(teamMembers) {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    teamMembers.forEach(member => {
        // Check if this is Dr. Oshokha Timothy to add custom social links
        const isFounder = member.name.includes("Oshokha Timothy");
        const twitterLink = isFounder ? "https://x.com/Oshokha_herbs" : "#";
        const emailLink = isFounder ? "mailto:oshokha.orderherbs@gmail.com" : "#";
        
        const memberCard = document.createElement('div');
        memberCard.className = `team-member ${member.department}`;
        memberCard.innerHTML = `
            <div class="member-image">
                ${member.icon}
            </div>
            <div class="member-content">
                <h3 class="member-name">${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <p class="member-bio">${member.bio}</p>
                <div class="member-expertise">
                    ${member.expertise.map(skill => `<span class="expertise-tag">${skill}</span>`).join('')}
                </div>
                <div class="member-social">
                    <a href="#" class="social-link">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="${emailLink}" class="social-link" ${isFounder ? '' : ''}>
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a href="${twitterLink}" class="social-link" ${isFounder ? 'target="_blank"' : ''}>
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(memberCard);
    });
}

function filterTeamMembers(filter) {
    if (filter === 'all') {
        displayTeamMembers(window.teamData);
    } else {
        const filteredMembers = window.teamData.filter(member => member.department === filter);
        displayTeamMembers(filteredMembers);
    }
}

// Sustainability Interactions
function initializeSustainability() {
    const impactItems = document.querySelectorAll('.impact-item');
    
    impactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active item
            impactItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Could add more interactive features here
            // like updating a main display or showing more details
        });
    });
}

// Timeline Animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all interactive elements
    document.querySelectorAll('.value-card, .certification-card, .sustainability-stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced Social Links
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-link')) {
        e.preventDefault();
        const socialLink = e.target.closest('.social-link');
        const platform = socialLink.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                        socialLink.querySelector('i').className.includes('envelope') ? 'Email' : 'Twitter';
        
        // Show a subtle notification
        showNotification(`Connecting to ${platform}...`);
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'social-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-emerald);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});