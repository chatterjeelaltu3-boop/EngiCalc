document.addEventListener('DOMContentLoaded', function() {
    // --- 🎨 1. DARK MODE LOGIC ---
    const modeBtn = document.getElementById('mode-btn');
    modeBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            modeBtn.innerText = "🌙 Dark Mode";
        } else {
            document.body.setAttribute('data-theme', 'dark');
            modeBtn.innerText = "☀️ Light Mode";
        }
    });

    // --- 🧮 2. CALCULATOR WITH 📜 HISTORY LOGIC ---
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    let currentInput = '';

    function updateHistory(calculation, result) {
        const emptyMsg = historyList.querySelector('.empty-msg');
        if (emptyMsg) emptyMsg.remove();
        
        const li = document.createElement('li');
        li.innerText = `${calculation} = ${result}`;
        historyList.insertBefore(li, historyList.firstChild);
    }

    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '<li class="empty-msg">No history yet</li>';
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.innerText;

            if (buttonText === 'C') {
                currentInput = '';
                screen.value = '0';
            } else if (buttonText === '=') {
                try {
                    if (currentInput !== '') {
                        let expression = currentInput.replace(/\^/g, '**');
                        let result = eval(expression);
                        
                        // হিস্ট্রি আপডেট করা হচ্ছে
                        updateHistory(currentInput.replace(/\*\*/g, '^'), result);
                        
                        screen.value = result;
                        currentInput = screen.value;
                    }
                } catch (error) {
                    screen.value = 'Error';
                    currentInput = '';
                }
            } else if (buttonText === '√') {
                if (currentInput !== '') {
                    let res = Math.sqrt(eval(currentInput));
                    updateHistory(`√(${currentInput})`, res);
                    screen.value = res;
                    currentInput = screen.value;
                }
            } else if (buttonText === 'π') {
                if (screen.value === '0') { currentInput = Math.PI.toFixed(4).toString(); } 
                else { currentInput += Math.PI.toFixed(4); }
                screen.value = currentInput;
            } else if (buttonText === 'sin') {
                if (currentInput !== '') { let res = Math.sin(eval(currentInput) * Math.PI / 180); updateHistory(`sin(${currentInput})`, res.toFixed(4)); screen.value = res.toFixed(4); currentInput = screen.value; }
            } else if (buttonText === 'cos') {
                if (currentInput !== '') { let res = Math.cos(eval(currentInput) * Math.PI / 180); updateHistory(`cos(${currentInput})`, res.toFixed(4)); screen.value = res.toFixed(4); currentInput = screen.value; }
            } else if (buttonText === 'tan') {
                if (currentInput !== '') { let res = Math.tan(eval(currentInput) * Math.PI / 180); updateHistory(`tan(${currentInput})`, res.toFixed(4)); screen.value = res.toFixed(4); currentInput = screen.value; }
            } else if (buttonText === '^') {
                currentInput += '^';
                screen.value = currentInput;
            } else {
                if (screen.value === '0' && buttonText !== '.') { currentInput = buttonText; } 
                else { currentInput += buttonText; }
                screen.value = currentInput;
            }
        });
    });

    // --- 📊 3. UNIT CONVERTER LOGIC ---
    const converterType = document.getElementById('converter-type');
    const unitInput = document.getElementById('unit-input');
    const unitOutput = document.getElementById('unit-output');

    function performConversion() {
        const value = parseFloat(unitInput.value);
        const type = converterType.value;

        if (isNaN(value)) { unitOutput.value = ''; return; }

        if (type === 'length') { unitOutput.value = (value / 1000).toFixed(3) + " Km"; } 
        else if (type === 'weight') { unitOutput.value = (value * 2.204).toFixed(2) + " lbs"; } 
        else if (type === 'temp') { unitOutput.value = ((value * 9/5) + 32).toFixed(1) + " °F"; }
    }

    unitInput.addEventListener('input', performConversion);
    converterType.addEventListener('change', performConversion);
});
