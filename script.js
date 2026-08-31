/* =====================================================
   ENGICALC 2.0
   ENGINEERING CALCULATOR
===================================================== */


/* =====================================================
   NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const target =
        document.getElementById(sectionId);

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "engicalcTheme",
        dark ? "dark" : "light"
    );

}


if (
    localStorage.getItem("engicalcTheme")
    === "dark"
) {

    document.body.classList.add("dark");

}


/* =====================================================
   SCIENTIFIC CALCULATOR
===================================================== */

let expression = "";

let memory = 0;

let angleMode = "DEG";


function updateDisplay() {

    document.getElementById("expression")
        .textContent =
        expression || "0";

}


function addValue(value) {

    expression += value;

    updateDisplay();

}


function addFunction(value) {

    expression += value;

    updateDisplay();

}


function clearCalculator() {

    expression = "";

    document.getElementById("expression")
        .textContent = "0";

    document.getElementById("result")
        .textContent = "0";

}


function deleteLast() {

    expression =
        expression.slice(0, -1);

    updateDisplay();

}


function toggleAngleMode() {

    angleMode =
        angleMode === "DEG"
            ? "RAD"
            : "DEG";


    document.getElementById("angleMode")
        .textContent = angleMode;

}


function factorialNumber(n) {

    if (
        n < 0 ||
        !Number.isInteger(n) ||
        n > 170
    ) {

        throw new Error(
            "Invalid factorial"
        );

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


function evaluateExpression(exp) {

    exp =
        exp
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/\^/g, "**");


    const toRad = x => {

        return angleMode === "DEG"
            ? x * Math.PI / 180
            : x;

    };


    const fromRad = x => {

        return angleMode === "DEG"
            ? x * 180 / Math.PI
            : x;

    };


    const funcs = {

        sin: x =>
            Math.sin(toRad(x)),

        cos: x =>
            Math.cos(toRad(x)),

        tan: x =>
            Math.tan(toRad(x)),

        asin: x =>
            fromRad(Math.asin(x)),

        acos: x =>
            fromRad(Math.acos(x)),

        atan: x =>
            fromRad(Math.atan(x)),

        log: x =>
            Math.log10(x),

        ln: x =>
            Math.log(x),

        sqrt: x =>
            Math.sqrt(x),

        abs: x =>
            Math.abs(x),

        factorial: factorialNumber,

        pi: Math.PI,

        e: Math.E

    };


    const names =
        Object.keys(funcs);

    const values =
        Object.values(funcs);


    const fn =
        new Function(
            ...names,
            `"use strict"; return (${exp})`
        );


    return fn(...values);

}


function calculate() {

    if (!expression) return;


    try {

        const answer =
            evaluateExpression(expression);


        if (
            typeof answer !== "number" ||
            !Number.isFinite(answer)
        ) {

            throw new Error();

        }


        const result =
            Number(
                answer.toPrecision(12)
            );


        document.getElementById("result")
            .textContent = result;


        addHistory(
            expression,
            result
        );


    }

    catch {

        document.getElementById("result")
            .textContent = "Error";

    }

}


function square() {

    if (!expression) return;

    expression =
        `(${expression})^2`;

    updateDisplay();

}


function power() {

    expression += "^(";

    updateDisplay();

}


function reciprocal() {

    if (!expression) return;

    expression =
        `1/(${expression})`;

    updateDisplay();

}


function factorial() {

    if (!expression) return;


    expression =
        `factorial(${expression})`;

    updateDisplay();

}


/* =====================================================
   MEMORY
===================================================== */

function getCurrentValue() {

    try {

        return Number(
            evaluateExpression(expression)
        );

    } catch {

        return 0;

    }

}


function memoryClear() {

    memory = 0;

}


function memoryRecall() {

    expression += String(memory);

    updateDisplay();

}


function memoryAdd() {

    memory += getCurrentValue();

}


function memorySubtract() {

    memory -= getCurrentValue();

}


/* =====================================================
   HISTORY
===================================================== */

let history =
    JSON.parse(
        localStorage.getItem(
            "engicalcHistory"
        )
    ) || [];


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function addHistory(exp, result) {

    history.unshift({

        expression: exp,

        result: result,

        time:
            new Date().toLocaleString(
                "en-IN"
            )

    });


    if (history.length > 50) {

        history.pop();

    }


    localStorage.setItem(
        "engicalcHistory",
        JSON.stringify(history)
    );


    renderHistory();

}


function renderHistory() {

    const list =
        document.getElementById(
            "historyList"
        );

    const full =
        document.getElementById(
            "fullHistory"
        );


    if (!history.length) {

        list.innerHTML =
            "No calculations yet.";

        full.innerHTML =
            "No calculation history.";

        return;

    }


    list.innerHTML =
        history
            .slice(0, 10)
            .map(item => `

                <div class="history-item">

                    <div class="history-expression">
                        ${escapeHTML(item.expression)}
                    </div>

                    <div class="history-result">
                        = ${escapeHTML(item.result)}
                    </div>

                </div>

            `)
            .join("");


    full.innerHTML =
        history
            .map(item => `

                <div class="history-item">

                    <div class="history-expression">
                        ${escapeHTML(item.expression)}
                    </div>

                    <div class="history-result">
                        = ${escapeHTML(item.result)}
                    </div>

                    <small>
                        ${escapeHTML(item.time)}
                    </small>

                </div>

            `)
            .join("");

}


function clearHistory() {

    history = [];

    localStorage.removeItem(
        "engicalcHistory"
    );

    renderHistory();

}


/* =====================================================
   ELECTRICAL
===================================================== */

function numberValue(id) {

    return parseFloat(
        document.getElementById(id).value
    );

}


function calculateOhm() {

    const V = numberValue("voltage");

    const I = numberValue("current");

    const R = numberValue("resistance");


    let result;


    if (!isNaN(I) && !isNaN(R) && isNaN(V)) {

        result =
            `Voltage = ${(I * R).toFixed(4)} V`;

    }

    else if (!isNaN(V) && !isNaN(R) && isNaN(I)) {

        result =
            R !== 0
                ? `Current = ${(V / R).toFixed(4)} A`
                : "Resistance cannot be zero.";

    }

    else if (!isNaN(V) && !isNaN(I) && isNaN(R)) {

        result =
            I !== 0
                ? `Resistance = ${(V / I).toFixed(4)} Ω`
                : "Current cannot be zero.";

    }

    else {

        result =
            "Enter exactly two values.";

    }


    document.getElementById(
        "ohmResult"
    ).textContent = result;

}


function calculatePower() {

    const V =
        numberValue("powerVoltage");

    const I =
        numberValue("powerCurrent");


    if (isNaN(V) || isNaN(I)) {

        document.getElementById(
            "powerResult"
        ).textContent =
            "Enter voltage and current.";

        return;

    }


    document.getElementById(
        "powerResult"
    ).textContent =
        `Power = ${(V * I).toFixed(4)} W`;

}


function getCommaNumbers(id) {

    return document
        .getElementById(id)
        .value
        .split(",")
        .map(Number)
        .filter(Number.isFinite);

}


function calculateSeries() {

    const values =
        getCommaNumbers(
            "seriesResistance"
        );


    if (!values.length) {

        document.getElementById(
            "seriesResult"
        ).textContent =
            "Enter values separated by commas.";

        return;

    }


    const total =
        values.reduce(
            (sum, value) =>
                sum + value,
            0
        );


    document.getElementById(
        "seriesResult"
    ).textContent =
        `Equivalent Resistance = ${total.toFixed(4)} Ω`;

}


function calculateParallel() {

    const values =
        getCommaNumbers(
            "parallelResistance"
        );


    if (
        !values.length ||
        values.some(v => v <= 0)
    ) {

        document.getElementById(
            "parallelResult"
        ).textContent =
            "Enter positive resistance values.";

        return;

    }


    const total =
        1 /
        values.reduce(
            (sum, value) =>
                sum + 1 / value,
            0
        );


    document.getElementById(
        "parallelResult"
    ).textContent =
        `Equivalent Resistance = ${total.toFixed(4)} Ω`;

}


function calculateCapacitorEnergy() {

    const C =
        numberValue("capacitance");

    const V =
        numberValue("capacitorVoltage");


    if (
        isNaN(C) ||
        isNaN(V)
    ) return;


    const E =
        0.5 * C * V * V;


    document.getElementById(
        "capacitorResult"
    ).textContent =
        `Energy = ${E.toFixed(6)} J`;

}


function calculateFrequency() {

    const T =
        numberValue("timePeriod");


    if (
        isNaN(T) ||
        T <= 0
    ) {

        document.getElementById(
            "frequencyResult"
        ).textContent =
            "Enter a positive time period.";

        return;

    }


    document.getElementById(
        "frequencyResult"
    ).textContent =
        `Frequency = ${(1 / T).toFixed(6)} Hz`;

}


/* =====================================================
   MECHANICAL
===================================================== */

function calculateForce() {

    const m =
        numberValue("mass");

    const a =
        numberValue("acceleration");


    if (isNaN(m) || isNaN(a)) return;


    document.getElementById(
        "forceResult"
    ).textContent =
        `Force = ${(m * a).toFixed(4)} N`;

}


function calculateWork() {

    const F =
        numberValue("workForce");

    const d =
        numberValue("distance");


    if (isNaN(F) || isNaN(d)) return;


    document.getElementById(
        "workResult"
    ).textContent =
        `Work = ${(F * d).toFixed(4)} J`;

}


function calculateMechanicalPower() {

    const W =
        numberValue("mechanicalWork");

    const t =
        numberValue("mechanicalTime");


    if (
        isNaN(W) ||
        isNaN(t) ||
        t === 0
    ) return;


    document.getElementById(
        "mechanicalPowerResult"
    ).textContent =
        `Power = ${(W / t).toFixed(4)} W`;

}


function calculateTorque() {

    const F =
        numberValue("torqueForce");

    const r =
        numberValue("torqueRadius");


    if (isNaN(F) || isNaN(r)) return;


    document.getElementById(
        "torqueResult"
    ).textContent =
        `Torque = ${(F * r).toFixed(4)} N·m`;

}


function calculatePressure() {

    const F =
        numberValue("pressureForce");

    const A =
        numberValue("pressureArea");


    if (
        isNaN(F) ||
        isNaN(A) ||
        A === 0
    ) return;


    document.getElementById(
        "mechanicalPressureResult"
    ).textContent =
        `Pressure = ${(F / A).toFixed(4)} Pa`;

}


/* =====================================================
   CIVIL
===================================================== */

function calculateArea() {

    const L =
        numberValue("rectangleLength");

    const W =
        numberValue("rectangleWidth");


    if (isNaN(L) || isNaN(W)) return;


    document.getElementById(
        "areaResult"
    ).textContent =
        `Area = ${(L * W).toFixed(4)} m²`;

}


function calculateConcrete() {

    const L =
        numberValue("concreteLength");

    const W =
        numberValue("concreteWidth");

    const H =
        numberValue("concreteHeight");


    if (
        isNaN(L) ||
        isNaN(W) ||
        isNaN(H)
    ) return;


    document.getElementById(
        "concreteResult"
    ).textContent =
        `Volume = ${(L * W * H).toFixed(4)} m³`;

}


function calculateCylinder() {

    const r =
        numberValue("cylinderRadius");

    const h =
        numberValue("cylinderHeight");


    if (isNaN(r) || isNaN(h)) return;


    const volume =
        Math.PI * r * r * h;


    document.getElementById(
        "cylinderResult"
    ).textContent =
        `Volume = ${volume.toFixed(4)} m³`;

}


function calculateStress() {

    const F =
        numberValue("stressForce");

    const A =
        numberValue("stressArea");


    if (
        isNaN(F) ||
        isNaN(A) ||
        A === 0
    ) return;


    document.getElementById(
        "stressResult"
    ).textContent =
        `Stress = ${(F / A).toFixed(4)} Pa`;

}


/* =====================================================
   ENGINEERING TABS
===================================================== */

function engineeringTab(id, button) {

    document
        .querySelectorAll(".engineering-content")
        .forEach(item => {

            item.classList.remove("active");

        });


    document
        .querySelectorAll(".eng-tab")
        .forEach(item => {

            item.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    button.classList.add("active");

}


/* =====================================================
   UNIT CONVERTER
===================================================== */

const units = {

    length: {

        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        micrometer: 0.000001,
        foot: 0.3048,
        inch: 0.0254,
        mile: 1609.344

    },


    mass: {

        kilogram: 1,
        gram: 0.001,
        milligram: 0.000001,
        pound: 0.45359237,
        ounce: 0.0283495

    },


    area: {

        "square meter": 1,
        "square kilometer": 1000000,
        "square centimeter": 0.0001,
        "square foot": 0.092903,
        "square inch": 0.00064516

    },


    volume: {

        "cubic meter": 1,
        liter: 0.001,
        milliliter: 0.000001,
        "cubic centimeter": 0.000001,
        "cubic foot": 0.0283168

    },


    speed: {

        "meter/second": 1,
        "kilometer/hour": 0.2777778,
        "mile/hour": 0.44704,
        "foot/second": 0.3048

    },


    force: {

        newton: 1,
        kilonewton: 1000,
        dyne: 0.00001,
        "kilogram-force": 9.80665

    },


    pressure: {

        pascal: 1,
        kilopascal: 1000,
        megapascal: 1000000,
        bar: 100000,
        atmosphere: 101325,
        psi: 6894.76

    },


    power: {

        watt: 1,
        kilowatt: 1000,
        megawatt: 1000000,
        horsepower: 745.7

    },


    energy: {

        joule: 1,
        kilojoule: 1000,
        "watt-hour": 3600,
        "kilowatt-hour": 3600000,
        calorie: 4.184

    }

};


function loadUnits() {

    const category =
        document.getElementById(
            "conversionCategory"
        ).value;


    const from =
        document.getElementById(
            "fromUnit"
        );

    const to =
        document.getElementById(
            "toUnit"
        );


    from.innerHTML = "";

    to.innerHTML = "";


    if (category === "temperature") {

        [
            "Celsius",
            "Fahrenheit",
            "Kelvin"
        ].forEach(unit => {

            from.add(
                new Option(unit, unit)
            );

            to.add(
                new Option(unit, unit)
            );

        });

    }

    else {

        Object.keys(
            units[category]
        ).forEach(unit => {

            from.add(
                new Option(unit, unit)
            );

            to.add(
                new Option(unit, unit)
            );

        });

    }


    if (to.options.length > 1) {

        to.selectedIndex = 1;

    }


    convertUnits();

}


function convertUnits() {

    const category =
        document.getElementById(
            "conversionCategory"
        ).value;


    const from =
        document.getElementById(
            "fromUnit"
        ).value;


    const to =
        document.getElementById(
            "toUnit"
        ).value;


    const value =
        parseFloat(
            document.getElementById(
                "fromValue"
            ).value
        );


    if (isNaN(value)) {

        document.getElementById(
            "toValue"
        ).value = "";

        return;

    }


    let result;


    if (category === "temperature") {

        let celsius;


        if (from === "Celsius") {

            celsius = value;

        }

        else if (
            from === "Fahrenheit"
        ) {

            celsius =
                (value - 32) * 5 / 9;

        }

        else {

            celsius =
                value - 273.15;

        }


        if (to === "Celsius") {

            result = celsius;

        }

        else if (
            to === "Fahrenheit"
        ) {

            result =
                celsius * 9 / 5 + 32;

        }

        else {

            result =
                celsius + 273.15;

        }

    }

    else {

        const base =
            value *
            units[category][from];


        result =
            base /
            units[category][to];

    }


    document.getElementById(
        "toValue"
    ).value =
        Number(
            result.toPrecision(10)
        );

}


/* =====================================================
   ADVANCED TABS
===================================================== */

function advancedTab(id, button) {

    document
        .querySelectorAll(".advanced-content")
        .forEach(item => {

            item.classList.remove("active");

        });


    document
        .querySelectorAll(".advanced-tab")
        .forEach(item => {

            item.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    button.classList.add("active");

}


/* =====================================================
   COMPLEX NUMBERS
===================================================== */

function parseComplex(value) {

    value =
        value
            .replace(/\s+/g, "")
            .replace(/i/g, "");


    let real = 0;

    let imaginary = 0;


    const match =
        value.match(
            /^([+-]?\d*\.?\d+)?([+-]\d*\.?\d+)?$/
        );


    if (!match) {

        throw new Error(
            "Invalid complex number"
        );

    }


    if (match[1]) {

        real =
            parseFloat(match[1]);

    }


    if (match[2]) {

        imaginary =
            parseFloat(match[2]);

    }


    return {
        real,
        imaginary
    };

}


function formatComplex(z) {

    const r =
        Math.abs(z.real) < 1e-12
            ? 0
            : z.real;

    const i =
        Math.abs(z.imaginary) < 1e-12
            ? 0
            : z.imaginary;


    if (i === 0) {

        return r.toFixed(6);

    }


    if (r === 0) {

        return `${i.toFixed(6)}i`;

    }


    return `${r.toFixed(6)} ${i >= 0 ? "+" : "-"} ${Math.abs(i).toFixed(6)}i`;

}


function complexOperation(operation) {

    try {

        const A =
            parseComplex(
                document.getElementById(
                    "complexA"
                ).value
            );


        const B =
            parseComplex(
                document.getElementById(
                    "complexB"
                ).value
            );


        let result;


        if (operation === "+") {

            result = {

                real:
                    A.real + B.real,

                imaginary:
                    A.imaginary +
                    B.imaginary

            };

        }


        else if (operation === "-") {

            result = {

                real:
                    A.real - B.real,

                imaginary:
                    A.imaginary -
                    B.imaginary

            };

        }


        else if (operation === "*") {

            result = {

                real:
                    A.real * B.real -
                    A.imaginary * B.imaginary,

                imaginary:
                    A.real * B.imaginary +
                    A.imaginary * B.real

            };

        }


        else {

            const denominator =
                B.real * B.real +
                B.imaginary *
                B.imaginary;


            if (denominator === 0) {

                throw new Error();

            }


            result = {

                real:
                    (
                        A.real * B.real +
                        A.imaginary * B.imaginary
                    ) / denominator,

                imaginary:
                    (
                        A.imaginary * B.real -
                        A.real * B.imaginary
                    ) / denominator

            };

        }


        document.getElementById(
            "complexResult"
        ).textContent =
            `Result = ${formatComplex(result)}`;

    }

    catch {

        document.getElementById(
            "complexResult"
        ).textContent =
            "Invalid complex number. Example: 3+4i";

    }

}


function complexConjugate() {

    try {

        const A =
            parseComplex(
                document.getElementById(
                    "complexA"
                ).value
            );


        document.getElementById(
            "complexResult"
        ).textContent =
            `Conjugate = ${formatComplex({
                real: A.real,
                imaginary: -A.imaginary
            })}`;

    }

    catch {

        document.getElementById(
            "complexResult"
        ).textContent =
            "Invalid complex number.";

    }

}


function complexMagnitude() {

    try {

        const A =
            parseComplex(
                document.getElementById(
                    "complexA"
                ).value
            );


        const magnitude =
            Math.sqrt(
                A.real * A.real +
                A.imaginary *
                A.imaginary
            );


        document.getElementById(
            "complexResult"
        ).textContent =
            `|A| = ${magnitude.toFixed(6)}`;

    }

    catch {

        document.getElementById(
            "complexResult"
        ).textContent =
            "Invalid complex number.";

    }

}


/* =====================================================
   MATRIX
===================================================== */

function getMatrix(prefix) {

    return [

        [
            Number(
                document.getElementById(
                    prefix + "11"
                ).value
            ),

            Number(
                document.getElementById(
                    prefix + "12"
                ).value
            )

        ],

        [

            Number(
                document.getElementById(
                    prefix + "21"
                ).value
            ),

            Number(
                document.getElementById(
                    prefix + "22"
                ).value
            )

        ]

    ];

}


function formatMatrix(M) {

    return `

        <div style="
            font-size:18px;
            line-height:2;
            font-family:monospace;
        ">

            [ ${M[0][0].toFixed(4)}
              &nbsp;&nbsp;
              ${M[0][1].toFixed(4)} ]

            <br>

            [ ${M[1][0].toFixed(4)}
              &nbsp;&nbsp;
              ${M[1][1].toFixed(4)} ]

        </div>

    `;

}


function matrixOperation(operation) {

    const A =
        getMatrix("a");

    const B =
        getMatrix("b");


    let result;


    if (operation === "add") {

        result = [

            [
                A[0][0] + B[0][0],
                A[0][1] + B[0][1]
            ],

            [
                A[1][0] + B[1][0],
                A[1][1] + B[1][1]
            ]

        ];

    }


    else if (
        operation === "subtract"
    ) {

        result = [

            [
                A[0][0] - B[0][0],
                A[0][1] - B[0][1]
            ],

            [
                A[1][0] - B[1][0],
                A[1][1] - B[1][1]
            ]

        ];

    }


    else {

        result = [

            [

                A[0][0] * B[0][0] +
                A[0][1] * B[1][0],

                A[0][0] * B[0][1] +
                A[0][1] * B[1][1]

            ],

            [

                A[1][0] * B[0][0] +
                A[1][1] * B[1][0],

                A[1][0] * B[0][1] +
                A[1][1] * B[1][1]

            ]

        ];

    }


    document.getElementById(
        "matrixResult"
    ).innerHTML =
        formatMatrix(result);

}


function matrixDeterminant(prefix) {

    const M =
        getMatrix(
            prefix === "A"
                ? "a"
                : "b"
        );


    const determinant =
        M[0][0] * M[1][1] -
        M[0][1] * M[1][0];


    document.getElementById(
        "matrixResult"
    ).textContent =
        `det(${prefix}) = ${determinant.toFixed(6)}`;

}


/* =====================================================
   STATISTICS
===================================================== */

function calculateStatistics() {

    const values =
        getCommaNumbers(
            "statisticsInput"
        );


    if (!values.length) {

        return;

    }


    const sorted =
        [...values].sort(
            (a,b) => a-b
        );


    const count =
        values.length;


    const sum =
        values.reduce(
            (a,b) => a+b,
            0
        );


    const mean =
        sum / count;


    let median;


    if (count % 2 === 0) {

        median =
            (
                sorted[count / 2 - 1] +
                sorted[count / 2]
            ) / 2;

    }

    else {

        median =
            sorted[
                Math.floor(count / 2)
            ];

    }


    const variance =
        values.reduce(
            (sum, value) =>
                sum +
                Math.pow(
                    value - mean,
                    2
                ),
            0
        ) / count;


    const standardDeviation =
        Math.sqrt(variance);


    document.getElementById(
        "statCount"
    ).textContent =
        count;


    document.getElementById(
        "statMean"
    ).textContent =
        mean.toFixed(4);


    document.getElementById(
        "statMedian"
    ).textContent =
        median.toFixed(4);


    document.getElementById(
        "statMin"
    ).textContent =
        Math.min(...values).toFixed(4);


    document.getElementById(
        "statMax"
    ).textContent =
        Math.max(...values).toFixed(4);


    document.getElementById(
        "statStd"
    ).textContent =
        standardDeviation.toFixed(4);

}


/* =====================================================
   FORMULA SEARCH
===================================================== */

function searchFormulas() {

    const query =
        document.getElementById(
            "formulaSearch"
        ).value
        .toLowerCase();


    document
        .querySelectorAll(".formula-card")
        .forEach(card => {

            const text =
                card.textContent
                    .toLowerCase();


            card.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

}


/* =====================================================
   QUIZ
===================================================== */

const quizQuestions = [

    {

        question:
            "What is the SI unit of resistance?",

        options:
            [
                "Volt",
                "Ampere",
                "Ohm",
                "Watt"
            ],

        answer: 2

    },


    {

        question:
            "Which equation represents Newton's Second Law?",

        options:
            [
                "V = IR",
                "F = ma",
                "P = VI",
                "E = mc²"
            ],

        answer: 1

    },


    {

        question:
            "What is the SI unit of power?",

        options:
            [
                "Joule",
                "Newton",
                "Watt",
                "Pascal"
            ],

        answer: 2

    },


    {

        question:
            "Which formula is used for electrical power?",

        options:
            [
                "P = VI",
                "F = ma",
                "W = Fd",
                "P = F/A"
            ],

        answer: 0

    },


    {

        question:
            "What is the SI unit of pressure?",

        options:
            [
                "Pascal",
                "Watt",
                "Ohm",
                "Joule"
            ],

        answer: 0

    },


    {

        question:
            "What is the area of a rectangle?",

        options:
            [
                "L + W",
                "L × W",
                "L / W",
                "2L + 2W"
            ],

        answer: 1

    },


    {

        question:
            "What is the formula for torque?",

        options:
            [
                "τ = Fr",
                "τ = F/r",
                "τ = mr",
                "τ = ma"
            ],

        answer: 0

    },


    {

        question:
            "What is the volume of a cylinder?",

        options:
            [
                "πr²h",
                "2πr",
                "πr",
                "r²h"
            ],

        answer: 0

    },


    {

        question:
            "What does V = IR represent?",

        options:
            [
                "Newton's Law",
                "Ohm's Law",
                "Power Law",
                "Hooke's Law"
            ],

        answer: 1

    },


    {

        question:
            "What is the mathematical value of π approximately?",

        options:
            [
                "2.14",
                "3.14",
                "4.14",
                "1.41"
            ],

        answer: 1

    }

];


let currentQuestion = 0;

let quizScore = 0;

let quizAnswered = false;


function loadQuestion() {

    const q =
        quizQuestions[
            currentQuestion
        ];


    document.getElementById(
        "quizProgress"
    ).textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${quizScore}`;


    document.getElementById(
        "quizQuestion"
    ).textContent =
        q.question;


    const options =
        document.getElementById(
            "quizOptions"
        );


    options.innerHTML = "";

    quizAnswered = false;


    q.options.forEach(
        (option,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.onclick =
                () =>
                    selectAnswer(
                        index,
                        button
                    );


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "quizResult"
    ).textContent = "";

}


function selectAnswer(index, button) {

    if (quizAnswered) return;


    quizAnswered = true;


    const q =
        quizQuestions[
            currentQuestion
        ];


    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    if (index === q.answer) {

        button.classList.add(
            "correct"
        );

        quizScore++;

    }

    else {

        button.classList.add(
            "wrong"
        );

        options[
            q.answer
        ].classList.add(
            "correct"
        );

    }


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${quizScore}`;

}


function nextQuestion() {

    if (!quizAnswered) {

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        document.getElementById(
            "quizQuestion"
        ).textContent =
            "🎉 Quiz Complete!";


        document.getElementById(
            "quizOptions"
        ).innerHTML = "";


        document.getElementById(
            "nextQuiz"
        ).style.display =
            "none";


        document.getElementById(
            "quizResult"
        ).textContent =
            `Final Score: ${quizScore} / ${quizQuestions.length}`;

        return;

    }


    loadQuestion();

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const scientific =
            document.getElementById(
                "scientific"
            );


        if (
            !scientific.classList.contains(
                "active"
            )
        ) return;


        if (
            /[0-9.+\-*/%()]/.test(
                event.key
            )
        ) {

            addValue(event.key);

        }


        else if (
            event.key === "Enter"
        ) {

            calculate();

        }


        else if (
            event.key === "Backspace"
        ) {

            deleteLast();

        }


        else if (
            event.key === "Escape"
        ) {

            clearCalculator();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHistory();

        loadUnits();

        loadQuestion();

    }
);
