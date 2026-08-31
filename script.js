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
        'Electrical Engineering': ['Engineering Chemistry', 'Engineering Physics', 'Circuit Theory', 'Network Theory'],
        'Mechanical Engineering': ['Engineering Mechanics', 'Thermodynamics', 'Fluid Mechanics'],
        'Civil Engineering': ['Structural Analysis', 'Soil Mechanics', 'Fluid Mechanics'],
        'Computer Science': ['Data Structures', 'Algorithms', 'Discrete Math'],
        'Electronics & Communication': ['Signals & Systems', 'Digital Electronics', 'Communication Systems']
    },
    
    topics: JSON.parse(localStorage.getItem('engicalc_topics')) || {
        'Engineering Chemistry': ['Electrochemistry', 'Thermodynamics', 'Organic Chemistry'],
        'Engineering Physics': ['Optics', 'Thermodynamics', 'Quantum Physics'],
        'Circuit Theory': ['DC Circuits', 'AC Circuits', 'Network Theorems'],
        'Network Theory': ['Two-port Networks', 'Network Functions'],
        'Engineering Mechanics': ['Statics', 'Dynamics', 'Strength of Materials'],
        'Thermodynamics': ['Laws of Thermodynamics', 'Heat Transfer'],
        'Fluid Mechanics': ['Fluid Properties', 'Flow Dynamics'],
        'Data Structures': ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
        'Algorithms': ['Sorting', 'Searching', 'Dynamic Programming']
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

// ===== SAVE DATA =====
function saveData() {
    localStorage.setItem('engicalc_questions', JSON.stringify(DATA.questions));
    localStorage.setItem('engicalc_formulas', JSON.stringify(DATA.formulas));
    localStorage.setItem('engicalc_history', JSON.stringify(DATA.history));
    localStorage.setItem('engicalc_departments', JSON.stringify(DATA.departments));
    localStorage.setItem('engicalc_subjects', JSON.stringify(DATA.subjects));
    localStorage.setItem('engicalc_topics', JSON.stringify(DATA.topics));
    localStorage.setItem('engicalc_difficulties', JSON.stringify(DATA.difficulties));
    localStorage.setItem('engicalc_quizSettings', JSON.stringify(DATA.quizSettings));
}

// ===== INITIALIZE SAMPLE DATA =====
function initSampleData() {
    if (DATA.questions.length === 0) {
        DATA.questions = [
            { id: 1, department: 'Electrical Engineering', subject: 'Engineering Chemistry', topic: 'Electrochemistry', difficulty: 'Easy', question: 'What is the unit of conductivity?', options: ['S/m', 'Ω/m', 'S/cm', 'Ω/cm'], correct: 0 },
            { id: 2, department: 'Electrical Engineering', subject: 'Engineering Physics', topic: 'Optics', difficulty: 'Easy', question: 'What is the speed of light in vacuum?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], correct: 0 },
            { id: 3, department: 'Mechanical Engineering', subject: 'Engineering Mechanics', topic: 'Statics', difficulty: 'Medium', question: 'What is the moment of inertia?', options: ['Resistance to motion', 'Resistance to rotation', 'Resistance to force', 'Resistance to acceleration'], correct: 1 },
            { id: 4, department: 'Computer Science', subject: 'Data Structures', topic: 'Arrays', difficulty: 'Easy', question: 'What is the time complexity of accessing an array element?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0 }
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
    
    // Set defaults
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
    updateQuizTopics();
}

function updateQuizTopics() {
    const subject = document.getElementById('quizSubject').value;
    const select = document.getElementById('quizTopic');
    const topics = DATA.topics[subject] || ['General'];
    select.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
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
    const selects = document.querySelectorAll('#subjectDepartmentSelect, #topicDepartmentSelect');
    selects.forEach(sel => {
        if (sel) {
            sel.innerHTML = DATA.departments.map(d => `<option value="${d}">${d}</option>`).join('');
            if (sel.id === 'topicDepartmentSelect') updateTopicSubjectSelect();
        }
    });
}

function updateTopicSubjectSelect() {
    const dept = document.getElementById('topicDepartmentSelect').value;
    const select = document.getElementById('topicSubjectSelect');
    const subjects = DATA.subjects[dept] || ['General'];
    select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
}

function renderSubjects() {
    const container = document.getElementById('subjectList');
    let html = '';
    DATA.departments.forEach(dept => {
        const subjects = DATA.subjects[dept] || [];
        subjects.forEach(sub => {
            html += `<span class="topic-tag">${dept} › ${sub}</span>`;
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
            DATA.topics[subject] = ['General'];
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
// ADMIN - TOPICS
// ============================================
function renderTopics() {
    const container = document.getElementById('topicList');
    let html = '';
    DATA.departments.forEach(dept => {
        const subjects = DATA.subjects[dept] || [];
        subjects.forEach(sub => {
            const topics = DATA.topics[sub] || [];
            topics.forEach(topic => {
                html += `<span class="topic-tag">${dept} › ${sub} › ${topic}</span>`;
            });
        });
    });
    container.innerHTML = html || '<p>No topics added yet.</p>';
}

function addTopic() {
    const dept = document.getElementById('topicDepartmentSelect').value;
    const subject = document.getElementById('topicSubjectSelect').value;
    const input = document.getElementById('newTopic');
    const topic = input.value.trim();
    if (topic) {
        if (!DATA.topics[subject]) DATA.topics[subject] = [];
        if (!DATA.topics[subject].includes(topic)) {
            DATA.topics[subject].push(topic);
            saveData();
            renderAll();
            populateQuizDepartments();
            input.value = '';
        } else {
            alert('Topic already exists in this subject.');
        }
    } else {
        alert('Please enter a topic name.');
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
    const topic = document.getElementById('quizTopic').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const time = parseInt(document.getElementById('quizTime').value);
    
    let questions = [];
    if (source === 'bank') {
        questions = DATA.questions.filter(q => 
            q.department === department && 
            q.subject === subject && 
            q.topic === topic && 
            q.difficulty === difficulty
        );
        questions = shuffleArray(questions).slice(0, count);
    } else {
        questions = generateAIQuestions(department, subject, topic, difficulty, count);
        questions = shuffleArray(questions);
    }
    
    if (questions.length === 0) {
        alert('No questions available. Try different settings.');
        return;
    }
    
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

function generateAIQuestions(department, subject, topic, difficulty, count) {
    const templates = [
        { q: `What is a fundamental concept in ${topic}?`, opts: ['Concept A', 'Concept B', 'Concept C', 'Concept D'], correct: 0 },
        { q: `Which principle applies to ${subject} in ${department}?`, opts: ['Principle 1', 'Principle 2', 'Principle 3', 'Principle 4'], correct: 1 },
        { q: `How is ${topic} used in ${subject}?`, opts: ['Application X', 'Application Y', 'Application Z', 'Application W'], correct: 2 },
        { q: `What is the main equation for ${topic}?`, opts: ['Equation 1', 'Equation 2', 'Equation 3', 'Equation 4'], correct: 0 }
    ];
    const questions = [];
    for (let i = 0; i < Math.min(count, templates.length); i++) {
        const template = templates[i];
        const shuffledOpts = shuffleArray([...template.opts]);
        const correctIdx = shuffledOpts.indexOf(template.opts[template.correct]);
        questions.push({
            id: Date.now() + i,
            department, subject, topic, difficulty,
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
                <div class="q-meta">${q.department} › ${q.subject} › ${q.topic} • ${q.difficulty}</div>
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
        <div class="form-group"><label>Topic</label><select id="mqTopic"><option>General</option></select></div>
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
    document.getElementById('mqSubject').addEventListener('change', function() {
        const topicSelect = document.getElementById('mqTopic');
        const topics = DATA.topics[this.value] || ['General'];
        topicSelect.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function addQuestion() {
    const department = document.getElementById('mqDepartment').value;
    const subject = document.getElementById('mqSubject').value;
    const topic = document.getElementById('mqTopic').value;
    const difficulty = document.getElementById('mqDifficulty').value;
    const question = document.getElementById('mqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('mqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="mqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions.push({ id: Date.now(), department, subject, topic, difficulty, question, options, correct });
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
        <div class="form-group"><label>Topic</label><select id="eqTopic">${(DATA.topics[q.subject] || ['General']).map(t => `<option value="${t}" ${t===q.topic?'selected':''}>${t}</option>`).join('')}</select></div>
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
    document.getElementById('eqSubject').addEventListener('change', function() {
        const topicSelect = document.getElementById('eqTopic');
        const topics = DATA.topics[this.value] || ['General'];
        topicSelect.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function saveEditQuestion(index) {
    const department = document.getElementById('eqDepartment').value;
    const subject = document.getElementById('eqSubject').value;
    const topic = document.getElementById('eqTopic').value;
    const difficulty = document.getElementById('eqDifficulty').value;
    const question = document.getElementById('eqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('eqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="eqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions[index] = { ...DATA.questions[index], department, subject, topic, difficulty, question, options, correct };
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
    renderTopics();
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
    
    document.getElementById('adminDashboard').style.display = 'none';
    console.log('🚀 ENGICALC initialized!');
    console.log('🔐 Admin Password: 1234');
    console.log('📚 Structure: Department → Subject → Topic');
    console.log('⚙️ Quiz Settings: Difficulty, Count, Time all customizable from Admin');
}

document.addEventListener('DOMContentLoaded', init);
