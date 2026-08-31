let angleMode = "DEG";
let lastAnswer = 0;
let history = [];

const display = document.getElementById("display");
const answer = document.getElementById("answer");


// =========================
// TAB SYSTEM
// =========================

function showPage(pageId, button) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    button.classList.add("active");
}


// =========================
// CALCULATOR
// =========================

function insert(value) {

    if (value === "Ans") {
        display.value += lastAnswer;
        return;
    }

    display.value += value;
}


function clearAll() {

    display.value = "";
    answer.textContent = "0";
}


function backspace() {

    display.value = display.value.slice(0, -1);
}


function toggleAngle() {

    angleMode = angleMode === "DEG" ? "RAD" : "DEG";

    document.getElementById("angleMode").textContent = angleMode;
}


function toRadians(x) {

    return angleMode === "DEG"
        ? x * Math.PI / 180
        : x;
}


function fromRadians(x) {

    return angleMode === "DEG"
        ? x * 180 / Math.PI
        : x;
}


function factorialNumber(n) {

    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial requires a positive integer");
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}


function factorial() {

    display.value += "!";
}


function prepareExpression(expression) {

    expression = expression
        .replaceAll("π", "pi")
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("−", "-")
        .replaceAll("Ans", lastAnswer.toString());

    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    expression = expression.replace(/\^/g, "**");

    expression = expression.replace(/(\d+(\.\d+)?)!/g, "factorialNumber($1)");

    expression = expression.replace(/\bpi\b/g, "Math.PI");

    expression = expression.replace(/\be\b/g, "Math.E");

    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    expression = expression.replace(/log\(/g, "Math.log10(");

    expression = expression.replace(/ln\(/g, "Math.log(");

    expression = expression.replace(/exp\(/g, "Math.exp(");


    // Trigonometry

    expression = expression.replace(
        /sin\(/g,
        "Math.sin(toRadians("
    );

    expression = expression.replace(
        /cos\(/g,
        "Math.cos(toRadians("
    );

    expression = expression.replace(
        /tan\(/g,
        "Math.tan(toRadians("
    );


    expression = expression.replace(
        /asin\(/g,
        "fromRadians(Math.asin("
    );

    expression = expression.replace(
        /acos\(/g,
        "fromRadians(Math.acos("
    );

    expression = expression.replace(
        /atan\(/g,
        "fromRadians(Math.atan("
    );


    return expression;
}


function calculate() {

    if (!display.value.trim()) return;

    try {

        let original = display.value;

        let expression = prepareExpression(original);

        let result = Function(
            "factorialNumber",
            "toRadians",
            "fromRadians",
            `"use strict"; return (${expression})`
        )(
            factorialNumber,
            toRadians,
            fromRadians
        );


        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }


        result = Number(
            Number(result).toPrecision(12)
        );


        answer.textContent = result;

        lastAnswer = result;

        history.unshift({
            expression: original,
            result: result
        });

        if (history.length > 20) {
            history.pop();
        }

        saveHistory();

        display.value = result;

        showHistory();

    } catch (error) {

        answer.textContent = "Error";

        console.error(error);

    }
}


// =========================
// HISTORY
// =========================

function saveHistory() {

    localStorage.setItem(
        "engicalcHistory",
        JSON.stringify(history)
    );
}


function loadHistory() {

    const saved = localStorage.getItem("engicalcHistory");

    if (saved) {
        history = JSON.parse(saved);
    }

    showHistory();
}


function showHistory() {

    const box = document.getElementById("history");

    box.innerHTML = "";

    history.forEach(item => {

        const div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <strong>${item.expression}</strong>
            = ${item.result}
        `;

        div.onclick = () => {
            display.value = item.expression;
        };

        box.appendChild(div);

    });
}


function clearHistory() {

    history = [];

    localStorage.removeItem("engicalcHistory");

    showHistory();
}


// =========================
// COMPLEX NUMBERS
// =========================

function parseComplex(value) {

    value = value.replace(/\s/g, "");

    const match = value.match(
        /^([+-]?\d*\.?\d+)?([+-]\d*\.?\d+)i$/
    );

    if (!match) {

        if (/^[+-]?\d*\.?\d+$/.test(value)) {

            return {
                re: Number(value),
                im: 0
            };

        }

        throw new Error("Use format a+bi");

    }

    return {
        re: Number(match[1] || 0),
        im: Number(match[2])
    };
}


function complexCalculate() {

    try {

        const a = parseComplex(
            document.getElementById("complexA").value
        );

        const b = parseComplex(
            document.getElementById("complexB").value
        );

        const operation =
            document.getElementById("complexOperation").value;

        let r;


        if (operation === "+") {

            r = {
                re: a.re + b.re,
                im: a.im + b.im
            };

        }


        else if (operation === "-") {

            r = {
                re: a.re - b.re,
                im: a.im - b.im
            };

        }


        else if (operation === "*") {

            r = {
                re: a.re * b.re - a.im * b.im,
                im: a.re * b.im + a.im * b.re
            };

        }


        else {

            const denominator =
                b.re * b.re + b.im * b.im;

            r = {
                re: (a.re * b.re + a.im * b.im) / denominator,
                im: (a.im * b.re - a.re * b.im) / denominator
            };

        }


        document.getElementById("complexResult").textContent =
            formatComplex(r);

    }

    catch (error) {

        document.getElementById("complexResult").textContent =
            "Error: " + error.message;

    }
}


function formatComplex(z) {

    let re = Number(z.re.toFixed(10));
    let im = Number(z.im.toFixed(10));

    if (im === 0) return `${re}`;

    if (re === 0) return `${im}i`;

    return im >= 0
        ? `${re} + ${im}i`
        : `${re} - ${Math.abs(im)}i`;
}


// =========================
// MATRIX
// =========================

function matrixCalculate() {

    const a = Number(document.getElementById("m11").value);
    const b = Number(document.getElementById("m12").value);
    const c = Number(document.getElementById("m21").value);
    const d = Number(document.getElementById("m22").value);

    const operation =
        document.getElementById("matrixOperation").value;


    if (
        [a,b,c,d].some(
            n => Number.isNaN(n)
        )
    ) {

        document.getElementById("matrixResult").textContent =
            "Please enter all matrix values.";

        return;
    }


    const determinant = a * d - b * c;


    if (operation === "det") {

        document.getElementById("matrixResult").textContent =
            `Determinant = ${determinant}`;

        return;
    }


    if (determinant === 0) {

        document.getElementById("matrixResult").textContent =
            "This matrix has no inverse.";

        return;
    }


    const result = `
Inverse Matrix:

[ ${d / determinant}   ${-b / determinant} ]

[ ${-c / determinant}   ${a / determinant} ]
`;


    document.getElementById("matrixResult").textContent = result;
}


// =========================
// STATISTICS
// =========================

function calculateStatistics() {

    const input =
        document.getElementById("statData").value;

    const numbers = input
        .split(",")
        .map(Number)
        .filter(n => !Number.isNaN(n));


    if (!numbers.length) {

        document.getElementById("statResult").textContent =
            "Please enter numbers.";

        return;
    }


    const sum =
        numbers.reduce((a,b) => a+b, 0);

    const mean =
        sum / numbers.length;


    const sorted =
        [...numbers].sort((a,b) => a-b);


    let median;

    const middle =
        Math.floor(sorted.length / 2);


    if (sorted.length % 2 === 0) {

        median =
            (sorted[middle - 1] + sorted[middle]) / 2;

    } else {

        median =
            sorted[middle];

    }


    const variance =
        numbers.reduce(
            (total,n) =>
                total + Math.pow(n - mean, 2),
            0
        ) / numbers.length;


    const standardDeviation =
        Math.sqrt(variance);


    document.getElementById("statResult").textContent =

`Count = ${numbers.length}

Sum = ${sum}

Mean = ${mean}

Median = ${median}

Minimum = ${Math.min(...numbers)}

Maximum = ${Math.max(...numbers)}

Variance = ${variance}

Standard Deviation = ${standardDeviation}`;
}


// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown", function(event) {

    const key = event.key;


    if (
        /[0-9+\-*/().]/.test(key)
    ) {

        insert(key);

    }


    else if (key === "Enter") {

        calculate();

    }


    else if (key === "Backspace") {

        backspace();

    }


    else if (key === "Escape") {

        clearAll();

    }


    event.preventDefault();

});


// =========================
// START
// =========================

loadHistory();s
