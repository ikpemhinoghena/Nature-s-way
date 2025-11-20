// Learn Page JavaScript - Interactive Learning Features
document.addEventListener('DOMContentLoaded', function() {
    initializeLearnPage();
    initializeHerbEncyclopedia();
    initializeRecipeTabs();
    initializeKnowledgeQuiz();
});

// Learn Page Initialization
function initializeLearnPage() {
    // Initialize floating cards animation
    initFloatingCards();
    
    // Initialize learning paths
    initLearningPaths();
    
    // Add scroll animations
    initScrollAnimations();
}

// Floating Cards Animation
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 1.5}s`;
    });
}

// Learning Paths
function initLearningPaths() {
    const pathButtons = document.querySelectorAll('.path-start-btn');
    
    pathButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pathCard = this.closest('.path-card');
            const level = pathCard.dataset.level;
            const pathName = pathCard.querySelector('h3').textContent;
            
            showPathModal(level, pathName);
        });
    });
}

function showPathModal(level, pathName) {
    // Create modal content based on level
    let modalContent = '';
    
    switch(level) {
        case 'beginner':
            modalContent = `
                <h3>Start Your Beginner Herbalist Journey</h3>
                <p>Welcome to the world of herbal medicine! This path will guide you through the fundamentals.</p>
                <div class="modal-features">
                    <h4>What you'll get:</h4>
                    <ul>
                        <li>8 comprehensive learning modules</li>
                        <li>Weekly live Q&A sessions</li>
                        <li>Downloadable resources and guides</li>
                        <li>Access to beginner community</li>
                        <li>Certificate of completion</li>
                    </ul>
                </div>
            `;
            break;
        case 'intermediate':
            modalContent = `
                <h3>Advance to Practical Herbalist</h3>
                <p>Deepen your knowledge with hands-on formulations and therapeutic applications.</p>
                <div class="modal-features">
                    <h4>What you'll get:</h4>
                    <ul>
                        <li>12 advanced learning modules</li>
                        <li>Personalized feedback on formulations</li>
                        <li>Case study analysis</li>
                        <li>Advanced technique demonstrations</li>
                        <li>Professional certification</li>
                    </ul>
                </div>
            `;
            break;
        case 'advanced':
            modalContent = `
                <h3>Become an Advanced Practitioner</h3>
                <p>Master clinical applications and complex formulations for comprehensive wellness practice.</p>
                <div class="modal-features">
                    <h4>What you'll get:</h4>
                    <ul>
                        <li>16 master-level modules</li>
                        <li>One-on-one mentorship</li>
                        <li>Clinical observation opportunities</li>
                        <li>Business development guidance</li>
                        <li>Advanced practitioner certification</li>
                    </ul>
                </div>
            `;
            break;
    }
    
    // Show custom alert/modal (in production, use a proper modal library)
    const modal = document.createElement('div');
    modal.className = 'path-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            ${modalContent}
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="enrollInPath('${level}')">
                    <i class="fas fa-play-circle"></i>
                    Start Learning Path
                </button>
                <button class="btn btn-outline" onclick="closeModal()">
                    Explore More First
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    const styles = `
        .path-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideInUp 0.3s ease;
        }
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
        }
        .modal-features {
            margin: 1.5rem 0;
        }
        .modal-features h4 {
            color: var(--primary-deep);
            margin-bottom: 1rem;
        }
        .modal-features ul {
            list-style: none;
        }
        .modal-features li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--light-cream);
        }
        .modal-features li:last-child {
            border-bottom: none;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Close modal handlers
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function enrollInPath(level) {
    // In production, this would redirect to enrollment or show a form
    alert(`Excellent choice! You've selected the ${level} path. Our team will contact you to get started.`);
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('.path-modal');
    if (modal) {
        modal.remove();
    }
}

// Herb Encyclopedia
function initializeHerbEncyclopedia() {
    const herbs = [
        {
            id: 1,
            name: "Vernonia amygdalina",
            latin: "Bitter Leaf",
            description: "West African staple with potent antidiabetic and antimicrobial properties. Traditionally used for digestive health.",
            properties: ["Antidiabetic", "Antimicrobial", "Anti-inflammatory", "Digestive"],
            system: "immune",
            image: "images/herbs/bitter-leaf.webp"
        },
        {
            id: 2,
            name: "Moringa oleifera",
            latin: "Miracle Tree",
            description: "Nutrient-dense superfood with exceptional antioxidant and anti-inflammatory benefits.",
            properties: ["Antioxidant", "Anti-inflammatory", "Nutritive", "Energy Boost"],
            system: "immune",
            image: "images/herbs/bitter-leaf.webp"
        },
        {
            id: 3,
            name: "Turmeric",
            latin: "Curcuma longa",
            description: "Golden spice with powerful curcumin content for inflammation reduction and joint support.",
            properties: ["Anti-inflammatory", "Antioxidant", "Joint Support", "Brain Health"],
            system: "immune",
            image: "images/herbs/turmeric.webp"
        },
        {
            id: 4,
            name: "Holy Basil",
            latin: "Ocimum sanctum",
            description: "Adaptogenic herb for stress resilience, immune support, and mental clarity.",
            properties: ["Adaptogen", "Antiviral", "Stress Relief", "Immune Support"],
            system: "nervous",
            image: "images/herbs/holy-basil.webp"
        },
        {
            id: 5,
            name: "Ginger",
            latin: "Zingiber officinale",
            description: "Warming root excellent for digestive issues, nausea, and inflammatory conditions.",
            properties: ["Digestive", "Anti-inflammatory", "Antinausea", "Circulatory"],
            system: "digestive",
            image: "images/herbs/ginger.webp"
        },
        {
            id: 6,
            name: "Peppermint",
            latin: "Mentha piperita",
            description: "Cooling herb for digestive comfort, respiratory support, and mental clarity.",
            properties: ["Digestive", "Respiratory", "Mental Clarity", "Headache Relief"],
            system: "digestive",
            image: "images/herbs/peppermint.webp"
        }
    ];

    displayHerbs(herbs);
    setupHerbFilters(herbs);
}

function displayHerbs(herbs) {
    const grid = document.getElementById('herbGrid');
    grid.innerHTML = '';

    herbs.forEach(herb => {
        const card = document.createElement('div');
        card.className = 'herb-card';
        card.innerHTML = `
            <div class="herb-image">
                <img src="${herb.image}" alt="${herb.name}">
            </div>
            <div class="herb-content">
                <h3 class="herb-name">${herb.name}</h3>
                <p class="herb-latin">${herb.latin}</p>
                <p class="herb-description">${herb.description}</p>
                <div class="herb-properties">
                    ${herb.properties.map(prop => `<span class="property-tag">${prop}</span>`).join('')}
                </div>
                <div class="herb-actions">
                    <a href="#" class="herb-learn-more" data-herb="${herb.name}">
                        <i class="fas fa-book-open"></i>
                        Learn More
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Add learn more event listeners
    document.querySelectorAll('.herb-learn-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const herbName = this.dataset.herb;
            showHerbDetail(herbName);
        });
    });
}

function setupHerbFilters(herbs) {
    const searchInput = document.getElementById('herbSearch');
    const systemFilter = document.getElementById('systemFilter');
    const propertyFilter = document.getElementById('propertyFilter');

    function filterHerbs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSystem = systemFilter.value;
        const selectedProperty = propertyFilter.value;

        const filteredHerbs = herbs.filter(herb => {
            const matchesSearch = !searchTerm || 
                herb.name.toLowerCase().includes(searchTerm) ||
                herb.latin.toLowerCase().includes(searchTerm) ||
                herb.description.toLowerCase().includes(searchTerm);

            const matchesSystem = !selectedSystem || herb.system === selectedSystem;
            const matchesProperty = !selectedProperty || herb.properties.includes(selectedProperty);

            return matchesSearch && matchesSystem && matchesProperty;
        });

        displayHerbs(filteredHerbs);
    }

    searchInput.addEventListener('input', filterHerbs);
    systemFilter.addEventListener('change', filterHerbs);
    propertyFilter.addEventListener('change', filterHerbs);
}

function showHerbDetail(herbName) {
    // In production, this would show a detailed modal or redirect to a dedicated page
    alert(`Detailed information about ${herbName} would be displayed here. This feature shows comprehensive usage guidelines, research, and preparation methods.`);
}

// Recipe Tabs
function initializeRecipeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Sample recipe data
    const recipes = {
        teas: [
            {
                title: "Immune-Boosting Elderberry Tea",
                description: "Powerful antiviral tea with elderberry, echinacea, and ginger for immune support.",
                time: "15 min",
                difficulty: "beginner",
                image: "🍵"
            },
            {
                title: "Calming Chamomile Lavender Blend",
                description: "Soothing herbal tea for relaxation and better sleep quality.",
                time: "10 min",
                difficulty: "beginner",
                image: "🌼"
            }
        ],
        tinctures: [
            {
                title: "Echinacea Goldenseal Tincture",
                description: "Potent immune-support tincture for cold and flu season protection.",
                time: "6 weeks",
                difficulty: "intermediate",
                image: "💧"
            },
            {
                title: "Stress-Relief Adaptogen Blend",
                description: "Balancing tincture with ashwagandha, rhodiola, and holy basil.",
                time: "4 weeks",
                difficulty: "intermediate",
                image: "⚖️"
            }
        ],
        salves: [
            {
                title: "Healing Comfrey Salve",
                description: "Skin-repairing salve for wounds, bruises, and inflammatory skin conditions.",
                time: "2 hours",
                difficulty: "intermediate",
                image: "🩹"
            },
            {
                title: "Anti-Itch Plantain Balm",
                description: "Soothing balm for insect bites, rashes, and skin irritations.",
                time: "1.5 hours",
                difficulty: "beginner",
                image: "🌿"
            }
        ],
        culinary: [
            {
                title: "Medicinal Herb-Infused Honey",
                description: "Therapeutic honey infused with thyme, sage, and lavender for daily wellness.",
                time: "2 weeks",
                difficulty: "beginner",
                image: "🍯"
            },
            {
                title: "Digestive Bitter Tonic",
                description: "Traditional digestive aid with dandelion, gentian, and orange peel.",
                time: "3 weeks",
                difficulty: "advanced",
                image: "🍊"
            }
        ]
    };

    // Load initial recipes
    loadRecipes('teas', recipes.teas);

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            // Load recipes for this tab
            loadRecipes(tabId, recipes[tabId]);
        });
    });
}

function loadRecipes(category, recipes) {
    const container = document.querySelector(`#${category} .recipes-grid`);
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-image">
                ${recipe.image}
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                    <span class="recipe-difficulty ${recipe.difficulty}">
                        <i class="fas fa-signal"></i> ${recipe.difficulty}
                    </span>
                </div>
                <div class="recipe-actions">
                    <a href="#" class="view-recipe" data-recipe="${recipe.title}">
                        <i class="fas fa-book-open"></i>
                        View Recipe
                    </a>
                    <button class="save-recipe" data-recipe="${recipe.title}">
                        <i class="fas fa-bookmark"></i>
                        Save
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Add recipe event listeners
    document.querySelectorAll('.view-recipe').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const recipeName = this.dataset.recipe;
            showRecipeDetail(recipeName);
        });
    });

    document.querySelectorAll('.save-recipe').forEach(button => {
        button.addEventListener('click', function() {
            const recipeName = this.dataset.recipe;
            saveRecipe(recipeName, this);
        });
    });
}

function showRecipeDetail(recipeName) {
    alert(`Full recipe details for "${recipeName}" would be displayed here, including ingredients, step-by-step instructions, and usage guidelines.`);
}

function saveRecipe(recipeName, button) {
    button.innerHTML = '<i class="fas fa-check"></i> Saved!';
    button.style.background = 'var(--primary-emerald)';
    button.style.color = 'var(--white)';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-bookmark"></i> Save';
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

// Knowledge Quiz
function initializeKnowledgeQuiz() {
    const quizData = [
        {
            question: "Which herb is traditionally known for its adaptogenic properties, helping the body manage stress?",
            answers: [
                { text: "Peppermint", correct: false },
                { text: "Holy Basil (Tulsi)", correct: true },
                { text: "Chamomile", correct: false },
                { text: "Lavender", correct: false }
            ],
            explanation: "Holy Basil (Tulsi) is a renowned adaptogen that helps the body adapt to physical and emotional stress while supporting overall resilience."
        },
        {
            question: "What is the primary active compound in Turmeric responsible for its anti-inflammatory effects?",
            answers: [
                { text: "Gingerol", correct: false },
                { text: "Curcumin", correct: true },
                { text: "Piperine", correct: false },
                { text: "Thymol", correct: false }
            ],
            explanation: "Curcumin is the main active ingredient in turmeric, giving it powerful anti-inflammatory and antioxidant properties."
        },
        {
            question: "Which preparation method is best for extracting the medicinal properties of hard plant materials like roots and bark?",
            answers: [
                { text: "Cold infusion", correct: false },
                { text: "Hot infusion (tea)", correct: false },
                { text: "Decoction", correct: true },
                { text: "Tincture (short term)", correct: false }
            ],
            explanation: "Decoction involves simmering harder plant materials like roots, bark, and seeds to extract their medicinal compounds effectively."
        },
        {
            question: "What safety precaution is most important when starting with a new herbal remedy?",
            answers: [
                { text: "Start with large doses for quick results", correct: false },
                { text: "Consult a healthcare provider, especially if on medications", correct: true },
                { text: "Mix multiple new herbs together", correct: false },
                { text: "Discontinue all other supplements", correct: false }
            ],
            explanation: "Always consult with a healthcare provider before starting new herbs, especially if you have medical conditions or take prescription medications, to avoid potential interactions."
        },
        {
            question: "Which herb is particularly known for supporting respiratory health and easing coughs?",
            answers: [
                { text: "Milk Thistle", correct: false },
                { text: "St. John's Wort", correct: false },
                { text: "Mullein", correct: true },
                { text: "Dandelion", correct: false }
            ],
            explanation: "Mullein is traditionally used to support respiratory health, soothe coughs, and relieve congestion due to its demulcent properties."
        }
    ];

    setupQuiz(quizData);
}

function setupQuiz(quizData) {
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = quizData.length;

    const questionContainer = document.getElementById('questionContainer');
    const quizResults = document.getElementById('quizResults');
    const progressFill = document.getElementById('quizProgress');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    const quizScore = document.getElementById('quizScore');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsMessage = document.getElementById('resultsMessage');
    const retryBtn = document.getElementById('retryQuiz');

    totalQuestionsEl.textContent = totalQuestions;

    function showQuestion() {
        const question = quizData[currentQuestion];
        currentQuestionEl.textContent = currentQuestion + 1;
        
        // Update progress bar
        const progress = ((currentQuestion) / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;

        const answersHTML = question.answers.map((answer, index) => `
            <button class="answer-btn" data-correct="${answer.correct}" data-index="${index}">
                ${answer.text}
            </button>
        `).join('');

        questionContainer.innerHTML = `
            <div class="question-text">${question.question}</div>
            <div class="answers-grid">${answersHTML}</div>
            <div class="quiz-navigation">
                <button class="btn btn-outline" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i>
                    Previous
                </button>
                <span>Question ${currentQuestion + 1} of ${totalQuestions}</span>
                <button class="btn btn-outline" onclick="nextQuestion()" style="visibility: hidden;">
                    Next
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Add answer event listeners
        document.querySelectorAll('.answer-btn').forEach(button => {
            button.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === 'true';
        const correctIndex = quizData[currentQuestion].answers.findIndex(answer => answer.correct);
        
        // Disable all buttons
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        // Show correct/incorrect states
        document.querySelectorAll('.answer-btn').forEach((btn, index) => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else if (btn === selectedButton && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Update score
        if (isCorrect) {
            score++;
        }

        // Show next button
        const nextButton = document.querySelector('.quiz-navigation .btn:last-child');
        nextButton.style.visibility = 'visible';
        
        // Add explanation
        const explanation = document.createElement('div');
        explanation.className = 'answer-explanation';
        explanation.innerHTML = `
            <div class="explanation-content">
                <h4>${isCorrect ? 'Correct!' : 'Not quite'}</h4>
                <p>${quizData[currentQuestion].explanation}</p>
            </div>
        `;
        questionContainer.appendChild(explanation);

        // Add styles for explanation
        const explanationStyles = `
            .answer-explanation {
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-lg);
                border-left: 4px solid ${isCorrect ? 'var(--primary-emerald)' : '#ef4444'};
            }
            .explanation-content h4 {
                color: ${isCorrect ? 'var(--primary-emerald)' : '#ef4444'};
                margin-bottom: 0.5rem;
            }
            .explanation-content p {
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.5;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = explanationStyles;
        document.head.appendChild(style);
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function showResults() {
        questionContainer.style.display = 'none';
        quizResults.classList.remove('hidden');
        
        // Update progress to 100%
        progressFill.style.width = '100%';
        
        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);
        quizScore.textContent = percentage;
        
        // Set results message based on score
        if (percentage >= 80) {
            resultsTitle.textContent = 'Excellent! Herbal Expert';
            resultsMessage.textContent = 'Your knowledge of herbal medicine is impressive! Consider exploring our advanced practitioner path to deepen your expertise.';
        } else if (percentage >= 60) {
            resultsTitle.textContent = 'Great Job! Knowledgeable Beginner';
            resultsMessage.textContent = 'You have a solid foundation in herbal medicine. Our intermediate path would help you develop practical formulation skills.';
        } else {
            resultsTitle.textContent = 'Good Start! Herbal Enthusiast';
            resultsMessage.textContent = 'You\'re beginning your herbal journey! Start with our beginner path to build a strong foundation in herbal basics.';
        }
    }

    // Make functions global for button onclick handlers
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;

    // Retry quiz handler
    retryBtn.addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        questionContainer.style.display = 'block';
        quizResults.classList.add('hidden');
        showQuestion();
    });

    // Start the quiz
    showQuestion();
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

    // Observe all cards and sections
    document.querySelectorAll('.path-card, .herb-card, .recipe-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Add global error handling
window.addEventListener('error', function(e) {
    console.error('Learn page error:', e.error);
});