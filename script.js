function add(a, b) {
    return Math.round(((a + b) + Number.EPSILON) * 100) / 100;;
}

function subtract(a, b) {
    return Math.round(((a - b) + Number.EPSILON) * 100) / 100;;
}

function multiply(a,b) {
    return Math.round(((a * b) + Number.EPSILON) * 100) / 100;
}

function divide(a, b) {
    return Math.round(((a / b) + Number.EPSILON) * 100) / 100;
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

function updateText() {
    if (!firstNumber) {
        display.textContent = '0';
    } else if (!secondNumber) {
        display.textContent = `${Number(firstNumber)}${operator}${secondNumber}`;
    } else {
        display.textContent = `${Number(firstNumber)}${operator}${Number(secondNumber)}`;
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator) {
            firstNumber += button.id;
            updateText();
        } else {
            secondNumber += button.id;
            updateText();
        }
    })
})

function getResult() {
    if (operator === '/' && Number(secondNumber) === 0) {
        secondNumber = 0; // Resetting so message below doesn't appear twice
        updateText();
        return alert('Impossível dividir por zero!');
    }
    const result = operate(Number(firstNumber), operator, Number(secondNumber));
    display.textContent += ` = ${result}`;
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
        if (operator === '') {
            if (firstNumber === '') {
                firstNumber = '0';
            }
            updateOperator()
        } else if (!(secondNumber === 0)) {
            getResult();
            updateOperator();
        } else if ((secondNumber === 0)) {
            updateOperator();
        }
    })
})

equal.addEventListener('click', () => {
    if (!(!secondNumber)) {
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
    if (display.textContent.includes('=') || (!operator)) {
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

// TO DO: desbagunçar esse código pq puta q pariu