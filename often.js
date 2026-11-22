const ball = document.getElementById("ball");
const tracking = document.getElementById("tracking");
const word = document.getElementById("word");




const words = ["never", "almost never", "rarely", "sometimes", "often|frequently", "usually", "almost always", "always"];


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
    if (percentage >= 80) {
        displayWord(words[0]);
    } else if (percentage >= 71) {
        displayWord(words[1]);
    } else if (percentage >= 58) {
        displayWord(words[2]);
    } else if (percentage >= 50) {
        displayWord(words[3]);
    } else if (percentage >= 35) {
        displayWord(words[4]);
    } else if (percentage >= 19) {
        displayWord(words[5]);
    } else if (percentage >= 2) {
        displayWord(words[6]);
    } else {
        displayWord(words[7]);
    }
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



