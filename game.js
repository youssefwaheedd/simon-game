var buttonColors = ["red", "blue", "green", "yellow"];
var currentLevel = 0;
var gamePattern = [];
var userClickedPattern = [];
var gameInProgress = false;
$("#startButton").click(function () {
  currentLevel = 0;
  gamePattern = [];
  userClickedPattern = [];
  $(this).fadeOut();
  $("h1").text("Level " + currentLevel + "!");
  setTimeout(function () {
    nextSequence();
  }, 1000);
  gameInProgress = true;
});

$("div.btn").click(function () {
  if (!gameInProgress) {
    return;
  }
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animateButton(userChosenColor);
  playSound(userChosenColor);
  check();
});
function nextSequence() {
  $("h1").text("Level " + currentLevel + "!");
  currentLevel++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  animateButton(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(color) {
  audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animateButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
function check() {
  if (userClickedPattern.length < gamePattern.length) {
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] === gamePattern[i]) {
        //do nothing
      } else {
        gameInProgress = false;
        $("body").addClass("gameOver");
        setTimeout(function () {
          $("body").removeClass("gameOver");
        }, 200);
        $("h1").text("You lost :(");
        playSound("wrong");
        $("#startButton").fadeIn();
        $("#startButton").text("Restart !");
        break;
      }
    }
  } else if (userClickedPattern.length === gamePattern.length) {
    if (
      userClickedPattern[userClickedPattern.length - 1] ==
      gamePattern[userClickedPattern.length - 1]
    ) {
      setTimeout(function () {
        nextSequence();
      }, 800);
      userClickedPattern = [];
    } else {
      gameInProgress = false;
      $("body").addClass("gameOver");
      setTimeout(function () {
        $("body").removeClass("gameOver");
      }, 200);
      $("h1").text("You lost :(");
      playSound("wrong");
      $("#startButton").fadeIn();
      $("#startButton").text("Restart !");
    }
  }
}
