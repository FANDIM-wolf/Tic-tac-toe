// first we need store game status element 

const statusDisplay = document.querySelector('.game--status');

// and declare few variables to track state of the game

let gameActive = true;

// X will be first
let currentPlayer = "X";

// form there we store game state variables , in begin it will be empty
let gameState = ["", "", "", "", "", "", "", "", ""];

// return current player turn
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//conditions for victory
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // just reflect the move as well as update UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = "Nice" ;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // get data from 'data-cell-index'
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
      );

    /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
*/
    if (gameState[clickedCellIndex] !== "" || gameActive == false) {
        return 0;
    
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}
// function to restart Game and update values
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);