const buttons = document.querySelectorAll("button");
const screenA = document.getElementById("top-screen");
const screenB = document.getElementById("bottom-screen");

let numA = "";
let numB = "";
let operator = "";
let sum = "";


window.addEventListener("keydown", function(event) {
    const keyMappings = {
        "/": "division",
        "Enter": "=",
        "x": "*",
        ",": ".",
    };

    const pressedKey = event.key;
    const calculatorButton = document.getElementById("key-" + pressedKey);

    if (calculatorButton) {
        calculatorButton.click();
    } else if (keyMappings[pressedKey]) {
        document.getElementById("key-" + keyMappings[pressedKey]).click();
    };
});

buttons.forEach(button => {
    button.addEventListener("click", function() {
        const buttonText = button.innerHTML;
        switch (buttonText) {
            case "c":
                resetAll();
                break;
            case "del":
                deleteLatestInput();
                break;
            case "±":
                toggleNegPos();
                break;
            case "÷":
            case "×":
            case "-":
            case "+":
                handleOperators(buttonText);
                break;
            case ".":
                handleDecimals(buttonText);
                break;
            case "=":
                handleEquals();
                break;
            default:
                handleNumbers(buttonText);
                break;
        };
    });
});


const getNums = () => {
    if (screenA.innerHTML === "") {
        deleteUnusedOperator();
    } else {
        numA = screenA.innerHTML.slice(0, -1);
        numB = screenB.innerHTML;
    };
};

const getOperator = () => {
    if (screenA.innerHTML !== "0") operator = screenA.innerHTML.slice(-1);
};

const operateChecklist = () => {
    return numA !== "" && numB !== "" && operator !== "";
};

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (numA, numB, operator) => {
    numA = parseFloat(numA);
    numB = parseFloat(numB);
    switch (operator) {
        case "+":
            return add(numA, numB);
        case "-":
            return substract(numA, numB);
        case "×":
            return multiply(numA, numB);
        case "÷":
            return divide(numA, numB);
    };
};


const resetScreenA = () => screenA.innerHTML = "";
const resetScreenB = () => screenB.innerHTML = "0";
const resetNumA = () => numA = "";
const resetNumB = () => numB = "";
const resetOperator = () => operator = "";

const resetAll = () => {
    resetScreenA();
    resetScreenB();
    resetNumA();
    resetNumB();
    resetOperator();
};

const replaceInitialZero = () => {
    if (screenB.innerHTML === "0") screenB.innerHTML = "";
};

const deleteLastEntry = () => {
    if (screenB.innerHTML === "0") return;
    screenB.innerHTML = screenB.innerHTML.slice(0, -1);
    if (!screenB.innerHTML) screenB.innerHTML = "0";
};

const deleteScreenAEntry = () => {
    if (screenB.innerHTML === "0") screenB.innerHTML = screenA.innerHTML;
    resetScreenA();
};

const toggleNegPos = () => {
    deleteError();
    const mathOperators = ["-", "+", "÷", "×"];
    if (mathOperators.some(mop => screenB.innerHTML === "0" + mop)) return;
    if (screenB.innerHTML === "0" || screenB.innerHTML === "-") return;
    
    screenB.innerHTML = screenB.innerHTML.startsWith("-")
        ? screenB.innerHTML.slice(1)
        : "-" + screenB.innerHTML;
};

const nonStackOperator = () => {
    return  screenB.innerHTML.endsWith("+") ||
            screenB.innerHTML.endsWith("-") ||
            screenB.innerHTML.endsWith("×") ||
            screenB.innerHTML.endsWith("÷");
};

const endsWithDot = () => screenB.innerHTML.endsWith(".");
const containsDecimalpoint = () => screenB.innerHTML.includes(".");
const updateScreenA = () => screenA.innerHTML = screenB.innerHTML;

const deleteUnusedOperator = () => {
    if (screenA.innerHTML === "") {
        if (nonStackOperator() || endsWithDot()) deleteLastEntry();
    };
};

// Error Handling

const errorMessage = "ERROR";
const sizeErrorMessage = "Num Too Big!";
const divideByZeroErrorMessage = "Can't ÷ by 0";
const maxStringLength = "12";

const throwSizeError = () => {
    if (screenB.innerHTML.length > maxStringLength) {
        screenB.innerHTML = sizeErrorMessage;
    };
};

const divideByZeroError = () => {
    screenA.innerHTML = errorMessage;
    screenB.innerHTML = divideByZeroErrorMessage;
};

const deleteError = () => {
    if (screenA.innerHTML === errorMessage) {
        resetAll();
        return;
    };
};

const checkSizeError = () => screenB.innerHTML === sizeErrorMessage;
const checkDivideByZero = () => screenA.innerHTML.includes("÷") && (screenB.innerHTML === "0" ||
                                                                    screenB.innerHTML === "0.");

// Switch Case functions

const deleteLatestInput = () => {
    if (screenA.innerHTML === errorMessage) {
        resetAll();
        return;
    };
    deleteScreenAEntry();
    deleteLastEntry();
};

const handleOperators = (buttonText) => {
    if (checkDivideByZero()) {
        divideByZeroError();
        return;
    };
    deleteError();
    if (checkSizeError()) {
        resetScreenB();
    } else if (nonStackOperator()) {
        if (screenB.innerHTML.endsWith(buttonText)) return;
        screenB.innerHTML = screenB.innerHTML.slice(0, -1) + buttonText;
    } else {
        getNums();
        getOperator();
        if (operateChecklist()) {
            sum = operate(numA, numB, operator);
            resetAll();
            screenB.innerHTML = sum;
        };
        screenB.innerHTML += buttonText;
        throwSizeError();
    };
};

const handleDecimals = (buttonText) => {
    deleteError();
    if (endsWithDot() || containsDecimalpoint()) return;
    screenB.innerHTML += buttonText;
};

const handleEquals = () => {
    if (checkDivideByZero()) {
        divideByZeroError();
        return;
    };
    deleteUnusedOperator();
    getNums();
    getOperator();
    if (operateChecklist()) {
        sum = operate(numA, numB, operator);
        resetAll();
        if (sum.toString().includes(".")) {
        screenB.innerHTML = parseFloat(sum.toFixed(3));
        } else {
            screenB.innerHTML = sum;
        };
        throwSizeError();
    };
};

const handleNumbers = (buttonText) => {
    deleteError();
    if (checkSizeError()) {
        resetScreenB();
        return;
    };
    if (nonStackOperator()) {
        updateScreenA();
        resetScreenB();
        replaceInitialZero();
        screenB.innerHTML += buttonText;
    } else {
        replaceInitialZero();
        screenB.innerHTML += buttonText;
        throwSizeError();
    };
};