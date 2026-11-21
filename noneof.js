const penguinContainer = document.getElementById("penguin-container");
const penguins = document.querySelectorAll(".penguin");

for (let i = 1; i < 9; i++) {
    const penguin = penguins[0].cloneNode(true);
    penguinContainer.appendChild(penguin);
}