// ============================================
// ENGICALC — Complete JavaScript
// ============================================

// ===== DATA STORE =====
const DATA = {
    questions: JSON.parse(localStorage.getItem('engicalc_questions')) || [],
    formulas: JSON.parse(localStorage.getItem('engicalc_formulas')) || [],
    history: JSON.parse(localStorage.getItem('engicalc_history')) || [],
    topics: JSON.parse(localStorage.getItem('engicalc_topics')) || ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Engineering Mathematics', 'Computer Science'],
    subtopics: JSON.parse(localStorage.getItem('engicalc_subtopics')) || {
        'Electrical Engineering': ['Circuit Theory', 'Network Theory', 'Electrical Machines', 'Power Systems'],
        'Mechanical Engineering': ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Dynamics'],
        'Civil Engineering': ['Structural Analysis', 'Fluid Mechanics', 'Soil Mechanics', 'Transportation'],
        'Engineering Mathematics': ['Calculus', 'Linear Algebra', 'Differential Equations', 'Statistics'],
        'Computer Science': ['Data Structures', 'Algorithms', 'Discrete Math', 'Programming']
    },
    settings: JSON.parse(localStorage.getItem('engicalc_settings')) || {
        easy: { questions: 10, time: 10 },
        medium: { questions: 20, time: 20 },
        hard: { questions: 30, time: 45 }
    }
};

// ===== INITIALIZE SAMPLE DATA =====
function initSampleData() {
    if (DATA.questions.length === 0) {
        DATA.questions = [
            // Electrical Engineering
            { id: 1, topic: 'Electrical Engineering', subtopic: 'Circuit Theory', difficulty: 'easy', question: 'What is Ohm\'s Law?', options: ['V = IR', 'V = I/R', 'I = VR', 'R = VI'], correct: 0 },
            { id: 2, topic: 'Electrical Engineering', subtopic: 'Circuit Theory', difficulty: 'easy', question: 'What is the unit of resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2 },
            { id: 3, topic: 'Electrical Engineering', subtopic: 'Network Theory', difficulty: 'medium', question: 'What is the equivalent resistance of two 10Ω resistors in parallel?', options: ['20Ω', '10Ω', '5Ω', '2Ω'], correct: 2 },
            { id: 4, topic: 'Electrical Engineering', subtopic: 'Circuit Theory', difficulty: 'hard', question: 'What is the power dissipated by a 10Ω resistor with 5A current?', options: ['50W', '100W', '250W', '500W'], correct: 2 },
            
            // Mechanical Engineering
            { id: 5, topic: 'Mechanical Engineering', subtopic: 'Thermodynamics', difficulty: 'easy', question: 'What is the First Law of Thermodynamics?', options: ['Energy is created', 'Energy is destroyed', 'Energy is conserved', 'Entropy always increases'], correct: 2 },
            { id: 6, topic: 'Mechanical Engineering', subtopic: 'Fluid Mechanics', difficulty: 'medium', question: 'What is Bernoulli\'s equation used for?', options: ['Solid mechanics', 'Fluid flow', 'Heat transfer', 'Thermodynamics'], correct: 1 },
            
            // Engineering Mathematics
            { id: 7, topic: 'Engineering Mathematics', subtopic: 'Calculus', difficulty: 'easy', question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2x²'], correct: 1 },
            { id: 8, topic: 'Engineering Mathematics', subtopic: 'Linear Algebra', difficulty: 'medium', question: 'What is the determinant of [[1,2],[3,4]]?', options: ['-2', '2', '4', '-4'], correct: 0 },
            
            // Computer Science
            { id: 9, topic: 'Computer Science', subtopic: 'Data Structures', difficulty: 'easy', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
            { id: 10, topic: 'Computer Science', subtopic: 'Algorithms', difficulty: 'medium', question: 'What sorting algorithm has O(n log n) average case?', options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'], correct: 2 },
            
            // Civil Engineering
            { id: 11, topic: 'Civil Engineering', subtopic: 'Structural Analysis', difficulty: 'easy', question: 'What is a beam?', options: ['Column', 'Horizontal member', 'Vertical member', 'Foundation'], correct: 1 },
            { id: 12, topic: 'Civil Engineering', subtopic: 'Soil Mechanics', difficulty: 'medium', question: 'What is the unit weight of water?', options: ['9.81 kN/m³', '9.81 N/m³', '981 kN/m³', '1 kN/m³'], correct: 0 }
        ];
        saveData();
    }
    
    if (DATA.formulas.length === 0) {
        DATA.formulas = [
            { id: 1, subject: 'Electrical Engineering', name: 'Ohm\'s Law', equation: 'V = I × R', description: 'Voltage = Current × Resistance' },
            { id: 2, subject: 'Electrical Engineering', name: 'Power Formula', equation: 'P = V × I', description: 'Power = Voltage × Current' },
            { id: 3, subject: 'Mechanical Engineering', name: 'Newton\'s Second Law', equation: 'F = m × a', description: 'Force = Mass × Acceleration' },
            { id: 4, subject: 'Mechanical Engineering', name: 'Work Done', equation: 'W = F × d', description: 'Work = Force × Distance' },
            { id: 5, subject: 'Civil Engineering', name: 'Stress Formula', equation: 'σ = F / A', description: 'Stress = Force / Area' },
            { id: 6, subject: 'Engineering Mathematics', name: 'Quadratic Formula', equation: 'x = (-b ± √(b² - 4ac)) / 2a', description: 'Solution for ax² + bx + c = 0' },
            { id: 7, subject: 'Computer Science', name: 'Big O Notation', equation: 'O(f(n))', description: 'Upper bound of algorithm complexity' },
            { id: 8, subject: 'Electrical Engineering', name: 'Resistance in Series', equation: 'R_total = R₁ + R₂ + R₃', description: 'Sum of all resistances in series' }
        ];
        saveData();
    }
}

// ===== SAVE DATA =====
function saveData() {
    localStorage.setItem('engicalc_questions', JSON.stringify(DATA.questions));
    localStorage.setItem('engicalc_formulas', JSON.stringify(DATA.formulas));
    localStorage.setItem('engicalc_history', JSON.stringify(DATA.history));
    localStorage.setItem('engicalc_topics', JSON.stringify(DATA.topics));
    localStorage.setItem('engicalc_subtopics', JSON.stringify(DATA.subtopics));
    localStorage.setItem('engicalc_settings', JSON.stringify(DATA.settings));
}

// ===== NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const section = this.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        // Close mobile menu
        document.querySelector('.main-nav').classList.remove('open');
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('open');
});

// ============================================
// CALCULATOR
// ============================================
let calcExpression = '';
let calcResult = '';
let calcHistory = DATA.history;

function updateDisplay() {
    document.getElementById('expression').textContent = calcExpression || '\u200B';
    document.getElementById('result').textContent = calcResult || '0';
}

function appendValue(value) {
    if (calcResult && !calcExpression.includes('=')) {
        calcExpression = '';
        calcResult = '';
    }
    calcExpression += value;
    updateDisplay();
}

function clearCalc() {
    calcExpression = '';
    calcResult = '';
    updateDisplay();
}

function backspaceCalc() {
    calcExpression = calcExpression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        let expr = calcExpression;
        // Replace display symbols with JS equivalents
        expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        
        // Handle scientific functions
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/√\(/g, 'Math.sqrt(');
        expr = expr.replace(/π/g, 'Math.PI');
        expr = expr.replace(/e(?![xp])/g, 'Math.E');
        
        // Handle x² and xʸ
        expr = expr.replace(/x²/g, '**2');
        expr = expr.replace(/xʸ/g, '**');
        
        // Handle factorial
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        expr = expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
        
        const result = Function('"use strict"; return (' + expr + ')')();
        const historyEntry = calcExpression + ' = ' + result;
        calcResult = result.toString();
        calcExpression = calcExpression + ' = ';
        calcHistory.push(historyEntry);
        DATA.history = calcHistory;
        saveData();
        renderHistory();
        updateDisplay();
    } catch (e) {
        calcResult = 'Error';
        updateDisplay();
    }
}

function renderHistory() {
    const container = document.getElementById('historyList');
    container.innerHTML = calcHistory.map(item => 
        `<div class="history-item"><span class="h-expr">${item}</span></div>`
    ).join('');
    container.scrollTop = container.scrollHeight;
}

function clearHistory() {
    calcHistory = [];
    DATA.history = [];
    saveData();
    renderHistory();
}

// Calculator button listeners
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const val = this.dataset.value;
        if (val === 'C') clearCalc();
        else if (val === '⌫') backspaceCalc();
        else if (val === '=') calculate();
        else if (val === 'sin' || val === 'cos' || val === 'tan' || 
                 val === 'log' || val === 'ln' || val === '√' ||
                 val === 'sin⁻¹' || val === 'cos⁻¹' || val === 'tan⁻¹') {
            appendValue(val + '(');
        } else {
            appendValue(val);
        }
    });
});

// Mode toggle
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Set angle mode for trig functions
        const mode = this.dataset.mode;
        if (mode === 'deg') {
            // Override trig functions to use degrees
            window.__calcMode = 'deg';
        } else {
            window.__calcMode = 'rad';
        }
    });
});

// Keyboard support
document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (document.querySelector('#calculator').classList.contains('active')) {
        if (key >= '0' && key <= '9') appendValue(key);
        else if (key === '.') appendValue('.');
        else if (key === '+') appendValue('+');
        else if (key === '-') appendValue('−');
        else if (key === '*') appendValue('×');
        else if (key === '/') appendValue('÷');
        else if (key === 'Enter' || key === '=') calculate();
        else if (key === 'Backspace') backspaceCalc();
        else if (key === 'c' || key === 'C') clearCalc();
        else if (key === '(') appendValue('(');
        else if (key === ')') appendValue(')');
    }
});

// Initial render
renderHistory();

// ============================================
// QUIZ SYSTEM
// ============================================
let currentQuiz = {
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    timer: null,
    timeLeft: 0,
    totalTime: 0
};

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
        // Shuffle and take count
        questions = shuffleArray(questions).slice(0, count);
    } else {
        // AI Generate - create mock AI questions
        questions = generateAIQuestions(topic, subtopic, difficulty, count);
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

function generateAIQuestions(topic, subtopic, difficulty, count) {
    // Mock AI generation - in production this would call a backend API
    const templates = [
        { q: `What is a key concept in ${subtopic}?`, opts: ['Concept A', 'Concept B', 'Concept C', 'Concept D'], correct: 0 },
        { q: `Which principle applies to ${topic} in ${subtopic}?`, opts: ['Principle 1', 'Principle 2', 'Principle 3', 'Principle 4'], correct: 1 },
        { q: `How is ${subtopic} used in engineering?`, opts: ['Application 1', 'Application 2', 'Application 3', 'Application 4'], correct: 2 },
        { q: `What is the fundamental equation for ${subtopic}?`, opts: ['Eq 1', 'Eq 2', 'Eq 3', 'Eq 4'], correct: 0 },
    ];
    
    const questions = [];
    const usedIndices = new Set();
    
    for (let i = 0; i < Math.min(count, templates.length); i++) {
        let idx;
        do {
            idx = Math.floor(Math.random() * templates.length);
        } while (usedIndices.has(idx));
        usedIndices.add(idx);
        
        const template = templates[idx];
        const options = shuffleArray([...template.opts]);
        const correctIdx = options.indexOf(template.opts[template.correct]);
        
        questions.push({
            id: Date.now() + i,
            topic: topic,
            subtopic: subtopic,
            difficulty: difficulty,
            question: template.q,
            options: options,
            correct: correctIdx,
            _aiGenerated: true
        });
    }
    
    return questions;
}

function renderQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const total = currentQuiz.questions.length;
    const idx = currentQuiz.currentIndex;
    
    document.getElementById('questionCounter').textContent = `Question ${idx + 1}/${total}`;
    document.getElementById('progressFill').style.width = `${((idx) / total) * 100}%`;
    document.getElementById('questionText').textContent = q.question;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = q.options.map((opt, i) => `
        <button class="option-btn ${currentQuiz.answers[idx] === i ? 'selected' : ''}" 
                onclick="selectOption(${i})">
            ${String.fromCharCode(65 + i)}. ${opt}
        </button>
    `).join('');
}

function selectOption(index) {
    const idx = currentQuiz.currentIndex;
    currentQuiz.answers[idx] = index;
    renderQuestion();
}

function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        renderQuestion();
    } else {
        submitQuiz();
    }
}

function startTimer() {
    clearInterval(currentQuiz.timer);
    updateTimerDisplay();
    currentQuiz.timer = setInterval(() => {
        currentQuiz.timeLeft--;
        updateTimerDisplay();
        if (currentQuiz.timeLeft <= 0) {
            clearInterval(currentQuiz.timer);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(currentQuiz.timeLeft / 60);
    const secs = currentQuiz.timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function submitQuiz() {
    clearInterval(currentQuiz.timer);
    
    // Calculate score
    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
        if (currentQuiz.answers[i] === q.correct) correct++;
    });
    
    currentQuiz.score = correct;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    // Show result
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    document.getElementById('resultTotal').textContent = total;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = total - correct;
    document.getElementById('resultScore').textContent = percentage + '%';
    
    // Performance message
    let msg = '';
    if (percentage >= 90) msg = '🌟 Excellent! Engineering genius!';
    else if (percentage >= 70) msg = '👏 Great job! Keep practicing!';
    else if (percentage >= 50) msg = '💪 Good effort! Review weak areas.';
    else msg = '📚 Keep learning! Try again!';
    document.getElementById('resultMessage').textContent = msg;
}

function resetQuiz() {
    document.getElementById('quizSetup').style.display = 'block';
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    clearInterval(currentQuiz.timer);
}

// ============================================
// FORMULA LIBRARY
// ============================================
function renderFormulas(filter = '') {
    const container = document.getElementById('formulaList');
    let formulas = DATA.formulas;
    
    if (filter) {
        const f = filter.toLowerCase();
        formulas = formulas.filter(formula => 
            formula.name.toLowerCase().includes(f) || 
            formula.subject.toLowerCase().includes(f) ||
            formula.description.toLowerCase().includes(f)
        );
    }
    
    container.innerHTML = formulas.map(formula => `
        <div class="formula-card">
            <div class="formula-subject">${formula.subject}</div>
            <h4>${formula.name}</h4>
            <div class="formula-equation">${formula.equation}</div>
            <div class="formula-desc">${formula.description}</div>
        </div>
    `).join('');
}

function searchFormulas() {
    const query = document.getElementById('formulaSearch').value;
    renderFormulas(query);
}

// ============================================
// ADMIN PANEL
// ============================================
// Admin tabs
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('admin' + this.dataset.tab.charAt(0).toUpperCase() + this.dataset.tab.slice(1)).classList.add('active');
    });
});

function renderQuestionBank() {
    const container = document.getElementById('questionBank');
    container.innerHTML = DATA.questions.map((q, i) => `
        <div class="question-item">
            <div class="q-info">
                <div class="q-text">${q.question}</div>
                <div class="q-meta">${q.topic} › ${q.subtopic} • ${q.difficulty}</div>
            </div>
            <div class="q-actions">
                <button class="btn-edit" onclick="editQuestion(${i})">Edit</button>
                <button class="btn-delete" onclick="deleteQuestion(${i})">Delete</button>
            </div>
        </div>
    `).join('') || '<p>No questions added yet.</p>';
}

function showAddQuestion() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h3>Add Question</h3>
        <div class="form-group">
            <label>Topic</label>
            <select id="mqTopic">
                ${DATA.topics.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Sub-topic</label>
            <select id="mqSubtopic">
                ${DATA.subtopics[DATA.topics[0]].map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Difficulty</label>
            <select id="mqDifficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <div class="form-group">
            <label>Question</label>
            <textarea id="mqQuestion" placeholder="Enter your question..."></textarea>
        </div>
        <div class="form-group">
            <label>Options</label>
            <div class="options-grid">
                <input type="text" id="mqOpt0" placeholder="Option A">
                <input type="text" id="mqOpt1" placeholder="Option B">
                <input type="text" id="mqOpt2" placeholder="Option C">
                <input type="text" id="mqOpt3" placeholder="Option D">
            </div>
        </div>
        <div class="form-group">
            <label>Correct Answer</label>
            <div class="radio-group">
                <label><input type="radio" name="mqCorrect" value="0"> A</label>
                <label><input type="radio" name="mqCorrect" value="1"> B</label>
                <label><input type="radio" name="mqCorrect" value="2"> C</label>
                <label><input type="radio" name="mqCorrect" value="3"> D</label>
            </div>
        </div>
        <button class="btn-primary" onclick="addQuestion()">Add Question</button>
    `;
    
    // Update subtopics when topic changes
    document.getElementById('mqTopic').addEventListener('change', function() {
        const select = document.getElementById('mqSubtopic');
        const subtopics = DATA.subtopics[this.value] || [];
        select.innerHTML = subtopics.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    
    modal.style.display = 'flex';
}

function addQuestion() {
    const topic = document.getElementById('mqTopic').value;
    const subtopic = document.getElementById('mqSubtopic').value;
    const difficulty = document.getElementById('mqDifficulty').value;
    const question = document.getElementById('mqQuestion').value;
    const options = [
        document.getElementById('mqOpt0').value,
        document.getElementById('mqOpt1').value,
        document.getElementById('mqOpt2').value,
        document.getElementById('mqOpt3').value
    ];
    const correct = parseInt(document.querySelector('input[name="mqCorrect"]:checked')?.value);
    
    if (!question || options.some(o => !o) || isNaN(correct)) {
        alert('Please fill all fields.');
        return;
    }
    
    DATA.questions.push({
        id: Date.now(),
        topic,
        subtopic,
        difficulty,
        question,
        options,
        correct
    });
    
    saveData();
    renderQuestionBank();
    closeModal();
    alert('Question added successfully!');
}

function deleteQuestion(index) {
    if (confirm('Delete this question?')) {
        DATA.questions.splice(index, 1);
        saveData();
        renderQuestionBank();
    }
}

function editQuestion(index) {
    const q = DATA.questions[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h3>Edit Question</h3>
        <div class="form-group">
            <label>Topic</label>
            <select id="eqTopic">
                ${DATA.topics.map(t => `<option value="${t}" ${t === q.topic ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Sub-topic</label>
            <select id="eqSubtopic">
                ${DATA.subtopics[q.topic].map(s => `<option value="${s}" ${s === q.subtopic ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Difficulty</label>
            <select id="eqDifficulty">
                <option value="easy" ${q.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                <option value="medium" ${q.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="hard" ${q.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
            </select>
        </div>
        <div class="form-group">
            <label>Question</label>
            <textarea id="eqQuestion">${q.question}</textarea>
        </div>
        <div class="form-group">
            <label>Options</label>
            <div class="options-grid">
                <input type="text" id="eqOpt0" value="${q.options[0]}" placeholder="Option A">
                <input type="text" id="eqOpt1" value="${q.options[1]}" placeholder="Option B">
                <input type="text" id="eqOpt2" value="${q.options[2]}" placeholder="Option C">
                <input type="text" id="eqOpt3" value="${q.options[3]}" placeholder="Option D">
            </div>
        </div>
        <div class="form-group">
            <label>Correct Answer</label>
            <div class="radio-group">
                <label><input type="radio" name="eqCorrect" value="0" ${q.correct === 0 ? 'checked' : ''}> A</label>
                <label><input type="radio" name="eqCorrect" value="1" ${q.correct === 1 ? 'checked' : ''}> B</label>
                <label><input type="radio" name="eqCorrect" value="2" ${q.correct === 2 ? 'checked' : ''}> C</label>
                <label><input type="radio" name="eqCorrect" value="3" ${q.correct === 3 ? 'checked' : ''}> D</label>
            </div>
        </div>
        <button class="btn-primary" onclick="saveEditQuestion(${index})">Save Changes</button>
    `;
    
    modal.style.display = 'flex';
}

function saveEditQuestion(index) {
    const topic = document.getElementById('eqTopic').value;
    const subtopic = document.getElementById('eqSubtopic').value;
    const difficulty = document.getElementById('eqDifficulty').value;
    const question = document.getElementById('eqQuestion').value;
    const options = [
        document.getElementById('eqOpt0').value,
        document.getElementById('eqOpt1').value,
        document.getElementById('eqOpt2').value,
        document.getElementById('eqOpt3').value
    ];
    const correct = parseInt(document.querySelector('input[name="eqCorrect"]:checked')?.value);
    
    if (!question || options.some(o => !o) || isNaN(correct)) {
        alert('Please fill all fields.');
        return;
    }
    
    DATA.questions[index] = { ...DATA.questions[index], topic, subtopic, difficulty, question, options, correct };
    saveData();
    renderQuestionBank();
    closeModal();
    alert('Question updated!');
}

// Topics
function renderTopics() {
    const container = document.getElementById('topicList');
    container.innerHTML = DATA.topics.map(t => `
        <span class="topic-tag">${t}</span>
    `).join('');
}

function addTopic() {
    const input = document.getElementById('newTopic');
    const topic = input.value.trim();
    if (topic && !DATA.topics.includes(topic)) {
        DATA.topics.push(topic);
        DATA.subtopics[topic] = ['General'];
        saveData();
        renderTopics();
        input.value = '';
    } else {
        alert('Topic already exists or is invalid.');
    }
}

// Admin Formulas
function renderAdminFormulas() {
    const container = document.getElementById('adminFormulaList');
    container.innerHTML = DATA.formulas.map((f, i) => `
        <div class="question-item">
            <div class="q-info">
                <div class="q-text"><strong>${f.name}</strong> — ${f.equation}</div>
                <div class="q-meta">${f.subject}</div>
            </div>
            <div class="q-actions">
                <button class="btn-edit" onclick="editAdminFormula(${i})">Edit</button>
                <button class="btn-delete" onclick="deleteAdminFormula(${i})">Delete</button>
            </div>
        </div>
    `).join('') || '<p>No formulas added yet.</p>';
}

function showAddFormula() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h3>Add Formula</h3>
        <div class="form-group">
            <label>Subject</label>
            <select id="mfSubject">
                ${DATA.topics.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Formula Name</label>
            <input type="text" id="mfName" placeholder="e.g., Ohm's Law">
        </div>
        <div class="form-group">
            <label>Equation</label>
            <input type="text" id="mfEquation" placeholder="e.g., V = I × R">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="mfDesc" placeholder="Brief explanation..."></textarea>
        </div>
        <button class="btn-primary" onclick="addAdminFormula()">Add Formula</button>
    `;
    
    modal.style.display = 'flex';
}

function addAdminFormula() {
    const subject = document.getElementById('mfSubject').value;
    const name = document.getElementById('mfName').value.trim();
    const equation = document.getElementById('mfEquation').value.trim();
    const description = document.getElementById('mfDesc').value.trim();
    
    if (!name || !equation) {
        alert('Please fill required fields.');
        return;
    }
    
    DATA.formulas.push({ id: Date.now(), subject, name, equation, description });
    saveData();
    renderAdminFormulas();
    renderFormulas();
    closeModal();
    alert('Formula added!');
}

function deleteAdminFormula(index) {
    if (confirm('Delete this formula?')) {
        DATA.formulas.splice(index, 1);
        saveData();
        renderAdminFormulas();
        renderFormulas();
    }
}

function editAdminFormula(index) {
    const f = DATA.formulas[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h3>Edit Formula</h3>
        <div class="form-group">
            <label>Subject</label>
            <select id="efSubject">
                ${DATA.topics.map(t => `<option value="${t}" ${t === f.subject ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Formula Name</label>
            <input type="text" id="efName" value="${f.name}">
        </div>
        <div class="form-group">
            <label>Equation</label>
            <input type="text" id="efEquation" value="${f.equation}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="efDesc">${f.description || ''}</textarea>
        </div>
        <button class="btn-primary" onclick="saveAdminFormula(${index})">Save Changes</button>
    `;
    
    modal.style.display = 'flex';
}

function saveAdminFormula(index) {
    const subject = document.getElementById('efSubject').value;
    const name = document.getElementById('efName').value.trim();
    const equation = document.getElementById('efEquation').value.trim();
    const description = document.getElementById('efDesc').value.trim();
    
    if (!name || !equation) {
        alert('Please fill required fields.');
        return;
    }
    
    DATA.formulas[index] = { ...DATA.formulas[index], subject, name, equation, description };
    saveData();
    renderAdminFormulas();
    renderFormulas();
    closeModal();
    alert('Formula updated!');
}

// Settings
function saveSettings() {
    DATA.settings = {
        easy: { questions: parseInt(document.getElementById('easyQuestions').value), time: parseInt(document.getElementById('easyTime').value) },
        medium: { questions: parseInt(document.getElementById('mediumQuestions').value), time: parseInt(document.getElementById('mediumTime').value) },
        hard: { questions: parseInt(document.getElementById('hardQuestions').value), time: parseInt(document.getElementById('hardTime').value) }
    };
    saveData();
    alert('Settings saved!');
}

// ===== MODAL =====
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal on outside click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ===== UTILITY FUNCTIONS =====
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== INITIALIZATION =====
function init() {
    initSampleData();
    renderFormulas();
    renderQuestionBank();
    renderTopics();
    renderAdminFormulas();
    
    // Populate quiz subtopics
    const topicSelect = document.getElementById('quizTopic');
    const subtopicSelect = document.getElementById('quizSubtopic');
    
    topicSelect.addEventListener('change', function() {
        const subtopics = DATA.subtopics[this.value] || ['General'];
        subtopicSelect.innerHTML = subtopics.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    
    // Trigger initial subtopic load
    topicSelect.dispatchEvent(new Event('change'));
    
    console.log('🚀 ENGICALC initialized successfully!');
}

// Run on load
document.addEventListener('DOMContentLoaded', init);
