let checkBoxs = document.getElementsByClassName("checkbox")
let copyBtn = document.querySelector("#copy-btn");
let passDisplay = document.querySelector("#password-display");
let copiedText = document.querySelector("#copied-text");
let passLength = document.querySelector("#password-length");
let slider = document.querySelector("#slider");
let upperCase  =document.querySelector("#Uppercase");
let lowerCase  =document.querySelector("#Lowercase");
let number  =document.querySelector("#Numbers");
let symbol  =document.querySelector("#Symbols");
let symbols = ["`","~","!","@","#","$","%","^","&","*","(",")","-","_","+","=","<",">",";",":"];
let passGenBtn = document.querySelector("#password-generate-btn")
let strength = document.querySelector("#strength")

let password ="";
start();
function start(){
    passDisplay.value = "";
    upperCase.checked=true;
    slider.value=10;
    passLength.textContent =10;
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }
  
function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    var n = arr.length;              // Length of the array
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = getRandomInt(n);       // Get random of [0, n-1]
      
      var temp = arr[i];             // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
  }


copyBtn.addEventListener("click",async function(){
    
    if(passDisplay.value.length>0){
    try {
        await navigator.clipboard.writeText(passDisplay.value);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
})

slider.addEventListener("input",function(e){
    passLength.textContent = e.target.value
})


function randomIndex( min, max){
    return index = Math.floor(Math.random()*(max-min)) + min;
}

function genNumber(){
    return randomIndex(0,10);
}

function genUpperCase(){
    return String.fromCharCode(randomIndex(65,91));
}

function genLowerCase(){
    return String.fromCharCode(randomIndex(98,123));
}

function genSymbol(){
    let index = randomIndex(0 , symbols.length);
    return symbols[index];
}


let checkCount =0;

function checkBoxCount(){
    checkCount=0;
for(let i=0 ; i<4 ; i++){
    if(checkBoxs[i].checked){
        checkCount++;
    }
}
}



passGenBtn.addEventListener("click" , function(){
    
    checkBoxCount();
    if(checkCount>2){
        strength.style.backgroundColor = "green";
    }
    else{
        strength.style.backgroundColor = "red";

    }

})


function genPassword(){
    console.log("Clicked")
    checkBoxCount();
    console.log(checkCount)
    passDisplay.value=''
    let passwordSize = parseInt(passLength.textContent);
    if(passLength.textContent<checkCount){
        passLength.textContent = checkCount;
        slider.value = checkCount;
    }

    //Pushing Functions into array to choose randomly any one function
    var fxn =[];
    if(upperCase.checked){
        fxn.push(genUpperCase);
    }

    if(lowerCase.checked){
        fxn.push(genLowerCase);
    }

    if(number.checked){
        fxn.push(genNumber);
    }

    if(symbol.checked){
        fxn.push(genSymbol);
    }

    //Creating Compulsory password as CheckBox 
    for(let i=0 ; i<fxn.length ; i++){
        password+= fxn[i]();
    }

    //Remaining Password(passwordSize - checkCount)

    for(let i=0 ; i<(passwordSize - checkCount) ;i++){
        let index = randomIndex(0,fxn.length);
        password+=fxn[index]();
    }
    password = shuffle(password);
    passDisplay.value =password;
    password = ""
}

passGenBtn.addEventListener("click" , genPassword);
