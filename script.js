/* =====================================================
   ENGICALC
   ===================================================== */


/* =====================================================
   BASIC SETTINGS
   ===================================================== */

/*
IMPORTANT:

Do NOT put an OpenAI/Gemini secret API key here.

For real AI generation, connect this to your secure
backend/serverless API.

Example later:

const AI_API_URL = "YOUR-SECURE-BACKEND-URL";

*/

const AI_API_URL = "";


/* =====================================================
   CALCULATOR
===================================================== */

let calcExpression = "";

let angleMode = "DEG";

let lastAnswer = 0;

let historyData =
    JSON.parse(
        localStorage.getItem("engicalc_history") || "[]"
    );


function insertValue(value) {

    if (
        calcExpression === "Error"
        ||
        calcExpression === "0"
    ) {

        calcExpression = "";

    }

    calcExpression += value;

    updateDisplay();
}


function updateDisplay() {

    document.getElementById("display").textContent =
        calcExpression || "0";

}


function clearCalculator() {

    calcExpression = "";

    document.getElementById("expression").textContent = "";

    updateDisplay();

}


function backspace() {

    calcExpression =
        calcExpression.slice(0, -1);

    updateDisplay();

}


function toggleAngle() {

    angleMode =
        angleMode === "DEG"
            ? "RAD"
            : "DEG";

    document.getElementById("angleBtn").textContent =
        angleMode;

}


function square() {

    if (!calcExpression) return;

    calcExpression += "^2";

    updateDisplay();

}


function factorial() {

    if (!calcExpression) return;

    calcExpression += "!";

    updateDisplay();

}


function factorialNumber(n) {

    if (
        n < 0 ||
        !Number.isInteger(n)
    ) {

        throw new Error("Invalid factorial");

    }

    let result = 1;

    for (
        let i = 2;
        i <= n;
        i++
    ) {

        result *= i;

    }

    return result;
}


function toRadians(value) {

    return angleMode === "DEG"
        ? value * Math.PI / 180
        : value;

}


function fromRadians(value) {

    return angleMode === "DEG"
        ? value * 180 / Math.PI
        : value;

}


function prepareExpression(expression) {

    let exp = expression;


    exp = exp
        .replaceAll("π", "Math.PI")
        .replaceAll("×", "*")
        .replaceAll("÷", "/");


    /* Percentage */

    exp = exp.replace(
        /(\d+(?:\.\d+)?)%/g,
        "($1/100)"
    );


    /* Factorial */

    exp = exp.replace(
        /(\d+(?:\.\d+)?)!/g,
        "factorialNumber($1)"
    );


    /* Scientific functions */

    exp = exp.replace(
        /sqrt\(/g,
        "Math.sqrt("
    );

    exp = exp.replace(
        /log\(/g,
        "Math.log10("
    );

    exp = exp.replace(
        /ln\(/g,
        "Math.log("
    );


    /* Inverse functions */

    exp = exp.replace(
        /asin\(/g,
        "fromRadians(Math.asin("
    );

    exp = exp.replace(
        /acos\(/g,
        "fromRadians(Math.acos("
    );

    exp = exp.replace(
        /atan\(/g,
        "fromRadians(Math.atan("
    );


    /* Normal trig */

    exp = exp.replace(
        /sin\(/g,
        "Math.sin(toRadians("
    );

    exp = exp.replace(
        /cos\(/g,
        "Math.cos(toRadians("
    );

    exp = exp.replace(
        /tan\(/g,
        "Math.tan(toRadians("
    );


    /* Power */

    exp = exp.replace(
        /\^/g,
        "**"
    );


    /* e constant */

    exp = exp.replace(
        /(^|[^a-zA-Z])e([^a-zA-Z]|$)/g,
        "$1Math.E$2"
    );


    return exp;
}


function calculate() {

    if (!calcExpression) return;


    try {

        const original =
            calcExpression;


        const prepared =
            prepareExpression(
                original
            );


        const result =
            Function(
                "factorialNumber",
                "toRadians",
                "fromRadians",

                `"use strict"; return (${prepared});`
            )(
                factorialNumber,
                toRadians,
                fromRadians
            );


        if (
            typeof result !== "number"
            ||
            !Number.isFinite(result)
        ) {

            throw new Error("Invalid result");

        }


        const cleanResult =
            Number(
                result.toPrecision(12)
            );


        document.getElementById(
            "expression"
        ).textContent =
            original + " =";


        calcExpression =
            String(cleanResult);


        lastAnswer =
            cleanResult;


        document.getElementById(
            "answer"
        ).textContent =
            cleanResult;


        updateDisplay();


        addHistory(
            original,
            cleanResult
        );

    }

    catch (error) {

        calcExpression = "Error";

        document.getElementById(
            "expression"
        ).textContent =
            "Invalid expression";

        updateDisplay();

        console.error(error);

    }

}


/* =====================================================
   CALCULATOR HISTORY
===================================================== */

function addHistory(
    expression,
    result
) {

    historyData.unshift({

        expression,
        result

    });


    historyData =
        historyData.slice(0, 30);


    localStorage.setItem(
        "engicalc_history",
        JSON.stringify(historyData)
    );


    renderHistory();

}


function renderHistory() {

    const container =
        document.getElementById(
            "historyList"
        );


    if (!historyData.length) {

        container.innerHTML =
            `<p class="empty">No calculations yet.</p>`;

        return;

    }


    container.innerHTML = "";


    historyData.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "history-item";


        div.innerHTML = `

            <div class="history-expression">
                ${escapeHTML(item.expression)}
            </div>

            <div class="history-result">
                = ${escapeHTML(String(item.result))}
            </div>

        `;


        div.onclick = () => {

            calcExpression =
                String(item.result);

            updateDisplay();

        };


        container.appendChild(div);

    });

}


function clearHistory() {

    historyData = [];

    localStorage.removeItem(
        "engicalc_history"
    );

    renderHistory();

}


/* =====================================================
   NAVIGATION
===================================================== */

function openPage(
    pageId,
    button
) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .getElementById(pageId)
        .classList.add(
            "active-page"
        );


    document
        .querySelectorAll(".nav-button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    if (pageId === "quiz") {

        populateQuizSelectors();

    }


    if (pageId === "formulas") {

        renderFormulas();

    }


    if (pageId === "admin") {

        checkAdmin();

    }

}


/* =====================================================
   QUIZ DATABASE
===================================================== */

const defaultQuestions = [

    {
        id: 1,
        topic: "Electrical Engineering",
        subtopic: "Circuit Theory",
        difficulty: "Easy",
        question: "Ohm's law is represented by:",
        options: [
            "V = IR",
            "P = VI",
            "F = ma",
            "Q = CV"
        ],
        answer: 0
    },

    {
        id: 2,
        topic: "Electrical Engineering",
        subtopic: "Circuit Theory",
        difficulty: "Easy",
        question: "The SI unit of resistance is:",
        options: [
            "Volt",
            "Ampere",
            "Ohm",
            "Watt"
        ],
        answer: 2
    },

    {
        id: 3,
        topic: "Electrical Engineering",
        subtopic: "Circuit Theory",
        difficulty: "Medium",
        question: "If V = 20 V and R = 5 Ω, current is:",
        options: [
            "2 A",
            "4 A",
            "5 A",
            "10 A"
        ],
        answer: 1
    },

    {
        id: 4,
        topic: "Engineering Mathematics",
        subtopic: "Calculus",
        difficulty: "Easy",
        question: "The derivative of x² is:",
        options: [
            "x",
            "2x",
            "x²",
            "2"
        ],
        answer: 1
    },

    {
        id: 5,
        topic: "Engineering Mathematics",
        subtopic: "Calculus",
        difficulty: "Medium",
        question: "The derivative of sin(x) is:",
        options: [
            "cos(x)",
            "-cos(x)",
            "tan(x)",
            "sin(x)"
        ],
        answer: 0
    },

    {
        id: 6,
        topic: "Engineering Mathematics",
        subtopic: "Algebra",
        difficulty: "Easy",
        question: "What is 2 + 3 × 4?",
        options: [
            "20",
            "14",
            "24",
            "10"
        ],
        answer: 1
    },

    {
        id: 7,
        topic: "Mechanical Engineering",
        subtopic: "Engineering Mechanics",
        difficulty: "Easy",
        question: "Newton's second law is:",
        options: [
            "F = ma",
            "V = IR",
            "P = VI",
            "E = mc²"
        ],
        answer: 0
    },

    {
        id: 8,
        topic: "Mechanical Engineering",
        subtopic: "Engineering Mechanics",
        difficulty: "Medium",
        question: "The SI unit of force is:",
        options: [
            "Joule",
            "Watt",
            "Newton",
            "Pascal"
        ],
        answer: 2
    },

    {
        id: 9,
        topic: "Civil Engineering",
        subtopic: "Strength of Materials",
        difficulty: "Easy",
        question: "Stress is defined as:",
        options: [
            "F × A",
            "F / A",
            "A / F",
            "F + A"
        ],
        answer: 1
    },

    {
        id: 10,
        topic: "Computer Science",
        subtopic: "Programming",
        difficulty: "Easy",
        question: "Which data structure follows FIFO?",
        options: [
            "Stack",
            "Queue",
            "Tree",
            "Graph"
        ],
        answer: 1
    }

];


let questions =
    JSON.parse(
        localStorage.getItem(
            "engicalc_questions"
        )
    ) || defaultQuestions;


/* =====================================================
   TOPICS
===================================================== */

function getTopics() {

    const topics = {};


    questions.forEach(q => {

        if (!topics[q.topic]) {

            topics[q.topic] = [];

        }


        if (
            !topics[q.topic].includes(
                q.subtopic
            )
        ) {

            topics[q.topic].push(
                q.subtopic
            );

        }

    });


    return topics;

}


function populateQuizSelectors() {

    const topics =
        getTopics();


    const topicSelect =
        document.getElementById(
            "quizTopic"
        );


    const oldTopic =
        topicSelect.value;


    topicSelect.innerHTML = "";


    Object.keys(topics).forEach(topic => {

        const option =
            document.createElement("option");

        option.value = topic;

        option.textContent = topic;

        topicSelect.appendChild(option);

    });


    if (oldTopic) {

        topicSelect.value = oldTopic;

    }


    populateQuizSubtopics();

}


function populateQuizSubtopics() {

    const topic =
        document.getElementById(
            "quizTopic"
        ).value;


    const select =
        document.getElementById(
            "quizSubtopic"
        );


    const topics =
        getTopics();


    select.innerHTML = "";


    if (topics[topic]) {

        topics[topic].forEach(subtopic => {

            const option =
                document.createElement("option");

            option.value = subtopic;

            option.textContent = subtopic;

            select.appendChild(option);

        });

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHistory();

        populateQuizSelectors();

        renderFormulas();

        document
            .getElementById("quizTopic")
            .addEventListener(
                "change",
                populateQuizSubtopics
            );

    }
);


/* =====================================================
   DIFFICULTY
===================================================== */

let selectedDifficulty = "Easy";


function chooseDifficulty(
    difficulty,
    button
) {

    selectedDifficulty =
        difficulty;


    document
        .querySelectorAll(
            ".difficulty-button"
        )
        .forEach(btn => {

            btn.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );

}


/* =====================================================
   LOCAL QUIZ
===================================================== */

let quizQuestions = [];

let currentQuizIndex = 0;

let quizScore = 0;

let selectedOption = null;

let timerInterval = null;

let remainingTime = 0;


function generateLocalQuiz() {

    const topic =
        document.getElementById(
            "quizTopic"
        ).value;


    const subtopic =
        document.getElementById(
            "quizSubtopic"
        ).value;


    const count =
        Number(
            document.getElementById(
                "questionNumberSelect"
            ).value
        );


    let available =
        questions.filter(q =>

            q.topic === topic
            &&
            q.subtopic === subtopic
            &&
            q.difficulty ===
                selectedDifficulty

        );


    /*
       If not enough questions exist
       for selected difficulty,
       use all questions from that subtopic.
    */

    if (available.length < count) {

        available =
            questions.filter(q =>

                q.topic === topic
                &&
                q.subtopic === subtopic

            );

    }


    if (!available.length) {

        alert(
            "No questions found. Please add questions from Admin Panel."
        );

        return;

    }


    quizQuestions =
        shuffle(
            [...available]
        ).slice(
            0,
            Math.min(
                count,
                available.length
            )
        );


    startQuiz();

}


/* =====================================================
   AI QUIZ
===================================================== */

async function generateAIQuiz() {

    const topic =
        document.getElementById(
            "quizTopic"
        ).value;


    const subtopic =
        document.getElementById(
            "quizSubtopic"
        ).value;


    const count =
        Number(
            document.getElementById(
                "questionNumberSelect"
            ).value
        );


    const time =
        Number(
            document.getElementById(
                "quizTimeSelect"
            ).value
        );


    const status =
        document.getElementById(
            "aiStatus"
        );


    /*
       No backend connected yet.
    */

    if (!AI_API_URL) {

        status.textContent =
            "AI backend is not connected yet. Use Question Bank now, or connect your secure AI backend.";

        /*
           Do NOT silently pretend that this
           is real AI.
        */

        return;

    }


    try {

        status.textContent =
            "🤖 AI is generating your quiz...";


        const response =
            await fetch(
                AI_API_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        topic,
                        subtopic,
                        difficulty:
                            selectedDifficulty,
                        numberOfQuestions:
                            count,
                        timeMinutes:
                            time

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "AI server error"
            );

        }


        const data =
            await response.json();


        /*
           Expected backend response:

           {
             questions: [
               {
                 question: "...",
                 options: ["...","...","...","..."],
                 answer: 0
               }
             ]
           }
        */


        if (
            !data.questions
            ||
            !Array.isArray(
                data.questions
            )
        ) {

            throw new Error(
                "Invalid AI response"
            );

        }


        quizQuestions =
            data.questions.map(
                (q, index) => ({

                    id:
                        Date.now() +
                        index,

                    topic,

                    subtopic,

                    difficulty:
                        selectedDifficulty,

                    question:
                        q.question,

                    options:
                        q.options,

                    answer:
                        Number(q.answer)

                })
            );


        status.textContent =
            "✅ AI quiz generated successfully.";


        startQuiz();

    }

    catch (error) {

        console.error(error);

        status.textContent =
            "❌ AI generation failed.";

        alert(
            "AI server could not generate the quiz."
        );

    }

}


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz() {

    currentQuizIndex = 0;

    quizScore = 0;

    selectedOption = null;


    const minutes =
        Number(
            document.getElementById(
                "quizTimeSelect"
            ).value
        );


    remainingTime =
        minutes * 60;


    document
        .getElementById("quizSetup")
        .classList.add("hidden");


    document
        .getElementById("quizResult")
        .classList.add("hidden");


    document
        .getElementById("quizGame")
        .classList.remove("hidden");


    startTimer();

    showQuestion();

}


function showQuestion() {

    const q =
        quizQuestions[
            currentQuizIndex
        ];


    if (!q) {

        finishQuiz();

        return;

    }


    selectedOption = null;


    document.getElementById(
        "questionCounter"
    ).textContent =

        `Question ${
            currentQuizIndex + 1
        } / ${
            quizQuestions.length
        }`;


    document.getElementById(
        "quizQuestion"
    ).textContent =
        q.question;


    const options =
        document.getElementById(
            "options"
        );


    options.innerHTML = "";


    q.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;


            button.onclick = () => {

                selectQuizAnswer(
                    index,
                    button
                );

            };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "progressBar"
    ).style.width =

        (
            currentQuizIndex /
            quizQuestions.length
        ) * 100 + "%";


    document.querySelector(
        ".next-question"
    ).textContent =

        currentQuizIndex ===
        quizQuestions.length - 1

            ? "Finish Quiz ✓"

            : "Next Question →";

}


function selectQuizAnswer(
    index,
    button
) {

    if (
        selectedOption !== null
    ) {

        return;

    }


    selectedOption = index;


    const q =
        quizQuestions[
            currentQuizIndex
        ];


    document
        .querySelectorAll(
            ".option"
        )
        .forEach(
            (btn, i) => {

                if (
                    i === q.answer
                ) {

                    btn.classList.add(
                        "correct"
                    );

                }


                if (
                    i === index
                    &&
                    i !== q.answer
                ) {

                    btn.classList.add(
                        "wrong"
                    );

                }

            }
        );


    if (
        index === q.answer
    ) {

        quizScore++;

    }

}


function nextQuestion() {

    if (
        selectedOption === null
    ) {

        alert(
            "Please select an answer."
        );

        return;

    }


    currentQuizIndex++;


    if (
        currentQuizIndex >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    showQuestion();

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    clearInterval(
        timerInterval
    );


    updateTimer();


    timerInterval =
        setInterval(
            () => {

                remainingTime--;

                updateTimer();


                if (
                    remainingTime <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    finishQuiz();

                }

            },
            1000
        );

}


function updateTimer() {

    const minutes =
        Math.floor(
            remainingTime / 60
        );


    const seconds =
        remainingTime % 60;


    document.getElementById(
        "quizTimer"
    ).textContent =

        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


function finishQuiz() {

    clearInterval(
        timerInterval
    );


    document
        .getElementById("quizGame")
        .classList.add("hidden");


    document
        .getElementById("quizResult")
        .classList.remove("hidden");


    document.getElementById(
        "score"
    ).textContent =

        `${quizScore} / ${quizQuestions.length}`;


    const percentage =
        Math.round(
            (
                quizScore /
                quizQuestions.length
            ) * 100
        );


    document.getElementById(
        "resultText"
    ).textContent =

        percentage >= 80

            ? "Excellent performance! 🎉"

            : percentage >= 60

                ? "Good work! Keep practising. 👍"

                : "Keep practising and try again. 📚";

}


function showQuizSetup() {

    clearInterval(
        timerInterval
    );


    document
        .getElementById("quizResult")
        .classList.add("hidden");


    document
        .getElementById("quizGame")
        .classList.add("hidden");


    document
        .getElementById("quizSetup")
        .classList.remove("hidden");

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

function loginAdmin() {

    const username =
        document.getElementById(
            "adminUsername"
        ).value;


    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    if (
        username === "admin"
        &&
        password === "1234"
    ) {

        localStorage.setItem(
            "engicalc_admin",
            "true"
        );


        showAdminDashboard();

    }

    else {

        alert(
            "Incorrect username or password."
        );

    }

}


function checkAdmin() {

    if (
        localStorage.getItem(
            "engicalc_admin"
        ) === "true"
    ) {

        showAdminDashboard();

    }

}


function showAdminDashboard() {

    document
        .getElementById(
            "adminLoginBox"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "adminDashboard"
        )
        .classList.remove("hidden");


    updateAdminSelectors();

    renderQuestionBank();

    renderAdminFormulas();

}


function logoutAdmin() {

    localStorage.removeItem(
        "engicalc_admin"
    );


    document
        .getElementById(
            "adminDashboard"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "adminLoginBox"
        )
        .classList.remove("hidden");

}


/* =====================================================
   ADMIN TOPICS
===================================================== */

function addTopic() {

    const topic =
        document.getElementById(
            "newTopic"
        ).value.trim();


    const subtopic =
        document.getElementById(
            "newSubtopic"
        ).value.trim();


    if (
        !topic ||
        !subtopic
    ) {

        alert(
            "Enter topic and sub-topic."
        );

        return;

    }


    const exists =
        questions.some(q =>

            q.topic === topic
            &&
            q.subtopic === subtopic

        );


    if (exists) {

        alert(
            "This topic already exists."
        );

        return;

    }


    /*
       Create a placeholder question
       so the topic becomes available
       in selectors.
    */

    questions.push({

        id: Date.now(),

        topic,

        subtopic,

        difficulty: "Easy",

        question:
            "Replace this placeholder with a real question.",

        options: [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],

        answer: 0

    });


    saveQuestions();


    document.getElementById(
        "newTopic"
    ).value = "";


    document.getElementById(
        "newSubtopic"
    ).value = "";


    updateAdminSelectors();

    populateQuizSelectors();

    renderQuestionBank();


    alert(
        "Topic and sub-topic added."
    );

}


/* =====================================================
   ADMIN SELECTORS
===================================================== */

function updateAdminSelectors() {

    const topics =
        getTopics();


    const topicSelect =
        document.getElementById(
            "adminTopic"
        );


    if (!topicSelect) return;


    const old =
        topicSelect.value;


    topicSelect.innerHTML = "";


    Object.keys(topics).forEach(topic => {

        const option =
            document.createElement(
                "option"
            );

        option.value = topic;

        option.textContent = topic;

        topicSelect.appendChild(
            option
        );

    });


    if (old) {

        topicSelect.value = old;

    }


    updateAdminSubtopics();

}


function updateAdminSubtopics() {

    const topic =
        document.getElementById(
            "adminTopic"
        ).value;


    const select =
        document.getElementById(
            "adminSubtopic"
        );


    const topics =
        getTopics();


    select.innerHTML = "";


    if (topics[topic]) {

        topics[topic].forEach(subtopic => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = subtopic;

            option.textContent = subtopic;

            select.appendChild(
                option
            );

        });

    }

}


document.addEventListener(
    "change",
    event => {

        if (
            event.target.id ===
            "adminTopic"
        ) {

            updateAdminSubtopics();

        }

    }
);


/* =====================================================
   ADMIN ADD QUESTION
===================================================== */

function addQuestion() {

    const topic =
        document.getElementById(
            "adminTopic"
        ).value;


    const subtopic =
        document.getElementById(
            "adminSubtopic"
        ).value;


    const difficulty =
        document.getElementById(
            "adminDifficulty"
        ).value;


    const question =
        document.getElementById(
            "adminQuestion"
        ).value.trim();


    const options = [

        document.getElementById(
            "adminOptionA"
        ).value.trim(),

        document.getElementById(
            "adminOptionB"
        ).value.trim(),

        document.getElementById(
            "adminOptionC"
        ).value.trim(),

        document.getElementById(
            "adminOptionD"
        ).value.trim()

    ];


    const answer =
        Number(
            document.getElementById(
                "adminCorrect"
            ).value
        );


    if (
        !topic ||
        !subtopic ||
        !question ||
        options.some(
            x => !x
        )
    ) {

        alert(
            "Please fill all question fields."
        );

        return;

    }


    questions.push({

        id: Date.now(),

        topic,

        subtopic,

        difficulty,

        question,

        options,

        answer

    });


    saveQuestions();


    document.getElementById(
        "adminQuestion"
    ).value = "";


    document.getElementById(
        "adminOptionA"
    ).value = "";


    document.getElementById(
        "adminOptionB"
    ).value = "";


    document.getElementById(
        "adminOptionC"
    ).value = "";


    document.getElementById(
        "adminOptionD"
    ).value = "";


    renderQuestionBank();


    populateQuizSelectors();


    alert(
        "Question added successfully."
    );

}


function saveQuestions() {

    localStorage.setItem(
        "engicalc_questions",
        JSON.stringify(
            questions
        )
    );

}


/* =====================================================
   QUESTION BANK
===================================================== */

function renderQuestionBank() {

    const container =
        document.getElementById(
            "questionBank"
        );


    if (!container) return;


    container.innerHTML = "";


    questions.forEach(
        (q, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "question-item";


            item.innerHTML = `

                <strong>
                    ${escapeHTML(q.question)}
                </strong>

                <div class="meta">
                    ${escapeHTML(q.topic)}
                    →
                    ${escapeHTML(q.subtopic)}
                    |
                    ${escapeHTML(q.difficulty)}
                </div>

                <button
                    class="delete-button"
                    onclick="deleteQuestion(${index})"
                >
                    Delete
                </button>

            `;


            container.appendChild(item);

        }
    );

}


function deleteQuestion(index) {

    if (
        !confirm(
            "Delete this question?"
        )
    ) {

        return;

    }


    questions.splice(
        index,
        1
    );


    saveQuestions();

    renderQuestionBank();

    updateAdminSelectors();

    populateQuizSelectors();

}


function resetQuestions() {

    if (
        !confirm(
            "Reset question bank?"
        )
    ) {

        return;

    }


    questions =
        JSON.parse(
            JSON.stringify(
                defaultQuestions
            )
        );


    saveQuestions();

    updateAdminSelectors();

    populateQuizSelectors();

    renderQuestionBank();

}


/* =====================================================
   FORMULA DATABASE
===================================================== */

const defaultFormulas = [

    {
        id: 1,
        subject: "Electrical Engineering",
        name: "Ohm's Law",
        equation: "V = IR",
        description: "Voltage equals current multiplied by resistance."
    },

    {
        id: 2,
        subject: "Electrical Engineering",
        name: "Electrical Power",
        equation: "P = VI",
        description: "Electrical power equals voltage multiplied by current."
    },

    {
        id: 3,
        subject: "Mechanical Engineering",
        name: "Newton's Second Law",
        equation: "F = ma",
        description: "Force equals mass multiplied by acceleration."
    },

    {
        id: 4,
        subject: "Mechanical Engineering",
        name: "Kinetic Energy",
        equation: "KE = ½mv²",
        description: "Kinetic energy of a moving body."
    },

    {
        id: 5,
        subject: "Civil Engineering",
        name: "Stress",
        equation: "σ = F/A",
        description: "Stress equals force divided by area."
    },

    {
        id: 6,
        subject: "Civil Engineering",
        name: "Strain",
        equation: "ε = ΔL/L",
        description: "Strain is change in length divided by original length."
    },

    {
        id: 7,
        subject: "Mathematics",
        name: "Circle Area",
        equation: "A = πr²",
        description: "Area of a circle."
    }

];


let formulas =
    JSON.parse(
        localStorage.getItem(
            "engicalc_formulas"
        )
    ) || defaultFormulas;


/* =====================================================
   FORMULA DISPLAY
===================================================== */

function renderFormulas() {

    const grid =
        document.getElementById(
            "formulaGrid"
        );


    if (!grid) return;


    grid.innerHTML = "";


    formulas.forEach(formula => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "formula-card";


        card.innerHTML = `

            <small>
                ${escapeHTML(formula.subject)}
            </small>

            <h3>
                ${escapeHTML(formula.name)}
            </h3>

            <div class="formula-equation">
                ${escapeHTML(formula.equation)}
            </div>

            <p>
                ${escapeHTML(formula.description)}
            </p>

        `;


        grid.appendChild(card);

    });

}


/* =====================================================
   ADMIN FORMULA
===================================================== */

function addFormula() {

    const subject =
        document.getElementById(
            "formulaSubject"
        ).value.trim();


    const name =
        document.getElementById(
            "formulaName"
        ).value.trim();


    const equation =
        document.getElementById(
            "formulaEquation"
        ).value.trim();


    const description =
        document.getElementById(
            "formulaDescription"
        ).value.trim();


    if (
        !subject ||
        !name ||
        !equation
    ) {

        alert(
            "Enter subject, formula name and equation."
        );

        return;

    }


    formulas.push({

        id: Date.now(),

        subject,

        name,

        equation,

        description

    });


    saveFormulas();


    document.getElementById(
        "formulaSubject"
    ).value = "";


    document.getElementById(
        "formulaName"
    ).value = "";


    document.getElementById(
        "formulaEquation"
    ).value = "";


    document.getElementById(
        "formulaDescription"
    ).value = "";


    renderFormulas();

    renderAdminFormulas();


    alert(
        "Formula added successfully."
    );

}


function saveFormulas() {

    localStorage.setItem(
        "engicalc_formulas",
        JSON.stringify(
            formulas
        )
    );

}


function renderAdminFormulas() {

    const container =
        document.getElementById(
            "adminFormulaList"
        );


    if (!container) return;


    container.innerHTML = "";


    formulas.forEach(
        (formula, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-formula-item";


            item.innerHTML = `

                <strong>
                    ${escapeHTML(formula.name)}
                </strong>

                <div class="meta">
                    ${escapeHTML(formula.subject)}
                    |
                    ${escapeHTML(formula.equation)}
                </div>

                <button
                    class="delete-button"
                    onclick="deleteFormula(${index})"
                >
                    Delete
                </button>

            `;


            container.appendChild(item);

        }
    );

}


function deleteFormula(index) {

    if (
        !confirm(
            "Delete this formula?"
        )
    ) {

        return;

    }


    formulas.splice(
        index,
        1
    );


    saveFormulas();

    renderFormulas();

    renderAdminFormulas();

}


/* =====================================================
   UTILITY
===================================================== */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }


    return array;

}


function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;


        if (
            /^[0-9]$/.test(key)
            ||
            [
                "+",
                "-",
                "*",
                "/",
                ".",
                "(",
                ")",
                "%"
            ].includes(key)
        ) {

            insertValue(key);

            event.preventDefault();

        }


        else if (
            key === "Enter"
            ||
            key === "="
        ) {

            calculate();

            event.preventDefault();

        }


        else if (
            key === "Backspace"
        ) {

            backspace();

            event.preventDefault();

        }


        else if (
            key === "Escape"
        ) {

            clearCalculator();

            event.preventDefault();

        }

    }
);
