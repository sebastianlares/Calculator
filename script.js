const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('.operator');
const showLowerDisplay = document.querySelector('.downDisplay');
const outcome = document.querySelector('.equal');
const reset = document.querySelector('.reset');
const deleteButton = document.querySelector('.delete');
const dotButton = document.querySelector('.dot');
const changeValue = document.querySelector('.changeValue');
const buttons = document.querySelectorAll('button.number, button.operator');

let clickedArray = [];
let clickedArrayTwo = [];
let check = false;
let checkTwo = false;
let operatorArray = [];

let firstNumber;
let secondNumber;
let operator;
let newNumber;
let resultArray = [];
let result;
let counter;
let checkThree = false;
let checkFour = false;

changeValue.addEventListener('click', () => {
    if (checkFour == false) {
        if (checkTwo == true) {
            checkFour = true;
            resultArray.unshift('-');
            newNumber = resultArray.join('');
            showLowerDisplay.textContent = newNumber;
        }
        else if (check == true) {
            checkFour = true;
            clickedArrayTwo.unshift('-');
            secondNumber = clickedArrayTwo.join('');
            showLowerDisplay.textContent = secondNumber;
        }
        else if (check == false) {
            checkFour = true;
            clickedArray.unshift('-');
            firstNumber = clickedArray.join('');
            showLowerDisplay.textContent = firstNumber;  
        }
    }
    else if (checkFour == true) {
        if (checkTwo == true) {
            let i = resultArray.join('');
            let o = i.split('');
            resultArray = o;
            resultArray.shift();
            console.log(resultArray);
            newNumber = resultArray.join('');
            showLowerDisplay.textContent = newNumber;
            checkFour = false;
        }
        else if (check == true) {
            checkFour = false;
            clickedArrayTwo.shift();
            secondNumber = clickedArrayTwo.join('');
            showLowerDisplay.textContent = secondNumber;
            console.log(clickedArrayTwo);
        }
        else if (check == false) {
            checkFour = false;
            clickedArray.shift();
            firstNumber = clickedArray.join('');
            showLowerDisplay.textContent = firstNumber;  
            console.log(clickedArray);
        }
    }
});

dotButton.addEventListener('click', () => {
    if (checkThree == false) {
        if (check == true) {
            checkThree = true;
            clickedArrayTwo.push('.');
            secondNumber = clickedArrayTwo.join('');
            showLowerDisplay.textContent = secondNumber;
        }
        else if (check == false) {
            checkThree = true;
            clickedArray.push('.');
            firstNumber = clickedArray.join('');
            showLowerDisplay.textContent = firstNumber;  
        }
    }
    checkLength();
});

reset.addEventListener('click', () => {
    resetCalculator();
    showLowerDisplay.textContent = firstNumber;
});

deleteButton.addEventListener('click', () => {
    if (checkTwo == true) {
        let k = newNumber.split('');
        k.pop();
        newNumber = k.join('');
        showLowerDisplay.textContent = newNumber;
    }
    else if (check == true) {
        clickedArrayTwo.pop();
        secondNumber = clickedArrayTwo.join('');
        showLowerDisplay.textContent = secondNumber;
    }
    else if (check == false) {
        
        clickedArray.pop();
        firstNumber = clickedArray.join('');
        showLowerDisplay.textContent = firstNumber;
    }
}); 

operatorButtons.forEach(el => {
    el.addEventListener('click', () => {
        counter = 0;
        if (check) {
            result = operateNumbers(operator, firstNumber, secondNumber);
            showLowerDisplay.textContent = result;
            clickedArray = [];
            clickedArrayTwo = [];
            operatorArray = [];
            resultArray.push(result);
            newNumber = resultArray.join('');
            firstNumber = newNumber;
            resultArray = [];
            operatorArray.push(el.value);
            operator = operatorArray.join('');
            checkThree = false;
        }
        else {
            check = true;
            operatorArray.push(el.value);
            operator = operatorArray.join('');
            checkThree = false;
        }
        checkLength();
    });
});

numberButtons.forEach(el => {
    el.addEventListener('click', () => {
        counter = 0;
        if (checkTwo == true) {
            if (check == true) {
                clickedArrayTwo.push(el.value);
                secondNumber = clickedArrayTwo.join('');
                showLowerDisplay.textContent = secondNumber;
                firstNumber = newNumber;
                resultArray = [];
            }
        }
        else {
            if (check == true) {
            clickedArrayTwo.push(el.value);
            secondNumber = clickedArrayTwo.join('');
            showLowerDisplay.textContent = secondNumber;
            }
            else {
                clickedArray.push(el.value);
                firstNumber = clickedArray.join('');
                showLowerDisplay.textContent = firstNumber;  
            }
        }
    checkLength();
    });
});

outcome.addEventListener('click', () => {
    if (counter >= 1) {
        showLowerDisplay.textContent = 0;
        resetCalculator();
    }
    
    if (firstNumber == undefined || secondNumber == undefined || operator == undefined)
    {
        showLowerDisplay.textContent = 0;
        resetCalculator();
    }
    else {
        result = operateNumbers(operator, firstNumber, secondNumber);
        showLowerDisplay.textContent = result;
        clickedArray = [];
        clickedArrayTwo = [];
        operatorArray = [];
        checkTwo = true;
        resultArray.push(result);
        newNumber = resultArray.join('');
        check = false;
        counter = 1;   
        checkThree = false;
    }
});

function addNumbers (one, two) {
    let h = one + two;
    if (h % 1 != 0) {
        let n = h.countDecimals();
        return h.toFixed(parseInt(n));
    } 
    return h;
}

function subtractNumbers (one, two) {
    let h = one - two;
    if ( h % 1 != 0) {
        let n = h.countDecimals();
        return h.toFixed(parseInt(n));
    }
    return h;
    
}

function multiplyNumbers (one, two) {
    let h = one * two;
    if ( h % 1!= 0) {
        return h.toFixed(parseInt(h.countDecimals()));
    }
    return h;
}

function divideNumbers ( one, two) {
    let h = one / two;
    if (h % 1 != 0) {
        return h.toFixed(parseInt(size(one, two).countDecimals()));
    }
    return h;
}

function operateNumbers (operator, one, two) {
    one = parseFloat(one);
    two = parseFloat(two);
    if (operator == undefined) {
        return showLowerDisplay.textContent = 'Error';
        ;
    }
    else if (operator === '+') {
        return addNumbers(one, two);
    } 
    else if (operator == '-') {
        return subtractNumbers(one, two);
    }
    else if (operator === '*' ) {
        return multiplyNumbers(one, two);
    }
    else if (operator == '/') {
        return divideNumbers(one, two);
    }
}

function checkLength () {
    if (clickedArray.length > 14 || clickedArrayTwo.length > 14 || operatorArray.length > 14) {
        clickedArray.length = 14;
        clickedArrayTwo.length = 14;
        operatorArray.length = 14;
    }
}

function resetCalculator () {
    clickedArray = [];
    clickedArrayTwo = [];
    check = false;
    checkTwo = false;
    operatorArray = [];
    firstNumber = 0;
    secondNumber = undefined;
    operator = undefined;
    newNumber = 0;
    resultArray = [];
    result = 0;
    counter = 0;
    checkThree = false;
    checkFour = false;
}

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function size (one, two) {
    if (one > two) {
        return one;
    }
    else return two;
}

function findOperator () {
    return '-';
}