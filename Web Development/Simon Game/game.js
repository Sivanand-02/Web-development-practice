var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userAnswer;


$(document).keypress(function(){
    if(started === false){
        nextSequence();
        started = true;
        $("#level-title").text("Level "+level);
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    level = level + 1;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];
}


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    userAnswer = userClickedPattern.length - 1;
    checkAnswer(userAnswer);
    animatePress(userChosenColor);
    playSound(userChosenColor);
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over, Press Any Key To Resart");
        startOver();
    }
}

function playSound(name){
    $("#"+name).fadeOut(80).fadeIn(80);
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

