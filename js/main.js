// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cart functionality
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    const cartCountEl = document.querySelector('.cart-count');
    
    // Update cart count
    function updateCartCount(count) {
        cartCount = count;
        cartCountEl.textContent = cartCount;
        cartCountEl.style.display = count > 0 ? 'flex' : 'none';
    }

    // Add to cart buttons (will be added dynamically for herb cards)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            updateCartCount(cartCount + 1);
            
            // Add animation feedback
            const btn = e.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.background = 'var(--primary-emerald)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        }
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        // Implement search modal or redirect to search page
        alert('Search functionality will be implemented in the shop page!');
    });

    // Initialize components
    initializeHeroAnimation();
    initializeFeatureCards();
    initializeImpactAnimation();
});

// Hero section animations
function initializeHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'all 0.8s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// Feature cards hover effects
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Impact section animations
function initializeImpactAnimation() {
    const impactStats = document.querySelectorAll('.impact-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    impactStats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.6s ease';
        observer.observe(stat);
    });
}

// Utility function for loading JSON data
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// Utility function for API calls
async function makeAPICall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        return null;
    }
}