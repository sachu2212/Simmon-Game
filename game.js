var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;
var started = false;
//var checks = true; //checking is equal to true.

$("body").keydown(function (event) {
    //checks = false;          //and making increment in level from 0 to 1 for the first time.

    if(event.which === 65) {   //if space will equal to its ascii code 32 then and only game will start.
        if (!started) {
            nextSequence();
            started = true;
        }
    }
});

//for (var i = 0; i < buttonColors.length; i++) {
$("div.btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    //console.log(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswers(userClickedPattern.length - 1);
});
//}

function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {          //checking for latest recent color on both gamePattern and userClickedPattern (ie. ButtonColor.length-1)
        console.log("success!");

        if (userClickedPattern.length === gamePattern.length) {       //After checking for recent color, we will also check both the length matches or not and then will call nextSequence function.
            setTimeout(function () {
                nextSequence();                                  
            }, 1000);
        }

    } else {
        console.log("oops, failed..");
        startOver();                    //if wrong then we will startOver the game (resetting..)
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press 'A' Key to Restart");
        }, 500);

        setTimeout(function () {
            alert("The Highest Level of your was: "+totalScore);
        }, 500);
    }
}

var totalScore;
function nextSequence() {
    userClickedPattern = [];           //after attempting one level, it will reset that particular level; eg. level 1 is cleared then ater going to level 2 it will reset the level 1 values.

    totalScore = level++;    // incrementing the level. 
    $("h1").text("Level " + level);        // updating the level in display portion. 

    var randomNumber = Math.floor(Math.random() * 4);

    randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //console.log(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name) {         // refactoring the code for function redundency.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {         // This piece of code is used for animation of pressing the square Boxes.
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    });
}

function startOver() {     
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

$("button.reset").on("click", function() {
    location.reload();
});