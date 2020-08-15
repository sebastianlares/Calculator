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
let fullArray = [];
let full;
let dontDelete = false;

numberButtons.forEach(el => {
    el.addEventListener('click', addNumberToArray)
});

operatorButtons.forEach(el => {
    el.addEventListener('click', () => {
        addOperatorToArray(event);
        dotOnNumber = false;
        console.log(check);
    })
});

deleteButton.addEventListener('click', deleteCurrentTarget);

outcome.addEventListener('click', () => {
    if (outcomeChecker == false) {
        console.log(firstNumber, secondNumber);
        makeCalculation(operator);
        result = firstNumber;
        resetCalculator();
        firstNumber = result;
        showLowerDisplay.textContent = firstNumber;
        console.log(firstNumber, firstNumberArray);
        outcomeChecker = true;
        checkDelete = true;
        check = false;
        console.log(secondNumberArray);
        console.log(result);
    }
    else {
        return;
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
    dontDelete = true;
    if (firstNumber == undefined) {
        return;
    }
    else if (secondNumber == undefined) {
        check = true;
        operator = event.target.value;
        numberButtons.forEach(el => {
            el.addEventListener('click', addNumberToArray)
        });
    }
    else if (check == false) {
        operator = event.target.value;
        check = true;
        outcomeChecker = false;
        
    }
    else {
        makeCalculation(operator);
        operator = event.target.value; 
        outcomeChecker = false;
    }
}

function deleteCurrentTarget () {
    if (checkDelete == true) {
        if (check == true) {
            if (dontDelete == false) {
                secondNumberArray.pop();
                secondNumber = secondNumberArray.join('');
                showLowerDisplay.textContent = secondNumber;
            }
            else {
                let k = firstNumber.toString().split('');
                if (result != undefined) {
                    let j = result.toString().split('');
                    j.pop();
                    result = j.join('');
                }
                k.pop();
                firstNumber = k.join('');
                showLowerDisplay.textContent = firstNumber;
            }
        }
        else {
            let k = firstNumber.toString().split('');
            if (result != undefined) {
                let j = result.toString().split('');
                j.pop();
                result = j.join('');
            }
            k.pop();
            firstNumber = k.join('');
            showLowerDisplay.textContent = firstNumber;
        }

    }
    else if ( check == true) {
        if (dontDelete == false) {
            secondNumberArray.pop();
            secondNumber = secondNumberArray.join('');
            showLowerDisplay.textContent = secondNumber;
        }
        else {
            let k = firstNumber.toString().split('');
            if (result != undefined) {
                let j = result.toString().split('');
                j.pop();
                result = j.join('');
            }
            k.pop();
            firstNumber = k.join('');
            showLowerDisplay.textContent = firstNumber;
        }
    }
    else {
        firstNumberArray.pop();
        firstNumber = firstNumberArray.join('');
        showLowerDisplay.textContent = firstNumber;
    }
}

function makeCalculation (operator) {
    if (firstNumber == undefined) {
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
        dontDelete = false;
}
    
function resetCalculator () {              
    firstNumberArray = [];
    secondNumberArray = [];
    check = false;
    checkOperator = false;
    showLowerDisplay.textContent = firstNumber;
    firstNumber = 0;
    secondNumber = 0.0796856733;
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
    secondNumber = 0.0796856733;
    dotOnNumber = false;
    outcomeChecker = false;
    result = undefined;
}

function pushDotToNumber () {
    
     if (dotOnNumber == false) {
        if (check == false) {
            if (result != undefined && result.toString().includes('.')) {
                return
            }
            dotOnNumber = true;
            if (result != undefined) {
                firstNumberArray = result.toString().split('');
            }
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
    if (two == 0.0796856733) {
        return;
    }
    h = one + two;
    if (h % 1 != 0) {
        h = h.toFixed(size(one, two));
    }
     
    firstNumber = h;
    secondNumber = 0.0796856733;
    secondNumberArray.length = [];
    return showLowerDisplay.textContent = firstNumber;
}

function subtractNumbers (one, two) {
    if (two == 0.0796856733) {
        return;
    }
    let h = one - two;
    if ( h % 1 != 0) {
        h = h.toFixed(size(one, two));
    }
    firstNumber = h;
    secondNumber = 0.0796856733;
    secondNumberArray = []; 
    return showLowerDisplay.textContent = firstNumber;
}

function multiplyNumbers (one, two) {
    if (two == 0.0796856733) {
        return;
    }
    let h = one * two;
    if ( h % 1!= 0) {
        h = h.toFixed(size(one, two));
    }
    secondNumberArray.length = []; 
    firstNumber = h;
    secondNumber = 0.0796856733;
    return showLowerDisplay.textContent = firstNumber;
}

function divideNumbers (one, two) {
    if (two == 0.0796856733) {
        return;
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
        secondNumber = 0.0796856733;
        firstNumber = h;
        return showLowerDisplay.textContent = firstNumber;
    }
}

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function size (one, two) {
    if (one.countDecimals() == 0 && two.countDecimals() == 0) {
        return one.toFixed(3);
    }
    else if (one.countDecimals() > two.countDecimals()) {
        return one.countDecimals();
    }
    else return two.countDecimals();
}

function checkNumber (one) {
    if (one == undefined) {
        resetCalculator();
    }
}
