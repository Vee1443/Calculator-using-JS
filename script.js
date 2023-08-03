class Calculator {
    constructor(prevOpTxtEle, curOpTxtEle) {
        this.prevOpTxtEle = prevOpTxtEle;
        this.curOpTxtEle = curOpTxtEle;
        this.clear();
    }

    /*
    Defines a Calculator class with a constructor that takes two HTML elements as parameters: prevOpTxtEle (for displaying the previous operand) and curOpTxtEle (for displaying the current operand). Initializes the calculator by calling the clear() method.
    */

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /*
    Resets the calculator's current operand, previous operand, and operation to their initial values.
    */

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /*
    Removes the last character from the current operand string.
    */

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /*
    Adds the specified number to the current operand and ensures that a decimal point is added only if it's not already present.
    */

    chooseOperation(operation) {
        if (this.currentOperand === ''){
            return;
        }
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /*
    Sets the chosen operation, computes the result if a previous operand exists, and prepares for the next input.
    */

    compute() {
        let answer;
        const num1 = parseFloat(this.previousOperand);
        const num2 = parseFloat(this.currentOperand);
    
        if (isNaN(num1) || isNaN(num2)){
            return;
        }
    
        switch (this.operation){
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                answer = num1 / num2;
                break;
            default:
                return;
        }
        this.currentOperand = answer;
        this.operation = undefined;
        this.previousOperand = "";
    }

    /*
    Performs the arithmetic computation based on the selected operation.
    */

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { 
                maximumFractionDigits: 0 
            });
        }
        
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
        } else {
        return integerDisplay;
        }
    }

    /*
    Formats a number for display on the calculator interface.
    */

    updateDisplay() {
        this.curOpTxtEle.innerText = this.getDisplayNumber(this.currentOperand);
    
        if (this.operation != null) {
            this.prevOpTxtEle.innerText =`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.prevOpTxtEle.innerText = '';
        }
    }

    /*
    Updates the text content of the previous and current operand display elements.
    */

}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpTxtEle = document.querySelector('[data-previous-operand]');
const curOpTxtEle = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOpTxtEle, curOpTxtEle);

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

/*
Event listeners are added to the calculator buttons to handle button clicks. When buttons are clicked, they trigger the corresponding methods in the Calculator class and update the display.
*/

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;

    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay();
    }

    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay();
    }

    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay();
    }

    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay();
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay();
    }

    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay();
    }
});

/*
An event listener is added to the entire document to capture keyboard input. Depending on the key pressed, the corresponding methods in the Calculator class are called, and the display is updated.
*/