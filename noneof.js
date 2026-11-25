
const ball = document.getElementById("ball");
const tracking = document.getElementById("tracking");
const word = document.getElementById("word");

const penguinContainer = document.getElementById("penguin-container");
const firstPenguin = document.querySelector(".penguin");

const words = ["none of", "some", "a lot of", "most of", "all"];




let ballY = 0;
let isDragging = false;
let grabOffset = 0;

function displayWord(text) {
    word.innerHTML = "";

    for (let letter of text) {
        const span = document.createElement("span");
        span.textContent = letter;

        if (letter === " ") {
            span.classList.add("space");
        }

        word.appendChild(span);
    }
}

// Create 15 penguins
for (let i = 1; i < 15; i++) {
    const penguin = firstPenguin.cloneNode(true);
    penguinContainer.appendChild(penguin);
}

const penguins = document.querySelectorAll(".penguin");

// Shuffle the penguins ONCE
const shuffledPenguins = [...penguins].sort(() => Math.random() - 0.5);

function dressPenguins(number) {

    shuffledPenguins.forEach((penguin, index) => {

        if (index < number) {
            penguin.classList.add("dressed");
        } else {
            penguin.classList.remove("dressed");
        }

    });

}
function updatePenguins(percentage) {
    let wordIndex;
    let numberOfScarves;

    if (percentage >= 80) {
        wordIndex = 0;
        numberOfScarves = 0;
    } else if (percentage >= 60) {
        wordIndex = 1;
        numberOfScarves = 4;
    } else if (percentage >= 40) {
        wordIndex = 2;
        numberOfScarves = 9;
    } else if (percentage >= 5) {
        wordIndex = 3;
        numberOfScarves = 12;
    } else {
        wordIndex = 4;
        numberOfScarves = 15;
    }

    displayWord(words[wordIndex]);
    dressPenguins(numberOfScarves);
}

updatePenguins(100);

// Grab the ball
ball.addEventListener("pointerdown", function(event) {
    

    isDragging = true;
    grabOffset = event.clientY - ball.getBoundingClientRect().top;
});
// Move the ball - same method as hundredsof.js
document.addEventListener("pointermove", function(event) {

    if (isDragging) {
        const rect = tracking.getBoundingClientRect();

        document.body.style.cursor = "none";

        ballY = event.clientY - rect.top - grabOffset;

        ballY = Math.max(-27, Math.min(ballY, 319));

        ball.style.top = ballY + "px";

        let percentage = (ballY / 330) * 100;

        updatePenguins(percentage);

        // Change ball colour
        if (percentage < 12) {
            ball.style.backgroundColor = "rgba(255, 0, 0, 0.904)";
        } else if (percentage < 16) {
            ball.style.backgroundColor = "orangered";
        } else if (percentage < 25) {
            ball.style.backgroundColor = "orange";
        } else if (percentage < 43) {
            ball.style.backgroundColor = "yellow";
        } else if (percentage < 55) {
            ball.style.backgroundColor = "yellowgreen";
        } else if (percentage < 67) {
            ball.style.backgroundColor = "rgb(0, 200, 255)";
        } else if (percentage < 80) {
            ball.style.backgroundColor = "dodgerblue";
        } else {
            ball.style.backgroundColor = "rgb(88, 0, 165)";
        }

        // Ball stick
        if (percentage < -3) {
            ball.style.setProperty("--stick-left", "-30px");
            ball.style.setProperty("--stick-width", "30px");
        } else if (percentage > 90) {
            ball.style.setProperty("--stick-left", "-30px");
            ball.style.setProperty("--stick-width", "30px");
        } else {
            ball.style.setProperty("--stick-left", "-15px");
            ball.style.setProperty("--stick-width", "20px");
        }
    }
});

// Release the ball
document.addEventListener("pointerup", function() {
    isDragging = false;
    document.body.style.cursor = "default";
});


