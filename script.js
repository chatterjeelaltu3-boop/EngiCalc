// ============================================
// ADMIN LOGIN SYSTEM
// ============================================
const ADMIN_CREDENTIALS = {
    username: 'calculator',
    password: '1234'
};

let isAdminLoggedIn = false;

function adminLogin() {
    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value.trim();
    const errorEl = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        errorEl.style.display = 'none';
        
        // Load admin data
        renderQuestionBank();
        renderTopics();
        renderAdminFormulas();
        loadSettings();
    } else {
        errorEl.style.display = 'block';
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 3000);
    }
}

function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
}

// Enter key support for login
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('adminLogin').style.display !== 'none') {
        adminLogin();
    }
});

// Load settings
function loadSettings() {
    document.getElementById('easyQuestions').value = DATA.settings.easy.questions;
    document.getElementById('easyTime').value = DATA.settings.easy.time;
    document.getElementById('mediumQuestions').value = DATA.settings.medium.questions;
    document.getElementById('mediumTime').value = DATA.settings.medium.time;
    document.getElementById('hardQuestions').value = DATA.settings.hard.questions;
    document.getElementById('hardTime').value = DATA.settings.hard.time;
}

// ============================================
// QUIZ - FIX FOR RANDOM QUESTIONS
// ============================================
function startQuiz(source) {
    const topic = document.getElementById('quizTopic').value;
    const subtopic = document.getElementById('quizSubtopic').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const time = parseInt(document.getElementById('quizTime').value);
    
    let questions = [];
    
    if (source === 'bank') {
        // Get questions from bank
        questions = DATA.questions.filter(q => 
            q.topic === topic && 
            q.subtopic === subtopic && 
            q.difficulty === difficulty
        );
        // ✅ RANDOM SHUFFLE + take count
        questions = shuffleArray(questions).slice(0, count);
    } else {
        // AI Generate - with random templates
        questions = generateAIQuestions(topic, subtopic, difficulty, count);
        // ✅ AI questions also shuffled
        questions = shuffleArray(questions);
    }
    
    if (questions.length === 0) {
        alert('No questions available for this selection. Try different settings or use AI generate.');
        return;
    }
    
    // Setup quiz
    currentQuiz.questions = questions;
    currentQuiz.currentIndex = 0;
    currentQuiz.answers = new Array(questions.length).fill(null);
    currentQuiz.score = 0;
    currentQuiz.totalTime = time * 60;
    currentQuiz.timeLeft = time * 60;
    
    // Hide setup, show interface
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    
    renderQuestion();
    startTimer();
}

// ✅ IMPROVED AI Generator - more variety
function generateAIQuestions(topic, subtopic, difficulty, count) {
    const templates = [
        { q: `What is a fundamental principle in ${subtopic}?`, opts: ['Principle A', 'Principle B', 'Principle C', 'Principle D'], correct: 0 },
        { q: `Which equation is used in ${topic} for ${subtopic}?`, opts: ['Equation 1', 'Equation 2', 'Equation 3', 'Equation 4'], correct: 1 },
        { q: `How is ${subtopic} applied in engineering design?`, opts: ['Application X', 'Application Y', 'Application Z', 'Application W'], correct: 2 },
        { q: `What is the main concept of ${subtopic}?`, opts: ['Concept 1', 'Concept 2', 'Concept 3', 'Concept 4'], correct: 0 },
        { q: `Which formula is most important for ${subtopic}?`, opts: ['Formula A', 'Formula B', 'Formula C', 'Formula D'], correct: 3 },
        { q: `What does ${subtopic} deal with?`, opts: ['Area 1', 'Area 2', 'Area 3', 'Area 4'], correct: 1 },
        { q: `The fundamental law of ${subtopic} is?`, opts: ['Law 1', 'Law 2', 'Law 3', 'Law 4'], correct: 2 },
        { q: `Which parameter is critical in ${subtopic}?`, opts: ['Parameter α', 'Parameter β', 'Parameter γ', 'Parameter δ'], correct: 0 },
    ];
    
    const questions = [];
    const shuffledTemplates = shuffleArray([...templates]);
    
    for (let i = 0; i < Math.min(count, shuffledTemplates.length); i++) {
        const template = shuffledTemplates[i];
        const shuffledOpts = shuffleArray([...template.opts]);
        const correctIdx = shuffledOpts.indexOf(template.opts[template.correct]);
        
        questions.push({
            id: Date.now() + i + Math.random() * 1000,
            topic: topic,
            subtopic: subtopic,
            difficulty: difficulty,
            question: template.q,
            options: shuffledOpts,
            correct: correctIdx,
            _aiGenerated: true
        });
    }
    
    // If need more questions, duplicate with variations
    while (questions.length < count) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        questions.push({
            id: Date.now() + questions.length + Math.random() * 1000,
            topic: topic,
            subtopic: subtopic,
            difficulty: difficulty,
            question: template.q + ' (Variant ' + (questions.length + 1) + ')',
            options: shuffleArray([...template.opts]),
            correct: Math.floor(Math.random() * 4),
            _aiGenerated: true
        });
    }
    
    return shuffleArray(questions);
}

// ============================================
// INITIALIZATION - Update
// ============================================
function init() {
    initSampleData();
    renderFormulas();
    renderQuestionBank();
    renderTopics();
    renderAdminFormulas();
    loadSettings();
    
    // Populate quiz subtopics
    const topicSelect = document.getElementById('quizTopic');
    const subtopicSelect = document.getElementById('quizSubtopic');
    
    topicSelect.addEventListener('change', function() {
        const subtopics = DATA.subtopics[this.value] || ['General'];
        subtopicSelect.innerHTML = subtopics.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    
    // Trigger initial subtopic load
    topicSelect.dispatchEvent(new Event('change'));
    
    // Show login by default
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    
    console.log('🚀 ENGICALC initialized successfully!');
    console.log('🔐 Admin Login: calculator / 1234');
}
