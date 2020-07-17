var body = document.querySelector("body");
var numPad = document.querySelector(".num-pad");
var calculatorDisplay = document.querySelector("#result");
var calculation = document.querySelector("#calculation");
var buttonsAll = document.querySelectorAll('.num-button');
var clearButton = document.querySelector('#clear');
var backSpaceButton = document.querySelector('#back-space');
var equal = document.querySelector('#equal');
var changeSign = document.querySelector('#change-sign');
var currentOperation = "+"
var operationSign = document.querySelector("#operation-sign");


const keyBoardNumbers = {
    // Here are the keyboard numbers and the dot(".")
    // to be used by the keyboard
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

const keyBoardValues = {
    8: backSpace
}
const operators = {
    //The operators used by the keyboard
    107: "+",
    109: "-",
    111: "÷",
    106: "*"
};



var currentOperation = "+";
var currentNumber = 0;

var numbers = [...buttonsAll].filter(element => !isNaN(parseInt(element.textContent.trim())));


function checkIfZero() {

    if (calculatorDisplay.textContent.trim() == "0") calculatorDisplay.textContent = "";
}


function backSpace() {
    let length = calculatorDisplay.textContent.length;
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, length - 1);
    if (calculatorDisplay.textContent.length < 1) calculatorDisplay.textContent = 0;
}

function equalUsage() {
    //this is the main function that is used 
    // to achieve the result of the operation
    fontDisplayLenght(calculatorDisplay);
    calculatorDisplay.textContent = operate(currentOperation, currentNumber, calculatorDisplay.textContent);
    currentNumber = calculatorDisplay.textContent;
    calculation.textContent = currentNumber;
}

function fontDisplayLenght(part) {
    //Here if the numbers get too large the fontsize will decrease
    // so that there won't be any overflow from the calculator
    // to the main background
    if (part.textContent.length > 15) part.style.fontSize = "16px";
}
function sum(first, ...args) {
    //Function used by the "+" sign
    return args.reduce((total, current) => {
        return total + current;
    }, first);
}
function substract(first, ...args) {
    //Function used by the "+" sign
    return args.reduce((total, current) => {
        return total - current;
    }, first);
}
function multiply(first, ...args) {
    //Function used by the "+" sign
    return args.reduce((total, current) => {
        return total * current;
    }, first);
}
function division(first, ...args) {
    //Function used by the "+" sign
    return args.reduce((total, current) => {
        return total / current;
    }, first);
}

function operate(operator, first, ...args) {
    //Here will the operations execute
    //The function that matches the operator
    // will be executed
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
        case "÷":
            rv = division(first, ...args);
            break;
        default:

            break;
    }
    return rv;

}


function operationChange(operation) {
    // This is to change the operator displayed on the calculator screen
    operationSign.textContent = operation;
    currentOperation = operation;
    currentNumber = calculatorDisplay.textContent;
    calculatorDisplay.textContent = 0;
    calculation.textContent = currentNumber;
}


[...buttonsAll].filter(operator => Object.values(operators).includes(operator.textContent.trim()))
    .forEach(operator => {
        //Here the functions for each operator are beign assigned
        operator.addEventListener("click", () => operationChange(operator.textContent.trim()));
    });

clearButton.addEventListener('click', () => {
    //this is for the clear button(C)
    calculation.textContent = "";
    calculatorDisplay.textContent = 0;
    currentNumber = 0;

})
backSpaceButton.addEventListener('click', backSpace);// adding backspace functionality to the backspace button



body.addEventListener('keydown', (e) => {
    //Using keyboard to enter numbers and operations.
    if (e.keyCode in keyBoardNumbers) {
        //Entering numbers and dot(".") 
        checkIfZero()
        if (calculatorDisplay.textContent.includes(".") && (e.keyCode == 190 || e.keyCode == 110)) return;
        calculatorDisplay.textContent += keyBoardNumbers[e.keyCode];

    }
    else if (e.keyCode in keyBoardValues) {
        //For backspace
        checkIfZero()
        keyBoardValues[e.keyCode]();
    }
    else if (e.keyCode in operators) {
        //for operators
        operationChange(operators[e.keyCode]);

    }
    else if (e.keyCode == 13) equalUsage(); //For getting the result using enter
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        //Giving number buttons on the calculator functionality
        checkIfZero();
        fontDisplayLenght(calculatorDisplay);
        if (calculatorDisplay.textContent.includes(".")) return;
        calculatorDisplay.textContent += number.textContent.trim();
    })
})

equal.addEventListener('click', () => equalUsage());//Giving equal button on the calculator functionality

changeSign.addEventListener('click', () => {
    //changin the operator on the calculator display
    calculatorDisplay.textContent = -calculatorDisplay.textContent;
})
