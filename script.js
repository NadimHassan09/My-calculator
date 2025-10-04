//bright & dark mode switching logic
let brightMode=true;
const root = document.documentElement;
const toggleTheme = document.getElementById("toggle");
const circle = document.getElementById("circle");


function darkMode() {
      if(brightMode){
        root.style.setProperty("--bg-color", "#121212");      
        root.style.setProperty("--main-color", "#1E1E1E");    
        root.style.setProperty("--btn-color", "#2C2C2C");     
        root.style.setProperty("--equals-color", "#4CAF50");  
        root.style.setProperty("--secondry-color", "#3A7CA5"); 
        root.style.setProperty("--text-color", "#F5F5F6");
        toggleTheme.style.setProperty("border","none");
            circle.style.transform = "translateX(40px) scale(0.8)";

                brightMode = false;

        
      }
      else{
        root.style.setProperty("--bg-color", "#F5F5F6");      
        root.style.setProperty("--main-color", "#FAFAFA");    
        root.style.setProperty("--btn-color", "#EDEEEF");     
        root.style.setProperty("--equals-color", "#7EC6A1");  
        root.style.setProperty("--secondry-color", "#8FBEF2"); 
        root.style.setProperty("--text-color", "black");
        toggleTheme.style.setProperty("border","1px black solid");
        circle.style.transform = "translateX(0px) scale(0.8)";
        brightMode = true;

      }
    }
toggleTheme.addEventListener("click", darkMode);

//calc logic

//1-access DOM elements 

//numbers buttons
const num0 = document.getElementById("btn_0");
const num1 = document.getElementById("btn_1");
const num2 = document.getElementById("btn_2");
const num3 = document.getElementById("btn_3");
const num4 = document.getElementById("btn_4");
const num5 = document.getElementById("btn_5");
const num6 = document.getElementById("btn_6");
const num7 = document.getElementById("btn_7");
const num8 = document.getElementById("btn_8");
const num9 = document.getElementById("btn_9");
const dot = document.getElementById("btn_dot");


//opeerations buttons
const equals = document.getElementById("btn_equals");
const minus = document.getElementById("btn_minus");
const plus = document.getElementById("btn_plus");
const percent = document.getElementById("btn_percentage");
const multiply = document.getElementById("btn_times");
const divide = document.getElementById("btn_divided");
const clear = document.getElementById("btn_C");

//screen 
const screen = document.getElementById("screen");
const screenNum1 = document.getElementById("screenNum1");
function updateScreen(number){
  screen.innerText = number;
}
function updateScreen1(numberAndOperator){
  screenNum1.innerText = numberAndOperator;
}
// 2- taking input from user

let number = "";
let numberAndOperator = "";
let operatorCheck = false;
let equalCheck = false;
let result = 0.0;

function appendNumber(num){
 if(!equalCheck){
   number += num;
   console.log(number);// call update screen
   updateScreen(number);
 }
 else{
   clearfn();
   number += num;
   console.log(number);// call update screen
   updateScreen(number);
   equalCheck =false;
 }
}


document.querySelectorAll(".number").forEach(btn =>{ btn.addEventListener("click", () => {appendNumber(btn.innerText)})});

function appendDot(dot){
  if(parseFloat(number)==parseInt(number)){
    number += dot;
    console.log(number);
    updateScreen(number);
  }
}

document.querySelectorAll(".dot").forEach(btn =>{ btn.addEventListener("click", () => {appendDot(btn.innerText)})});

function operator(operator){

  if(!operatorCheck){
    number == "" ?number="0":number=number;
    numberAndOperator += number; 
    numberAndOperator += operator; 
    operatorCheck= true;
    equalCheck=false;
    number = "";
    console.log(numberAndOperator);
    updateScreen(0);
    updateScreen1(numberAndOperator);
  }
}

document.querySelectorAll(".operator").forEach(operatorbtn =>{ operatorbtn.addEventListener("click", () => {operator(operatorbtn.innerText)})});

function clearfn(){
  number = "";
  numberAndOperator = "";
  operatorCheck = false;
  updateScreen(0);
  updateScreen1(numberAndOperator);
}
document.querySelectorAll(".clear").forEach(clearbtn =>{ clearbtn.addEventListener("click", () => {clearfn()})});

function equalfn(){
  number == "" ? number = "0":number=number;
  if(numberAndOperator !== ""){
    operatorCheck = false;
    switch(numberAndOperator[numberAndOperator.length-1]){
      case "+" :return parseFloat(numberAndOperator) + parseFloat(number);
      case "-" :return parseFloat(numberAndOperator) - parseFloat(number);
      case "*" :return parseFloat(numberAndOperator) * parseFloat(number);
      case "/" :return parseFloat(numberAndOperator) / parseFloat(number);
    }
  }
}
document.querySelectorAll(".equals").forEach(equalsbtn =>{ equalsbtn.addEventListener("click", () => {result=equalfn(); number=result.toString(); numberAndOperator=""; updateScreen(number); updateScreen1(numberAndOperator); equalCheck=true;})});

function percentfn(){
  if(number !== ""){
    number = parseFloat(number)/100;
    number = number.toString();
    updateScreen(number);
  }
}

document.querySelectorAll(".percent").forEach(percentbtn =>{ percentbtn.addEventListener("click", () => {percentfn()})});

//handle keyboard entry

document.querySelectorAll(".number").forEach(btn =>{ btn.addEventListener("keydown", (event) => {appendNumber(btn.innerText)})});
//