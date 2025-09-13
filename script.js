let brightMode=true;
const root = document.documentElement;
const toggleTheme = document.getElementById("toggle");
const circle = document.getElementById("circle");


function darkMode() {
      if(brightMode){
        root.style.setProperty("--bg-color", "#121212");      // خلفية أساسية
        root.style.setProperty("--main-color", "#1E1E1E");    // خلفية العناصر
        root.style.setProperty("--btn-color", "#2C2C2C");     // لون الأزرار
        root.style.setProperty("--equals-color", "#4CAF50");  // زر يساوي مميز
        root.style.setProperty("--secondry-color", "#3A7CA5"); // لون ثانوي
        // root.style.setProperty("--circle-color", "#F5F5F6");
        root.style.setProperty("--text-color", "#F5F5F6");
        toggleTheme.style.setProperty("border","none");
            circle.style.transform = "translateX(40px) scale(0.8)";

                brightMode = false;

        
      }
      else{
        root.style.setProperty("--bg-color", "#F5F5F6");      // خلفية أساسية
        root.style.setProperty("--main-color", "#FAFAFA");    // خلفية العناصر
        root.style.setProperty("--btn-color", "#EDEEEF");     // لون الأزرار
        root.style.setProperty("--equals-color", "#7EC6A1");  // زر يساوي مميز
        root.style.setProperty("--secondry-color", "#8FBEF2"); // لون ثانوي
        root.style.setProperty("--text-color", "black");
        toggleTheme.style.setProperty("border","1px black solid");
            circle.style.transform = "translateX(0px) scale(0.8)";


                        brightMode = true;

      }
    }
toggleTheme.addEventListener("click", darkMode);

// calculator logic

// let btn_0 = document.getElementById("btn_0");
// let btn_1 = document.getElementById("btn_1");
// let btn_2 = document.getElementById("btn_2");
// let btn_3 = document.getElementById("btn_3");
// let btn_4 = document.getElementById("btn_4");
// let btn_5 = document.getElementById("btn_5");
// let btn_6 = document.getElementById("btn_6");
// let btn_7 = document.getElementById("btn_7");
// let btn_8 = document.getElementById("btn_8");
// let btn_9 = document.getElementById("btn_9");
// let btn_plus = document.getElementById("btn_plus");
// let btn_minus = document.getElementById("btn_minus");
// let btn_times = document.getElementById("btn_times");
// let btn_divided = document.getElementById("btn_divided");
// let btn_percentage = document.getElementById("btn_percentage");
// let btn_equals = document.getElementById("btn_equals");
// let btn_C = document.getElementById("btn_C");
// let btn_dot = document.getElementById("btn_dot");

let currentInput = "";      
let previousInput = "";    
let operator = null;   

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === "") return; 
    if (previousInput !== "") {
        compute(); // يحسب لو فيه عملية قديمة
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay(); // << هنا بقى
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = curr !== 0 ? prev / curr : "Error"; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay(); // << هنا كمان
}

function updateDisplay() {
    const display = document.querySelector(".display");

    if (operator !== null) {
        display.innerText = previousInput + " " + operator + " " + currentInput;
    } else if (currentInput !== "") {
        display.innerText = currentInput;
    } else {
        display.innerText = "0";
    }
}


function clearCalc() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function appendDot() {
    if (currentInput.includes(".")) return; // يمنع أكتر من نقطة
    if (currentInput === "") currentInput = "0"; // يبدأ بـ 0. لو فاضي
    currentInput += ".";
    updateDisplay();
}

function percentage() {
    if (currentInput === "") return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}


document.querySelector(".percent").addEventListener("click", percentage);


document.querySelector(".dot").addEventListener("click", appendDot);


document.querySelectorAll(".number").forEach(btn => {
    btn.addEventListener("click", () => appendNumber(btn.innerText));
});

document.querySelectorAll(".operator").forEach(btn => {
    btn.addEventListener("click", () => chooseOperator(btn.innerText));
});

document.querySelector(".equals").addEventListener("click", compute);
document.querySelector(".clear").addEventListener("click", clearCalc);


document.addEventListener("keydown", (event) => {
  const key = event.key;

  // لو الرقم
  if (!isNaN(key)) {
    appendNumber(key);
    updateDisplay();
  }

  // لو النقطة
  if (key === ".") {
    appendNumber(".");
    updateDisplay();
  }

  // لو العمليات
  if (["+", "-", "*", "/","%"].includes(key)) {
    chooseOperator(key);
  }

  // لو يساوي أو Enter
  if (key === "=" || key === "Enter") {
    compute();
    updateDisplay();
  }

  // لو Backspace → يمسح آخر رقم
  if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  // لو Escape → يمسح كله
  if (key === "Escape" || key === "c" || key === "C") {
    clearAll();
    updateDisplay();
  }
});
