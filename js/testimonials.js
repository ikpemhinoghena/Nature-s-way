// Testimonials Page JavaScript - Interactive Stories & Social Proof
document.addEventListener('DOMContentLoaded', function() {
    initializeTestimonialsPage();
    initializeCounters();
    initializeTestimonialFilters();
    initializeStoryForm();
    loadFeaturedStories();
    loadTestimonials();
});

// Testimonials Page Initialization
function initializeTestimonialsPage() {
    // Initialize any page-specific animations
    initTestimonialAnimations();
    
    // Initialize helpful buttons
    initializeHelpfulButtons();
}

// Animated Counters
function initializeCounters() {
    const counters = [
        { element: 'storiesCounter', target: 1247, duration: 2000 },
        { element: 'satisfactionCounter', target: 95, duration: 2500 },
        { element: 'yearsCounter', target: 14, duration: 1500 },
        { element: 'digestiveStat', target: 89, duration: 2000 },
        { element: 'energyStat', target: 92, duration: 2200 },
        { element: 'sleepStat', target: 78, duration: 2400 },
        { element: 'stressStat', target: 85, duration: 2600 }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.element === entry.target.id);
                if (counter && !entry.target.dataset.animated) {
                    if (entry.target.id.includes('Stat')) {
                        animatePercentageCounter(entry.target, counter.target, counter.duration);
                    } else {
                        animateCounter(entry.target, counter.target, counter.duration);
                    }
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

function animatePercentageCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Featured Stories
function loadFeaturedStories() {
    const featuredStories = [
        {
            name: "Maria Rodriguez",
            condition: "Chronic Fatigue & Low Energy",
            avatar: "👩",
            story: "After years of struggling with constant fatigue and brain fog, I was skeptical about herbal remedies. But within two weeks of starting the adaptogen blend, I noticed a significant improvement in my energy levels. Now, six months later, I have the vitality I haven't experienced since my twenties.",
            results: [
                "Energy levels increased by 80%",
                "Mental clarity and focus restored",
                "Better sleep quality",
                "Improved exercise endurance"
            ],
            herbs: ["Ashwagandha", "Rhodiola", "Holy Basil", "Moringa"],
            rating: 5,
            duration: "6 months",
            featured: true
        },
        {
            name: "James Chen",
            condition: "Digestive Issues (IBS)",
            avatar: "👨",
            story: "IBS had controlled my life for over a decade. I'd tried everything from prescription medications to elimination diets with limited success. The digestive support blend, combined with dietary changes recommended by the herbalist, has given me freedom I never thought possible.",
            results: [
                "90% reduction in bloating and discomfort",
                "Regular digestion without medication",
                "Able to enjoy foods I previously avoided",
                "No more emergency situations"
            ],
            herbs: ["Peppermint", "Ginger", "Chamomile", "Fennel"],
            rating: 5,
            duration: "4 months",
            featured: true
        }
    ];

    displayFeaturedStories(featuredStories);
}

function displayFeaturedStories(stories) {
    const grid = document.querySelector('.stories-grid');
    grid.innerHTML = '';

    stories.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.className = 'featured-story';
        storyElement.innerHTML = `
            <div class="story-content">
                <div class="story-meta">
                    <div class="story-avatar">
                        ${story.avatar}
                    </div>
                    <div class="story-author">
                        <h4>${story.name}</h4>
                        <span>Verified Customer • ${story.duration}</span>
                    </div>
                </div>
                
                <div class="story-condition">${story.condition}</div>
                
                <div class="story-text">
                    "${story.story}"
                </div>
                
                <div class="story-results">
                    <h5><i class="fas fa-chart-line"></i> Measurable Results</h5>
                    <ul>
                        ${story.results.map(result => `<li><i class="fas fa-check"></i> ${result}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="story-herbs">
                    ${story.herbs.map(herb => `<span class="herb-tag">${herb}</span>`).join('')}
                </div>
                
                <div class="story-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-book-open"></i>
                        Read Full Story
                    </button>
                    <button class="btn btn-outline helpful-btn" data-helpful="true">
                        <i class="fas fa-thumbs-up"></i>
                        Helpful
                    </button>
                </div>
            </div>
            <div class="story-visual">
                <i class="fas fa-heartbeat"></i>
            </div>
        `;
        grid.appendChild(storyElement);
    });
}

// Testimonials Gallery
function loadTestimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            condition: "Stress & Anxiety",
            avatar: "👩‍💼",
            text: "The stress support blend has been life-changing. I feel calmer and more centered, even during high-pressure situations at work.",
            herbs: ["Ashwagandha", "Holy Basil", "Lemon Balm"],
            rating: 5,
            date: "2 weeks ago",
            helpful: 24,
            verified: true
        },
        {
            name: "Michael Brown",
            condition: "Joint Pain",
            avatar: "👨‍🌾",
            text: "After years of joint pain, the turmeric and ginger combination has provided relief that prescription anti-inflammatories never did.",
            herbs: ["Turmeric", "Ginger", "Boswellia"],
            rating: 5,
            date: "1 month ago",
            helpful: 18,
            verified: true
        },
        {
            name: "Aisha Patel",
            condition: "Skin Health",
            avatar: "👩‍🎓",
            text: "My adult acne cleared up completely after using the skin detox tea for three months. I'm finally confident without makeup!",
            herbs: ["Neem", "Burdock Root", "Dandelion"],
            rating: 5,
            date: "3 months ago",
            helpful: 31,
            verified: true,
            featured: true
        },
        {
            name: "David Kim",
            condition: "Sleep Issues",
            avatar: "👨‍💻",
            text: "The sleep support formula helps me fall asleep naturally and wake up refreshed. No more groggy mornings from sleep aids.",
            herbs: ["Valerian Root", "Chamomile", "Passionflower"],
            rating: 4,
            date: "2 months ago",
            helpful: 15,
            verified: true
        },
        {
            name: "Emily Wilson",
            condition: "Immune Support",
            avatar: "👩‍🏫",
            text: "Since starting the immune support herbs, I haven't caught a single cold this season despite working in a school.",
            herbs: ["Elderberry", "Echinacea", "Astragalus"],
            rating: 5,
            date: "4 months ago",
            helpful: 22,
            verified: true
        },
        {
            name: "Robert Garcia",
            condition: "Digestive Health",
            avatar: "👨‍🔧",
            text: "The digestive bitters have completely resolved my bloating and indigestion issues. Wish I found this years ago.",
            herbs: ["Gentian", "Dandelion", "Orange Peel"],
            rating: 5,
            date: "3 weeks ago",
            helpful: 12,
            verified: true
        }
    ];

    displayTestimonials(testimonials);
    window.allTestimonials = testimonials; // Store for filtering
}

function displayTestimonials(testimonials) {
    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = '';

    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = `testimonial-card ${testimonial.featured ? 'featured' : ''}`;
        card.innerHTML = `
            ${testimonial.featured ? '<div class="featured-badge">Featured</div>' : ''}
            
            <div class="testimonial-header">
                <div class="testimonial-avatar">
                    ${testimonial.avatar}
                </div>
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.verified ? 'Verified Customer' : 'Customer'} • ${testimonial.date}</span>
                </div>
                <div class="testimonial-rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                </div>
            </div>
            
            <div class="testimonial-condition">${testimonial.condition}</div>
            
            <div class="testimonial-text">
                "${testimonial.text}"
            </div>
            
            <div class="testimonial-herbs">
                ${testimonial.herbs.map(herb => `<span class="herb-pill">${herb}</span>`).join('')}
            </div>
            
            <div class="testimonial-footer">
                <span>Was this helpful?</span>
                <div class="helpful-buttons">
                    <button class="helpful-btn" data-helpful="true">
                        <i class="fas fa-thumbs-up"></i>
                        Yes (${testimonial.helpful})
                    </button>
                    <button class="helpful-btn" data-helpful="false">
                        <i class="fas fa-thumbs-down"></i>
                        No
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-initialize helpful buttons for new testimonials
    initializeHelpfulButtons();
}

// Testimonial Filtering
function initializeTestimonialFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('testimonialSort');
    const loadMoreBtn = document.getElementById('loadMoreTestimonials');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter testimonials
            filterTestimonials(filter);
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortTestimonials(this.value);
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTestimonials);
    }
}

function filterTestimonials(filter) {
    if (filter === 'all') {
        displayTestimonials(window.allTestimonials);
    } else {
        const filtered = window.allTestimonials.filter(testimonial => 
            testimonial.condition.toLowerCase().includes(filter) ||
            testimonial.herbs.some(herb => herb.toLowerCase().includes(filter))
        );
        displayTestimonials(filtered);
    }
}

function sortTestimonials(sortBy) {
    let sortedTestimonials = [...window.allTestimonials];
    
    switch(sortBy) {
        case 'newest':
            // For demo, we'll sort by the order in array (newest first)
            break;
        case 'oldest':
            sortedTestimonials.reverse();
            break;
        case 'rating':
            sortedTestimonials.sort((a, b) => b.rating - a.rating);
            break;
        case 'helpful':
            sortedTestimonials.sort((a, b) => b.helpful - a.helpful);
            break;
    }
    
    displayTestimonials(sortedTestimonials);
}

function loadMoreTestimonials() {
    // In a real implementation, this would load more testimonials from an API
    const loadMoreBtn = document.getElementById('loadMoreTestimonials');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
        // Simulate loading more testimonials
        const additionalTestimonials = [
            {
                name: "Lisa Thompson",
                condition: "Hormonal Balance",
                avatar: "👩‍⚕️",
                text: "The women's balance formula has regulated my cycle and reduced PMS symptoms significantly.",
                herbs: ["Chasteberry", "Dong Quai", "Black Cohosh"],
                rating: 5,
                date: "5 months ago",
                helpful: 19,
                verified: true
            },
            {
                name: "Carlos Mendez",
                condition: "Respiratory Health",
                avatar: "👨‍🍳",
                text: "The lung support tea helped clear my chronic cough that persisted after a respiratory infection.",
                herbs: ["Mullein", "Thyme", "Licorice Root"],
                rating: 4,
                date: "2 months ago",
                helpful: 11,
                verified: true
            }
        ];

        window.allTestimonials.push(...additionalTestimonials);
        displayTestimonials(window.allTestimonials);
        
        loadMoreBtn.innerHTML = '<i class="fas fa-redo"></i> Load More Stories';
        loadMoreBtn.disabled = false;
        
        // Hide button if we've loaded "all" testimonials
        if (window.allTestimonials.length >= 8) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

// Helpful Buttons
function initializeHelpfulButtons() {
    document.querySelectorAll('.helpful-btn').forEach(button => {
        button.addEventListener('click', function() {
            const isHelpful = this.dataset.helpful === 'true';
            const countElement = this.querySelector('span') || this;
            let currentCount = parseInt(countElement.textContent.match(/\d+/)) || 0;
            
            if (this.classList.contains('active')) {
                // Already voted, remove vote
                currentCount += isHelpful ? -1 : 1;
                this.classList.remove('active');
                countElement.innerHTML = countElement.innerHTML.replace(/\d+/, currentCount);
            } else {
                // New vote
                currentCount += isHelpful ? 1 : -1;
                this.classList.add('active');
                
                // Remove active class from opposite button in same group
                const buttons = this.closest('.helpful-buttons').querySelectorAll('.helpful-btn');
                buttons.forEach(btn => {
                    if (btn !== this && btn.classList.contains('active')) {
                        btn.classList.remove('active');
                        const oppositeCount = parseInt(btn.textContent.match(/\d+/)) || 0;
                        btn.innerHTML = btn.innerHTML.replace(/\d+/, isHelpful ? oppositeCount - 1 : oppositeCount + 1);
                    }
                });
                
                countElement.innerHTML = countElement.innerHTML.replace(/\d+/, currentCount);
            }
            
            // Visual feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Story Submission Form
function initializeStoryForm() {
    const storyForm = document.getElementById('storyForm');
    const uploadMediaBtn = document.getElementById('uploadMedia');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            let isValid = true;
            
            // Check required fields
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success modal
                    successModal.style.display = 'flex';
                    
                    // Reset form
                    this.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    if (uploadMediaBtn) {
        uploadMediaBtn.addEventListener('click', function() {
            // In a real implementation, this would trigger file upload
            alert('Photo upload feature would open here. You could add before/after photos to make your story more impactful!');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
}

// Video Testimonial Interactions
function initTestimonialAnimations() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        container.addEventListener('click', function() {
            // In a real implementation, this would play the video
            const videoTitle = this.querySelector('span').textContent;
            alert(`Playing video: ${videoTitle}\n\nIn a real implementation, this would embed and play the actual customer video testimonial.`);
        });
    });
}

// Scroll Animations
function initTestimonialAnimations() {
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

    // Observe all testimonial cards and featured stories
    document.querySelectorAll('.testimonial-card, .featured-story, .video-testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    // Add any final initialization here
    console.log('Testimonials page loaded successfully!');
});