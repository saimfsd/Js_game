
let words = [
    "BALL","BOOK","TREE","STAR","KING","RING","FISH","BIRD","MILK","MOON",
    "RAIN","WIND","HOME","FARM","ROAD","FIRE","LION","BEAR","WALL","DOOR",
    "SHIP","JUMP","PLAY","TIME","WALK","WORK","HAND","FOOD","COLD","WARM",
    "SNOW","BLUE","GOLD","LOVE","NOTE","HEAR","EARN","SAND"
];

let current = 0;

function show(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function startGame(){
    loadPuzzle();
    show("gameScreen");
}

function loadPuzzle(){
    let grid = document.getElementById("lettersGrid");
    grid.innerHTML = "";

    let word = words[current];
    let letters = word.split("");

    let board = Array(25).fill(null);

    
    let isHorizontal = Math.random() > 0.5;

    let row, col;

    if(isHorizontal){
       
        row = Math.floor(Math.random() * 5);
        col = Math.floor(Math.random() * 2); 
        for(let i = 0; i < 4; i++){
            board[row * 5 + (col + i)] = letters[i];
        }
    } 
    else {
        // Vertical placement
        col = Math.floor(Math.random() * 5);
        row = Math.floor(Math.random() * 2); 
        for(let i = 0; i < 4; i++){
            board[(row + i) * 5 + col] = letters[i];
        }
    }

    let randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Fill empty spots with random letters
    for(let i = 0; i < 25; i++){
        if(!board[i]){
            board[i] = randomLetters[Math.floor(Math.random() * randomLetters.length)];
        }
    }

    // Render board
    board.forEach(l => {
        grid.innerHTML += `<div class="letter">${l}</div>`;
    });
}

function checkAnswer(){
    let ans = document.getElementById("userInput").value.toUpperCase();
    if(ans === words[current]){
        show("correctScreen");
    } else {
        show("wrongScreen");
    }
}

function nextPuzzle(){
    current++;
    if(current >= words.length){
        current = 0;
    }
    document.getElementById("userInput").value = "";
    loadPuzzle();
    show("gameScreen");
}

function backToGame(){
    show("gameScreen");
}
