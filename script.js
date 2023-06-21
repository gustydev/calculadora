function add(a, b) {
    return Math.round(((a + b) + Number.EPSILON) * 100000) / 100000;;
}

function subtract(a, b) {
    return Math.round(((a - b) + Number.EPSILON) * 100000) / 100000;;
}

function multiply(a,b) {
    return Math.round(((a * b) + Number.EPSILON) * 100000) / 100000;
}

function divide(a, b) {
    return Math.round(((a / b) + Number.EPSILON) * 100000) / 100000;
}

let firstNumber = ''; 
let secondNumber = '';
let operator = '';

function operate(firstNumber, operator, secondNumber) {
    return operator === "+" ? add(firstNumber, secondNumber)
         : operator === '-' ? subtract(firstNumber, secondNumber)
         : operator === '*' ? multiply(firstNumber, secondNumber)
         : operator === '/' ? divide(firstNumber, secondNumber)
         : 'error';
}

const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const display = document.querySelector('.display');
const equal = document.querySelector('button.equal');
const clear = document.querySelector('button#clear');
const deleteButton = document.querySelector('button#delete');
const decimal = document.querySelector('button.decimal');
const current = document.querySelector('.current');
const previous = document.querySelector('.previous');

function updateText() {
    if (!firstNumber) {
        previous.textContent = '';
        current.textContent = '0';
    } else if (firstNumber.includes('-')) {
        current.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    } else if (!secondNumber) {
        if (firstNumber.includes('.') && !operator) {
            current.textContent = `${firstNumber} ${operator} ${secondNumber}`;
        } else {
            current.textContent = `${Number(firstNumber)} ${operator} ${secondNumber}`;
        }
    } else {
        if (secondNumber.includes('.')) {
            current.textContent = `${Number(firstNumber)} ${operator} ${secondNumber}`;
        } else {
            current.textContent = `${Number(firstNumber)} ${operator} ${Number(secondNumber)}`;
        }
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator) {
            if ((!(Number(firstNumber) === 0 && button.id === '0') || firstNumber.includes('.'))) {
                firstNumber += button.id;
                updateText();
            }
        } else {
            if ((!(Number(secondNumber) === 0 && button.id === '0' && secondNumber.length >= 1) || secondNumber.includes('.'))) {
                secondNumber += button.id;
                updateText();
            }
        }
    })
})

function getResult() {
    if (operator === '/' && Number(secondNumber) === 0) {
        secondNumber = ''; // Resetting so message below doesn't appear twice
        updateText();
        return alert("You can't divide by zero! That's illegal!");
    }
    const result = operate(Number(firstNumber), operator, Number(secondNumber));
    previous.textContent = `${Number(firstNumber)}${operator}${Number(secondNumber)}=`;
    current.textContent = `${result}`
    operator = '';
    firstNumber = String(result);
    secondNumber = '';
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        function updateOperator() {
            operator = button.id;
            updateText();
        }
        if (!operator) {
            if (!firstNumber || firstNumber === '-' || firstNumber === '-.') {
                firstNumber = '0';
            }
            updateOperator()
        } else if (secondNumber) {
            getResult();
            updateOperator();
        } else if (!secondNumber) {
            updateOperator();
        }
    })
})

equal.addEventListener('click', () => {
    if (secondNumber) {
        if (secondNumber.slice(-1) === '.') {
            secondNumber = secondNumber.slice(0, -1);
            updateText();
        }
        getResult();
    }
});

clear.addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    updateText();
})

deleteButton.addEventListener('click', () => {
    if (current.textContent.includes('=') || (!operator)) {
        firstNumber = String(firstNumber).slice(0, -1);
        updateText();
    } else if ((operator) && (!secondNumber)) {
        operator = '';
        updateText();
    } else if (secondNumber) {
        secondNumber = String(secondNumber).slice(0, -1);
        updateText();
    }
})

decimal.addEventListener('click', () => {
    if (!operator && !firstNumber.includes('.')) {
        if (!firstNumber) {
            firstNumber = '0';
        } else if (firstNumber === '-') {
            firstNumber = '-0'
        }
        firstNumber += '.';
        updateText();
    } else if (operator && !secondNumber.includes('.')) {
        if (!secondNumber) {
            secondNumber = '0';
        }
        secondNumber += '.';
        updateText();
    }
})

// Keyboard support
const buttons = document.querySelectorAll('button');

document.addEventListener('keydown', (e) => {
    buttons.forEach((button) => {
        if (button.id === e.key) {
            button.click();
        } else if (e.key === 'Backspace' && button.id === 'delete') {
            button.click();
        } else if (e.key === 'Enter' && button.id === '=') {
            button.click();
        }
    })
})