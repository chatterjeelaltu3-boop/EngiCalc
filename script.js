/* =====================================================
   ENGICALC
   Calculator + Formula Library + Admin Formula Manager
   Quiz System Removed
===================================================== */


/* =====================================================
   DEFAULT FORMULAS
===================================================== */

const defaultFormulas = [

    {
        id: 1,
        name: "Ohm's Law",
        category: "Electrical Engineering",
        equation: "V = IR",
        description: "Voltage is equal to current multiplied by resistance."
    },

    {
        id: 2,
        name: "Electrical Power",
        category: "Electrical Engineering",
        equation: "P = VI",
        description: "Electrical power is equal to voltage multiplied by current."
    },

    {
        id: 3,
        name: "Newton's Second Law",
        category: "Mechanical Engineering",
        equation: "F = ma",
        description: "Force is equal to mass multiplied by acceleration."
    },

    {
        id: 4,
        name: "Kinetic Energy",
        category: "Mechanical Engineering",
        equation: "KE = ½mv²",
        description: "Kinetic energy of an object with mass m and velocity v."
    },

    {
        id: 5,
        name: "Stress",
        category: "Civil Engineering",
        equation: "σ = F / A",
        description: "Stress is force divided by cross-sectional area."
    },

    {
        id: 6,
        name: "Strain",
        category: "Civil Engineering",
        equation: "ε = ΔL / L",
        description: "Strain is the change in length divided by original length."
    },

    {
        id: 7,
        name: "Simple Interest",
        category: "Engineering Mathematics",
        equation: "SI = PRT / 100",
        description: "Simple interest calculated using principal, rate and time."
    },

    {
        id: 8,
        name: "Quadratic Equation",
        category: "Engineering Mathematics",
        equation: "x = (-b ± √(b² - 4ac)) / 2a",
        description: "Formula for solving a quadratic equation."
    }

];


/* =====================================================
   FORMULA STORAGE
===================================================== */

let formulas =
    JSON.parse(localStorage.getItem("engicalcFormulas")) || defaultFormulas;


/* =====================================================
   ADMIN LOGIN
===================================================== */

/*
   Change these if you want.
*/

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";


let isAdmin =
    sessionStorage.getItem("engicalcAdmin") === "true";


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });


    const selected =
        document.getElementById(sectionId);

    if (selected) {
        selected.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "adminSection" && !isAdmin) {

        openAdminLogin();

        showSection("calculatorSection");
    }
}


/* =====================================================
   ADMIN LOGIN MODAL
===================================================== */

function openAdminLogin() {

    document
        .getElementById("adminLoginModal")
        .classList.add("show");

    document
        .getElementById("adminUsername")
        .focus();
}


function closeAdminLogin() {

    document
        .getElementById("adminLoginModal")
        .classList.remove("show");

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

function adminLogin() {

    const username =
        document
            .getElementById("adminUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("adminPassword")
            .value;


    const message =
        document.getElementById("loginMessage");


    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        isAdmin = true;

        sessionStorage.setItem(
            "engicalcAdmin",
            "true"
        );


        message.textContent =
            "Login successful.";

        message.style.color =
            "#16a34a";


        setTimeout(() => {

            closeAdminLogin();

            document
                .getElementById("adminUsername")
                .value = "";

            document
                .getElementById("adminPassword")
                .value = "";

            message.textContent = "";

            showSection("adminSection");

            displayAdminFormulas();

        }, 400);

    }

    else {

        message.textContent =
            "Incorrect username or password.";

        message.style.color =
            "#dc2626";

    }

}


/* =====================================================
   ADMIN LOGOUT
===================================================== */

function adminLogout() {

    isAdmin = false;

    sessionStorage.removeItem(
        "engicalcAdmin"
    );


    showSection("calculatorSection");

}


/* =====================================================
   FORMULA DISPLAY
===================================================== */

function displayFormulas() {

    const container =
        document.getElementById(
            "formulaContainer"
        );


    const search =
        document
            .getElementById("formulaSearch")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        formulas.filter(formula => {

            return (

                formula.name
                    .toLowerCase()
                    .includes(search)

                ||

                formula.category
                    .toLowerCase()
                    .includes(search)

                ||

                formula.equation
                    .toLowerCase()
                    .includes(search)

                ||

                formula.description
                    .toLowerCase()
                    .includes(search)

            );

        });


    if (filtered.length === 0) {

        container.innerHTML = `
            <div class="formula-card">
                <p class="empty">
                    No formula found.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        filtered.map(formula => `

            <div class="formula-card">

                <span class="formula-category">
                    ${escapeHTML(formula.category)}
                </span>

                <h3>
                    ${escapeHTML(formula.name)}
                </h3>

                <div class="formula-equation">
                    ${escapeHTML(formula.equation)}
                </div>

                <p class="formula-description">
                    ${escapeHTML(formula.description)}
                </p>

            </div>

        `).join("");

}


/* =====================================================
   ADD FORMULA
===================================================== */

function addFormula() {

    if (!isAdmin) {

        openAdminLogin();

        return;
    }


    const name =
        document
            .getElementById("formulaName")
            .value
            .trim();


    const category =
        document
            .getElementById("formulaCategory")
            .value
            .trim();


    const equation =
        document
            .getElementById("formulaEquation")
            .value
            .trim();


    const description =
        document
            .getElementById("formulaDescription")
            .value
            .trim();


    const message =
        document.getElementById(
            "formulaMessage"
        );


    if (
        !name ||
        !category ||
        !equation
    ) {

        message.textContent =
            "Please fill Formula Name, Category and Formula.";

        message.style.color =
            "#dc2626";

        return;
    }


    const newFormula = {

        id: Date.now(),

        name: name,

        category: category,

        equation: equation,

        description:
            description ||
            "No description provided."

    };


    formulas.push(newFormula);


    saveFormulas();


    document
        .getElementById("formulaName")
        .value = "";

    document
        .getElementById("formulaCategory")
        .value = "";

    document
        .getElementById("formulaEquation")
        .value = "";

    document
        .getElementById("formulaDescription")
        .value = "";


    message.textContent =
        "Formula added successfully.";

    message.style.color =
        "#16a34a";


    displayFormulas();

    displayAdminFormulas();


    setTimeout(() => {
        message.textContent = "";
    }, 2500);

}


/* =====================================================
   SAVE FORMULAS
===================================================== */

function saveFormulas() {

    localStorage.setItem(
        "engicalcFormulas",
        JSON.stringify(formulas)
    );

}


/* =====================================================
   ADMIN FORMULA LIST
===================================================== */

function displayAdminFormulas() {

    if (!isAdmin) {
        return;
    }


    const container =
        document.getElementById(
            "adminFormulaList"
        );


    const count =
        document.getElementById(
            "formulaCount"
        );


    count.textContent =
        `${formulas.length} formula${formulas.length === 1 ? "" : "s"}`;


    if (formulas.length === 0) {

        container.innerHTML = `
            <p class="empty">
                No formulas available.
            </p>
        `;

        return;
    }


    container.innerHTML =
        formulas.map(formula => `

            <div class="admin-formula-item">

                <div class="admin-formula-info">

                    <h4>
                        ${escapeHTML(formula.name)}
                    </h4>

                    <p>
                        ${escapeHTML(formula.equation)}
                    </p>

                    <small>
                        ${escapeHTML(formula.category)}
                    </small>

                </div>


                <div class="admin-formula-actions">

                    <button
                        class="edit-btn"
                        onclick="openEditFormula(${formula.id})"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteFormula(${formula.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            </div>

        `).join("");

}


/* =====================================================
   DELETE FORMULA
===================================================== */

function deleteFormula(id) {

    if (!isAdmin) {
        return;
    }


    const formula =
        formulas.find(
            item => item.id === id
        );


    if (!formula) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${formula.name}"?`
        );


    if (!confirmed) {
        return;
    }


    formulas =
        formulas.filter(
            item => item.id !== id
        );


    saveFormulas();

    displayFormulas();

    displayAdminFormulas();

}


/* =====================================================
   EDIT FORMULA
===================================================== */

function openEditFormula(id) {

    if (!isAdmin) {
        return;
    }


    const formula =
        formulas.find(
            item => item.id === id
        );


    if (!formula) {
        return;
    }


    document
        .getElementById("editFormulaId")
        .value = formula.id;


    document
        .getElementById("editFormulaName")
        .value = formula.name;


    document
        .getElementById("editFormulaCategory")
        .value = formula.category;


    document
        .getElementById("editFormulaEquation")
        .value = formula.equation;


    document
        .getElementById("editFormulaDescription")
        .value = formula.description;


    document
        .getElementById("editFormulaModal")
        .classList.add("show");

}


function closeEditModal() {

    document
        .getElementById("editFormulaModal")
        .classList.remove("show");

}


/* =====================================================
   SAVE EDITED FORMULA
===================================================== */

function saveEditedFormula() {

    if (!isAdmin) {
        return;
    }


    const id =
        Number(
            document
                .getElementById("editFormulaId")
                .value
        );


    const name =
        document
            .getElementById("editFormulaName")
            .value
            .trim();


    const category =
        document
            .getElementById("editFormulaCategory")
            .value
            .trim();


    const equation =
        document
            .getElementById("editFormulaEquation")
            .value
            .trim();


    const description =
        document
            .getElementById("editFormulaDescription")
            .value
            .trim();


    if (
        !name ||
        !category ||
        !equation
    ) {

        alert(
            "Formula Name, Category and Formula are required."
        );

        return;
    }


    const formula =
        formulas.find(
            item => item.id === id
        );


    if (!formula) {
        return;
    }


    formula.name = name;

    formula.category = category;

    formula.equation = equation;

    formula.description =
        description ||
        "No description provided.";


    saveFormulas();

    displayFormulas();

    displayAdminFormulas();

    closeEditModal();

}


/* =====================================================
   CALCULATOR
===================================================== */

let angleMode = "DEG";

let memory = 0;

let calculationHistory =
    JSON.parse(
        localStorage.getItem(
            "engicalcHistory"
        )
    ) || [];


/* =====================================================
   INSERT
===================================================== */

function insert(value) {

    const display =
        document.getElementById(
            "display"
        );


    display.value += value;

}


/* =====================================================
   CLEAR
===================================================== */

function clearDisplay() {

    document
        .getElementById("display")
        .value = "";

}


/* =====================================================
   BACKSPACE
===================================================== */

function backspace() {

    const display =
        document.getElementById(
            "display"
        );


    display.value =
        display.value.slice(
            0,
            -1
        );

}


/* =====================================================
   ANGLE MODE
===================================================== */

function toggleAngleMode() {

    angleMode =
        angleMode === "DEG"
            ? "RAD"
            : "DEG";


    document
        .getElementById("angleMode")
        .textContent = angleMode;

}


/* =====================================================
   SCIENTIFIC FUNCTION
===================================================== */

function scientificFunction(type) {

    const display =
        document.getElementById(
            "display"
        );


    const value =
        parseFloat(
            display.value
        );


    if (
        isNaN(value) &&
        type !== "sqrt"
    ) {

        return;

    }


    let result;


    switch (type) {

        case "sin":

            result =
                Math.sin(
                    toRadians(value)
                );

            break;


        case "cos":

            result =
                Math.cos(
                    toRadians(value)
                );

            break;


        case "tan":

            result =
                Math.tan(
                    toRadians(value)
                );

            break;


        case "asin":

            result =
                fromRadians(
                    Math.asin(value)
                );

            break;


        case "acos":

            result =
                fromRadians(
                    Math.acos(value)
                );

            break;


        case "atan":

            result =
                fromRadians(
                    Math.atan(value)
                );

            break;


        case "log":

            result =
                Math.log10(value);

            break;


        case "ln":

            result =
                Math.log(value);

            break;


        case "sqrt":

            result =
                Math.sqrt(value);

            break;


        case "square":

            result =
                Math.pow(value, 2);

            break;


        case "factorial":

            result =
                factorial(value);

            break;


        default:

            return;

    }


    if (
        typeof result === "number" &&
        !isNaN(result) &&
        isFinite(result)
    ) {

        display.value =
            formatNumber(result);

    }

}


/* =====================================================
   DEG / RAD
===================================================== */

function toRadians(value) {

    if (angleMode === "DEG") {

        return value * Math.PI / 180;

    }

    return value;

}


function fromRadians(value) {

    if (angleMode === "DEG") {

        return value * 180 / Math.PI;

    }

    return value;

}


/* =====================================================
   FACTORIAL
===================================================== */

function factorial(n) {

    if (
        n < 0 ||
        !Number.isInteger(n)
    ) {

        return NaN;

    }


    if (n > 170) {

        return Infinity;

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


/* =====================================================
   CALCULATE
===================================================== */

function calculate() {

    const display =
        document.getElementById(
            "display"
        );


    let expression =
        display.value;


    if (!expression) {
        return;
    }


    try {

        expression =
            expression
                .replaceAll("π", "Math.PI")
                .replace(/\be\b/g, "Math.E")
                .replaceAll("^", "**")
                .replaceAll("10**", "10**");


        /*
            Only calculator-generated
            mathematical characters are evaluated.
        */

        if (
            !/^[0-9+\-*/().\sMathPIE]*$/.test(
                expression
            )
        ) {

            throw new Error(
                "Invalid expression"
            );

        }


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (
            typeof result !== "number" ||
            !isFinite(result)
        ) {

            throw new Error(
                "Invalid result"
            );

        }


        const formatted =
            formatNumber(result);


        addHistory(
            display.value,
            formatted
        );


        display.value =
            formatted;

    }

    catch (error) {

        display.value =
            "Error";


        setTimeout(() => {

            display.value = "";

        }, 1000);

    }

}


/* =====================================================
   NUMBER FORMAT
===================================================== */

function formatNumber(number) {

    if (
        Math.abs(number) < 1e-12
    ) {

        number = 0;

    }


    return Number(
        number.toPrecision(12)
    ).toString();

}


/* =====================================================
   MEMORY
===================================================== */

function memoryClear() {

    memory = 0;

    updateMemory();

}


function memoryRecall() {

    insert(
        formatNumber(memory)
    );

}


function memoryAdd() {

    const value =
        parseFloat(
            document
                .getElementById("display")
                .value
        );


    if (!isNaN(value)) {

        memory += value;

        updateMemory();

    }

}


function memorySubtract() {

    const value =
        parseFloat(
            document
                .getElementById("display")
                .value
        );


    if (!isNaN(value)) {

        memory -= value;

        updateMemory();

    }

}


function updateMemory() {

    document
        .getElementById("memoryStatus")
        .textContent =
            `Memory: ${formatNumber(memory)}`;

}


/* =====================================================
   HISTORY
===================================================== */

function addHistory(
    expression,
    result
) {

    calculationHistory.unshift({

        expression: expression,

        result: result,

        time: new Date()
            .toLocaleTimeString()

    });


    calculationHistory =
        calculationHistory.slice(
            0,
            30
        );


    localStorage.setItem(
        "engicalcHistory",
        JSON.stringify(
            calculationHistory
        )
    );


    displayHistory();

}


function displayHistory() {

    const container =
        document.getElementById(
            "historyList"
        );


    if (
        calculationHistory.length === 0
    ) {

        container.innerHTML = `
            <p class="empty">
                No calculations yet.
            </p>
        `;

        return;

    }


    container.innerHTML =
        calculationHistory
            .map((item, index) => `

                <div
                    class="history-item"
                    onclick="useHistory(${index})"
                >

                    <div class="history-expression">
                        ${escapeHTML(item.expression)}
                    </div>

                    <div class="history-result">
                        = ${escapeHTML(item.result)}
                    </div>

                </div>

            `)
            .join("");

}


function useHistory(index) {

    if (
        !calculationHistory[index]
    ) {
        return;
    }


    document
        .getElementById("display")
        .value =
            calculationHistory[index]
                .result;

}


function clearHistory() {

    calculationHistory = [];


    localStorage.removeItem(
        "engicalcHistory"
    );


    displayHistory();

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        if (
            /^[0-9.]$/.test(key)
        ) {

            insert(key);

            return;

        }


        if (
            ["+", "-", "*", "/", "(", ")"].includes(key)
        ) {

            insert(key);

            return;

        }


        if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

            return;

        }


        if (key === "Backspace") {

            backspace();

            return;

        }


        if (key === "Escape") {

            clearDisplay();

        }

    }
);


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayFormulas();

        displayHistory();

        updateMemory();


        /*
           If admin session exists,
           admin remains logged in during
           the current browser session.
        */

    }
);
