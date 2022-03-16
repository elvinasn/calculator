const container = document.querySelector(".container");
const equation = document.querySelector(".container__top-equation");
const result = document.querySelector(".container__top-answer");
let first = "";
let second = "";
let operator = "";
let lastClicked = "";

let isOper;
let isNum;
let isFun;

container.addEventListener('click', (e) => {;
    if(e.target.classList.contains("container__button")){
        if(e.target.textContent === "=" && lastClicked === "="){
            return;
        }
        isOper = false;
        isNum = false;
        isFun = false;
        if(e.target.classList.contains("oper")){
            isOper = true;
        } else if( e.target.classList.contains("num")){
            isNum = true;
        } else{
            isFun = true;
        }

        if(result.textContent !== ""){
            if(isOper){
                first = result.textContent;
                second = "";
                operator = "";
                equation.textContent = first;
            }
            else{
                restart();
            }
            result.textContent = "";
        }

        if(!isFun){
            if(!(isOper && first === "")){
                equation.textContent += e.target.textContent;
                if(equation.textContent.length > 23){
                    restart();
                    return;
                }
                if(isOper){
                    if(isOperator(lastClicked)){
                        operator = e.target.textContent;
                        equation.textContent = first + operator;
                    }
                    else{
                        if(operator == ""){
                            operator = e.target.textContent;
                        }
                        else{
                            first = operate(first, second, operator);
                            operator = e.target.textContent;
                            second = "";
                            equation.textContent = first + operator;
                        }
                    }     
                }
                else{
                    if(operator ==""){
                        first += e.target.textContent;
                    }
                    else{
                        second += e.target.textContent;
                    }
                }
       } 
        }
        else{
            if(e.target.textContent === "C"){
                restart();
            }
            else if(e.target.textContent === "+/-"){
                if(second !== ""){
                    second = "-" + second;
                    equation.textContent = first + operator + second;
                }
                else if(operator !== ""){
                    ;
                }
                else if(first !== ""){
                    first = "-" + first;
                    equation.textContent = first;
                }
            }
            else if(e.target.textContent === "DEL"){
                equation.textContent = equation.textContent.substring(0, equation.textContent.length - 1);
                if(second !== ""){
                    second = second.substring(0, second.length - 1);
                }
                else if(operator!== ""){
                    operator = "";
                }
                else{
                    first = first.substring(0, first.length - 1);
                }
            }
            else if(e.target.textContent ==="="){
                if(result.textContent === ""){
                    if(first !== "" && second !== "" && operator !== ""){
                        result.textContent = operate(first, second, operator);
                    }
                }
            }
        }
        lastClicked = e.target.textContent;
    }
});

function restart(){
    equation.textContent = "";
    first = "";
    second = "";
    operator = "";
    lastClicked = "";
    result.textContent = "";
}

function operate(a, b, operator){
    a = +a;
    b = +b;
    
    if(operator === '+'){
        return add(a, b);
    }
    else if(operator === '-'){
        return subtract(a, b)
    }
    else if(operator === '*'){
        return multiply(a, b)
    }
    else if(operator === '/'){
        return divide(a, b);
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0){
        return "ERROR";
    }
    return a / b;
}
function isOperator(a){
    return a == "-" || a == "+" || a == "/" || a == "*";
}