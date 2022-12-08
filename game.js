var gamesPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;
var success = true;
var count = 0;
var roundStarted = false;

function nextSequence() {
    roundStarted = true;
    count = 0;
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamesPattern.push(randomChosenColour);
    console.log(gamesPattern);
    playSound(randomChosenColour);
    animateFlash(randomChosenColour);
}



// START GAME and animate a flash
$(document).on("keypress", function() {
    if (level === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

// step 5

$(".btn").on("click", function() {
    if (roundStarted === true) {
        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
            
        if (count < level){
                checkAnswer(count);
        }

        count = count + 1;
    }
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateFlash(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    var activeButton = document.querySelector("." + currentColour);

    setTimeout(function() {
        activeButton.classList.add("pressed");
    }, 100)
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100)

}

function checkAnswer(currentLevel) {
    console.log(gamesPattern + " VS " + userClickedPattern);
    console.log(gamesPattern[currentLevel] + " VS " + userClickedPattern[currentLevel]);
    console.log(count + " and " + level);
    if (gamesPattern[currentLevel] != userClickedPattern[currentLevel]) {
        console.log("FAILED")
        success = false;

        playSound("wrong");

        setTimeout(function() {
            document.body.classList.add("game-over");
        }, 0)
        setTimeout(function() {
            document.querySelector("body").classList.remove("game-over");
        }, 200)

            restartGame();
    }


    else if ((success === true) && count === level -1) {
        console.log("SUCCESS");
        roundStarted = false;
        setTimeout(function() {
            nextSequence();
        }, 750)
    }

}

function restartGame(){
    console.log("RESTART");
    level = 0;
    gamesPattern = [];
    userClickedPattern = [];
    count = 0;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    roundStarted = false;
    success = true;
}