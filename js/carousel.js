class HerbCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.currentIndex = 0;
        this.herbs = [
            {
                id: 'turmeric',
                name: 'Turmeric',
                description: 'Powerful anti-inflammatory and antioxidant properties',
                price: '$12.99',
                image: 'images/herbs/turmeric.jpg',
                category: 'Roots'
            },
            {
                id: 'ginger',
                name: 'Ginger',
                description: 'Aids digestion and reduces nausea',
                price: '$9.99',
                image: 'images/herbs/ginger.jpg',
                category: 'Roots'
            },
            {
                id: 'echinacea',
                name: 'Echinacea',
                description: 'Boosts immune system function',
                price: '$14.99',
                image: 'images/herbs/echinacea.jpg',
                category: 'Flowers'
            },
            {
                id: 'lavender',
                name: 'Lavender',
                description: 'Promotes relaxation and better sleep',
                price: '$11.99',
                image: 'images/herbs/lavender.jpg',
                category: 'Flowers'
            },
            {
                id: 'chamomile',
                name: 'Chamomile',
                description: 'Reduces stress and aids sleep',
                price: '$8.99',
                image: 'images/herbs/chamomile.jpg',
                category: 'Flowers'
            },
            {
                id: 'peppermint',
                name: 'Peppermint',
                description: 'Improves digestion and relieves headaches',
                price: '$10.99',
                image: 'images/herbs/peppermint.jpg',
                category: 'Leaves'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderCarousel();
        this.attachEventListeners();
        this.startAutoPlay();
    }
    
    renderCarousel() {
        this.track.innerHTML = '';
        this.herbs.forEach((herb, index) => {
            const herbCard = this.createHerbCard(herb);
            this.track.appendChild(herbCard);
        });
        
        this.updateCarousel();
    }
    
    createHerbCard(herb) {
        const card = document.createElement('div');
        card.className = 'herb-card';
        card.innerHTML = `
            <div class="herb-image">
                <img src="${herb.image}" alt="${herb.name}">
                <div class="herb-badge">${herb.category}</div>
            </div>
            <div class="herb-info">
                <h3>${herb.name}</h3>
                <p>${herb.description}</p>
                <div class="herb-meta">
                    <span class="herb-price">${herb.price}</span>
                </div>
                <button class="btn btn-primary herb-action-btn" data-herb-id="${herb.id}" data-herb-name="${herb.name}">
                    <i class="fas fa-shopping-basket"></i>
                    Get Now
                </button>
            </div>
        `;
        return card;
    }
    
    updateCarousel() {
        const cardWidth = this.track.querySelector('.herb-card').offsetWidth + 20;
        this.track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
    }
    
    nextSlide() {
        if (this.currentIndex < this.herbs.length - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    attachEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Add event delegation for herb action buttons
        this.track.addEventListener('click', (e) => {
            if (e.target.classList.contains('herb-action-btn')) {
                const herbId = e.target.getAttribute('data-herb-id');
                const herbName = e.target.getAttribute('data-herb-name');
                this.navigateToShop(herbId, herbName);
            }
        });
        
        // Touch events for mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    navigateToShop(herbId, herbName) {
        // Navigate to shop page with herb filter
        window.location.href = `shop.html?filter=${encodeURIComponent(herbName)}`;
    }
    
    startAutoPlay() {
        setInterval(() => {
            if (this.currentIndex < this.herbs.length - 1) {
                this.nextSlide();
            } else {
                this.currentIndex = 0;
                this.updateCarousel();
            }
        }, 5000);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HerbCarousel();
});