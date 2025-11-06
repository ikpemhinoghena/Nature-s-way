// Contact Page JavaScript - Interactive Booking & Consultation System
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
    initializeCounters();
    initializeConsultationTabs();
    initializeCalendar();
    initializeContactForm();
    initializeBookingSystem();
});

// Contact Page Initialization
function initializeContactPage() {
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize concern tags
    initializeConcernTags();
    
    // Initialize scroll animations
    initScrollAnimations();
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
        { element: 'consultationsCounter', target: 5247, duration: 2500 },
        { element: 'expertsCounter', target: 8, duration: 1500 },
        { element: 'responseCounter', target: 2, duration: 2000 }
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

// Consultation Tabs
function initializeConsultationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Slot button functionality
    const slotButtons = document.querySelectorAll('.slot-btn');
    slotButtons.forEach(button => {
        button.addEventListener('click', function() {
            slotButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Practitioner selection
    const practitionerCards = document.querySelectorAll('.practitioner-card');
    practitionerCards.forEach(card => {
        card.addEventListener('click', function() {
            practitionerCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Interactive Calendar
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    
    // Generate calendar days header
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    function generateCalendar() {
        // Clear previous dates
        const dateElements = calendarGrid.querySelectorAll('.calendar-date');
        dateElements.forEach(el => el.remove());
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        currentMonthEl.textContent = currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-date disabled';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.innerHTML = `
                <span class="date-number">${day}</span>
                <span class="date-availability">5 slots</span>
            `;
            
            const date = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (date < today) {
                dateElement.classList.add('disabled');
            } else {
                dateElement.addEventListener('click', () => selectDate(date, dateElement));
                
                // Mark today
                if (date.toDateString() === today.toDateString()) {
                    dateElement.style.background = 'var(--light-cream)';
                }
            }
            
            calendarGrid.appendChild(dateElement);
        }
    }
    
    function selectDate(date, element) {
        // Remove previous selection
        const previouslySelected = calendarGrid.querySelector('.calendar-date.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // Add new selection
        element.classList.add('selected');
        selectedDate = date;
        
        // Generate time slots for selected date
        generateTimeSlots();
        
        // Update slot preview
        updateSlotPreview();
    }
    
    function generateTimeSlots() {
        timeSlotsGrid.innerHTML = '';
        
        const timeSlots = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
        ];
        
        timeSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            
            // Randomly disable some slots for demo
            if (Math.random() > 0.7) {
                slotElement.classList.add('disabled');
            } else {
                slotElement.addEventListener('click', () => selectTime(slot, slotElement));
            }
            
            timeSlotsGrid.appendChild(slotElement);
        });
    }
    
    function selectTime(time, element) {
        // Remove previous selection
        const previouslySelected = timeSlotsGrid.querySelector('.time-slot.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // Add new selection
        element.classList.add('selected');
        selectedTime = time;
        
        // Update slot preview
        updateSlotPreview();
    }
    
    function updateSlotPreview() {
        const slotPreview = document.getElementById('slotPreview');
        
        if (selectedDate && selectedTime) {
            const formattedDate = selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            
            slotPreview.innerHTML = `
                <div class="slot-confirmed">
                    <div class="slot-date">
                        <i class="fas fa-calendar-day"></i>
                        <strong>${formattedDate}</strong>
                    </div>
                    <div class="slot-time">
                        <i class="fas fa-clock"></i>
                        <span>${selectedTime}</span>
                    </div>
                    <div class="slot-duration">
                        <i class="fas fa-stopwatch"></i>
                        <span>30 minutes</span>
                    </div>
                    <button class="btn btn-primary" id="confirmSelection">
                        <i class="fas fa-calendar-check"></i>
                        Confirm Selection
                    </button>
                </div>
            `;
            
            document.getElementById('confirmSelection').addEventListener('click', openBookingModal);
        } else {
            slotPreview.innerHTML = `
                <div class="preview-placeholder">
                    <i class="fas fa-calendar-day"></i>
                    <span>Select a time slot to continue</span>
                </div>
            `;
        }
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });
    
    // Expert selection
    const expertItems = document.querySelectorAll('.expert-item');
    expertItems.forEach(item => {
        item.addEventListener('click', function() {
            expertItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initial generation
    generateCalendar();
}

// Concern Tags
function initializeConcernTags() {
    const concernTags = document.querySelectorAll('.concern-tag');
    const selectedConcernsInput = document.getElementById('selectedConcerns');
    let selectedConcerns = [];
    
    concernTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const concern = this.dataset.concern;
            
            if (this.classList.contains('active')) {
                // Remove concern
                this.classList.remove('active');
                selectedConcerns = selectedConcerns.filter(c => c !== concern);
            } else {
                // Add concern
                this.classList.add('active');
                selectedConcerns.push(concern);
            }
            
            // Update hidden input
            selectedConcernsInput.value = selectedConcerns.join(', ');
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you within 2 hours.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset concern tags
                    document.querySelectorAll('.concern-tag').forEach(tag => {
                        tag.classList.remove('active');
                    });
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Booking System
function initializeBookingSystem() {
    const bookButtons = document.querySelectorAll('.book-consultation');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const cancelBooking = document.getElementById('cancelBooking');
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const consultationType = this.dataset.type;
            openBookingModal(consultationType);
        });
    });
    
    function openBookingModal(consultationType = 'discovery') {
        const bookingDetails = document.getElementById('bookingDetails');
        let consultationInfo = {};
        
        switch(consultationType) {
            case 'discovery':
                consultationInfo = {
                    type: 'Free Discovery Call',
                    duration: '30 minutes',
                    price: 'Complimentary',
                    description: 'Perfect for those new to herbal medicine'
                };
                break;
            case 'comprehensive':
                consultationInfo = {
                    type: 'Comprehensive Consultation',
                    duration: '90 minutes',
                    price: '$97',
                    description: 'Deep dive into your health concerns'
                };
                break;
            // Add other consultation types
        }
        
        bookingDetails.innerHTML = `
            <div class="booking-info">
                <h4>Consultation Details</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span>Type:</span>
                        <strong>${consultationInfo.type}</strong>
                    </div>
                    <div class="info-item">
                        <span>Duration:</span>
                        <strong>${consultationInfo.duration}</strong>
                    </div>
                    <div class="info-item">
                        <span>Price:</span>
                        <strong>${consultationInfo.price}</strong>
                    </div>
                </div>
                <p>${consultationInfo.description}</p>
            </div>
        `;
        
        bookingModal.style.display = 'flex';
    }
    
    if (closeBookingModal) {
        closeBookingModal.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
    }
    
    if (cancelBooking) {
        cancelBooking.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const formData = new FormData(this);
            let isValid = true;
            
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
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    bookingModal.style.display = 'none';
                    showSuccessModal();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    function showSuccessModal() {
        const successDetails = document.getElementById('successDetails');
        successDetails.innerHTML = `
            <div class="success-info">
                <div class="info-item">
                    <span>Consultation:</span>
                    <strong>Free Discovery Call</strong>
                </div>
                <div class="info-item">
                    <span>Date & Time:</span>
                    <strong>Tomorrow at 10:00 AM</strong>
                </div>
                <div class="info-item">
                    <span>Herbalist:</span>
                    <strong>Dr. Amina Johnson</strong>
                </div>
            </div>
        `;
        
        successModal.style.display = 'flex';
    }
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
    
    // Close success modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-emerald)' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add notification styles
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Utility Functions
function scrollToConsultation() {
    document.getElementById('consultation').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContactForm() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
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
    document.querySelectorAll('.method-card, .consultation-detail, .calendar-date').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Contact page loaded successfully!');
    
    // Add any final initialization here
    document.addEventListener('click', function(e) {
        if (e.target.closest('.support-btn')) {
            // Track support button clicks
            console.log('Support button clicked:', e.target.textContent);
        }
    });
});