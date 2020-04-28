window.onload = function (){
    calculator();
}
    
function calculator(){
   /******************Variables******************/
    let calculationString = "";
    
    const btn = document.querySelectorAll(".btn");
    const displayStr = document.getElementById('num-string');
    const displayV = document.getElementById('num-entered');
   
    let sym = false;
    let dot = false;
    let display = false;
 /***************************************************/
    btn.forEach( el => {
        el.addEventListener('click', e => {  

            switch(e.target.textContent){

                case "=":
                    let v = calculate(calculationString);
                    v = (v % 1) > 0 ? Number.parseFloat(v).toFixed(2) : v;  
                    displayV.textContent = v;
                    display = false;
                break;

                case "AC":
                    calculationString = "";
                    displayStr.textContent = "";
                    displayV.textContent = "";
                    sym = false;
                    dot = false;
                    display = false;
                break;

                case "DEL":    
                    if(!isNaN(calculationString.charAt(calculationString.length - 1))){
                        calculationString = calculationString.substring(0, calculationString.length - 1);
                        displayStr.textContent = calculationString;
                        displayV.textContent = calculationString.charAt(calculationString.length - 1);
                        display = false; 
                        
                    }else if(isNaN(calculationString.charAt(calculationString.length - 1))){
                        calculationString = calculationString.substring(0, calculationString.length - 2);
                        displayStr.textContent = calculationString;
                        displayV.textContent = calculationString.charAt(calculationString.length - 1); 
                        display = false; 
                    }
                break;

                default:

                 if(!isNaN(e.target.textContent)){
                    calculationString += e.target.textContent;
                    sym = false;
                    display = true;
                 }
                 else if( e.target.textContent == "." && dot == false){

                    dot = true;
                    calculationString += e.target.textContent;
                    display = true;
                 }
                 else if(sym == false && isNaN(e.target.textContent) && e.target.textContent != "."){

                    sym = true;
                    calculationString += ` ${e.target.textContent} `;
                    dot = false;
                    display = true;

                 }
                 else{
                     display = false;
                 }

                break;
            }

            if(display){
                displayStr.textContent = calculationString;
                displayV.textContent = e.target.textContent; 
            }


        });
    });

}


function calculate(calStr){
   
    var cal = 0;
    var calArr = calStr.split(' ');
         
    for(var i = 0; i <= calArr.length; i++){

        if(calArr[i] == "*"){
         cal = operate(calArr[i-1],calArr[i+1],calArr[i]);
         calArr.splice((i-1),3,cal)
         i = i-1;
              
        }
        else if(calArr[i] == "/"){
            cal = operate(calArr[i-1],calArr[i+1],calArr[i]);
            calArr.splice((i-1),3,cal)
             i = i-1;   
        }

    }
  
    for(var x = 0; x <= calArr.length; x++){
      
        if(calArr[x] == "+"){
             cal = operate(calArr[x-1],calArr[x+1],calArr[x]);
             calArr.splice((x-1),3,cal)
             x = x-1;   
          
        }
        else if(calArr[x] == "-"){
            cal = operate(calArr[x-1],calArr[x+1],calArr[x]);
            calArr.splice((x-1),3,cal)
            x = x-1;
        }
    }

    return calArr[0];
}


/*Calls the right calculation */
function operate(num1,num2,sign){
    switch(sign) {
        case '+':
          return add(num1,num2);
          break;
        case '-':
           return subtract(num1,num2);
          break;
        case '/':
          return divide(num1,num2);
          break;
        case '*':
           return multiply(num1,num2);
          break;
        default:
          console.log('err undefined symbol');
      }

};


/*calculations*/ 
function add(a,b){
    return parseFloat(a) + parseFloat(b);
};
  
function subtract(a,b){
      return parseFloat(a) - parseFloat(b);
  };
  
function multiply(a,b){
      return parseFloat(a) * parseFloat(b);
  };
  
function divide(a,b){
      return parseFloat(a) / parseFloat(b);
  };
  

