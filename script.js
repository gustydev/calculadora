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
const operatorButtons = document.querySelectorAll('button.operator')

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            firstNumber += button.id;
            console.log(firstNumber);
        } else {
            secondNumber += button.id;
            console.log(secondNumber);
        }
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            operator += button.id;
            console.log(operator);
        }
    })
})