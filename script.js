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





// switch (button.innerHTML) {
//     case "c":
//         screenB.innerHTML = "0";
//         break;
//     case "del":
//         if (screenB.innerHTML !== "0" && screenB.innerHTML) {
//             screenB.innerHTML = screenB.innerHTML.slice(0, -1);
//         };
//         if (!screenB.innerHTML) {
//             screenB.innerHTML = "0";
//         };
//         if (screenB.innerHTML === "-") screenB.innerHTML = "0";
//         break;
//     case "±":
//         if (screenB.innerHTML === "0") return;
//         if (!screenB.innerHTML.startsWith("-")) {
//             replaceInitialZero();
//             screenB.innerHTML = "-" + screenB.innerHTML;
//         } else {
//             replaceInitialZero();
//             screenB.innerHTML = screenB.innerHTML.slice(1);
//         };
//         if (!screenB.innerHTML) {
//             screenB.innerHTML = "0";
//         };
//         break;
//     case "÷":
//         divide(numA, numB);
//         break;
//     default:
//         replaceInitialZero();
//         screenB.innerHTML += button.innerHTML;
//         break;
// }