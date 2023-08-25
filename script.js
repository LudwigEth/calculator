const buttons = document.querySelectorAll("button");
const topScreen = document.getElementById("top-screen");
const bottomScreen = document.getElementById("bottom-screen");
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
            add(numA, numB);
            break;
        case "-":
            substract(numA, numB);
            break;
        case "×":
            multiply(numA, numB);
            break;
        case "+":
            divide(numA, numB);
            break;
    };
};

buttons.forEach(button => {
    button.addEventListener("click", function() {
        replaceZero();
        bottomScreen.innerHTML += button.innerHTML;
    })
});

const replaceInitialZero = () => {
    if (bottomScreen.innerHTML === "0") {
        bottomScreen.innerHTML = "";
    };
};