var score; // to store the current score
var duration = 1000; // 10 seconds
var startTime; // start time
var ended = true; // boolean indicating if game is ended
// we get DOM References for some HTML elements
var timerTxt = document.getElementById("timer");
var scoreTxt = document.getElementById("score");
var clicksTxt = document.getElementById("clicks");
var startBtn = document.getElementById("start");
var startBtn2 = document.getElementById("start2");
var clickArea = document.getElementById("clickarea");
let time = "";

for (let i = 1; i < 61; i++) {
  //   text += "The number is " + i + "<br>";
  time += "<option value='" + i + "'>" + i + "</option>";
}
document.getElementById("time").innerHTML = time;

// we define two functions for showing or hiding a HTML element
var show = function (elem) {
  elem.style.display = "inline";
};

var hide = function (elem) {
  elem.style.display = "none";
};
// Method called when the game starts
function startGame() {
  var select = document.getElementById("time");
  var value = select.options[select.selectedIndex].value;
  console.log(value); // en
  var duration = value; // 10 seconds
  hide(startBtn);
  hide(startBtn2);
  score = -1;
  ended = false;
  // we get start time
  startTime = new Date().getTime();

  // we create a timer with the setInterval method
  var timerId = setInterval(function () {
    var total = (new Date().getTime() - startTime) / (value * 100);
    // console.log(total);
    // console.log(new Date().getTime() - startTime)
    console.log(new Date().getTime() - startTime)

    // while total lower than duration, we update timer and the clicks by seconds
    if ((new Date().getTime() - startTime) < (duration * 1000)) {
      timerTxt.textContent = ((new Date().getTime() - startTime)/ 1000).toFixed(3);
      clicksTxt.textContent = (score / total).toFixed(2);
    } else {
      // otherwise, game is ended, we clear interval and we set game as ended
      ended = true;
      clearInterval(timerId);
      // we call the end game method
      endGame();
    }
  }, 1);
}

// end game method
function endGame() {
  var select = document.getElementById("time");
  var value = select.options[select.selectedIndex].value;
  console.log(value); // en
  var duration = value; // 10 seconds
  // we write final stats
  timerTxt.textContent = duration;
  var clicsBySeconds = ((score / duration));
  var clicsBySeconds
   clicksTxt.textContent = Math.round(clicsBySeconds);
  // we show start button to play an other game
  show(startBtn);
  show(startBtn2);

  // we display result to the user in delayed mode
  //to update DOM elements just before the alert
  setTimeout(function () {
    alert(
      "You made " +
        score +
        " clicks in " +
        duration +
        " seconds. It is " +
        clicsBySeconds +
        " clicks by seconds. Try again!"
    );
  }, 10);
}

// we set a click event listener on the start button
startBtn.addEventListener("click", function (e) {
  startGame();
});
startBtn2.addEventListener("click", function (e) {
  startGame();
});



// we add a click event listener on the click area div to update the score when the user will click
clickArea.addEventListener("click", function (e) {
  if (!ended) {
    score++;
    scoreTxt.textContent = score;
  }
});
