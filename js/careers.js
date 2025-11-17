// Careers Page JavaScript - Department Filtering
document.addEventListener('DOMContentLoaded', function() {
    initializeDepartmentFilter();
    initializeFloatingElements();
});

// Department Filter System
function initializeDepartmentFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter job listings
            filterJobListings(filter);
        });
    });
}

function filterJobListings(filter) {
    const jobItems = document.querySelectorAll('.timeline-item');
    
    jobItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else {
            const department = item.dataset.department;
            if (department === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Floating Elements Animation
function initializeFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        // Add animation class
        element.style.animation = `float 6s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;
document.head.appendChild(style);