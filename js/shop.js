// Shop JavaScript - Advanced Filtering, Search, and Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop functionality
    initializeShop();
    initializeCart();
    initializeSearch();
    initializeFilters();
});

// Shop Data with Enhanced Information
// Complete Herb Data with Enhanced Information
const herbs = [
    {
        id: 1,
        name: "Vernonia amygdalina (Bitter Leaf)",
        image: "images/herbs/bitter-leaf.webp",
        description: "West African staple herb with evidence for antidiabetic, antimicrobial and anti-inflammatory effects. Traditionally used for digestive health and immune support.",
        benefits: ["Blood Sugar (Diabetes)", "Antimicrobial/Antimalarial", "Anti-inflammatory (Lupus)", "Digestive Health"],
        nutrients: { 
            form: "Fresh leaves/decoction", 
            dose: "Tea/decoction daily", 
            safety: "Bitter; consult if on meds" 
        },
        season: "Year-round",
        price: 18.99,
        form: "tea",
        popularity: 95,
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Irish Moss (Chondrus crispus)",
        image: "images/herbs/irish-moss-c.webp",
        description: "Mineral-rich red seaweed supporting mucosal immunity, antiviral defense, and metabolic balance. Excellent for respiratory and skin health.",
        benefits: ["Immunity/Antiviral (Herpes/HIV)", "Anti-inflammatory", "Gut & Metabolic Support", "Respiratory Health"],
        nutrients: { 
            form: "Dried gel/powder", 
            dose: "1–2 tsp/day", 
            safety: "High iodine; caution in thyroid issues" 
        },
        season: "Year-round",
        price: 22.50,
        form: "powder",
        popularity: 88,
        inStock: true,
        featured: false
    },
    {
        id: 3,
        name: "Sutherlandia (Cancer Bush)",
        image: "images/herbs/sutherlandia.jpg",
        description: "South African tonic with immune-modulating and anti-inflammatory properties used during chronic illness. Supports overall vitality and wellness.",
        benefits: ["Immune Modulation", "Anti-inflammatory", "Energy/Appetite Support", "Chronic Illness Support"],
        nutrients: { 
            form: "Leaf capsules/tea", 
            dose: "As directed", 
            safety: "Avoid in pregnancy; autoimmune caution" 
        },
        season: "Year-round",
        price: 28.75,
        form: "capsules",
        popularity: 82,
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Neem Leaves (Azadirachta indica)",
        image: "images/herbs/neem.jpg",
        description: "Traditional antimicrobial/antiviral leaf used for infections, skin, and metabolic support. Powerful detoxifying properties.",
        benefits: ["Antiviral (Herpes Support)", "Blood Sugar", "Skin & Detox", "Oral Health"],
        nutrients: { 
            form: "Tea/leaves", 
            dose: "Short courses", 
            safety: "Avoid in pregnancy" 
        },
        season: "Year-round",
        price: 15.99,
        form: "tea",
        popularity: 79,
        inStock: true,
        featured: false
    },
    {
        id: 5,
        name: "Moringa oleifera (Miracle Tree)",
        image: "images/herbs/moringa.jpg",
        description: "Nutrient-dense antioxidant herb for immunity, inflammation, and blood sugar control. Packed with vitamins and minerals.",
        benefits: ["Blood Sugar (Diabetes)", "Anti-inflammatory", "Immunity/Energy", "Nutritional Support"],
        nutrients: { 
            form: "Leaf powder/capsules", 
            dose: "1–2 tsp/day", 
            safety: "May lower BP/BS; monitor meds" 
        },
        season: "Year-round",
        price: 19.99,
        form: "powder",
        popularity: 96,
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: "Artemisia afra (African Wormwood)",
        image: "images/herbs/african-wormwood.jpg",
        description: "Trusted African herb for respiratory infections and immune support. Traditional remedy for fever and digestive issues.",
        benefits: ["Antimicrobial/Respiratory", "Immunity", "Anti-inflammatory", "Fever Reduction"],
        nutrients: { 
            form: "Tea/decoction", 
            dose: "Short courses", 
            safety: "Avoid prolonged high use in pregnancy" 
        },
        season: "Year-round",
        price: 16.50,
        form: "tea",
        popularity: 75,
        inStock: true,
        featured: false
    },
    {
        id: 7,
        name: "Artemisia annua (Sweet Wormwood)",
        image: "images/herbs/sweet-wormwood.jpg",
        description: "Source of artemisinin; traditionally for fevers/infections; researched for antiviral and anti-inflammatory actions.",
        benefits: ["Antiviral Support", "Anti-inflammatory", "Fever/Infection Support", "Immune Boost"],
        nutrients: { 
            form: "Tea/extract", 
            dose: "As directed", 
            safety: "Not a drug substitute; pregnancy caution" 
        },
        season: "Year-round",
        price: 24.99,
        form: "extract",
        popularity: 81,
        inStock: true,
        featured: false
    },
    {
        id: 8,
        name: "Hypoxis hemerocallidea (African Potato)",
        image: "images/herbs/african-potato.jpg",
        description: "Immune tonic with anti-inflammatory and antioxidant activity; used in chronic illness support and prostate health.",
        benefits: ["Immune Support", "Anti-inflammatory", "Blood Sugar Support", "Prostate Health"],
        nutrients: { 
            form: "Root extract", 
            dose: "As directed", 
            safety: "Possible interactions; consult" 
        },
        season: "Year-round",
        price: 32.00,
        form: "extract",
        popularity: 73,
        inStock: true,
        featured: false
    },
    {
        id: 9,
        name: "Phyllanthus niruri (Stonebreaker)",
        image: "images/herbs/stonebreaker.jpg",
        description: "Traditional liver/kidney herb with antiviral signals in lab studies and metabolic support. Excellent for urinary health.",
        benefits: ["Liver Support", "Antiviral Signals", "Blood Sugar Support", "Kidney Health"],
        nutrients: { 
            form: "Tea/extract", 
            dose: "Cycles", 
            safety: "Avoid in pregnancy" 
        },
        season: "Year-round",
        price: 18.75,
        form: "tea",
        popularity: 77,
        inStock: true,
        featured: false
    },
    {
        id: 10,
        name: "Nigella sativa (Black Seed)",
        image: "images/herbs/black-seed.jpg",
        description: "Thymoquinone-rich immune/metabolic tonic used for antiviral support and inflammation control. Historical remedy.",
        benefits: ["Immunity/Antiviral", "Blood Sugar", "Anti-inflammatory", "Respiratory Health"],
        nutrients: { 
            form: "Oil/capsules", 
            dose: "½–1 tsp/day", 
            safety: "May lower BP/BS" 
        },
        season: "Year-round",
        price: 26.50,
        form: "oil",
        popularity: 89,
        inStock: true,
        featured: true
    },
    {
        id: 11,
        name: "Turmeric (Curcuma longa)",
        image: "images/herbs/turmeric.jpg",
        description: "Curcumin-rich spice for inflammation reduction, metabolic and liver support. Powerful antioxidant properties.",
        benefits: ["Anti-inflammatory (Lupus/Joint)", "Metabolic/Liver", "Antioxidant", "Brain Health"],
        nutrients: { 
            form: "Powder/extract", 
            dose: "With pepper/fat", 
            safety: "Anticoagulant interaction" 
        },
        season: "Year-round",
        price: 14.99,
        form: "powder",
        popularity: 98,
        inStock: true,
        featured: true
    },
    {
        id: 12,
        name: "Peppermint",
        image: "images/herbs/peppermint.jpg",
        description: "Gentle digestive and sinus-clearing support; useful for symptom relief and mental clarity.",
        benefits: ["Digestion", "Sinus/Respiratory", "Headache Relief", "Mental Clarity"],
        nutrients: { 
            form: "Tea/oil (diluted)", 
            dose: "As needed", 
            safety: "May trigger reflux in some" 
        },
        season: "Year-round",
        price: 12.99,
        form: "tea",
        popularity: 94,
        inStock: true,
        featured: false
    },
    {
        id: 13,
        name: "Prunus africana (African Cherry)",
        image: "images/herbs/african-cherry.jpg",
        description: "Traditional bark remedy for prostate/urinary health with anti-inflammatory effects and antioxidant properties.",
        benefits: ["Prostate/Urinary", "Anti-inflammatory", "Antioxidant", "Hormonal Balance"],
        nutrients: { 
            form: "Standardized extract", 
            dose: "As directed", 
            safety: "Source sustainably" 
        },
        season: "Year-round",
        price: 35.00,
        form: "extract",
        popularity: 68,
        inStock: true,
        featured: false
    },
    {
        id: 14,
        name: "Catharanthus roseus (Madagascar Periwinkle)",
        image: "images/herbs/madagascar-periwinkle.jpg",
        description: "Potent alkaloid-containing plant; traditional use for infections/metabolic issues; pharmaceutical anticancer source.",
        benefits: ["Antimicrobial Signals", "Metabolic Support", "Research Interest", "Traditional Use"],
        nutrients: { 
            form: "Not for self-medication", 
            dose: "—", 
            safety: "Clinical guidance only" 
        },
        season: "Year-round",
        price: 45.00,
        form: "extract",
        popularity: 45,
        inStock: true,
        featured: false
    },
    {
        id: 15,
        name: "Kigelia africana (Sausage Tree)",
        image: "images/herbs/sausage-tree.jpg",
        description: "Topical favorite for skin infections and wound care; antimicrobial and anti-inflammatory activity.",
        benefits: ["Skin/Wound", "Antimicrobial", "Anti-inflammatory", "Topical Use"],
        nutrients: { 
            form: "Topical extract", 
            dose: "Apply as directed", 
            safety: "Internal use needs guidance" 
        },
        season: "Year-round",
        price: 22.99,
        form: "extract",
        popularity: 71,
        inStock: true,
        featured: false
    },
    {
        id: 16,
        name: "Annona muricata (Soursop / Graviola)",
        image: "images/herbs/soursop.jpg",
        description: "Traditionally used against tumors/infections; contains acetogenins (lab cytotoxicity). Immune support.",
        benefits: ["Antioxidant", "Inflammation Relief", "Digestive Support", "Immune Modulation"],
        nutrients: { 
            form: "Leaf/fruit tea", 
            dose: "Short courses", 
            safety: "Avoid chronic high doses" 
        },
        season: "Year-round",
        price: 19.50,
        form: "tea",
        popularity: 76,
        inStock: true,
        featured: false
    },
    {
        id: 17,
        name: "Garcinia kola (Bitter Kola)",
        image: "images/herbs/bitter-kola.jpg",
        description: "West African seed used as antioxidant tonic with respiratory and metabolic benefits. Energy booster.",
        benefits: ["Antioxidant/Liver", "Respiratory", "Blood Sugar", "Energy Boost"],
        nutrients: { 
            form: "Chewed/ground", 
            dose: "Small amounts", 
            safety: "Monitor with diabetes meds" 
        },
        season: "Year-round",
        price: 17.25,
        form: "powder",
        popularity: 69,
        inStock: true,
        featured: false
    },
    {
        id: 18,
        name: "Ocimum sanctum (Holy Basil / Tulsi)",
        image: "images/herbs/holy-basil.jpg",
        description: "Adaptogen for stress resilience, immune and antiviral support, and blood sugar balance. Mental clarity.",
        benefits: ["Adaptogen/Immunity", "Antiviral", "Blood Sugar", "Stress Relief"],
        nutrients: { 
            form: "Tea/extract", 
            dose: "Daily", 
            safety: "Pregnancy caution; may lower BS" 
        },
        season: "Year-round",
        price: 20.99,
        form: "tea",
        popularity: 91,
        inStock: true,
        featured: true
    },
    {
        id: 19,
        name: "Bidens pilosa",
        image: "images/herbs/bidens-pilosa.jpg",
        description: "Common tropical herb studied for glucose control and anti-inflammatory effects. Wound healing properties.",
        benefits: ["Blood Sugar (Diabetes)", "Anti-inflammatory", "Wound Healing", "Traditional Remedy"],
        nutrients: { 
            form: "Tea/leaf", 
            dose: "Daily or cycles", 
            safety: "Possible anticoagulant interaction" 
        },
        season: "Year-round",
        price: 15.75,
        form: "tea",
        popularity: 63,
        inStock: true,
        featured: false
    },
    {
        id: 20,
        name: "Boswellia spp. (Frankincense)",
        image: "images/herbs/frankincense.jpg",
        description: "Resin with boswellic acids that strongly reduce inflammation; popular for joints/autoimmunity.",
        benefits: ["Anti-inflammatory (Lupus/Arthritis)", "Joint Mobility", "Respiratory Support", "Spiritual Use"],
        nutrients: { 
            form: "Resin extract", 
            dose: "Standardized caps", 
            safety: "Check interactions" 
        },
        season: "Year-round",
        price: 38.50,
        form: "extract",
        popularity: 84,
        inStock: true,
        featured: true
    },
    {
        id: 21,
        name: "Sclerocarya birrea (Marula)",
        image: "images/herbs/marula.jpg",
        description: "Antioxidant-rich African tree; used for metabolic health, wound healing and immunity. Skin benefits.",
        benefits: ["Antioxidant", "Blood Sugar/Lipids", "Skin Repair", "Immune Support"],
        nutrients: { 
            form: "Leaf/bark extract", 
            dose: "As directed", 
            safety: "Allergy possible" 
        },
        season: "Year-round",
        price: 23.99,
        form: "extract",
        popularity: 67,
        inStock: true,
        featured: false
    },
    {
        id: 22,
        name: "Harpagophytum procumbens (Devil's Claw)",
        image: "images/herbs/devils-claw.jpg",
        description: "Root used to relieve joint/back pain with proven anti-inflammatory/analgesic actions. Mobility support.",
        benefits: ["Pain Relief", "Anti-inflammatory", "Mobility", "Arthritis Support"],
        nutrients: { 
            form: "Root extract", 
            dose: "Standardized caps", 
            safety: "Diabetes/anticoagulant interactions" 
        },
        season: "Year-round",
        price: 29.99,
        form: "capsules",
        popularity: 87,
        inStock: true,
        featured: false
    },
    {
        id: 23,
        name: "Glycyrrhiza glabra (Licorice)",
        image: "images/herbs/licorice.jpg",
        description: "Soothing antiviral root for mucous membranes, liver and respiratory support. Adrenal support.",
        benefits: ["Antiviral (Herpes Support)", "Mucosal Soothing", "Liver Support", "Adrenal Health"],
        nutrients: { 
            form: "Tea/extract (DGL alt.)", 
            dose: "Cycles", 
            safety: "May raise BP; use DGL if needed" 
        },
        season: "Year-round",
        price: 16.99,
        form: "tea",
        popularity: 83,
        inStock: true,
        featured: false
    },
    {
        id: 24,
        name: "Tetrapleura tetraptera (Aridan)",
        image: "images/herbs/aridan.jpg",
        description: "West African spice for arthritis, asthma and metabolic complaints; anti-inflammatory and glucose-lowering activity.",
        benefits: ["Anti-inflammatory", "Blood Sugar", "Respiratory Support", "Arthritis Relief"],
        nutrients: { 
            form: "Pods/spice tea", 
            dose: "Culinary/tea", 
            safety: "Moderation; consult if pregnant" 
        },
        season: "Year-round",
        price: 21.50,
        form: "tea",
        popularity: 65,
        inStock: true,
        featured: false
    }
];

// Shop Initialization
function initializeShop() {
    displayProducts(herbs);
    updateProductCount(herbs.length);
}

// Product Display Functions
function displayProducts(products, view = 'grid') {
    const gridContainer = document.getElementById('productsGrid');
    const listContainer = document.getElementById('productsList');
    
    // Clear containers
    gridContainer.innerHTML = '';
    listContainer.innerHTML = '';
    
    if (products.length === 0) {
        const noResults = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No herbs found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" id="clearAllFilters">Clear All Filters</button>
            </div>
        `;
        gridContainer.innerHTML = noResults;
        listContainer.innerHTML = noResults;
        
        document.getElementById('clearAllFilters').addEventListener('click', clearAllFilters);
        return;
    }
    
    // Generate product cards
    products.forEach(product => {
        const gridCard = createProductCard(product, 'grid');
        const listCard = createProductCard(product, 'list');
        
        gridContainer.appendChild(gridCard);
        listContainer.appendChild(listCard);
    });
    
    // Update view
    updateView(view);
}

function createProductCard(product, viewType) {
    const card = document.createElement('div');
    card.className = `product-card ${viewType}-view`;
    card.setAttribute('data-id', product.id);
    
    const benefitsHTML = product.benefits.map(benefit => 
        `<span class="benefit-tag">${benefit}</span>`
    ).join('');
    
    const priceFormatted = `$${product.price.toFixed(2)}`;
    
    if (viewType === 'grid') {
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-latin">${getLatinName(product.name)}</p>
                <p class="product-description">${product.description}</p>
                
                <div class="product-benefits">
                    ${benefitsHTML}
                </div>
                
                <div class="product-details">
                    <div class="detail-item">
                        <span class="detail-label">Form:</span>
                        <span class="detail-value">${product.nutrients.form}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Dosage:</span>
                        <span class="detail-value">${product.nutrients.dose}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Safety:</span>
                        <span class="detail-value">${product.nutrients.safety}</span>
                    </div>
                </div>
                
                <div class="product-actions">
                    <span class="product-price">${priceFormatted}</span>
                    <button class="whatsapp-btn" data-id="${product.id}">
                        <i class="fab fa-whatsapp"></i>
                        Get Now
                    </button>
                    <div class="product-info">
                        <span class="info-text"><i class="fas fa-info-circle"></i> Dosage and price details will be communicated immediately you reach out. Click 'Get Now'</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        // List view
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-latin">${getLatinName(product.name)}</p>
                <p class="product-description">${product.description}</p>
                
                <div class="product-benefits">
                    ${benefitsHTML}
                </div>
                
                <div class="product-details">
                    <div class="detail-item">
                        <span class="detail-label">Form:</span>
                        <span class="detail-value">${product.nutrients.form}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Dosage:</span>
                        <span class="detail-value">${product.nutrients.dose}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Safety:</span>
                        <span class="detail-value">${product.nutrients.safety}</span>
                    </div>
                </div>
            </div>
            <div class="product-actions">
                <span class="product-price">${priceFormatted}</span>
                <button class="whatsapp-btn" data-id="${product.id}">
                    <i class="fab fa-whatsapp"></i>
                    Get Now
                </button>
                <div class="product-info">
                    <i class="fas fa-info-circle"></i>
                    <span class="info-text">Dosage and price details will be communicated immediately when you click 'Get Now'</span>
                </div>
            </div>
        `;
    }
    
    // Add event listeners
    const whatsappBtn = card.querySelector('.whatsapp-btn');
    
    whatsappBtn.addEventListener('click', () => openWhatsApp(product));
    
    return card;
}

function getLatinName(fullName) {
    const latinMatch = fullName.match(/\(([^)]+)\)/);
    return latinMatch ? latinMatch[1] : '';
}

// View Management
function updateView(view) {
    const gridView = document.getElementById('productsGrid');
    const listView = document.getElementById('productsList');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Update active view button
    viewBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Show/hide views
    if (view === 'grid') {
        gridView.classList.remove('hidden');
        listView.classList.add('hidden');
    } else {
        gridView.classList.add('hidden');
        listView.classList.remove('hidden');
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('herbSearch');
    const globalSearchInput = document.getElementById('globalSearch');
    const searchToggle = document.getElementById('shopSearchToggle');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // Local search
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProducts();
        });
    }
    
    // Global search overlay
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            globalSearchInput.focus();
        });
        
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
        
        // Close overlay when clicking outside
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
        
        // Global search functionality
        globalSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // This would filter products in a real implementation
        });
    }
    
    // Suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.textContent.toLowerCase();
            if (searchInput) {
                searchInput.value = searchTerm;
                filterProducts();
            }
            if (searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    });
}

// Filter Functionality
function initializeFilters() {
    const benefitFilter = document.getElementById('benefit-filter');
    const formFilter = document.getElementById('form-filter');
    const sortFilter = document.getElementById('sort-by');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Add event listeners to all filters
    [benefitFilter, formFilter, sortFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterProducts);
        }
    });
    
    // View buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            updateView(view);
        });
    });
    
    // Initialize active filters display
    updateActiveFilters();
}

function filterProducts() {
    const searchTerm = document.getElementById('herbSearch').value.toLowerCase();
    const benefitFilter = document.getElementById('benefit-filter').value;
    const formFilter = document.getElementById('form-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    
    let filteredHerbs = herbs.filter(herb => {
        // Search filter
        const matchesSearch = !searchTerm || 
            herb.name.toLowerCase().includes(searchTerm) ||
            herb.description.toLowerCase().includes(searchTerm) ||
            herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm));
        
        // Benefit filter
        const matchesBenefit = !benefitFilter ||
            herb.benefits.some(benefit => 
                benefit.toLowerCase().includes(benefitFilter.toLowerCase())
            );
        
        // Form filter
        const matchesForm = !formFilter ||
            herb.nutrients.form.toLowerCase().includes(formFilter.toLowerCase());
        
        return matchesSearch && matchesBenefit && matchesForm;
    });
    
    // Sort products
    filteredHerbs = sortProducts(filteredHerbs, sortBy);
    
    // Display results
    const currentView = document.querySelector('.view-btn.active').dataset.view;
    displayProducts(filteredHerbs, currentView);
    updateProductCount(filteredHerbs.length);
    updateActiveFilters();
}

function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return products.sort((a, b) => b.name.localeCompare(a.name));
        case 'popular':
            return products.sort((a, b) => b.popularity - a.popularity);
        case 'benefits':
            return products.sort((a, b) => b.benefits.length - a.benefits.length);
        default:
            return products;
    }
}

function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const benefitFilter = document.getElementById('benefit-filter').value;
    const formFilter = document.getElementById('form-filter').value;
    const searchTerm = document.getElementById('herbSearch').value;
    
    let activeFiltersHTML = '';
    
    if (benefitFilter) {
        activeFiltersHTML += `
            <div class="filter-tag">
                Benefit: ${benefitFilter}
                <button class="remove" data-filter="benefit">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    if (formFilter) {
        activeFiltersHTML += `
            <div class="filter-tag">
                Form: ${formFilter}
                <button class="remove" data-filter="form">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    if (searchTerm) {
        activeFiltersHTML += `
            <div class="filter-tag">
                Search: "${searchTerm}"
                <button class="remove" data-filter="search">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    if (activeFiltersHTML) {
        activeFiltersHTML += `
            <button class="clear-filters" id="clearAllFilters">
                Clear All
            </button>
        `;
    }
    
    activeFiltersContainer.innerHTML = activeFiltersHTML;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.filter-tag .remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            clearFilter(filterType);
        });
    });
    
    // Clear all filters
    const clearAllBtn = document.getElementById('clearAllFilters');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllFilters);
    }
}

function clearFilter(filterType) {
    switch (filterType) {
        case 'benefit':
            document.getElementById('benefit-filter').value = '';
            break;
        case 'form':
            document.getElementById('form-filter').value = '';
            break;
        case 'search':
            document.getElementById('herbSearch').value = '';
            break;
    }
    filterProducts();
}

function clearAllFilters() {
    document.getElementById('benefit-filter').value = '';
    document.getElementById('form-filter').value = '';
    document.getElementById('sort-by').value = 'name';
    document.getElementById('herbSearch').value = '';
    filterProducts();
}

function updateProductCount(count) {
    const countElement = document.getElementById('productsCount');
    const resultsElement = document.getElementById('resultsText');
    
    if (countElement) {
        countElement.textContent = `${count} Premium Herb${count !== 1 ? 's' : ''} Available`;
    }
    
    if (resultsElement) {
        if (count === herbs.length) {
            resultsElement.textContent = 'Showing all herbs';
        } else if (count === 0) {
            resultsElement.textContent = 'No herbs match your filters';
        } else {
            resultsElement.textContent = `Showing ${count} of ${herbs.length} herbs`;
        }
    }
}

// Cart Functionality
function initializeCart() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    let cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    
    // Cart toggle
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            updateCartDisplay();
        });
        
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }
    
    // Checkout via WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkoutViaWhatsApp);
    }
    
    // Update cart count on page load
    updateCartCount();
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    // Save to localStorage
    localStorage.setItem('herbCart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    updateCartDisplay();
    
    // Show feedback
    showCartFeedback(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('herbCart', JSON.stringify(cart));
    
    updateCartCount();
    updateCartDisplay();
}

function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('herbCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
    
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.querySelector('.total-amount');
    const cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas fa-leaf"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart items
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            updateCartQuantity(parseInt(this.dataset.id), -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            updateCartQuantity(parseInt(this.dataset.id), 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

function checkoutViaWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('herbCart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = "Hello! I'd like to order the following herbs:\n\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} x $${item.price.toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: $${total.toFixed(2)}\n\nPlease let me know about availability and shipping.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348163807836?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

function openWhatsApp(product) {
    const message = `Hi! I'm interested in ${product.name}. Can you tell me more about availability and pricing?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348163807836?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

function showCartFeedback(message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the feedback
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-emerald);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for feedback
const style = document.createElement('style');
style.textContent = `
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
    
    .no-results {
        text-align: center;
        padding: 3rem 1rem;
        grid-column: 1 / -1;
    }
    
    .no-results i {
        font-size: 4rem;
        color: var(--light-cream);
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        color: var(--text-light);
        margin-bottom: 0.5rem;
    }
    
    .no-results p {
        color: var(--text-light);
        margin-bottom: 1.5rem;
    }
    
    .product-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        padding: 0.75rem;
        background: var(--light-cream);
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        color: var(--text-medium);
        text-align: center;
    }
    
    .product-info i {
        color: var(--primary-emerald);
    }
`;
document.head.appendChild(style);