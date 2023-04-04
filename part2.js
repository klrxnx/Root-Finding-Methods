//Global Variables
var f;
let userDef;
var a = 0;
var b = 0;
var n = 0;
var e = 0;
var intX = 0;
var intA = 0;
var intB = 0;
var intN = 0;
var intE = 0;
var tempE = 0;
var inputError = false;


//initialization of values
var iteration = 0;
var error = 1;
var c = 0;
var functionC = 0;
var functionD = 0;
var secFormula = 0;
var secFormulaMultiply = 0;
var secFormulaAnswer = 0;
var secantFunction = 0;
var computeError = 0;
var functionA = 0;
var functionB = 0;
var method = 'b';
var index = 0;


function ReadFunction(){
    console.log(f)
    const p = math.parser();
    p.evaluate(f);

    userDef = p.get('f');
}

//Input Error Check
function inputNumber(num){ 
    var ASCIICode = (num.which) ? num.which : num.keyCode
     if ((ASCIICode < 48 || (ASCIICode > 57)) && (ASCIICode != 46) && (ASCIICode != 45)){
        alert("Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
     }
}

//Input Error Check for Function
function inputNumber(num){ 
    var ASCIICode = (num.which) ? num.which : num.keyCode
     if ((ASCIICode < 48 || (ASCIICode > 57)) && (ASCIICode != 46) && (ASCIICode != 45)){
        alert("Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
     }
}

//Reload page when "clear" button is clicked
function Reload(){
    location.reload();
}


//Changing method
document.getElementById("change").onchange = Change;
function Change(){
    if(document.getElementById("change").selectedOptions[0].innerText == "Secant"){
        document.getElementById("textA").innerHTML = "X<sub>0</sub>";
        document.getElementById("textB").innerHTML = "X<sub>1</sub>";
        method = 's';
    }
    else{
        document.getElementById("textA").innerHTML = "a";
        document.getElementById("textB").innerHTML = "b";
        method = 'b';
    }
}
//Read Inputs
function ReadInputs(){
    //Get inputs
    f = document.getElementById("functioninput").value;
    a = document.getElementById("ainput").value;
    b = document.getElementById("binput").value;
    n = document.getElementById("iteration").value;
    e = document.getElementById("error").value;
}
//Convert Inputs to float
function Convert(){
    //Convert inputs to float
    intA = parseFloat(a);
    intB = parseFloat(b);
    intN = parseFloat(n);
    tempE = parseFloat(e);
}
//Calculate Error to be more accurate
function ErrorAccuracy(){
    //Make the value of error more accurate
    intE = (tempE * 10) / 10;
}
//Calculate function of a and b
function GetFunction(){
    //Determine if given function is positive or negative
    //To determine if we can calculate the root
    functionA = userDef(intA);
    functionB = userDef(intB);
}
//Check if input have unaccepted value
function CheckInputError(){
    inputError = false; 
    //Input error check when "calculate" is clicked
    if(document.getElementById("ainput").value.match(/^[A-Za-z]+$/)){
        alert("a: Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
        return;
    }
    if(document.getElementById("binput").value.match(/^[A-Za-z]+$/)){
        alert("b: Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
        return;
    }
    if(document.getElementById("iteration").value.match(/^[A-Za-z]+$/)){
        alert("iteration: Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
        return;
    }
    if(document.getElementById("error").value.match(/^[A-Za-z]+$/)){
        alert("error: Please Enter a valid input (numbers, negative sign(-), decimal point(.))");
        return;
    }

    //Prompt error when no Stop Condition is defined
    if(intN == 0 & tempE == 0){
        alert("FIll in all text fields. If using one condition, replace blank fields with 0.")
        inputError = true;
    }

    if(n.length == 0){
        alert("FIll in all text fields. If using one condition, replace blank fields with 0.")
        inputError = true;
    }

    if(e.length == 0){
        alert("FIll in all text fields. If using one condition, replace blank fields with 0.")
        inputError = true;
    }
}
//Bisection
function Bisection(){
    //Bisection Calculation
    var tempA = intA;
    var tempB = intB;
    var tempN = intN;
    var tempE = intE;
    var computeError = 0;
    error = 10;
    iteration = 0;

    for (let i = 1; i <= tempN; i++){
        if(error >= tempE){
            c = (tempA+tempB)/2;
            functionC = userDef(c);
            
            //Error computation
            computeError = (tempA * 10 - tempB * 10) / 10;
            error = math.abs(computeError);

            //Subtitution of Values
            if(functionC > 0){
                tempA = c
            }

            if(functionC < 0){
                tempB = c
            }
            if(functionC == 0){
                DisplayBisectionZero();
                ThisIs_a_StopFunction();
            }

            iteration++;
        }
        //Stop loop if error condition is met
        else{
            tempN = 0;
        }
    }
}
//Secant
function Secant(){
    //Secant calculation
    var tempA = intA;
    var tempB = intB;
    var tempN = intN;
    var tempE = intE;
    var computeError = 0;
    error = 10;
    iteration = 0;

    for (let i = 1; i <= tempN; i++){
        if(error >= tempE){
            functionC = userDef(tempA);
            functionD = userDef(tempB);
            
            //Xn+1 Formula
            secFormula = (tempB-tempA)/(functionD-functionC);
            secFormulaMultiply = (secFormula * functionD);
            secFormulaAnswer = (tempB - secFormulaMultiply);

            //Error Computation
            computeError = (secFormulaAnswer * 10 - tempB * 10) / 10;
            error = math.abs(computeError);

            //Subtitution of values
            tempA = intB;
            tempB = secFormulaAnswer;

            iteration++;
        }
        //Stop loop if error condition is met
        else{
            tempN = 0;
        }
    }
}


//Diplay Bisection
function DisplayBisection(){
    //Display output for bisection
    if(inputError){
        clearValues();
    }
    else{
        document.getElementById("valueC").innerHTML = "Cn = " + c;
        document.getElementById("outputFunction").innerHTML = "f(Cn) = " + functionC;
        document.getElementById("valueN").innerHTML = "Number of iteration(n): " + iteration;
        document.getElementById("valueE").innerHTML = "Error: " + error;
    }
}
function DisplayBisectionZero(){
    document.getElementById("valueC").innerHTML = "Cn = " + c;
    document.getElementById("outputFunction").innerHTML = "f(Cn) = " + functionC;
    document.getElementById("valueN").innerHTML = "Number of iteration(n): 1";
    document.getElementById("valueE").innerHTML = "Error: " + error;
}
//Display Secant
function DisplaySecant(){
    //Display output for Secant
    if(inputError){
        clearValues();
    }
    else{
        document.getElementById("valueC").innerHTML = "Cn = " + secFormulaAnswer;
        secantFunction = userDef(secFormulaAnswer);
        document.getElementById("outputFunction").innerHTML = "f(Cn) = " + secantFunction;
        document.getElementById("valueN").innerHTML = "Number of iteration(n): " + iteration;
        document.getElementById("valueE").innerHTML = "Error: " + error;
    }
}
//Output if the function a and/or b is 0 
function ZeroChecker(){
    if (functionA == 0){
        document.getElementById("valueC").innerHTML = "Cn = Root of Equation: " + intA;
        document.getElementById("outputFunction").innerHTML = "f(Cn) = Root of Equation: " + intA;
    }
    else{
        document.getElementById("valueC").innerHTML = "Cn = Root of Equation: " + intB;
        document.getElementById("outputFunction").innerHTML = "f(Cn) = Root of Equation: " + intB;
    }
}
//Output when same input
function sameInput(){
    document.getElementById("valueC").innerHTML = "Cn = Solution not possible";
    document.getElementById("outputFunction").innerHTML = "f(Cn) = Solution not possible";
}
//Output when there is no root
function NoRootChecker(){
    document.getElementById("valueC").innerHTML = "Cn = No Root";
    document.getElementById("outputFunction").innerHTML = "f(Cn) = No Root";
}

//clears all the values in fields
function Reset() {
    document.getElementById("functioninput").value = "f(x) = ";
    document.getElementById("ainput").value = "";
    document.getElementById("binput").value = "";
    document.getElementById("iteration").value = "0";
    document.getElementById("error").value = "0";
  }

 
  function clearValues() {
    document.getElementById("valueC").textContent = "Cn = ";
    document.getElementById("outputFunction").textContent = "f(Cn) = ";
    document.getElementById("valueN").textContent = "Number of iteration(n) : ";
    document.getElementById("valueE").textContent = "Error: ";
  }
  function Calculate() {
    // your calculation function code here
  }

  function inputNumber(event) {
    // your input validation code here
  }

//Fuction to calculate root when "calculate" button is clicked
function Calculate(){   
    ReadInputs();
    Convert();
    try{
        ReadFunction();
        CheckInputError();
        ErrorAccuracy();
        GetFunction();
    
    
        
    
        //set infinite iteration when only error is given
        if(intN == 0){
            intN = 10000;
        }
    
        //Check if there is a root or not
        if(functionA < 0 & functionB > 0 || functionA > 0 & functionB < 0){
            //Calculate Bisection
            if(method === 'b'){
                Bisection();
                DisplayBisection();
            }
            //Calculate Secant
            else{
                Secant();
                DisplaySecant();
            } 
        }       
        //output when same input
        else if (functionA == functionB){
            sameInput();
        }
        //output when function is 0
        else if (functionA == 0 || functionB == 0){
            ZeroChecker();
        }
        //output when no root
        else{
            NoRootChecker();
        }
    }catch{alert("Invalid Function\nPlease use the format below:\nf(x)=value(x)+x")}
   
}
