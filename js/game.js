var colors = ["blue", "green", "yellow", "red"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var isKeyPressed = false;


$(document).keypress(function() {
  if(!isKeyPressed){
    $("#level-title").text("Level "+ level);
    nextSeq();
    isKeyPressed = true;
  }
});




// detect if any button clicked //handle
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSeq();
      }, 1000);

    }

  }else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Key to Restart");

    startOver();
  }
}

function nextSeq(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNum  = Math.floor(Math.random() * 4);
  var randomColorChoice = colors[randomNum];
  gamePattern.push(randomColorChoice);

  $("#" + randomColorChoice).fadeIn(100).fadeOut(100).fadeIn(100);

  $("#" + randomColorChoice).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColorChoice);

}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  isKeyPressed = false;
  level = 0;
  gamePattern = [];
}
