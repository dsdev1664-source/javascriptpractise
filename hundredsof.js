const ball = document.getElementById("ball")
const tracking = document.getElementById("tracking");

const words = ["few", "a couple of", "a few", "several", "various", "many", "hundreds of"];
const word = document.getElementById("word");

const starContainer = document.getElementById("star-container");
const stars = [];

for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");

    star.classList.add("star");

    if (i < 2) {
    star.style.left = Math.random() * 80 + 10 + "%";
    star.style.top = Math.random() * 60 + 10 + "%";
} else {
    star.style.left = Math.random() * 90 + 5 + "%";
    star.style.top = Math.random() * 75 + "%";
}
    starContainer.appendChild(star);
    stars.push(star);
}


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

displayWord(words[0]);

function updateStars(percentage) {

    let wordIndex;
    let numberOfStars;

    if (percentage >= 85) {
        wordIndex = 0;
        numberOfStars = 2;

    } else if (percentage >= 70) {
        wordIndex = 1;
        numberOfStars = 2;

    } else if (percentage >= 55) {
        wordIndex = 2;
        numberOfStars = 5;

    } else if (percentage >= 40) {
        wordIndex = 3;
        numberOfStars = 12;

    } else if (percentage >= 25) {
        wordIndex = 4;
        numberOfStars = 25;

    } else if (percentage >= 12) {
        wordIndex = 5;
        numberOfStars = 60;

    } else {
        wordIndex = 6;
        numberOfStars = 150;
    }

    displayWord(words[wordIndex]);

    stars.forEach((star, index) => {
        if (index < numberOfStars) {
            star.style.opacity = "1";
        } else {
            star.style.opacity = "0";
        }
    });
}

updateStars(100);


ball.addEventListener("pointerdown", function(event){
    console.log("ball grabbed");
    isDragging = true;
    grabOffset = event.clientY - ball.getBoundingClientRect().top;
});

document.addEventListener("pointermove", function(event){
if (isDragging) {
    const rect = tracking.getBoundingClientRect();

        document.body.style.cursor = "none";
        
        ballY = event.clientY - rect.top - grabOffset;

        ballY = Math.max(-27, Math.min(ballY, 319));

        ball.style.top = ballY + "px";


let percentage = (ballY / 330) * 100;


if (percentage < 12) {
    ball.style.backgroundColor = " rgba(255, 0, 0, 0.904)";
    
    updateStars(percentage);
    
} else if (percentage < 16) {
    ball.style.backgroundColor = "orangered";
    
    updateStars(percentage);
    
} else if (percentage < 25) {
    ball.style.backgroundColor = "orange";
    
    updateStars(percentage);
    
} else if (percentage < 43) {
    ball.style.backgroundColor = "yellow";
   
    updateStars(percentage);
    
} else if (percentage < 55) {
    ball.style.backgroundColor = "yellowgreen";
    
    updateStars(percentage);
    
} else if (percentage < 67) {
    ball.style.backgroundColor = " rgb(0, 200, 255)";
    
    updateStars(percentage);
    
} else if (percentage < 80) {
    ball.style.backgroundColor = "dodgerblue";
    
    updateStars(percentage);
    
} else {
    ball.style.backgroundColor = " rgb(88, 0, 165)";
    
    updateStars(percentage);
    
}
   

if (percentage < -3) {
    // Top end
    ball.style.setProperty("--stick-left", "-30px");
    ball.style.setProperty("--stick-width", "30px");

} else if (percentage > 90) {
    // Bottom end
    ball.style.setProperty("--stick-left", "-30px");
    ball.style.setProperty("--stick-width", "30px");

} else {
    // In between
    ball.style.setProperty("--stick-left", "-15px");
    ball.style.setProperty("--stick-width", "20px");
}



    }


   

});

document.addEventListener("pointerup", function(){
    
    isDragging = false;
    document.body.style.cursor = "default";
});




