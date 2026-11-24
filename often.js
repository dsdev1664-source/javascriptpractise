const ball = document.getElementById("ball");
const tracking = document.getElementById("tracking");
const word = document.getElementById("word");




const words = ["never", "almost never", "rarely", "sometimes", "often|frequently", "usually", "almost always", "always"];

const calendarSquares = document.querySelectorAll(".calendar-square");

const tickCounts = [0, 1, 3, 7, 12, 14, 15, 16];

// Randomise the square positions once
const shuffledSquares = Array.from(calendarSquares);

for (let i = shuffledSquares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledSquares[i], shuffledSquares[j]] =
    [shuffledSquares[j], shuffledSquares[i]];
}

function updateCalendar(wordIndex) {

    calendarSquares.forEach(square => {
        square.querySelector(".tick").style.display = "none";
    });

    for (let i = 0; i < tickCounts[wordIndex]; i++) {
        shuffledSquares[i].querySelector(".tick").style.display = "block";
    }
}

let ballY = 0;
let isDragging = false;
let grabOffset = 0;

function displayWord(text) {
    word.innerHTML = "";
    word.className = text.replace("|", "-");
    for (let letter of text) {

        if (letter === "|") {
            const breakLine = document.createElement("span");
            breakLine.classList.add("line-break");
            word.appendChild(breakLine);
            continue;
        }

        const span = document.createElement("span");
        span.textContent = letter;

        if (letter === " ") {
            span.classList.add("space");
        }

        word.appendChild(span);
    }
}

function updateWord(percentage) {

    let wordIndex;

    if (percentage >= 80) {
        wordIndex = 0;
    } else if (percentage >= 71) {
        wordIndex = 1;
    } else if (percentage >= 58) {
        wordIndex = 2;
    } else if (percentage >= 50) {
        wordIndex = 3;
    } else if (percentage >= 35) {
        wordIndex = 4;
    } else if (percentage >= 19) {
        wordIndex = 5;
    } else if (percentage >= 2) {
        wordIndex = 6;
    } else {
        wordIndex = 7;
    }

    displayWord(words[wordIndex]);
    updateCalendar(wordIndex);
}

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

        updateWord(percentage);

        

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

updateWord(100);



