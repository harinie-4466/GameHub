var user_guess; // Declare global variables
var user_number;
var computer_number;


function disp_choice(id) {

    
    // Determine the new background image source based on the button clicked
    var imgSrc;
    

    if (id == 'a') {
        imgSrc = 'bg.jpeg';
        user_number=0;
    } else if (id == 'b') {
        imgSrc = 'bg.jpeg';
        user_number=1;
    } else if (id == 'c') {
        imgSrc = 'bg.jpeg';
        user_number=2;
    } else if (id == 'd') {
        imgSrc = 'bg.jpeg';
        user_number=3;
    } else if (id == 'e') {
        imgSrc = 'bg.jpeg';
        user_number=4;
    } else if (id == 'f') {
        imgSrc = 'bg.jpeg';
        user_number=5;
    }
    
    
    // Change the background image of the clicked button
    var button = document.getElementById(id);
    button.style.backgroundImage = "url('" + imgSrc + "')";
}

function cmp(){
    var rand = Math.floor(Math.random() * 6); // Generates numbers from 0 to 5
    computer_number=rand;
    if (rand==0){
        imgSrc = '0.png'
    }
else if (rand == 1) {
    imgSrc = '1.png';
} else if (rand == 2) {
    imgSrc = '2.png';
} else if (rand == 3) {
    imgSrc = '3.png';
} else if (rand == 4) {
    imgSrc = '4.png';
} else if (rand == 5) {
    imgSrc = '5.png';
}
var computerImage = document.getElementById('computerImage');

computerImage.onload = function() {
    sum(); // Invoke sum() function only after the image is loaded
};

computerImage.src = imgSrc;
}


function guess(id){
    user_guess=id;
    document.getElementById('oddButton').disabled = true;
    document.getElementById('evenButton').disabled = true;
}

function sum(){
    var result=computer_number+user_number;

    if (result%2==0){
        if (user_guess=='even'){
            alert("Your guess= "+user_guess+", sum= "+result+", you won ");
        }
        else{
            alert( "Your guess= "+user_guess+", sum= "+result+", you lost");
        }
    }
    else{
        if (user_guess=='odd'){
            alert("Your guess= "+user_guess+", sum= "+result+", you won");
        }
        else{
            alert("Your guess= "+user_guess+", sum= "+result+", you lost");
        }

    }
}


function restart() {

    user_guess = undefined;
    user_number = undefined;
    computer_number = undefined;

    var computerImage = document.getElementById('computerImage');
    computerImage.src = '';

    var buttons = document.querySelectorAll('.container1 button[id]');
    buttons.forEach(function(button) {
        var id = button.id;
        var ide;
        if (id === "a") {
            ide = '0';
        } else if (id === "b") {
            ide = '1';
        } else if (id === "c") {
            ide = '2';
        } else if (id === "d") {
            ide = '3';
        } else if (id === "e") {
            ide = '4';
        } else if (id === "f") {
            ide = '5';
        }
        var imgSrc = ide + '.png'; // Construct the image file name using the button id
        button.style.backgroundImage = "url('" + imgSrc + "')";
        button.style.backgroundSize = "cover";
    });

    document.getElementById('oddButton').disabled = false;
    document.getElementById('evenButton').disabled = false;
    document.getElementById('numberButtons').querySelectorAll('button').forEach(function(button) {
        button.disabled = false;
    });
    document.getElementById('shootButton').disabled = true;
}