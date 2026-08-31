// ============================================
// ENGICALC — Complete JavaScript
// ============================================

// ===== DATA STORE =====
const DATA = {
    questions: JSON.parse(localStorage.getItem('engicalc_questions')) || [],
    formulas: JSON.parse(localStorage.getItem('engicalc_formulas')) || [],
    history: JSON.parse(localStorage.getItem('engicalc_history')) || [],
    
    departments: JSON.parse(localStorage.getItem('engicalc_departments')) || [
        'Electrical Engineering',
        'Mechanical Engineering', 
        'Civil Engineering',
        'Computer Science',
        'Electronics & Communication'
    ],
    
    subjects: JSON.parse(localStorage.getItem('engicalc_subjects')) || {
        'Electrical Engineering': ['Engineering Chemistry', 'Engineering Physics', 'Basic Electrical Engineering', 'Engineering Mathematics-I'],
        'Mechanical Engineering': ['Engineering Chemistry', 'Engineering Physics', 'Engineering Mechanics', 'Engineering Mathematics-I'],
        'Civil Engineering': ['Engineering Chemistry', 'Engineering Physics', 'Engineering Mechanics', 'Engineering Mathematics-I'],
        'Computer Science': ['Engineering Chemistry', 'Engineering Physics', 'Programming Fundamentals', 'Engineering Mathematics-I'],
        'Electronics & Communication': ['Engineering Chemistry', 'Engineering Physics', 'Basic Electronics', 'Engineering Mathematics-I']
    },
    
    difficulties: JSON.parse(localStorage.getItem('engicalc_difficulties')) || ['Easy', 'Medium', 'Hard'],
    
    quizSettings: JSON.parse(localStorage.getItem('engicalc_quizSettings')) || {
        questionCounts: [5, 10, 15, 20],
        timeOptions: [5, 10, 15, 20, 30, 45, 60],
        defaultDifficulty: 'Medium',
        defaultCount: 10,
        defaultTime: 10
    }
};

// ============================================
// SUBJECT QUESTION BANK (Auto Generate)
// ============================================
const SUBJECT_QUESTIONS = {
    'Engineering Chemistry': [
        { question: 'What is the unit of conductivity?', options: ['S/m', 'Ω/m', 'S/cm', 'Ω/cm'], correct: 0 },
        { question: 'What is the pH of pure water?', options: ['0', '7', '14', '1'], correct: 1 },
        { question: 'What is the chemical formula of water?', options: ['H₂O', 'CO₂', 'NaCl', 'HCl'], correct: 0 },
        { question: 'What is the atomic number of Carbon?', options: ['4', '6', '8', '12'], correct: 1 },
        { question: 'What is Nernst Equation used for?', options: ['Electrode potential', 'pH calculation', 'Heat transfer', 'Fluid flow'], correct: 0 },
        { question: 'What is the unit of molarity?', options: ['mol/L', 'g/L', 'kg/L', 'mg/L'], correct: 0 },
        { question: 'What is the valency of Oxygen?', options: ['1', '2', '3', '4'], correct: 1 },
        { question: 'What is the formula of Caustic Soda?', options: ['NaOH', 'KOH', 'Ca(OH)₂', 'Na₂CO₃'], correct: 0 },
        { question: 'What is the molecular weight of H₂O?', options: ['18', '16', '20', '22'], correct: 0 },
        { question: 'What is the pH of acidic solution?', options: ['<7', '>7', '=7', '=0'], correct: 0 }
    ],
    'Engineering Physics': [
        { question: 'What is the speed of light in vacuum?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], correct: 0 },
        { question: 'What is the unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1 },
        { question: 'What is the SI unit of pressure?', options: ['Pascal', 'Newton', 'Joule', 'Watt'], correct: 0 },
        { question: 'What is the refractive index of water?', options: ['1.33', '1.5', '2.4', '1.0'], correct: 0 },
        { question: 'What is the wavelength of visible light?', options: ['400-700 nm', '100-400 nm', '700-1000 nm', '1000-2000 nm'], correct: 0 },
        { question: 'What is the unit of frequency?', options: ['Hertz', 'Newton', 'Joule', 'Watt'], correct: 0 },
        { question: 'What is the formula for kinetic energy?', options: ['½mv²', 'mv²', 'mgh', 'Fd'], correct: 0 },
        { question: 'What is the value of acceleration due to gravity?', options: ['9.8 m/s²', '8.9 m/s²', '10 m/s²', '9.8 m/s'], correct: 0 },
        { question: 'What is the unit of work?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 0 }
    ],
    'Engineering Mathematics-I': [
        { question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2x²'], correct: 1 },
        { question: 'What is the integral of 2x dx?', options: ['x² + C', '2x² + C', 'x²', 'x² + 1'], correct: 0 },
        { question: 'What is the value of sin(90°)?', options: ['0', '1', '0.5', '√3/2'], correct: 1 },
        { question: 'What is the value of cos(0°)?', options: ['0', '1', '0.5', '√3/2'], correct: 1 },
        { question: 'What is the derivative of sin x?', options: ['cos x', '-cos x', 'sin x', '-sin x'], correct: 0 },
        { question: 'What is the derivative of cos x?', options: ['cos x', '-cos x', 'sin x', '-sin x'], correct: 3 },
        { question: 'What is the value of i²?', options: ['-1', '1', '0', 'i'], correct: 0 },
        { question: 'What is the formula for quadratic equation roots?', options: ['(-b±√(b²-4ac))/2a', '(-b±√(b²+4ac))/2a', '(b±√(b²-4ac))/2a', '(-b±√(4ac-b²))/2a'], correct: 0 },
        { question: 'What is log₁₀(100)?', options: ['1', '2', '3', '10'], correct: 1 }
    ],
    'Basic Electrical Engineering': [
        { question: 'What is Ohm\'s Law?', options: ['V = IR', 'V = I/R', 'I = VR', 'R = VI'], correct: 0 },
        { question: 'What is the unit of resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2 },
        { question: 'What is the unit of power?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 3 },
        { question: 'What is the unit of current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 1 },
        { question: 'What is the unit of voltage?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 0 },
        { question: 'What is the formula for power?', options: ['P = VI', 'P = V/I', 'P = I/V', 'P = V²I'], correct: 0 },
        { question: 'What is the equivalent resistance of two 10Ω resistors in series?', options: ['20Ω', '10Ω', '5Ω', '2Ω'], correct: 0 },
        { question: 'What is the equivalent resistance of two 10Ω resistors in parallel?', options: ['20Ω', '10Ω', '5Ω', '2Ω'], correct: 2 }
    ],
    'Engineering Mechanics': [
        { question: 'What is Newton\'s First Law?', options: ['Inertia', 'F = ma', 'Action-Reaction', 'Energy Conservation'], correct: 0 },
        { question: 'What is the unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1 },
        { question: 'What is the formula for force?', options: ['F = ma', 'F = m/a', 'F = a/m', 'F = m+a'], correct: 0 },
        { question: 'What is the moment of inertia?', options: ['Resistance to rotation', 'Resistance to motion', 'Resistance to force', 'Resistance to acceleration'], correct: 0 },
        { question: 'What is the unit of moment?', options: ['N·m', 'N/m', 'N', 'Joule'], correct: 0 }
    ],
    'Programming Fundamentals': [
        { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
        { question: 'What is a variable in programming?', options: ['A container', 'A function', 'A loop', 'A condition'], correct: 0 },
        { question: 'What is the base of binary numbers?', options: ['2', '8', '10', '16'], correct: 0 },
        { question: 'What is an algorithm?', options: ['A set of steps', 'A program', 'A language', 'A compiler'], correct: 0 },
        { question: 'What is the output of 2 + 2 in Python?', options: ['4', '22', '2+2', 'Error'], correct: 0 }
    ],
    'Basic Electronics': [
        { question: 'What is a diode used for?', options: ['Rectification', 'Amplification', 'Switching', 'Oscillation'], correct: 0 },
        { question: 'What is a transistor used for?', options: ['Amplification', 'Rectification', 'Filtering', 'Oscillation'], correct: 0 },
        { question: 'What is the unit of capacitance?', options: ['Farad', 'Henry', 'Ohm', 'Volt'], correct: 0 },
        { question: 'What is the unit of inductance?', options: ['Farad', 'Henry', 'Ohm', 'Volt'], correct: 1 }
    ]
};

// ===== SAVE DATA =====
function saveData() {
    localStorage.setItem('engicalc_questions', JSON.stringify(DATA.questions));
    localStorage.setItem('engicalc_formulas', JSON.stringify(DATA.formulas));
    localStorage.setItem('engicalc_history', JSON.stringify(DATA.history));
    localStorage.setItem('engicalc_departments', JSON.stringify(DATA.departments));
    localStorage.setItem('engicalc_subjects', JSON.stringify(DATA.subjects));
    localStorage.setItem('engicalc_difficulties', JSON.stringify(DATA.difficulties));
    localStorage.setItem('engicalc_quizSettings', JSON.stringify(DATA.quizSettings));
}

// ===== INITIALIZE SAMPLE DATA =====
function initSampleData() {
    if (DATA.questions.length === 0) {
        DATA.questions = [
            { id: 1, department: 'Electrical Engineering', subject: 'Engineering Chemistry', difficulty: 'Easy', question: 'What is the unit of conductivity?', options: ['S/m', 'Ω/m', 'S/cm', 'Ω/cm'], correct: 0 },
            { id: 2, department: 'Electrical Engineering', subject: 'Engineering Physics', difficulty: 'Easy', question: 'What is the speed of light in vacuum?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], correct: 0 },
            { id: 3, department: 'Mechanical Engineering', subject: 'Engineering Mechanics', difficulty: 'Medium', question: 'What is the moment of inertia?', options: ['Resistance to motion', 'Resistance to rotation', 'Resistance to force', 'Resistance to acceleration'], correct: 1 },
            { id: 4, department: 'Computer Science', subject: 'Programming Fundamentals', difficulty: 'Easy', question: 'What is the time complexity of accessing an array element?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0 }
        ];
        saveData();
    }
    
    if (DATA.formulas.length === 0) {
        DATA.formulas = [
            { id: 1, department: 'Electrical Engineering', subject: 'Engineering Chemistry', name: 'Nernst Equation', equation: 'E = E° - (RT/nF)ln(Q)', description: 'Electrode potential under non-standard conditions' },
            { id: 2, department: 'Electrical Engineering', subject: 'Engineering Physics', name: 'Wave Equation', equation: 'v = fλ', description: 'Wave velocity = Frequency × Wavelength' },
            { id: 3, department: 'Mechanical Engineering', subject: 'Engineering Mechanics', name: 'Newton\'s Second Law', equation: 'F = ma', description: 'Force = Mass × Acceleration' }
        ];
        saveData();
    }
}

// ===== NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const section = this.dataset.section;
        if (section === 'admin') {
            if (isAdminLoggedIn) {
                switchToSection(section);
            } else {
                e.preventDefault();
                document.getElementById('adminPasswordModal').style.display = 'flex';
                document.getElementById('adminPasswordInput').value = '';
                document.getElementById('adminPasswordInput').focus();
                document.getElementById('passwordError').style.display = 'none';
                return;
            }
        } else {
            switchToSection(section);
        }
    });
});

function switchToSection(section) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    document.querySelector('.main-nav')?.classList.remove('open');
}

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('open');
});

// ============================================
// ADMIN PASSWORD SYSTEM
// ============================================
const ADMIN_PASSWORD = '1234';
let isAdminLoggedIn = false;

function verifyAdminPassword() {
    const password = document.getElementById('adminPasswordInput').value;
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('adminPasswordModal').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('passwordError').style.display = 'none';
        renderAll();
        populateAllSelects();
        populateQuizOptions();
        switchToSection('admin');
    } else {
        document.getElementById('passwordError').style.display = 'block';
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('adminPasswordInput').focus();
        setTimeout(() => {
            document.getElementById('passwordError').style.display = 'none';
        }, 3000);
    }
}

function closePasswordModal() {
    document.getElementById('adminPasswordModal').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('adminPasswordInput').value = '';
}

function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('adminDashboard').style.display = 'none';
    switchToSection('home');
}

// ============================================
// QUIZ - POPULATE OPTIONS
// ============================================
function populateQuizOptions() {
    const diffSelect = document.getElementById('quizDifficulty');
    diffSelect.innerHTML = DATA.difficulties.map(d => `<option value="${d}">${d}</option>`).join('');
    
    const countSelect = document.getElementById('quizCount');
    countSelect.innerHTML = DATA.quizSettings.questionCounts.map(c => `<option value="${c}">${c}</option>`).join('');
    
    const timeSelect = document.getElementById('quizTime');
    timeSelect.innerHTML = DATA.quizSettings.timeOptions.map(t => `<option value="${t}">${t}</option>`).join('');
    
    document.getElementById('quizDifficulty').value = DATA.quizSettings.defaultDifficulty;
    document.getElementById('quizCount').value = DATA.quizSettings.defaultCount;
    document.getElementById('quizTime').value = DATA.quizSettings.defaultTime;
}

function populateQuizDepartments() {
    const select = document.getElementById('quizDepartment');
    select.innerHTML = DATA.departments.map(d => `<option value="${d}">${d}</option>`).join('');
    updateQuizSubjects();
}

function updateQuizSubjects() {
    const department = document.getElementById('quizDepartment').value;
    const select = document.getElementById('quizSubject');
    const subjects = DATA.subjects[department] || ['General'];
    select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    updateQuizDescription();
}

function updateQuizDescription() {
    const subject = document.getElementById('quizSubject').value;
    const desc = document.getElementById('quizDescription');
    const count = document.getElementById('quizCount').value;
    const time = document.getElementById('quizTime').value;
    const diff = document.getElementById('quizDifficulty').value;
    
    const hasQuestions = SUBJECT_QUESTIONS[subject] && SUBJECT_QUESTIONS[subject].length > 0;
    const qCount = hasQuestions ? Math.min(parseInt(count), SUBJECT_QUESTIONS[subject].length) : 0;
    
    if (hasQuestions) {
        desc.innerHTML = `📚 <strong>${subject}</strong> — ${SUBJECT_QUESTIONS[subject].length} questions available • ${diff} • ${count} Q • ${time} min`;
        desc.style.display = 'block';
    } else {
        desc.innerHTML = `⚠️ No questions available for <strong>${subject}</strong>. Add questions from Admin Panel.`;
        desc.style.display = 'block';
        desc.style.background = '#FEF3C7';
        desc.style.color = '#92400E';
    }
}

// ============================================
// AUTO GENERATE QUIZ
// ============================================
function autoGenerateQuiz() {
    const subject = document.getElementById('quizSubject').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const time = parseInt(document.getElementById('quizTime').value);
    const department = document.getElementById('quizDepartment').value;
    
    // Get questions from subject bank
    let questions = [];
    if (SUBJECT_QUESTIONS[subject]) {
        const allQ = SUBJECT_QUESTIONS[subject];
        // Shuffle and take count
        const shuffled = shuffleArray([...allQ]);
        questions = shuffled.slice(0, Math.min(count, shuffled.length)).map(q => ({
            id: Date.now() + Math.random() * 1000,
            department: department,
            subject: subject,
            difficulty: difficulty,
            question: q.question,
            options: q.options,
            correct: q.correct,
            _autoGenerated: true
        }));
    }
    
    // Also add from database questions
    const dbQuestions = DATA.questions.filter(q => 
        q.subject === subject && 
        q.department === department &&
        q.difficulty === difficulty
    );
    
    // Combine and shuffle
    const allQuestions = [...questions, ...dbQuestions];
    const finalQuestions = shuffleArray(allQuestions).slice(0, count);
    
    if (finalQuestions.length === 0) {
        alert('No questions available for this subject. Please add questions from Admin Panel or try another subject.');
        return;
    }
    
    // Start quiz
    startQuizWithQuestions(finalQuestions, time);
}

function startQuizWithQuestions(questions, time) {
    currentQuiz.questions = questions;
    currentQuiz.currentIndex = 0;
    currentQuiz.answers = new Array(questions.length).fill(null);
    currentQuiz.score = 0;
    currentQuiz.totalTime = time * 60;
    currentQuiz.timeLeft = time * 60;
    
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    
    renderQuestion();
    startTimer();
}

// ============================================
// ADMIN - DIFFICULTIES
// ============================================
function renderDifficulties() {
    const container = document.getElementById('difficultyList');
    container.innerHTML = DATA.difficulties.map(d => `<span class="topic-tag">${d}</span>`).join('');
}

function addDifficulty() {
    const input = document.getElementById('newDifficulty');
    const diff = input.value.trim();
    if (diff && !DATA.difficulties.includes(diff)) {
        DATA.difficulties.push(diff);
        saveData();
        renderDifficulties();
        populateQuizOptions();
        input.value = '';
    } else {
        alert('Difficulty already exists or invalid.');
    }
}

// ============================================
// ADMIN - DEPARTMENTS
// ============================================
function renderDepartments() {
    const container = document.getElementById('departmentList');
    container.innerHTML = DATA.departments.map(d => `<span class="topic-tag">${d}</span>`).join('');
}

function addDepartment() {
    const input = document.getElementById('newDepartment');
    const dept = input.value.trim();
    if (dept && !DATA.departments.includes(dept)) {
        DATA.departments.push(dept);
        DATA.subjects[dept] = ['General'];
        saveData();
        renderAll();
        populateAllSelects();
        populateQuizDepartments();
        input.value = '';
    } else {
        alert('Department already exists or invalid.');
    }
}

// ============================================
// ADMIN - SUBJECTS
// ============================================
function populateSubjectSelects() {
    const select = document.getElementById('subjectDepartmentSelect');
    if (select) {
        select.innerHTML = DATA.departments.map(d => `<option value="${d}">${d}</option>`).join('');
    }
}

function renderSubjects() {
    const container = document.getElementById('subjectList');
    let html = '';
    DATA.departments.forEach(dept => {
        const subjects = DATA.subjects[dept] || [];
        subjects.forEach(sub => {
            const hasQ = SUBJECT_QUESTIONS[sub] ? '✅' : '❌';
            html += `<span class="topic-tag">${dept} › ${sub} ${hasQ}</span>`;
        });
    });
    container.innerHTML = html || '<p>No subjects added yet.</p>';
}

function addSubject() {
    const dept = document.getElementById('subjectDepartmentSelect').value;
    const input = document.getElementById('newSubject');
    const subject = input.value.trim();
    if (subject) {
        if (!DATA.subjects[dept]) DATA.subjects[dept] = [];
        if (!DATA.subjects[dept].includes(subject)) {
            DATA.subjects[dept].push(subject);
            // Add empty question bank for new subject
            if (!SUBJECT_QUESTIONS[subject]) {
                SUBJECT_QUESTIONS[subject] = [];
            }
            saveData();
            renderAll();
            populateAllSelects();
            populateQuizDepartments();
            input.value = '';
        } else {
            alert('Subject already exists in this department.');
        }
    } else {
        alert('Please enter a subject name.');
    }
}

// ============================================
// ADMIN - QUIZ SETTINGS
// ============================================
function loadQuizSettings() {
    document.getElementById('questionCountOptions').value = DATA.quizSettings.questionCounts.join(',');
    document.getElementById('timeOptions').value = DATA.quizSettings.timeOptions.join(',');
    
    const defaultDiff = document.getElementById('defaultDifficulty');
    defaultDiff.innerHTML = DATA.difficulties.map(d => `<option value="${d}" ${d === DATA.quizSettings.defaultDifficulty ? 'selected' : ''}>${d}</option>`).join('');
    
    const defaultCount = document.getElementById('defaultCount');
    defaultCount.innerHTML = DATA.quizSettings.questionCounts.map(c => `<option value="${c}" ${c === DATA.quizSettings.defaultCount ? 'selected' : ''}>${c}</option>`).join('');
    
    const defaultTime = document.getElementById('defaultTime');
    defaultTime.innerHTML = DATA.quizSettings.timeOptions.map(t => `<option value="${t}" ${t === DATA.quizSettings.defaultTime ? 'selected' : ''}>${t}</option>`).join('');
}

function saveQuizSettings() {
    const countStr = document.getElementById('questionCountOptions').value.trim();
    const timeStr = document.getElementById('timeOptions').value.trim();
    
    const counts = countStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    const times = timeStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    
    if (counts.length === 0 || times.length === 0) {
        alert('Please enter valid comma-separated numbers.');
        return;
    }
    
    DATA.quizSettings.questionCounts = counts;
    DATA.quizSettings.timeOptions = times;
    DATA.quizSettings.defaultDifficulty = document.getElementById('defaultDifficulty').value;
    DATA.quizSettings.defaultCount = parseInt(document.getElementById('defaultCount').value);
    DATA.quizSettings.defaultTime = parseInt(document.getElementById('defaultTime').value);
    
    saveData();
    populateQuizOptions();
    alert('Quiz settings saved successfully!');
}

// ============================================
// SCIENTIFIC CALCULATOR
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
        expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/√\(/g, 'Math.sqrt(');
        expr = expr.replace(/π/g, 'Math.PI');
        expr = expr.replace(/e(?![xp])/g, 'Math.E');
        expr = expr.replace(/x²/g, '**2');
        expr = expr.replace(/xʸ/g, '**');
        
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

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (document.getElementById('calculator').classList.contains('active')) {
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

renderHistory();

// ============================================
// UNIT CONVERTER
// ============================================
const conversionData = {
    length: {
        units: ['m', 'cm', 'mm', 'km', 'inch', 'ft', 'mile'],
        factors: { m: 1, cm: 100, mm: 1000, km: 0.001, inch: 39.37, ft: 3.281, mile: 0.000621 }
    },
    mass: {
        units: ['kg', 'g', 'mg', 'lb', 'oz'],
        factors: { kg: 1, g: 1000, mg: 1000000, lb: 2.205, oz: 35.274 }
    },
    temperature: {
        units: ['°C', '°F', 'K'],
        factors: {}
    },
    pressure: {
        units: ['Pa', 'kPa', 'MPa', 'bar', 'psi'],
        factors: { Pa: 1, kPa: 0.001, MPa: 0.000001, bar: 0.00001, psi: 0.000145 }
    },
    energy: {
        units: ['J', 'kJ', 'cal', 'Wh', 'kWh'],
        factors: { J: 1, kJ: 0.001, cal: 0.239, Wh: 0.000278, kWh: 0.000000278 }
    },
    power: {
        units: ['W', 'kW', 'MW', 'HP'],
        factors: { W: 1, kW: 0.001, MW: 0.000001, HP: 0.001341 }
    }
};

function updateConverterUnits() {
    const category = document.getElementById('convCategory').value;
    const data = conversionData[category];
    const fromSelect = document.getElementById('convFrom');
    const toSelect = document.getElementById('convTo');
    fromSelect.innerHTML = data.units.map(u => `<option value="${u}">${u}</option>`).join('');
    toSelect.innerHTML = data.units.map(u => `<option value="${u}">${u}</option>`).join('');
    if (data.units.length > 1) toSelect.value = data.units[1];
    convertUnit();
}

function convertUnit() {
    const category = document.getElementById('convCategory').value;
    const from = document.getElementById('convFrom').value;
    const to = document.getElementById('convTo').value;
    const value = parseFloat(document.getElementById('convValue').value);
    if (isNaN(value)) {
        document.getElementById('convResult').value = 'Enter a valid number';
        return;
    }
    let result;
    if (category === 'temperature') {
        result = convertTemperature(value, from, to);
    } else {
        const data = conversionData[category];
        const baseValue = value / data.factors[from];
        result = baseValue * data.factors[to];
    }
    document.getElementById('convResult').value = result.toFixed(6);
}

function convertTemperature(value, from, to) {
    let celsius;
    if (from === '°C') celsius = value;
    else if (from === '°F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;
    if (to === '°C') return celsius;
    else if (to === '°F') return celsius * 9/5 + 32;
    else if (to === 'K') return celsius + 273.15;
    return value;
}

function swapConverterUnits() {
    const from = document.getElementById('convFrom');
    const to = document.getElementById('convTo');
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    convertUnit();
}

// ============================================
// EQUATION SOLVER
// ============================================
function switchSolver(type) {
    document.querySelectorAll('.solver-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.solver-tab[data-stype="${type}"]`).classList.add('active');
    document.querySelectorAll('.solver-panel').forEach(p => p.style.display = 'none');
    document.getElementById('solver' + type.charAt(0).toUpperCase() + type.slice(1)).style.display = 'block';
}

function solveLinear() {
    const a = parseFloat(document.getElementById('linA').value);
    const b = parseFloat(document.getElementById('linB').value);
    const result = document.getElementById('linearResult');
    if (a === 0) {
        result.innerHTML = b === 0 ? '✅ Infinite solutions' : '❌ No solution';
    } else {
        result.innerHTML = `✅ x = ${(-b / a).toFixed(4)}`;
    }
    result.classList.add('show');
}

function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadA').value);
    const b = parseFloat(document.getElementById('quadB').value);
    const c = parseFloat(document.getElementById('quadC').value);
    const result = document.getElementById('quadraticResult');
    if (a === 0) {
        result.innerHTML = '❌ Not a quadratic (a = 0)';
        result.classList.add('show');
        return;
    }
    const d = b*b - 4*a*c;
    if (d < 0) {
        const real = -b/(2*a);
        const imag = Math.sqrt(-d)/(2*a);
        result.innerHTML = `❌ Complex roots: ${real.toFixed(4)} ± ${imag.toFixed(4)}i`;
    } else if (d === 0) {
        result.innerHTML = `✅ x = ${(-b/(2*a)).toFixed(4)} (double root)`;
    } else {
        const x1 = (-b + Math.sqrt(d))/(2*a);
        const x2 = (-b - Math.sqrt(d))/(2*a);
        result.innerHTML = `✅ x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
    }
    result.classList.add('show');
}

function solveSystem2() {
    const a1 = parseFloat(document.getElementById('s2a1').value);
    const b1 = parseFloat(document.getElementById('s2b1').value);
    const c1 = parseFloat(document.getElementById('s2c1').value);
    const a2 = parseFloat(document.getElementById('s2a2').value);
    const b2 = parseFloat(document.getElementById('s2b2').value);
    const c2 = parseFloat(document.getElementById('s2c2').value);
    const result = document.getElementById('system2Result');
    const det = a1*b2 - a2*b1;
    if (det === 0) {
        result.innerHTML = '❌ No unique solution';
    } else {
        result.innerHTML = `✅ x = ${((c1*b2 - c2*b1)/det).toFixed(4)}, y = ${((a1*c2 - a2*c1)/det).toFixed(4)}`;
    }
    result.classList.add('show');
}

function solveSystem3() {
    const a1 = parseFloat(document.getElementById('s3a1').value);
    const b1 = parseFloat(document.getElementById('s3b1').value);
    const c1 = parseFloat(document.getElementById('s3c1').value);
    const d1 = parseFloat(document.getElementById('s3d1').value);
    const a2 = parseFloat(document.getElementById('s3a2').value);
    const b2 = parseFloat(document.getElementById('s3b2').value);
    const c2 = parseFloat(document.getElementById('s3c2').value);
    const d2 = parseFloat(document.getElementById('s3d2').value);
    const a3 = parseFloat(document.getElementById('s3a3').value);
    const b3 = parseFloat(document.getElementById('s3b3').value);
    const c3 = parseFloat(document.getElementById('s3c3').value);
    const d3 = parseFloat(document.getElementById('s3d3').value);
    const result = document.getElementById('system3Result');
    const det = a1*(b2*c3 - b3*c2) - b1*(a2*c3 - a3*c2) + c1*(a2*b3 - a3*b2);
    if (det === 0) {
        result.innerHTML = '❌ No unique solution';
        result.classList.add('show');
        return;
    }
    const detX = d1*(b2*c3 - b3*c2) - b1*(d2*c3 - d3*c2) + c1*(d2*b3 - d3*b2);
    const detY = a1*(d2*c3 - d3*c2) - d1*(a2*c3 - a3*c2) + c1*(a2*d3 - a3*d2);
    const detZ = a1*(b2*d3 - b3*d2) - b1*(a2*d3 - a3*d2) + d1*(a2*b3 - a3*b2);
    result.innerHTML = `✅ x = ${(detX/det).toFixed(4)}, y = ${(detY/det).toFixed(4)}, z = ${(detZ/det).toFixed(4)}`;
    result.classList.add('show');
}

// ============================================
// ELECTRICAL CALCULATOR
// ============================================
function switchElectrical(type) {
    document.querySelectorAll('.electrical-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.electrical-tab[data-etype="${type}"]`).classList.add('active');
    document.querySelectorAll('.electrical-panel').forEach(p => p.style.display = 'none');
    document.getElementById('elec' + type.charAt(0).toUpperCase() + type.slice(1)).style.display = 'block';
}

function calculateOhmsLaw() {
    const v = parseFloat(document.getElementById('ohmV').value);
    const i = parseFloat(document.getElementById('ohmI').value);
    const r = parseFloat(document.getElementById('ohmR').value);
    const result = document.getElementById('ohmsResult');
    let output = '';
    if (!isNaN(v) && !isNaN(i) && !isNaN(r)) {
        output = '⚠️ Only leave one field empty!';
    } else if (!isNaN(v) && !isNaN(i)) {
        output = `✅ R = ${(v/i).toFixed(4)} Ω`;
    } else if (!isNaN(v) && !isNaN(r)) {
        output = `✅ I = ${(v/r).toFixed(4)} A`;
    } else if (!isNaN(i) && !isNaN(r)) {
        output = `✅ V = ${(i*r).toFixed(4)} V`;
    } else {
        output = '⚠️ Fill exactly two fields!';
    }
    result.innerHTML = output;
    result.classList.add('show');
}

function clearOhmsLaw() {
    ['ohmV', 'ohmI', 'ohmR'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('ohmsResult').classList.remove('show');
}

function calculatePower() {
    const v = parseFloat(document.getElementById('powV').value);
    const i = parseFloat(document.getElementById('powI').value);
    const p = parseFloat(document.getElementById('powP').value);
    const result = document.getElementById('powerResult');
    let output = '';
    if (!isNaN(v) && !isNaN(i) && !isNaN(p)) {
        output = '⚠️ Only leave one field empty!';
    } else if (!isNaN(v) && !isNaN(i)) {
        output = `✅ P = ${(v*i).toFixed(4)} W`;
    } else if (!isNaN(v) && !isNaN(p)) {
        output = `✅ I = ${(p/v).toFixed(4)} A`;
    } else if (!isNaN(i) && !isNaN(p)) {
        output = `✅ V = ${(p/i).toFixed(4)} V`;
    } else {
        output = '⚠️ Fill exactly two fields!';
    }
    result.innerHTML = output;
    result.classList.add('show');
}

function clearPower() {
    ['powV', 'powI', 'powP'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('powerResult').classList.remove('show');
}

function calculateResistance() {
    const type = document.getElementById('resType').value;
    const r1 = parseFloat(document.getElementById('resR1').value);
    const r2 = parseFloat(document.getElementById('resR2').value);
    const r3 = parseFloat(document.getElementById('resR3').value);
    const result = document.getElementById('resistanceResult');
    if (isNaN(r1) || isNaN(r2) || isNaN(r3)) {
        result.innerHTML = '⚠️ Enter all resistance values!';
        result.classList.add('show');
        return;
    }
    let total = type === 'series' ? r1 + r2 + r3 : 1 / (1/r1 + 1/r2 + 1/r3);
    result.innerHTML = `✅ Total ${type} resistance: ${total.toFixed(4)} Ω`;
    result.classList.add('show');
}

function calculateColorCode() {
    const band1 = parseInt(document.getElementById('ccBand1').value);
    const band2 = parseInt(document.getElementById('ccBand2').value);
    const multiplier = parseInt(document.getElementById('ccMultiplier').value);
    const tolerance = parseInt(document.getElementById('ccTolerance').value);
    const result = document.getElementById('colorCodeResult');
    const value = (band1 * 10 + band2) * multiplier;
    const min = value - (value * tolerance / 100);
    const max = value + (value * tolerance / 100);
    result.innerHTML = `✅ ${value.toLocaleString()} Ω ±${tolerance}%<br>📊 Range: ${min.toLocaleString()} — ${max.toLocaleString()} Ω`;
    result.classList.add('show');
}

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

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startQuiz(source) {
    const department = document.getElementById('quizDepartment').value;
    const subject = document.getElementById('quizSubject').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const time = parseInt(document.getElementById('quizTime').value);
    
    let questions = [];
    if (source === 'bank') {
        questions = DATA.questions.filter(q => 
            q.department === department && 
            q.subject === subject && 
            q.difficulty === difficulty
        );
        questions = shuffleArray(questions).slice(0, count);
    } else {
        // AI Generate
        questions = generateAIQuestions(department, subject, difficulty, count);
        questions = shuffleArray(questions);
    }
    
    if (questions.length === 0) {
        alert('No questions available. Try different settings.');
        return;
    }
    
    startQuizWithQuestions(questions, time);
}

function generateAIQuestions(department, subject, difficulty, count) {
    const templates = [
        { q: `What is a fundamental concept in ${subject}?`, opts: ['Concept A', 'Concept B', 'Concept C', 'Concept D'], correct: 0 },
        { q: `Which principle applies to ${subject} in ${department}?`, opts: ['Principle 1', 'Principle 2', 'Principle 3', 'Principle 4'], correct: 1 },
        { q: `How is ${subject} used in engineering?`, opts: ['Application X', 'Application Y', 'Application Z', 'Application W'], correct: 2 },
        { q: `What is the main equation for ${subject}?`, opts: ['Equation 1', 'Equation 2', 'Equation 3', 'Equation 4'], correct: 0 }
    ];
    const questions = [];
    for (let i = 0; i < Math.min(count, templates.length); i++) {
        const template = templates[i];
        const shuffledOpts = shuffleArray([...template.opts]);
        const correctIdx = shuffledOpts.indexOf(template.opts[template.correct]);
        questions.push({
            id: Date.now() + i,
            department, subject, difficulty,
            question: template.q,
            options: shuffledOpts,
            correct: correctIdx,
            _aiGenerated: true
        });
    }
    return shuffleArray(questions);
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
        <button class="option-btn ${currentQuiz.answers[idx] === i ? 'selected' : ''}" onclick="selectOption(${i})">
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
    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
        if (currentQuiz.answers[i] === q.correct) correct++;
    });
    currentQuiz.score = correct;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((correct / total) * 100);
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('resultTotal').textContent = total;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = total - correct;
    document.getElementById('resultScore').textContent = percentage + '%';
    let msg = percentage >= 90 ? '🌟 Excellent! Engineering genius!' :
              percentage >= 70 ? '👏 Great job! Keep practicing!' :
              percentage >= 50 ? '💪 Good effort!' : '📚 Keep learning!';
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
        formulas = formulas.filter(fm => 
            fm.name.toLowerCase().includes(f) || 
            fm.department.toLowerCase().includes(f) ||
            fm.subject.toLowerCase().includes(f) ||
            fm.description.toLowerCase().includes(f)
        );
    }
    container.innerHTML = formulas.map(f => `
        <div class="formula-card">
            <div class="formula-subject">${f.department} › ${f.subject}</div>
            <h4>${f.name}</h4>
            <div class="formula-equation">${f.equation}</div>
            <div class="formula-desc">${f.description}</div>
        </div>
    `).join('');
}

function searchFormulas() {
    renderFormulas(document.getElementById('formulaSearch').value);
}

// ============================================
// ADMIN PANEL - QUESTIONS
// ============================================
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
        const id = 'admin' + this.dataset.tab.charAt(0).toUpperCase() + this.dataset.tab.slice(1);
        document.getElementById(id).classList.add('active');
    });
});

function renderQuestionBank() {
    const container = document.getElementById('questionBank');
    container.innerHTML = DATA.questions.map((q, i) => `
        <div class="question-item">
            <div class="q-info">
                <div class="q-text">${q.question}</div>
                <div class="q-meta">${q.department} › ${q.subject} • ${q.difficulty}</div>
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
        <div class="form-group"><label>Department</label><select id="mqDepartment">${DATA.departments.map(d => `<option value="${d}">${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Subject</label><select id="mqSubject">${(DATA.subjects[DATA.departments[0]] || ['General']).map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Difficulty</label><select id="mqDifficulty">${DATA.difficulties.map(d => `<option value="${d}">${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Question</label><textarea id="mqQuestion" placeholder="Enter your question..."></textarea></div>
        <div class="form-group"><label>Options</label><div class="options-grid"><input type="text" id="mqOpt0" placeholder="Option A"><input type="text" id="mqOpt1" placeholder="Option B"><input type="text" id="mqOpt2" placeholder="Option C"><input type="text" id="mqOpt3" placeholder="Option D"></div></div>
        <div class="form-group"><label>Correct Answer</label><div class="radio-group"><label><input type="radio" name="mqCorrect" value="0"> A</label><label><input type="radio" name="mqCorrect" value="1"> B</label><label><input type="radio" name="mqCorrect" value="2"> C</label><label><input type="radio" name="mqCorrect" value="3"> D</label></div></div>
        <button class="btn-primary" onclick="addQuestion()">Add Question</button>
    `;
    document.getElementById('mqDepartment').addEventListener('change', function() {
        const subjectSelect = document.getElementById('mqSubject');
        const subjects = DATA.subjects[this.value] || ['General'];
        subjectSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function addQuestion() {
    const department = document.getElementById('mqDepartment').value;
    const subject = document.getElementById('mqSubject').value;
    const difficulty = document.getElementById('mqDifficulty').value;
    const question = document.getElementById('mqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('mqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="mqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions.push({ id: Date.now(), department, subject, difficulty, question, options, correct });
    saveData(); renderQuestionBank(); closeModal(); alert('Question added!');
}

function deleteQuestion(index) {
    if (confirm('Delete this question?')) { DATA.questions.splice(index, 1); saveData(); renderQuestionBank(); }
}

function editQuestion(index) {
    const q = DATA.questions[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <h3>Edit Question</h3>
        <div class="form-group"><label>Department</label><select id="eqDepartment">${DATA.departments.map(d => `<option value="${d}" ${d===q.department?'selected':''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Subject</label><select id="eqSubject">${(DATA.subjects[q.department] || ['General']).map(s => `<option value="${s}" ${s===q.subject?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Difficulty</label><select id="eqDifficulty">${DATA.difficulties.map(d => `<option value="${d}" ${d===q.difficulty?'selected':''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Question</label><textarea id="eqQuestion">${q.question}</textarea></div>
        <div class="form-group"><label>Options</label><div class="options-grid">${q.options.map((o,i) => `<input type="text" id="eqOpt${i}" value="${o}" placeholder="Option ${String.fromCharCode(65+i)}">`).join('')}</div></div>
        <div class="form-group"><label>Correct Answer</label><div class="radio-group">${q.options.map((_,i) => `<label><input type="radio" name="eqCorrect" value="${i}" ${q.correct===i?'checked':''}> ${String.fromCharCode(65+i)}</label>`).join('')}</div></div>
        <button class="btn-primary" onclick="saveEditQuestion(${index})">Save Changes</button>
    `;
    document.getElementById('eqDepartment').addEventListener('change', function() {
        const subjectSelect = document.getElementById('eqSubject');
        const subjects = DATA.subjects[this.value] || ['General'];
        subjectSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function saveEditQuestion(index) {
    const department = document.getElementById('eqDepartment').value;
    const subject = document.getElementById('eqSubject').value;
    const difficulty = document.getElementById('eqDifficulty').value;
    const question = document.getElementById('eqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('eqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="eqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions[index] = { ...DATA.questions[index], department, subject, difficulty, question, options, correct };
    saveData(); renderQuestionBank(); closeModal(); alert('Updated!');
}

// ============================================
// ADMIN PANEL - FORMULAS
// ============================================
function renderAdminFormulas() {
    const container = document.getElementById('adminFormulaList');
    container.innerHTML = DATA.formulas.map((f, i) => `
        <div class="question-item">
            <div class="q-info"><div class="q-text"><strong>${f.name}</strong> — ${f.equation}</div><div class="q-meta">${f.department} › ${f.subject}</div></div>
            <div class="q-actions"><button class="btn-edit" onclick="editAdminFormula(${i})">Edit</button><button class="btn-delete" onclick="deleteAdminFormula(${i})">Delete</button></div>
        </div>
    `).join('') || '<p>No formulas added yet.</p>';
}

function showAddFormula() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <h3>Add Formula</h3>
        <div class="form-group"><label>Department</label><select id="mfDepartment">${DATA.departments.map(d => `<option value="${d}">${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Subject</label><select id="mfSubject">${(DATA.subjects[DATA.departments[0]] || ['General']).map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Formula Name</label><input type="text" id="mfName" placeholder="e.g., Ohm's Law"></div>
        <div class="form-group"><label>Equation</label><input type="text" id="mfEquation" placeholder="e.g., V = IR"></div>
        <div class="form-group"><label>Description</label><textarea id="mfDesc" placeholder="Brief explanation..."></textarea></div>
        <button class="btn-primary" onclick="addAdminFormula()">Add Formula</button>
    `;
    document.getElementById('mfDepartment').addEventListener('change', function() {
        const subjectSelect = document.getElementById('mfSubject');
        const subjects = DATA.subjects[this.value] || ['General'];
        subjectSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function addAdminFormula() {
    const department = document.getElementById('mfDepartment').value;
    const subject = document.getElementById('mfSubject').value;
    const name = document.getElementById('mfName').value.trim();
    const equation = document.getElementById('mfEquation').value.trim();
    const description = document.getElementById('mfDesc').value.trim();
    if (!name || !equation) { alert('Please fill required fields.'); return; }
    DATA.formulas.push({ id: Date.now(), department, subject, name, equation, description });
    saveData(); renderAdminFormulas(); renderFormulas(); closeModal(); alert('Formula added!');
}

function deleteAdminFormula(index) {
    if (confirm('Delete this formula?')) { DATA.formulas.splice(index, 1); saveData(); renderAdminFormulas(); renderFormulas(); }
}

function editAdminFormula(index) {
    const f = DATA.formulas[index];
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <h3>Edit Formula</h3>
        <div class="form-group"><label>Department</label><select id="efDepartment">${DATA.departments.map(d => `<option value="${d}" ${d===f.department?'selected':''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label>Subject</label><select id="efSubject">${(DATA.subjects[f.department] || ['General']).map(s => `<option value="${s}" ${s===f.subject?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Formula Name</label><input type="text" id="efName" value="${f.name}"></div>
        <div class="form-group"><label>Equation</label><input type="text" id="efEquation" value="${f.equation}"></div>
        <div class="form-group"><label>Description</label><textarea id="efDesc">${f.description || ''}</textarea></div>
        <button class="btn-primary" onclick="saveAdminFormula(${index})">Save Changes</button>
    `;
    document.getElementById('efDepartment').addEventListener('change', function() {
        const subjectSelect = document.getElementById('efSubject');
        const subjects = DATA.subjects[this.value] || ['General'];
        subjectSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function saveAdminFormula(index) {
    const department = document.getElementById('efDepartment').value;
    const subject = document.getElementById('efSubject').value;
    const name = document.getElementById('efName').value.trim();
    const equation = document.getElementById('efEquation').value.trim();
    const description = document.getElementById('efDesc').value.trim();
    if (!name || !equation) { alert('Please fill required fields.'); return; }
    DATA.formulas[index] = { ...DATA.formulas[index], department, subject, name, equation, description };
    saveData(); renderAdminFormulas(); renderFormulas(); closeModal(); alert('Formula updated!');
}

// ============================================
// POPULATE ALL SELECTS
// ============================================
function populateAllSelects() {
    populateSubjectSelects();
    populateQuizDepartments();
}

// ============================================
// RENDER ALL
// ============================================
function renderAll() {
    renderFormulas();
    renderQuestionBank();
    renderDepartments();
    renderSubjects();
    renderDifficulties();
    renderAdminFormulas();
    loadQuizSettings();
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    initSampleData();
    renderAll();
    populateAllSelects();
    populateQuizOptions();
    updateConverterUnits();
    
    // Auto generate quiz on subject change
    document.getElementById('quizSubject').addEventListener('change', updateQuizDescription);
    document.getElementById('quizCount').addEventListener('change', updateQuizDescription);
    document.getElementById('quizTime').addEventListener('change', updateQuizDescription);
    document.getElementById('quizDifficulty').addEventListener('change', updateQuizDescription);
    
    document.getElementById('adminDashboard').style.display = 'none';
    console.log('🚀 ENGICALC initialized!');
    console.log('🔐 Admin Password: 1234');
    console.log('📚 Structure: Department → Subject');
    console.log('🎯 Auto Quiz Generate available for 1st Year subjects!');
}

document.addEventListener('DOMContentLoaded', init);
