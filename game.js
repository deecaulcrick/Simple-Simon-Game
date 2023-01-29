let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let started = false;

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
};

$(".btn").click(function(event){
    
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    

})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
        $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}



$(document).keypress(function(){
  
    if (!started ){
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }

})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
        
    } else {
        console.log("wrong");
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();

        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 500);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    

    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





