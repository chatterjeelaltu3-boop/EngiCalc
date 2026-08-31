// ============================================
// ADMIN PASSWORD SYSTEM (Popup Modal)
// ============================================
const ADMIN_PASSWORD = '1234';
let isAdminLoggedIn = false;

// Admin navigation click - show password modal
document.querySelector('[data-section="admin"]').addEventListener('click', function(e) {
    // Only show modal if not already logged in
    if (!isAdminLoggedIn) {
        e.preventDefault();
        document.getElementById('adminPasswordModal').style.display = 'flex';
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('adminPasswordInput').focus();
        document.getElementById('passwordError').style.display = 'none';
    }
});

function verifyAdminPassword() {
    const password = document.getElementById('adminPasswordInput').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('adminPasswordModal').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('passwordError').style.display = 'none';
        
        // Load admin data
        renderQuestionBank();
        renderTopics();
        renderAdminFormulas();
        loadSettings();
        
        // Mark admin nav as active
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-section="admin"]').classList.add('active');
        
        // Show admin section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('admin').classList.add('active');
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
    // Go back to home
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="home"]').classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('home').classList.add('active');
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
    
    // Admin dashboard hidden by default
    document.getElementById('adminDashboard').style.display = 'none';
    
    console.log('🚀 ENGICALC initialized successfully!');
    console.log('🔐 Admin Password: 1234');
}
