document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.innerText;

            if (buttonText === 'C') {
                // Screen clear korar jonno
                currentInput = '';
                screen.value = '0';
            } else if (buttonText === '=') {
                // Hisab (Calculation) korar jonno
                try {
                    // Jodi kono vul hisab thake ta handle korbe
                    if (currentInput !== '') {
                        screen.value = eval(currentInput);
                        currentInput = screen.value;
                    }
                } catch (error) {
                    screen.value = 'Error';
                    currentInput = '';
                }
            } else {
                // Number ba operator screen-e jog korar jonno
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
