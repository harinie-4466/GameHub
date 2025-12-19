var sequence1 = []; //store blink sequence
var sequence2 = []; //store user sequence


//generate a random number 1 to 4
function getRandomNumber() {
    return Math.floor(Math.random() * 4) + 1;
}


//fn to blink button
function changeColorForOneSec(opt) {
    var button = document.getElementById(opt);
    //add a class named "a" to the button with the id "a"
    button.classList.add(opt); 
    setTimeout(function() {
        button.classList.remove(opt);
    }, 1000);
}


function blink() {
    
    var i = 0;
    function nextIteration() {
        i++;
        var rand = getRandomNumber();
       
        if (rand === 1) {
            changeColorForOneSec("a");
        } else if (rand === 2) {
            changeColorForOneSec("b");
        } else if (rand === 3) {
            changeColorForOneSec("c");
        } else if (rand === 4) {
            changeColorForOneSec("d");
        } 
        
        sequence1.push(rand);
        // Continue the loop 4 times
        if (i<=4) {
            setTimeout(nextIteration, 1500);
        }
        else{
            alert("click the buttons");
        }
    }
    //loop
    nextIteration();
}


 function user(n) {
    sequence2.push(n); // Record the button clicked by the user
    var p = 0; //flag
    if (sequence2.length == 4) {
        for (var j = 0; j < 4; j++) {
            // Compare each element of the sequences
            if (sequence1[j] !== sequence2[j]) {
                p = 1; 
            }
        }
        sequence1 = [];
        sequence2 = [];
        if (p == 0) {
            alert("You won");
        } else {
            alert("You lost");
        }
        
    }
}

