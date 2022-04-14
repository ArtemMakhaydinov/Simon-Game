let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let clickCount = 0;


//New game
document.addEventListener("keydown", function () {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});

//Button eventlistener
for (i = 0; i < buttonColors.length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        if (gamePattern.length > 0) {
            clickCount++;
            gameplay(this.classList[1])
        };
    });
}


//Round gameplay
function gameplay(color) {
    if (color == gamePattern[clickCount - 1]) {
        buttonAnimation(color);
        buttonSound(color);

        if (clickCount === gamePattern.length) {
            nextSequence();
        }

    } else {
        gameOver(color);
    }
};


//Next sequence
function nextSequence() {

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    setTimeout(function () {
        buttonAnimation(randomChosenColor);
        buttonSound(randomChosenColor);
        document.querySelector("h1").textContent = "Level " + gamePattern.length;
    }, 500);

    clickCount = 0;
};


//Button animation
function buttonAnimation(color) {
    let activeButton = document.querySelector("." + color);

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
};


//Button success sound
function buttonSound(color){
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}


//Game over
function gameOver(color) {
    buttonAnimation(color);

    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

    document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";

    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
        document.querySelector("body").classList.remove("game-over")
    }, 100);

    gamePattern = [];
}