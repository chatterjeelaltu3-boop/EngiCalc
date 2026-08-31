document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.innerText;

            if (buttonText === 'C') {
                currentInput = '';
                screen.value = '0';
            } else if (buttonText === '=') {
                try {
                    if (currentInput !== '') {
                        // JavaScript-er bhashay power (^) ke ** te bodlate hoy
                        let expression = currentInput.replace(/[^]*\^/g, '**');
                        screen.value = eval(expression);
                        currentInput = screen.value;
                    }
                } catch (error) {
                    screen.value = 'Error';
                    currentInput = '';
                }
            } else if (buttonText === '√') {
                // Square root logic
                if (currentInput !== '') {
                    screen.value = Math.sqrt(eval(currentInput));
                    currentInput = screen.value;
                }
            } else if (buttonText === 'π') {
                // Pi constant value
                if (screen.value === '0') {
                    currentInput = Math.PI.toString();
                } else {
                    currentInput += Math.PI;
                }
                screen.value = currentInput;
            } else if (buttonText === 'sin') {
                if (currentInput !== '') {
                    screen.value = Math.sin(eval(currentInput) * Math.PI / 180); // Degree to Radian
                    currentInput = screen.value;
                }
            } else if (buttonText === 'cos') {
                if (currentInput !== '') {
                    screen.value = Math.cos(eval(currentInput) * Math.PI / 180);
                    currentInput = screen.value;
                }
            } else if (buttonText === 'tan') {
                if (currentInput !== '') {
                    screen.value = Math.tan(eval(currentInput) * Math.PI / 180);
                    currentInput = screen.value;
                }
            } else if (buttonText === '^') {
                currentInput += '**'; // JavaScript power operation
                screen.value = currentInput;
            } else {
                if (screen.value === '0' && buttonText !== '.') {
                    currentInput = buttonText;
                } else {
                    currentInput += buttonText;
                }
                screen.value = currentInput;
            }
        });
    });
});
