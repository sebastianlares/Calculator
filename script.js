const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('.operator');
const showLowerDisplay = document.querySelector('.downDisplay');
const outcome = document.querySelector('.equal');
const reset = document.querySelector('.reset');
const deleteButton = document.querySelector('.delete');
const dotButton = document.querySelector('.dot');

showLowerDisplay.textContent = 0;

let firstNumberArray = [];
let secondNumberArray = [];
let check = false;
let checkOperator;
let firstNumber;
let secondNumber;
let operator;
let h;
let outcomeChecker = false;
let dotOnNumber = false;
let valueChecker = false;
let testChecker = false;
let result;
let dotOnNumberTwo = false;
let checkDelete = false;

numberButtons.forEach(el => {
    el.addEventListener('click', addNumberToArray)
});

operatorButtons.forEach(el => {
    el.addEventListener('click', () => {
        addOperatorToArray(event);
        dotOnNumber = false;
    })
});

deleteButton.addEventListener('click', deleteCurrentTarget);

outcome.addEventListener('click', () => {
    if (outcomeChecker == false) {
        makeCalculation(operator);
        result = firstNumber;
        resetCalculator();
        showLowerDisplay.textContent = result;
        firstNumber = result;
        outcomeChecker = true;
        console.log(typeof(result));
        checkDelete = true;
    }
    else {
        resetCalculator();
        outcomeChecker = false;
    }
});

reset.addEventListener('click', resetCalculatorTwo);

dotButton.addEventListener('click', pushDotToNumber);

function addNumberToArray (event) {
    let button = event.target;
    if (check == false) {
        firstNumberArray.push(button.value);
        firstNumber = firstNumberArray.join('');
        showLowerDisplay.textContent = firstNumber;
    }
    else {
        secondNumberArray.push(button.value);
        secondNumber = secondNumberArray.join('');
        showLowerDisplay.textContent = secondNumber;
    }
    checkLength();
}

function addOperatorToArray (event) {
    if (check == false) {
        operator = event.target.value;
        check = true;
        outcomeChecker = false;
        
    }
    else {
        makeCalculation(operator);
        operator = event.target.value; 
        outcomeChecker = false;
        testChecker = true;
        
    }
}

function deleteCurrentTarget () {
    if (checkDelete == true) {
        let k = firstNumber.toString().split('');
        k.pop();
        firstNumber = k.join('');
        showLowerDisplay.textContent = firstNumber;
    }
    else if ( check == true) {
        secondNumberArray.pop();
        secondNumber = secondNumberArray.join('');
        showLowerDisplay.textContent = secondNumber;
    }
    else {
        firstNumberArray.pop();
        firstNumber = firstNumberArray.join('');
        showLowerDisplay.textContent = firstNumber;
    }
}

function makeCalculation (operator) {
    console.log(firstNumber, secondNumber);

    if (firstNumber == undefined) {
        check = false;
        numberButtons.forEach(el => {
            el.addEventListener('click', addNumberToArray)
        });
        return;
    }
    let one = parseFloat(firstNumber);
    let two = parseFloat(secondNumber);
        switch(operator) {
            case '+':
                addNumbers(one, two);
            break;
            case '-':
                subtractNumbers(one, two);
            break;
            case '*':
                multiplyNumbers(one, two);
            break;
            case '/':
                divideNumbers(one, two);
            break;
            default: 'Error';
        }
}
    
function resetCalculator () {              
    firstNumberArray = [];
    secondNumberArray = [];
    check = false;
    checkOperator = false;
    showLowerDisplay.textContent = firstNumber;
    firstNumber = 0;
    secondNumber = 0.0796856734;
    dotOnNumber = false;
    outcomeChecker = false;
}

function resetCalculatorTwo () {              
    firstNumberArray = [];
    secondNumberArray = [];
    check = false;
    checkOperator = false;
    showLowerDisplay.textContent = 0;
    firstNumber = undefined;
    secondNumber = undefined;
    dotOnNumber = false;
    outcomeChecker = false;
}

function pushDotToNumber () {
  
    if (dotOnNumber == false) {
        if (check == false) {
            dotOnNumber = true;
            firstNumberArray.push('.');
            firstNumber = firstNumberArray.join('');
            showLowerDisplay.textContent = firstNumber;
        }
        else if (check == true) {
            dotOnNumber = true;
            secondNumberArray.push('.');
            secondNumber = secondNumberArray.join('');
            showLowerDisplay.textContent = secondNumber; 
    
        }
    }
    checkLength();
}

function checkLength () {
    if (firstNumberArray.length > 13 || secondNumberArray.length > 13) {
        firstNumberArray.length = 13;
        secondNumberArray.length = 13;
    }
}

function addNumbers (one, two) {
    if (two == 0.0796856734) {
        two = 0;
    }
    h = one + two;
    if (h % 1 != 0) {
        h = h.toFixed(size(one, two));
    }
    secondNumberArray.length = 0; 
    firstNumber = h;
    secondNumber = 0;
    return showLowerDisplay.textContent = firstNumber;
}

function subtractNumbers (one, two) {
    if (two == 0.0796856734) {
        two = 0;
    }
    let h = one - two;
    if ( h % 1 != 0) {
        h = h.toFixed(size(one, two));
    }
    secondNumberArray = []; 
    firstNumber = h;
    secondNumber = 0;
    return showLowerDisplay.textContent = firstNumber;
}

function multiplyNumbers (one, two) {
    if (two == 0.0796856734) {
        two = 1;
    }
    let h = one * two;
    if ( h % 1!= 0) {
        h = h.toFixed(size(one, two));
    }
    secondNumberArray.length = []; 
    firstNumber = h;
    secondNumber = 1;
    return showLowerDisplay.textContent = firstNumber;
}

function divideNumbers (one, two) {
    if (two == 0.0796856734) {
        two = 1;
    }
    else if (two == undefined) {
        return;
    }
    else if (two == 0 && one == 0) {
        showLowerDisplay.textContent = 'Infinity';
        return resetCalculator();
    }
    else {
        let h = one / two;
        if ( h === 0) {
            showLowerDisplay.textContent = 'Error';
            return resetCalculator();
        }
        else if (h % 1 != 0) {
            h = h.toFixed(size(one, two));
        }
        secondNumberArray.length = []; 
        firstNumber = h;
        return showLowerDisplay.textContent = firstNumber;
    }
}

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function size (one, two) {
    if (one.countDecimals() > two.countDecimals()) {
        return one.countDecimals();
    }
    else return two.countDecimals();
}

function checkNumber (one) {
    if (one == undefined) {
        resetCalculator();
    }
}