const squareArray = [
    new Square("s-00"),
    new Square("s-01"),
    new Square("s-02"),
    new Square("s-10"),
    new Square("s-11"),
    new Square("s-12"),
    new Square("s-20"),
    new Square("s-21"),
    new Square("s-22"),
];

let isGameActive = false;
let startingLetter = "X";
let whoseTurn = null;
let parentSquare = null;
let availableSquares = [];
let isDiagonalMode = true;
let isGameWon = false;

const diagRowCalcArray = [-1, -1,  1,  1];
const diagColCalcArray = [-1,  1,  1, -1];
const sideRowCalcArray = [-1,  0,  1,  0];
const sideColCalcArray = [ 0,  1,  0, -1];

function nextTurn(square) {
    isGameWon = checkGrid(square);
    if(isGameWon) {
        return;
    }
    if(!whoseTurn) {
        whoseTurn = startingLetter;
    }
    if(whoseTurn=="X") {
        whoseTurn = "O";
    } else {
        whoseTurn = "X";
    }
    squareArray[4].htmlElement.setAttribute("rotating-letter", whoseTurn);
}

function checkGrid(square) {
    const index = squareArray.indexOf(square);
    if(index % 2 == 0) {
        if(checkLetters(0,4,8)) {
            markWinners(0,4,8);
            return true;
        } else if(checkLetters(2,4,6)) {
            markWinners(2,4,6);
            return true;
        }
    }
    if(square.colNum == 0) {
        if(checkLetters(0,3,6)) {
            markWinners(0,3,6);
            return true;
        }
    } else if(square.colNum == 1) {
        if(checkLetters(1,4,7)) {
            markWinners(1,4,7);
            return true;
        }
    } else if(square.colNum == 2) {
        if(checkLetters(2,5,8)) {
            markWinners(2,5,8);
            return true;
        }
    }
    if(square.rowNum == 0) {
        if(checkLetters(0,1,2)) {
            markWinners(0,1,2);
            return true;
        }
    } else if(square.rowNum == 1) {
        if(checkLetters(3,4,5)) {
            markWinners(3,4,5);
            return true;
        }
    } else if(square.rowNum == 2) {
        if(checkLetters(6,7,8)) {
            markWinners(6,7,8);
            return true;
        }
    }
    return false;
}

function checkLetters(i, j, k) {
    const letterAtI = squareArray[i].getLetter();
    const letterAtJ = squareArray[j].getLetter();
    const letterAtK = squareArray[k].getLetter();
    if(letterAtI=="?" || letterAtJ=="?" || letterAtK=="?") {
        return false;
    }
    return letterAtI == letterAtJ && letterAtJ == letterAtK;
}

function markWinners(i, j, k) {
    squareArray[i].htmlElement.classList.add("gameWon");
    squareArray[j].htmlElement.classList.add("gameWon");
    squareArray[k].htmlElement.classList.add("gameWon");
    return;
}

function markAvailableSquares() {
    availableSquares = [];
    const parentRow = parentSquare.rowNum;
    const parentCol = parentSquare.colNum;
    let potentialRow, potentialCol, currentSquare;
    let rowCalcArray, colCalcArray;

    if(isDiagonalMode) {
        rowCalcArray = diagRowCalcArray;
        colCalcArray = diagColCalcArray;
    } else {
        rowCalcArray = sideRowCalcArray;
        colCalcArray = sideColCalcArray;
    }

    for(let i = 0; i < 4; i++) {
        potentialRow = parentRow + rowCalcArray[i];
        potentialCol = parentCol + colCalcArray[i];
        for(let j = 0; j < 9; j++) {
            currentSquare = squareArray[j];
            if(currentSquare.rowNum == potentialRow
            && currentSquare.colNum == potentialCol) {
                availableSquares.push(currentSquare);
                currentSquare.markAvailable();
                break;
            }
        }
    }
}

const starterButton = document.querySelector("#starter");
starterButton.addEventListener("click", () => {
    if(startingLetter=="X"){
        startingLetter="O";
    } else {
        startingLetter="X";
    }
    starterButton.textContent = "Starter: " + startingLetter;
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    squareArray.forEach(square => {
        square.reset();
    });
    squareArray[4].htmlElement.setAttribute("rotating-letter", "");
    whoseTurn = null;
    isGameActive = false;
    isGameWon = false;
    starterButton.disabled = false;
    movementModeButton.disabled = false;
});

const movementModeButton = document.querySelector("#movement-mode");
movementModeButton.addEventListener("click", () => {
    if(isDiagonalMode) {
        isDiagonalMode = false;
        movementModeButton.textContent = "Movement: side-to-side";
        return;
    }
    isDiagonalMode = true;
    movementModeButton.textContent = "Movement: diagonal";
});