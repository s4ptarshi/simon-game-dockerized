var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$("#level-title").text("Press a key to start");


$(document).keydown(function (){
    if (!start){
        $("#level-title").text("Game started");
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});



function nextSequence(){
    level++;
    $("#level-title").text(`level ${level}`);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`.${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            },1000);
        }
    } else {
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, press any key to restart");
        gamePattern = [];
        level = 0;
        start = false;
    }
}
