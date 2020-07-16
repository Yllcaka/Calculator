var body = document.querySelector("body");
// var numbers = ["C",".",7,8,
//                 9,"/",4,5,
//                 6,"*",1,2,
//                 3,"-","C",0,
//                 "."];

var numPad = document.querySelector(".num-pad");
var calculatorDisplay = document.querySelector("#result");
var calculation = document.querySelector("#calculation");
var buttonsAll = document.querySelectorAll('.num-button');
var clearButton = document.querySelector('#clear');
var backSpaceButton = document.querySelector('#back-space');

var currentNumber = 0;


var numbers = [...buttonsAll].filter(element => !isNaN(parseInt(element.textContent.trim())));
console.log(numbers);

function checkIfZero() {
    if (calculatorDisplay.textContent.trim() == "0") calculatorDisplay.textContent = "";
}


const keyBoardNumbers = {
    96: 0,
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    110: ".",
    190: "."

};
function backSpace() {
    let length = calculatorDisplay.textContent.length;
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, length - 1);
}
const keyBoardValues = {
    8: backSpace
}
const operators = ["+", "-", "÷", "*"];
// [...buttonsAll].map(element => console.log(element.textContent.trim(), element.textContent.trim() in operators));
[...buttonsAll].filter(operator => operators.includes(operator.textContent.trim()))
    .forEach(operator => {
        operator.addEventListener("click", () => {
            let found = operators.some(element => calculation.textContent.includes(element));
            if (!found) {
                calculation.textContent += `${parseFloat(currentNumber)} ${operator.textContent}`
            }


            console.log(operator.textContent.trim());
            calculatorDisplay.textContent = operate(operator.textContent.trim(), currentNumber, calculatorDisplay.textContent);
            currentNumber = calculatorDisplay.textContent;
        })
    });

clearButton.addEventListener('click', () => {
    calculation.textContent = "";
    calculatorDisplay.textContent = 0;
    currentNumber = 0;
})
backSpaceButton.addEventListener('click', backSpace);



body.addEventListener('keydown', (e) => {

    if (e.keyCode in keyBoardNumbers) {
        checkIfZero()
        if (calculatorDisplay.textContent.includes(".") && (e.keyCode == 190 || e.keyCode == 110)) return;
        calculatorDisplay.textContent += keyBoardNumbers[e.keyCode];

    }
    else if (e.keyCode in keyBoardValues) {
        checkIfZero()
        keyBoardValues[e.keyCode]();
    }
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        checkIfZero();
        if (calculatorDisplay.textContent.includes(".")) return;
        calculatorDisplay.textContent += number.textContent.trim();
    })
})




function sum(first, ...args) {
    return args.reduce((total, current) => {
        return total + current;
    }, first);
}
function substract(first, ...args) {
    return args.reduce((total, current) => {
        return total - current;
    }, first);
}
function multiply(first, ...args) {
    return args.reduce((total, current) => {
        return total * current;
    }, first);
}
function division(first, ...args) {
    return args.reduce((total, current) => {
        return total / current;
    }, first);
}

function operate(operator, first, ...args) {
    first = parseFloat(first);
    args = [...args].map(element => parseFloat(element));
    let rv = "";
    switch (operator) {
        case "+":
            rv = sum(first, ...args);
            break;
        case "-":
            rv = substract(first, ...args);
            break;
        case "*":
            rv = multiply(first, ...args);
            break;
        case "/":
            rv = division(first, ...args);
            break;
        default:

            break;
    }
    return rv;

}
