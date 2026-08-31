// ============================================
// ENGICALC — Complete JavaScript
// ============================================

// ===== DATA STORE =====
const DATA = {
    questions: JSON.parse(localStorage.getItem('engicalc_questions')) || [],
    formulas: JSON.parse(localStorage.getItem('engicalc_formulas')) || [],
    history: JSON.parse(localStorage.getItem('engicalc_history')) || [],
    subjects: JSON.parse(localStorage.getItem('engicalc_subjects')) || ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Engineering Mathematics', 'Computer Science'],
    topics: JSON.parse(localStorage.getItem('engicalc_topics')) || {
        'Electrical Engineering': ['Circuit Theory', 'Network Theory', 'Electrical Machines', 'Power Systems'],
        'Mechanical Engineering': ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Dynamics'],
        'Civil Engineering': ['Structural Analysis', 'Fluid Mechanics', 'Soil Mechanics', 'Transportation'],
        'Engineering Mathematics': ['Calculus', 'Linear Algebra', 'Differential Equations', 'Statistics'],
        'Computer Science': ['Data Structures', 'Algorithms', 'Discrete Math', 'Programming']
    },
    subtopics: JSON.parse(localStorage.getItem('engicalc_subtopics')) || {
        'Circuit Theory': ['AC Circuits', 'DC Circuits', 'Network Theorems'],
        'Network Theory': ['Two-port Networks', 'Network Functions', 'Filters'],
        'Thermodynamics': ['Laws of Thermodynamics', 'Heat Transfer', 'Thermodynamic Cycles'],
        'Calculus': ['Differentiation', 'Integration', 'Differential Equations'],
        'Data Structures': ['Arrays', 'Linked Lists', 'Trees', 'Graphs']
    },
    settings: JSON.parse(localStorage.getItem('engicalc_settings')) || {
        easy: { questions: 10, time: 10 },
        medium: { questions: 20, time: 20 },
        hard: { questions: 30, time: 45 }
    }
};

// ===== SAVE DATA =====
function saveData() {
    localStorage.setItem('engicalc_questions', JSON.stringify(DATA.questions));
    localStorage.setItem('engicalc_formulas', JSON.stringify(DATA.formulas));
    localStorage.setItem('engicalc_history', JSON.stringify(DATA.history));
    localStorage.setItem('engicalc_subjects', JSON.stringify(DATA.subjects));
    localStorage.setItem('engicalc_topics', JSON.stringify(DATA.topics));
    localStorage.setItem('engicalc_subtopics', JSON.stringify(DATA.subtopics));
    localStorage.setItem('engicalc_settings', JSON.stringify(DATA.settings));
}

// ===== INITIALIZE SAMPLE DATA =====
function initSampleData() {
    if (DATA.questions.length === 0) {
        DATA.questions = [
            { id: 1, subject: 'Electrical Engineering', topic: 'Circuit Theory', subtopic: 'DC Circuits', difficulty: 'easy', question: 'What is Ohm\'s Law?', options: ['V = IR', 'V = I/R', 'I = VR', 'R = VI'], correct: 0 },
            { id: 2, subject: 'Electrical Engineering', topic: 'Circuit Theory', subtopic: 'DC Circuits', difficulty: 'easy', question: 'What is the unit of resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2 },
            { id: 3, subject: 'Electrical Engineering', topic: 'Network Theory', subtopic: 'Two-port Networks', difficulty: 'medium', question: 'What is the equivalent resistance of two 10Ω resistors in parallel?', options: ['20Ω', '10Ω', '5Ω', '2Ω'], correct: 2 },
            { id: 4, subject: 'Mechanical Engineering', topic: 'Thermodynamics', subtopic: 'Laws of Thermodynamics', difficulty: 'easy', question: 'What is the First Law of Thermodynamics?', options: ['Energy is created', 'Energy is destroyed', 'Energy is conserved', 'Entropy always increases'], correct: 2 },
            { id: 5, subject: 'Engineering Mathematics', topic: 'Calculus', subtopic: 'Differentiation', difficulty: 'easy', question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2x²'], correct: 1 },
            { id: 6, subject: 'Computer Science', topic: 'Data Structures', subtopic: 'Arrays', difficulty: 'easy', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
            { id: 7, subject: 'Civil Engineering', topic: 'Structural Analysis', subtopic: 'Beams', difficulty: 'easy', question: 'What is a beam?', options: ['Column', 'Horizontal member', 'Vertical member', 'Foundation'], correct: 1 }
        ];
        saveData();
    }
    
    if (DATA.formulas.length === 0) {
        DATA.formulas = [
            { id: 1, subject: 'Electrical Engineering', name: 'Ohm\'s Law', equation: 'V = I × R', description: 'Voltage = Current × Resistance' },
            { id: 2, subject: 'Electrical Engineering', name: 'Power Formula', equation: 'P = V × I', description: 'Power = Voltage × Current' },
            { id: 3, subject: 'Mechanical Engineering', name: 'Newton\'s Second Law', equation: 'F = m × a', description: 'Force = Mass × Acceleration' },
            { id: 4, subject: 'Civil Engineering', name: 'Stress Formula', equation: 'σ = F / A', description: 'Stress = Force / Area' },
            { id: 5, subject: 'Engineering Mathematics', name: 'Quadratic Formula', equation: 'x = (-b ± √(b² - 4ac)) / 2a', description: 'Solution for ax² + bx + c = 0' },
            { id: 6, subject: 'Computer Science', name: 'Big O Notation', equation: 'O(f(n))', description: 'Upper bound of algorithm complexity' }
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
        renderQuestionBank();
        renderSubjects();
        renderTopics();
        renderAdminFormulas();
        loadSettings();
        populateSubjectSelects();
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
// QUIZ - Subject/Topic/Subtopic Functions
// ============================================
function populateQuizSubjects() {
    const select = document.getElementById('quizSubject');
    select.innerHTML = DATA.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    updateQuizTopics();
}

function updateQuizTopics() {
    const subject = document.getElementById('quizSubject').value;
    const select = document.getElementById('quizTopic');
    const topics = DATA.topics[subject] || ['General'];
    select.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
    updateQuizSubtopics();
}

function updateQuizSubtopics() {
    const topic = document.getElementById('quizTopic').value;
    const select = document.getElementById('quizSubtopic');
    const subtopics = DATA.subtopics[topic] || ['General'];
    select.innerHTML = subtopics.map(st => `<option value="${st}">${st}</option>`).join('');
}

// ============================================
// ADMIN - Subjects Management
// ============================================
function renderSubjects() {
    const container = document.getElementById('subjectList');
    container.innerHTML = DATA.subjects.map(s => `<span class="topic-tag">${s}</span>`).join('');
}

function addSubject() {
    const input = document.getElementById('newSubject');
    const subject = input.value.trim();
    if (subject && !DATA.subjects.includes(subject)) {
        DATA.subjects.push(subject);
        DATA.topics[subject] = ['General'];
        saveData();
        renderSubjects();
        populateSubjectSelects();
        populateQuizSubjects();
        input.value = '';
    } else {
        alert('Subject already exists or invalid.');
    }
}

// ============================================
// ADMIN - Topics Management
// ============================================
function populateSubjectSelects() {
    const selects = document.querySelectorAll('#topicSubjectSelect, #qtSubject');
    selects.forEach(sel => {
        if (sel) {
            sel.innerHTML = DATA.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        }
    });
}

function renderTopics() {
    const container = document.getElementById('topicList');
    let html = '';
    DATA.subjects.forEach(subject => {
        const topics = DATA.topics[subject] || [];
        topics.forEach(topic => {
            html += `<span class="topic-tag">${subject} › ${topic}</span>`;
        });
    });
    container.innerHTML = html || '<p>No topics added yet.</p>';
}

function addTopic() {
    const subject = document.getElementById('topicSubjectSelect').value;
    const input = document.getElementById('newTopic');
    const topic = input.value.trim();
    if (topic) {
        if (!DATA.topics[subject]) DATA.topics[subject] = [];
        if (!DATA.topics[subject].includes(topic)) {
            DATA.topics[subject].push(topic);
            DATA.subtopics[topic] = ['General'];
            saveData();
            renderTopics();
            populateQuizSubjects();
            input.value = '';
        } else {
            alert('Topic already exists in this subject.');
        }
    } else {
        alert('Please enter a topic name.');
    }
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
    const subject = document.getElementById('quizSubject').value;
    const topic = document.getElementById('quizTopic').value;
    const subtopic = document.getElementById('quizSubtopic').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const time = parseInt(document.getElementById('quizTime').value);
    
    let questions = [];
    if (source === 'bank') {
        questions = DATA.questions.filter(q => 
            q.subject === subject && 
            q.topic === topic && 
            q.subtopic === subtopic && 
            q.difficulty === difficulty
        );
        questions = shuffleArray(questions).slice(0, count);
    } else {
        questions = generateAIQuestions(subject, topic, subtopic, difficulty, count);
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

function generateAIQuestions(subject, topic, subtopic, difficulty, count) {
    const templates = [
        { q: `What is a fundamental principle in ${subtopic}?`, opts: ['Principle A', 'Principle B', 'Principle C', 'Principle D'], correct: 0 },
        { q: `Which equation is used in ${subject} for ${topic}?`, opts: ['Equation 1', 'Equation 2', 'Equation 3', 'Equation 4'], correct: 1 },
        { q: `How is ${subtopic} applied in engineering?`, opts: ['Application X', 'Application Y', 'Application Z', 'Application W'], correct: 2 },
        { q: `What is the main concept of ${topic}?`, opts: ['Concept 1', 'Concept 2', 'Concept 3', 'Concept 4'], correct: 0 }
    ];
    const questions = [];
    for (let i = 0; i < Math.min(count, templates.length); i++) {
        const template = templates[i];
        const shuffledOpts = shuffleArray([...template.opts]);
        const correctIdx = shuffledOpts.indexOf(template.opts[template.correct]);
        questions.push({
            id: Date.now() + i,
            subject, topic, subtopic, difficulty,
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
            fm.subject.toLowerCase().includes(f) ||
            fm.description.toLowerCase().includes(f)
        );
    }
    container.innerHTML = formulas.map(f => `
        <div class="formula-card">
            <div class="formula-subject">${f.subject}</div>
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
// ADMIN PANEL
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
                <div class="q-meta">${q.subject} › ${q.topic} › ${q.subtopic} • ${q.difficulty}</div>
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
        <div class="form-group"><label>Subject</label><select id="mqSubject">${DATA.subjects.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Topic</label><select id="mqTopic">${DATA.topics[DATA.subjects[0]]?.map(t => `<option value="${t}">${t}</option>`).join('') || '<option>General</option>'}</select></div>
        <div class="form-group"><label>Sub-topic</label><select id="mqSubtopic"><option>General</option></select></div>
        <div class="form-group"><label>Difficulty</label><select id="mqDifficulty"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div>
        <div class="form-group"><label>Question</label><textarea id="mqQuestion" placeholder="Enter your question..."></textarea></div>
        <div class="form-group"><label>Options</label><div class="options-grid"><input type="text" id="mqOpt0" placeholder="Option A"><input type="text" id="mqOpt1" placeholder="Option B"><input type="text" id="mqOpt2" placeholder="Option C"><input type="text" id="mqOpt3" placeholder="Option D"></div></div>
        <div class="form-group"><label>Correct Answer</label><div class="radio-group"><label><input type="radio" name="mqCorrect" value="0"> A</label><label><input type="radio" name="mqCorrect" value="1"> B</label><label><input type="radio" name="mqCorrect" value="2"> C</label><label><input type="radio" name="mqCorrect" value="3"> D</label></div></div>
        <button class="btn-primary" onclick="addQuestion()">Add Question</button>
    `;
    document.getElementById('mqSubject').addEventListener('change', function() {
        const topicSelect = document.getElementById('mqTopic');
        const topics = DATA.topics[this.value] || ['General'];
        topicSelect.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
    });
    document.getElementById('mqTopic').addEventListener('change', function() {
        const subtopicSelect = document.getElementById('mqSubtopic');
        const subtopics = DATA.subtopics[this.value] || ['General'];
        subtopicSelect.innerHTML = subtopics.map(st => `<option value="${st}">${st}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function addQuestion() {
    const subject = document.getElementById('mqSubject').value;
    const topic = document.getElementById('mqTopic').value;
    const subtopic = document.getElementById('mqSubtopic').value;
    const difficulty = document.getElementById('mqDifficulty').value;
    const question = document.getElementById('mqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('mqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="mqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions.push({ id: Date.now(), subject, topic, subtopic, difficulty, question, options, correct });
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
        <div class="form-group"><label>Subject</label><select id="eqSubject">${DATA.subjects.map(s => `<option value="${s}" ${s===q.subject?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Topic</label><select id="eqTopic">${(DATA.topics[q.subject] || ['General']).map(t => `<option value="${t}" ${t===q.topic?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="form-group"><label>Sub-topic</label><select id="eqSubtopic">${(DATA.subtopics[q.topic] || ['General']).map(st => `<option value="${st}" ${st===q.subtopic?'selected':''}>${st}</option>`).join('')}</select></div>
        <div class="form-group"><label>Difficulty</label><select id="eqDifficulty"><option value="easy" ${q.difficulty==='easy'?'selected':''}>Easy</option><option value="medium" ${q.difficulty==='medium'?'selected':''}>Medium</option><option value="hard" ${q.difficulty==='hard'?'selected':''}>Hard</option></select></div>
        <div class="form-group"><label>Question</label><textarea id="eqQuestion">${q.question}</textarea></div>
        <div class="form-group"><label>Options</label><div class="options-grid">${q.options.map((o,i) => `<input type="text" id="eqOpt${i}" value="${o}" placeholder="Option ${String.fromCharCode(65+i)}">`).join('')}</div></div>
        <div class="form-group"><label>Correct Answer</label><div class="radio-group">${q.options.map((_,i) => `<label><input type="radio" name="eqCorrect" value="${i}" ${q.correct===i?'checked':''}> ${String.fromCharCode(65+i)}</label>`).join('')}</div></div>
        <button class="btn-primary" onclick="saveEditQuestion(${index})">Save Changes</button>
    `;
    document.getElementById('eqSubject').addEventListener('change', function() {
        const topicSelect = document.getElementById('eqTopic');
        const topics = DATA.topics[this.value] || ['General'];
        topicSelect.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
    });
    document.getElementById('eqTopic').addEventListener('change', function() {
        const subtopicSelect = document.getElementById('eqSubtopic');
        const subtopics = DATA.subtopics[this.value] || ['General'];
        subtopicSelect.innerHTML = subtopics.map(st => `<option value="${st}">${st}</option>`).join('');
    });
    modal.style.display = 'flex';
}

function saveEditQuestion(index) {
    const subject = document.getElementById('eqSubject').value;
    const topic = document.getElementById('eqTopic').value;
    const subtopic = document.getElementById('eqSubtopic').value;
    const difficulty = document.getElementById('eqDifficulty').value;
    const question = document.getElementById('eqQuestion').value;
    const options = [0,1,2,3].map(i => document.getElementById('eqOpt'+i).value);
    const correct = parseInt(document.querySelector('input[name="eqCorrect"]:checked')?.value);
    if (!question || options.some(o => !o) || isNaN(correct)) { alert('Please fill all fields.'); return; }
    DATA.questions[index] = { ...DATA.questions[index], subject, topic, subtopic, difficulty, question, options, correct };
    saveData(); renderQuestionBank(); closeModal(); alert('Updated!');
}

function renderAdminFormulas() {
    const container = document.getElementById('adminFormulaList');
    container.innerHTML = DATA.formulas.map((f, i) => `
        <div class="question-item">
            <div class="q-info"><div class="q-text"><strong>${f.name}</strong> — ${f.equation}</div><div class="q-meta">${f.subject}</div></div>
            <div class="q-actions"><button class="btn-edit" onclick="editAdminFormula(${i})">Edit</button><button class="btn-delete" onclick="deleteAdminFormula(${i})">Delete</button></div>
        </div>
    `).join('') || '<p>No formulas added yet.</p>';
}

function showAddFormula() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <h3>Add Formula</h3>
        <div class="form-group"><label>Subject</label><select id="mfSubject">${DATA.subjects.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Formula Name</label><input type="text" id="mfName" placeholder="e.g., Ohm's Law"></div>
        <div class="form-group"><label>Equation</label><input type="text" id="mfEquation" placeholder="e.g., V = I × R"></div>
        <div class="form-group"><label>Description</label><textarea id="mfDesc" placeholder="Brief explanation..."></textarea></div>
        <button class="btn-primary" onclick="addAdminFormula()">Add Formula</button>
    `;
    modal.style.display = 'flex';
}

function addAdminFormula() {
    const subject = document.getElementById('mfSubject').value;
    const name = document.getElementById('mfName').value.trim();
    const equation = document.getElementById('mfEquation').value.trim();
    const description = document.getElementById('mfDesc').value.trim();
    if (!name || !equation) { alert('Please fill required fields.'); return; }
    DATA.formulas.push({ id: Date.now(), subject, name, equation, description });
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
        <div class="form-group"><label>Subject</label><select id="efSubject">${DATA.subjects.map(s => `<option value="${s}" ${s===f.subject?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Formula Name</label><input type="text" id="efName" value="${f.name}"></div>
        <div class="form-group"><label>Equation</label><input type="text" id="efEquation" value="${f.equation}"></div>
        <div class="form-group"><label>Description</label><textarea id="efDesc">${f.description || ''}</textarea></div>
        <button class="btn-primary" onclick="saveAdminFormula(${index})">Save Changes</button>
    `;
    modal.style.display = 'flex';
}

function saveAdminFormula(index) {
    const subject = document.getElementById('efSubject').value;
    const name = document.getElementById('efName').value.trim();
    const equation = document.getElementById('efEquation').value.trim();
    const description = document.getElementById('efDesc').value.trim();
    if (!name || !equation) { alert('Please fill required fields.'); return; }
    DATA.formulas[index] = { ...DATA.formulas[index], subject, name, equation, description };
    saveData(); renderAdminFormulas(); renderFormulas(); closeModal(); alert('Formula updated!');
}

function loadSettings() {
    document.getElementById('easyQuestions').value = DATA.settings.easy.questions;
    document.getElementById('easyTime').value = DATA.settings.easy.time;
    document.getElementById('mediumQuestions').value = DATA.settings.medium.questions;
    document.getElementById('mediumTime').value = DATA.settings.medium.time;
    document.getElementById('hardQuestions').value = DATA.settings.hard.questions;
    document.getElementById('hardTime').value = DATA.settings.hard.time;
}

function saveSettings() {
    DATA.settings = {
        easy: { questions: parseInt(document.getElementById('easyQuestions').value), time: parseInt(document.getElementById('easyTime').value) },
        medium: { questions: parseInt(document.getElementById('mediumQuestions').value), time: parseInt(document.getElementById('mediumTime').value) },
        hard: { questions: parseInt(document.getElementById('hardQuestions').value), time: parseInt(document.getElementById('hardTime').value) }
    };
    saveData(); alert('Settings saved!');
}

// ===== MODAL =====
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ===== HOME PAGE CARDS =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.cursor = 'pointer';
});

// ===== INITIALIZATION =====
function init() {
    initSampleData();
    renderFormulas();
    renderQuestionBank();
    renderSubjects();
    renderTopics();
    renderAdminFormulas();
    loadSettings();
    populateSubjectSelects();
    populateQuizSubjects();
    updateConverterUnits();
    
    document.getElementById('adminDashboard').style.display = 'none';
    console.log('🚀 ENGICALC initialized!');
    console.log('🔐 Admin Password: 1234');
}

document.addEventListener('DOMContentLoaded', init);
