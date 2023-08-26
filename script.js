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
            case ".":
                if (nonStackOperator()) {
                    return;
                } else {
                    screenB.innerHTML += buttonText;
                };
                break;
            default:
                replaceInitialZero();
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

const resetScreens = () => {
    screenB.innerHTML = "0";
    screenA.innerHTML = "";
};

const deleteLastEntry = () => {
    if (screenB.innerHTML === "0") return;
    screenB.innerHTML = screenB.innerHTML.slice(0, -1);
    if (!screenB.innerHTML) screenB.innerHTML = "0";
};

const toggleNegPos = () => {
    if (screenB.innerHTML === "0" || screenB.innerHTML === "-") return;
    screenB.innerHTML.startsWith("-") ?
        screenB.innerHTML = screenB.innerHTML.slice(1) :
        screenB.innerHTML = "-" + screenB.innerHTML;
};

const nonStackOperator = () => {
    if (screenB.innerHTML.endsWith("+") ||
        screenB.innerHTML.endsWith("-") ||
        screenB.innerHTML.endsWith("×") ||
        screenB.innerHTML.endsWith(".") ||
        screenB.innerHTML.endsWith("÷")) {
            return true;
        }
};