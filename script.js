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

const operators = ['+', '-', '*', '/'];
let firstNumber = 0; 
let secondNumber = 0;
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
const visor = document.querySelector('.visor');
const equal = document.querySelector('button.equal');
const clear = document.querySelector('button#clear');
const deleteButton = document.querySelector('button#delete');

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            firstNumber += button.id;
            visor.textContent = `${Number(firstNumber)}`;
        } else {
            secondNumber += button.id;
            visor.textContent = `${Number(firstNumber)}${operator}${Number(secondNumber)}`;
        }
    })
})

function getResult() {
    if (visor.textContent === `${Number(firstNumber)}${operator}${Number(secondNumber)}`) {
        if (operator === '/' && Number(secondNumber) === 0) {
            secondNumber = 0; // Resetting so message below doesn't appear twice
            visor.textContent = `${Number(firstNumber)}${operator}`
            return alert('Impossível dividir por zero!');
        }
        const result = operate(Number(firstNumber), operator, Number(secondNumber));
        visor.textContent += ` = ${result}`;
        operator = '';
        firstNumber = result;
        secondNumber = 0;
    }
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        function updateOperator() {
            operator = button.id;
            visor.textContent = `${Number(firstNumber)}${operator}`
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
    if (!(secondNumber === 0)) {
        getResult();
    }
});

clear.addEventListener('click', () => {
    firstNumber = 0;
    operator = '';
    secondNumber = 0;
    visor.textContent = firstNumber;
})

deleteButton.addEventListener('click', () => {
    if (visor.textContent.includes('=') || !( (/[+-/*]/.test(visor.textContent)) )) {
        firstNumber = String(firstNumber).slice(0, -1);
        visor.textContent = `${Number(firstNumber)}`;
    } else if ((/[+-/*]/.test(visor.textContent)) && (Number(secondNumber) === 0)) {
        operator = '';
        visor.textContent = visor.textContent.slice(0,-1);
    } else if (secondNumber.length > 0) {
        secondNumber = String(secondNumber).slice(0, -1);
        if (Number(secondNumber) === 0) {
            visor.textContent = `${Number(firstNumber)}${operator}`
        } else {
            visor.textContent = `${Number(firstNumber)}${operator}${Number(secondNumber)}`
        }
    }
})