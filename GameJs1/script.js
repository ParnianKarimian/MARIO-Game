let currMoleTile;
let currPlantTiles = [];
let score = 0;
let gameOver = false;
let timeLimit = 30;
let interval;
let timerInterval;

window.onload = function () {
    setGame();
    startTimer();
}

function setGame() {
    for (let index = 0; index < 9; index++) {
        let title = document.createElement('div');
        title.id = index.toString();
        title.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(title);
    }


    setInterval(setMole, 2000);
    setInterval(addPlants, 3000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "img/monty-mole.png";

    let num = getRandomTile();
    if (currPlantTiles.some(plant => plant.id === num)) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function addPlants() {
    if (gameOver) return;

    let numPlants = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numPlants; i++) {
        let plant = document.createElement("img");
        plant.src = "img/piranha-plant.png";

        let num = getRandomTile();
        if (currMoleTile && currMoleTile.id == num) {
            continue;
        }

        if (!currPlantTiles.some(plant => plant.id === num)) {
            let plantTile = document.getElementById(num);
            plantTile.appendChild(plant);
            currPlantTiles.push({ id: num, element: plantTile });
        }
    }
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }

    else if (currPlantTiles.some(plant => plant.element === this)) {
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        clearInterval(timerInterval);
        document.getElementById("timer").innerText = "Time Left: 0s";
    }
}

function startTimer() {
    let timerDisplay = document.getElementById("timer");
    timerInterval = setInterval(function () {
        timeLimit--;
        timerDisplay.innerText = `Time Left: ${timeLimit}s`;

        if (timeLimit <= 0) {
            clearInterval(timerInterval);
            gameOver = true;
            document.getElementById("score").innerText = "GAME OVER: " + score.toString();
            document.getElementById("timer").innerText = "Time Left: 0s";
        }
    }, 1000);
}
