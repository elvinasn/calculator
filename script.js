const container = document.querySelector(".container");
const equation = document.querySelector(".container__top-equation");
const result = document.querySelector(".container__top-answer");
let first = "";
let second = "";
let operator = "";
let lastClicked = "";
let clickedNow;

let isOper;
let isNum;
let isFun;
let normalKey;

container.addEventListener("clicfk", (e) => {
  if (e.target.classList.contains("container__button")) {
    isOper = false;
    isNum = false;
    isFun = false;
    if (e.target.classList.contains("oper")) {
      isOper = true;
    } else if (e.target.classList.contains("num")) {
      isNum = true;
    } else {
      isFun = true;
    }
    clickedNow = e.target.textContent;
    calculate(e);
  }
});

window.addEventListener("keydown", (e) => {
  isOper = false;
  isNum = false;
  isFun = false;
  normalKey = false;
  if ((0 <= e.key && e.key <= 9) || e.key == ".") {
    isNum = true;
    normalKey = true;
    clickedNow = e.key;
  } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    isOper = true;
    normalKey = true;
    clickedNow = e.key;
  } else if (e.key == "=" || e.key == "Backspace" || e.key == "Escape") {
    isFun = true;
    normalKey = true;
    switch (e.key) {
      case "=":
        clickedNow = e.key;
        break;
      case "Backspace":
        clickedNow = "DEL";
        break;
      case "Escape":
        clickedNow = "C";
        break;
      default:
        break;
    }
  }
  if (normalKey) {
    calculate(e);
  }
});

function calculate(e) {
  {
    if (clickedNow === "=" && lastClicked === "=") {
      return;
    }
    if (result.textContent !== "") {
      if (isOper) {
        first = result.textContent;
        second = "";
        operator = "";
        equation.textContent = first;
      } else {
        restart();
      }
      result.textContent = "";
    }

    if (!isFun) {
      if (!(isOper && first === "")) {
        equation.textContent += clickedNow;
        if (equation.textContent.length > 23) {
          restart();
          return;
        }
        if (isOper) {
          if (isOperator(lastClicked)) {
            operator = clickedNow;
            equation.textContent = first + operator;
          } else {
            if (operator == "") {
              operator = clickedNow;
            } else {
              first = operate(first, second, operator);
              operator = clickedNow;
              second = "";
              equation.textContent = first + operator;
            }
          }
        } else {
          if (operator == "") {
            first += clickedNow;
          } else {
            second += clickedNow;
          }
        }
      }
    } else {
      if (clickedNow === "C") {
        restart();
      } else if (clickedNow === "+/-") {
        if (second !== "") {
          if (second[0] != "-") {
            second = "-" + second;
          } else {
            second = second.substring(1);
          }
          equation.textContent = first + operator + second;
        } else if (operator !== "") {
        } else if (first !== "") {
          if (first[0] != "-") {
            first = "-" + first;
          } else {
            first = first.substring(1);
          }
          equation.textContent = first;
        }
      } else if (clickedNow === "DEL") {
        equation.textContent = equation.textContent.substring(
          0,
          equation.textContent.length - 1
        );
        if (second !== "") {
          second = second.substring(0, second.length - 1);
        } else if (operator !== "") {
          operator = "";
        } else {
          first = first.substring(0, first.length - 1);
        }
      } else if (clickedNow === "=") {
        if (result.textContent === "") {
          if (first !== "" && second !== "" && operator !== "") {
            result.textContent =
              Math.round(operate(first, second, operator) * 1000) / 1000;
          }
        }
      }
    }
    lastClicked = clickedNow;
  }
}

function restart() {
  equation.textContent = "";
  first = "";
  second = "";
  operator = "";
  lastClicked = "";
  result.textContent = "";
}

function operate(a, b, operator) {
  a = +a;
  b = +b;

  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    return "ERROR";
  }
  return a / b;
}
function isOperator(a) {
  return a == "-" || a == "+" || a == "/" || a == "*";
}
