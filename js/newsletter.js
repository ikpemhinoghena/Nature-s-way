// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletter();
});

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            subscribeToNewsletter(email);
        } else {
            showMessage('Please enter a valid email address.', 'error');
        }
    });
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Subscribe to newsletter
    async function subscribeToNewsletter(email) {
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In production, this would be a real API call
            // const result = await makeAPICall('/api/newsletter/subscribe', {
            //     method: 'POST',
            //     body: JSON.stringify({ email: email })
            // });
            
            showMessage('Thank you for subscribing! Check your email for a welcome gift.', 'success');
            newsletterForm.reset();
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'homepage_newsletter'
                });
            }
            
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            showMessage('Sorry, there was an error. Please try again later.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    // Show message to user
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = newsletterForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('p');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.color = type === 'success' ? 'var(--primary-emerald)' : 'var(--secondary-amber)';
        messageEl.style.marginTop = '1rem';
        messageEl.style.fontWeight = '500';
        
        newsletterForm.appendChild(messageEl);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}