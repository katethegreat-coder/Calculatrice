/* Variables */
const screenElt = document.querySelector("#screen");
let previous = 0;
let display = "";
let operation = null;
let save;

window.onload = () => {
    
    // Select all span items 
    let theKeys = document.querySelectorAll("span");

    // Listen events clicks on keys and launch function
    for(let theKey of theKeys){
        theKey.addEventListener("click", manageKeys);
    }

    // Listen events keys on keyboard and launch function
    document.addEventListener("keydown", manageKeys);
    

    // Get saved data from localstorage
    save = (localStorage.save) ? parseFloat(localStorage.save) : 0;


}

function manageKeys(event){
    let theKey;

    // List of keys
    const keyList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];

    // Check if there is a keydown event
    if(event.type === "keydown"){

        // Check if the pressed key is in the list
        if(keyList.includes(event.key)){
            event.preventDefault();
            // Allocate the chosen key the key variable
            theKey = event.key;
        }

    }else{
        // Clicked key
        theKey = this.innerText;
    }

    // Check if this is a number or a .
    if(parseFloat(theKey) >= 0 || theKey === "."){
      
        display = (display === "") ? theKey.toString() : display + theKey.toString();

        // Update the display
        screenElt.innerText = display;

    }else{
        switch(theKey){
            // key C clear everything
            case "C":
            case "Escape":
                previous = 0;
                display = "";
                operation = null
                screenElt.innerText = 0;
                break;

            // Calculation
            case "+":
            case "-":
            case "*":
            case "/":
                // Calculate the result from previous step
                previous = (previous === 0) ?parseFloat(display) : calculate(previous, parseFloat(display), operation);
            
                // Update the screen
                screenElt.innerText = previous;

                // Save the operation
                operation = theKey;

                // Reinitialize the display
                display = "";
                break;

            case "=":
            case "Enter":
                // Calculate the result from previous step
                previous = (previous === 0) ? parseFloat(display) : calculate(previous, parseFloat(display), operation);

                // Update the screen
                screenElt.innerText = previous;

                // Save the result in display
                display = previous;

                //  Reinitialize the previous result
                previous = 0;
                break;
           
            default:
                break;
        }
    }
}

/**
 * Calculations
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */
function calculate(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}