let firstNum, operatorValue, secondNum, result;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")
const evaluate = document.querySelector(".evaluate")
const clear = document.querySelector(".clear");
const toggleNegative = document.querySelector(".toggleNegative");
const decimal = document.querySelector(".decimal");
const decimalPoint = document.querySelector(".decimalPoint");

const displayedValue = (output) => {
    return display.textContent = output;
}

displayedValue(0);

function updateFormulaValues(firstValue, secondValue, operatorSign) {
    firstNum = firstValue;
    secondNum = secondValue;
    operatorValue = operatorSign;
    return { firstNum, secondNum, operatorValue };
}

const add = (num1, num2) => {
    result = num1 + num2;
    displayedValue(result);
    updateFormulaValues(result, undefined, undefined);
}

const subtract = (num1, num2) => {
    result = num1 - num2;
    displayedValue(result)
    updateFormulaValues(result, undefined, undefined);
}

const multiply = (num1, num2) => {
    result = num1 * num2;
    displayedValue(result)
    updateFormulaValues(result, undefined, undefined);
}

const divide = (num1, num2) => {
    if (num1 == 0 || num2 == 0) {
        displayedValue("Error!")
        return updateFormulaValues(0, undefined, undefined);
    }
    result = num1 / num2;
    displayedValue(result)
    updateFormulaValues(result, undefined, undefined);
}

function operate(num1, operator, num2) {
    firstNum = parseFloat(num1);
    secondNum = parseFloat(num2);
    switch (operator) {
        case "add":
            add(firstNum, secondNum);
            break;
        case "subtract":
            subtract(firstNum, secondNum);
            break;
        case "multiply":
            multiply(firstNum, secondNum);
            break;
        case "divide":
            divide(firstNum, secondNum);
            break;
    }
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent == 0) displayedValue("")
        if (operatorValue == undefined && firstNum == result) {
            displayedValue("")
            display.textContent += button.textContent
            operatorValue == undefined ? firstNum = display.textContent : secondNum = display.textContent;
        } else {
            display.textContent += button.textContent
            operatorValue != undefined ? secondNum = display.textContent : firstNum = display.textContent;
        }
    })
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operatorValue = button.value;
        displayedValue("")
    })
})

evaluate.addEventListener("click", () => {
    operate(firstNum, operatorValue, secondNum)
})

clear.addEventListener("click", () => {
    updateFormulaValues(0, undefined, undefined);
    result = undefined;
    displayedValue(firstNum)
})

toggleNegative.addEventListener("click", () => {
    if (display.textContent == 0) return displayedValue(0);
    if (display.textContent == secondNum && secondNum > 0) {
        secondNum = -secondNum;
        return displayedValue(secondNum)
    } else if (display.textContent == secondNum && secondNum < 0) {
        secondNum = Math.abs(secondNum);
        return displayedValue(secondNum)
    }
    if (display.textContent == firstNum && firstNum > 0) {
        firstNum = -firstNum;
        return displayedValue(firstNum)
    } else if (display.textContent == firstNum && firstNum < 0) {
        firstNum = Math.abs(firstNum);
        return displayedValue(firstNum)
    }
});

decimalPoint.addEventListener("click", () => {
    if (!display.textContent.includes(".")) display.textContent += decimalPoint.textContent
})

decimal.addEventListener("click", () => {
    if (display.textContent == firstNum) {
        firstNum *= 0.01;
        display.textContent = firstNum;
    } else if (display.textContent == secondNum) {
        secondNum *= 0.01;
        display.textContent = secondNum
    }
})
