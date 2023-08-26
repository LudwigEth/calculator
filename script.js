const buttons = document.querySelectorAll("button");
const screenA = document.getElementById("top-screen");
const screenB = document.getElementById("bottom-screen");
let numA;
let numB;
let operator;


const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;


const operate = (numA, numB, operator) => {
    switch (operator) {
        case "+":
            return add(numA, numB);
            break;
        case "-":
            return substract(numA, numB);
            break;
        case "×":
            return multiply(numA, numB);
            break;
        case "÷":
            return divide(numA, numB);
            break;
    };
};

buttons.forEach(button => {
    button.addEventListener("click", function() {
        const buttonText = button.innerHTML;
        switch (buttonText) {
            case "c":
                resetScreens();
                break;
            case "del":
                deleteLastEntry();
                break;
            case "±":
                toggleNegPos();
                break;
            case "÷":
            case "×":
            case "-":
            case "+":
                if (nonStackOperator()) {
                    updateScreenA();
                    resetScreenB();
                } else {
                    screenB.innerHTML += buttonText;
                };
                break;
            case ".":
                if (decimalLogic()) {
                    return;
                } else {
                    screenB.innerHTML += buttonText;
                };
                break;
            case "=":
                deleteUnusedOperator();
                break;
            default:
                replaceInitialZero();
                if (nonStackOperator()) {
                    updateScreenA();
                    resetScreenB();
                    replaceInitialZero();
                };
                screenB.innerHTML += buttonText;
                break;
        };
    });
});

const replaceInitialZero = () => {
    if (screenB.innerHTML === "0") {
        screenB.innerHTML = "";
    };
};

const resetScreenA = () => screenA.innerHTML = "";
const resetScreenB = () => screenB.innerHTML = "0";

const resetScreens = () => {
    resetScreenA();
    resetScreenB();
};

const deleteLastEntry = () => {
    if (screenB.innerHTML === "0") return;
    screenB.innerHTML = screenB.innerHTML.slice(0, -1);
    if (!screenB.innerHTML) screenB.innerHTML = "0";
};

const toggleNegPos = () => {
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

const decimalLogic = () => screenB.innerHTML.endsWith(".");

const updateScreenA = () => screenA.innerHTML = screenB.innerHTML;

const deleteUnusedOperator = () => {
    if (screenA.innerHTML === "") {
        if (nonStackOperator() || decimalLogic()) deleteLastEntry();
    };
}