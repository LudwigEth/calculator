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

    });
});

const replaceInitialZero = () => {
    if (bottomScreen.innerHTML === "0") {
        bottomScreen.innerHTML = "";
    };
};

const defaultDisplay = () => {
    bottomScreen.innerHTML = "0";
    topScreen.innerHTML = "";
}



// switch (button.innerHTML) {
//     case "c":
//         bottomScreen.innerHTML = "0";
//         break;
//     case "del":
//         if (bottomScreen.innerHTML !== "0" && bottomScreen.innerHTML) {
//             bottomScreen.innerHTML = bottomScreen.innerHTML.slice(0, -1);
//         };
//         if (!bottomScreen.innerHTML) {
//             bottomScreen.innerHTML = "0";
//         };
//         if (bottomScreen.innerHTML === "-") bottomScreen.innerHTML = "0";
//         break;
//     case "±":
//         if (bottomScreen.innerHTML === "0") return;
//         if (!bottomScreen.innerHTML.startsWith("-")) {
//             replaceInitialZero();
//             bottomScreen.innerHTML = "-" + bottomScreen.innerHTML;
//         } else {
//             replaceInitialZero();
//             bottomScreen.innerHTML = bottomScreen.innerHTML.slice(1);
//         };
//         if (!bottomScreen.innerHTML) {
//             bottomScreen.innerHTML = "0";
//         };
//         break;
//     case "÷":
//         divide(numA, numB);
//         break;
//     default:
//         replaceInitialZero();
//         bottomScreen.innerHTML += button.innerHTML;
//         break;
// }