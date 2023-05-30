function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

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

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            firstNumber += button.id;
            visor.textContent = `${Number(firstNumber)}`;
        } else {
            secondNumber += button.id;
            visor.textContent = `${Number(firstNumber)} ${operator} ${Number(secondNumber)}`;
        }
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            if (firstNumber === '') {
                firstNumber = '0';
            }
            operator += button.id;
            visor.textContent = `${Number(firstNumber)} ${operator}`;
        }
    })
})

equal.addEventListener('click', () => {
    const result = operate(Number(firstNumber), operator, Number(secondNumber));
    visor.textContent = result;
    firstNumber = result;
    operator = '';
    secondNumber = 0;
})