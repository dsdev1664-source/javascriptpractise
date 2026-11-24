const ball = document.getElementById("ball")
const tracking = document.getElementById("tracking");

const words = ["possibly", "maybe/perhaps", "probably", "surely", "certainly", "definitely"];
const word = document.getElementById("word");

const clouds = document.querySelectorAll(".cloud");
clouds.forEach((cloud, index) => {
    if (index >= 3) {
        cloud.style.opacity = "0";
    }
});


let ballY = 0;
let isDragging = false;
let grabOffset = 0;

function displayWord(text) {
    word.innerHTML = "";

    for (let letter of text) {
        const span = document.createElement("span");
        span.textContent = letter;
        word.appendChild(span);
    }
}

displayWord(words[0]);

function updateWeather(percentage) {

    clouds.forEach((cloud, index) => {

        if (percentage < 20 && index >= 3) {
            cloud.style.opacity = "0";

        } else {
            cloud.style.opacity = "1";
        }

    });

}

 
function getColour(percentage) {
    for (let i = 0; i < colours.length - 1; i++) {
        const start = colours[i];
        const end = colours[i + 1];

    const range = end.position - start.position;
const distance = percentage - start.position;
const blend = distance / range;

console.log(blend);
}
}


const upbutton = document.getElementById("upbutton")
const downbutton = document.getElementById("downbutton")



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
    ball.style.backgroundColor = "rgba(255, 0, 0, 0.904)";
    displayWord("definitely");

} else if (percentage < 16) {
    ball.style.backgroundColor = "orangered";
    displayWord("certainly");

} else if (percentage < 25) {
    ball.style.backgroundColor = "orange";
    displayWord("certainly");

} else if (percentage < 43) {
    ball.style.backgroundColor = "yellow";
    displayWord("surely");

} else if (percentage < 55) {
    ball.style.backgroundColor = "yellowgreen";
    displayWord("probably");

} else if (percentage < 67) {
    ball.style.backgroundColor = "rgb(0, 200, 255)";
    displayWord("perhaps/maybe");

} else if (percentage < 80) {
    ball.style.backgroundColor = "dodgerblue";
    displayWord("perhaps/maybe");

} else {
    ball.style.backgroundColor = "rgb(88, 0, 165)";
    displayWord("possibly");
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

clouds.forEach((cloud, index) => {
    if (index >= 3 && percentage < (80 - (index - 3) * 7)) {
        cloud.style.opacity = "1";
    } else if (index >= 3) {
        cloud.style.opacity = "0";
    }

});

    }


   

});

document.addEventListener("pointerup", function(){
    
    isDragging = false;
    document.body.style.cursor = "default";
});




downbutton.addEventListener("click", function(){
    ballY = ballY + 30;
    ball.style.top = ballY + "px";

    if (ballY <= 70) {
    ball.style.backgroundColor = "blue";

} else if (ballY <= 140) {
    ball.style.backgroundColor = "green";

} else {
    ball.style.backgroundColor = "red";
}


});


upbutton.addEventListener("click", function(){
    ballY = ballY - 10;
    ball.style.top = ballY + "px";

    if (ballY <= 70) {
    ball.style.backgroundColor = "blue";

} else if (ballY <= 140) {
    ball.style.backgroundColor = "green";

} else {
    ball.style.backgroundColor = "red";
}


});