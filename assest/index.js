let words = [
    "BALL","BOOK","TREE","STAR","KING","RING","FISH","BIRD","MILK","MOON",
    "RAIN","WIND","HOME","FARM","ROAD","FIRE","LION","BEAR","WALL","DOOR",
    "SHIP","JUMP","PLAY","TIME","WALK","WORK","HAND","FOOD","COLD","WARM",
    "SNOW","BLUE","GOLD","LOVE","NOTE","HEAR","EARN","SAND"
];

let current = 0;
let score = 0;
let timer = 60;
let timerInterval;

function show(id) {
    let screens = document.getElementsByClassName("screen");
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
}

function startTimer() {
    timer = 60;
    document.getElementById("timeValue").innerHTML = timer;

    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timer = timer - 1;
        document.getElementById("timeValue").innerHTML = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Time Over! Final Score: " + score);
            location.reload();
        }
    }, 1000);
}

function startGame() {
    loadPuzzle();
    startTimer();
    show("gameScreen");
}

function loadPuzzle() {
    let grid = document.getElementById("lettersGrid");
    grid.innerHTML = "";

    let word = words[current];
    let letters = word.split("");

    let board = [];
    for (let i = 0; i < 25; i++) {
        board.push("");
    }

    let horizontal = Math.random() > 0.5;
    let row = Math.floor(Math.random() * 5);
    let col = Math.floor(Math.random() * 5);

    if (horizontal && col > 1) {
        col = 1;
    }
    if (!horizontal && row > 1) {
        row = 1;
    }

    for (let i = 0; i < 4; i++) {
        if (horizontal) {
            board[row * 5 + (col + i)] = letters[i];
        } else {
            board[(row + i) * 5 + col] = letters[i];
        }
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 25; i++) {
        if (board[i] === "") {
            let r = Math.floor(Math.random() * alphabet.length);
            board[i] = alphabet[r];
        }
    }

    for (let i = 0; i < 25; i++) {
        let box = document.createElement("div");
        box.className = "letter";
        box.innerHTML = board[i];
        grid.appendChild(box);
    }
}

function checkAnswer() {
    let ans = document.getElementById("userInput").value.toUpperCase();

    if (ans === words[current]) {
        score = score + 1;
        document.getElementById("scoreValue").innerHTML = score;
        show("correctScreen");
    } else {
        show("wrongScreen");
    }
}

function nextPuzzle() {
    current = current + 1;

    if (current >= words.length) {
        current = 0;
    }

    document.getElementById("userInput").value = "";
    loadPuzzle();
    startTimer();
    show("gameScreen");
}

function backToGame() {
    show("gameScreen");
}

function showHint() {
    let w = words[current];
    alert("Hint: Word starts with " + w[0]);
}
