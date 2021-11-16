let runningtotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonclick(value){
    if(isNaN(value)){//not number case
        handleSymbol(value);
    }else{
        //number case
        handleNumber(value);
    }
    
    //writing to screen
    screen.innerText = buffer;
}
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = "0";
            runningtotal = 0;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }else if(buffer.includes("−") || buffer.includes("-")){
                buffer = "0";
            }else{
                console.log("buffer type ", typeof buffer);
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "−":
        case "÷":
        case "×":
            handleMath(symbol);
            break;
        case "=":
            if(previousOperator === null){
                //need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningtotal.toString(10);
            runningtotal = 0;
            break;
    }
}
function handleMath(symbol){
    if(buffer === "0"){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningtotal === 0){
        runningtotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}
function flushOperation(intbuffer){
    if(previousOperator === "+"){
        runningtotal += intbuffer;
    }else if(previousOperator === "−"){
        runningtotal -= intbuffer;
    }else if(previousOperator === "×"){
        runningtotal *= intbuffer;
    }else{
        runningtotal /= intbuffer;
    }
    
}
function handleNumber(numberstring){
    if(buffer === "0"){
        buffer = numberstring;
    }else{
        buffer += numberstring;
    }
}
function changeButtonColor(colorString){
    const buttons = document.getElementsByClassName('calc-button');
    for(let i = 0 ; i < buttons.length; i++){
            if(!buttons[i].classList.contains("operator")){
                buttons[i].style.background = colorString;
            }
    }
}
function changeOperatorButtonColor(colorString){
    const buttons = document.getElementsByClassName('calc-button');
    for(let i = 0 ; i < buttons.length; i++){
            if(buttons[i].classList.contains("operator")){
                buttons[i].style.background = colorString;
            }
    }
}
function changeTextColor(colorString){
    const allItemswithText = document.getElementsByClassName('calc-button');
    for(let i = 0; i < allItemswithText.length;i++){
        allItemswithText[i].style.color = colorString;
    }
    screen.style.color = colorString;
}
function changeScreenBackground(colorString){
    screen.style.background = colorString;
}
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
           buttonclick(event.target.innerText); 
        }
    );
    const fields = document.getElementsByTagName('input');

    fields[0].addEventListener('focusout', function(event){
        changeButtonColor(event.target.value);
    });
    fields[1].addEventListener('focusout', function(event){
        changeOperatorButtonColor(event.target.value);
    });
    fields[2].addEventListener('focusout',function(event){
        changeTextColor(event.target.value);
    });
    fields[3].addEventListener('focusout', function(event){
        changeScreenBackground(event.target.value);
    })
}
//calls init function
init();