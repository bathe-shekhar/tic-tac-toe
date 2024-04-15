const boardTilesCaption = ["", "", "", "", "", "", "", "", ""];
const boardTiles = [];

const gameBoard = document.querySelector("#game-board");
const gameDialog = document.querySelector("#dialog");
const dialogMessage = document.querySelector("#dialog-message");
const closeButton = document.querySelector("#close-button");
const newGameButton = document.querySelector("#new-game-button");
const newGameBtn = document.querySelector("#new-game-btn");

const resetButton = document.querySelector("#reset-button");
const playerXCount = document.querySelector("#player-x-count");
const playerOCount = document.querySelector("#player-o-count");
const playerTurn = document.querySelector("#player-turn");

let playerXCnt = 0;
let playerOCnt = 0;
let tileCount = 0;
let toggle = false;
let moveCount = 0;

playerXCount.innerHTML = playerXCnt;
playerOCount.innerHTML = playerOCnt;

closeButton.addEventListener("click", () => {
    gameDialog.close();
});

newGameButton.addEventListener("click", () => {
    playerTurn.innerHTML = 'X';
    gameDialog.close();
    removeExistingBoard();
    clearAll();
    setNewGameBoard();
});

newGameBtn.addEventListener("click", () => {
    // gameDialog.close();
    playerTurn.innerHTML = 'X';
    removeExistingBoard();
    clearAll();
    setNewGameBoard();
});

resetButton.addEventListener("click", () => {
    playerOCnt = 0;
    playerXCnt = 0;
    playerXCount.innerHTML = playerXCnt;
    playerOCount.innerHTML = playerOCnt;
    playerTurn.innerHTML = 'X';
    removeExistingBoard();
    clearAll();
    setNewGameBoard();
})


function clearAll() {
    tileCount = 0;
    toggle = false;
    moveCount = 0;

    for (i = 0; i < 9; i++) {
        boardTilesCaption[i] = "";
    }

    for (i = 0; i < 9; i++) {
        boardTiles.pop();
    }
}


function removeExistingBoard() {
    for (i = 0; i < 3; i++) {
        const id = "#tile-row-" + i;
        const tileRow = document.querySelector(id);
        gameBoard.removeChild(tileRow);
    }
}


function setNewGameBoard() {
    for (i = 0; i < 3; i++) {
        const tileRow = document.createElement('div');
        tileRow.className = "tile-row";
        const id = "tile-row-" + i;
        tileRow.setAttribute("id", id);

        for (j = 0; j < 3; j++) {
            const tile = document.createElement('button');
            tile.className = "tile";
            tile.setAttribute("id", tileCount);
            boardTiles[tileCount] = tile;
            tileCount++;
            tileRow.appendChild(tile);

            tile.addEventListener("click", () => {
                toggle ? tile.innerHTML = 'O' : tile.innerHTML = 'X';
                toggle ? playerTurn.innerHTML = 'X' : playerTurn.innerHTML = 'O';
                tile.setAttribute("disabled", true);
                const index = tile.getAttribute('id');
                console.log("index: ", index);
                console.log(typeof (index));
                toggle ? boardTilesCaption[index] = 'O' : boardTilesCaption[index] = 'X';
                toggle = !toggle;
                console.log(boardTilesCaption);
                moveCount++;
                if (moveCount > 2) {
                    checkForWin();
                }
            });
        }
        gameBoard.appendChild(tileRow);
        console.log(boardTiles);
    }
}


function checkForWin() {
    if (boardTilesCaption[0] == 'X' && boardTilesCaption[1] == 'X' && boardTilesCaption[2] == 'X' ||
        boardTilesCaption[3] == 'X' && boardTilesCaption[4] == 'X' && boardTilesCaption[5] == 'X' ||
        boardTilesCaption[6] == 'X' && boardTilesCaption[7] == 'X' && boardTilesCaption[8] == 'X' ||
        boardTilesCaption[0] == 'X' && boardTilesCaption[3] == 'X' && boardTilesCaption[6] == 'X' ||
        boardTilesCaption[1] == 'X' && boardTilesCaption[4] == 'X' && boardTilesCaption[7] == 'X' ||
        boardTilesCaption[2] == 'X' && boardTilesCaption[5] == 'X' && boardTilesCaption[8] == 'X' ||
        boardTilesCaption[0] == 'X' && boardTilesCaption[4] == 'X' && boardTilesCaption[8] == 'X' ||
        boardTilesCaption[2] == 'X' && boardTilesCaption[4] == 'X' && boardTilesCaption[6] == 'X') {
        console.log("X wins");
        playerXCnt++;
        playerXCount.innerHTML = playerXCnt;
        dialogMessage.innerHTML = "Player 'X' wins";
        gameDialog.showModal();
    }
    else {
        if (boardTilesCaption[0] == 'O' && boardTilesCaption[1] == 'O' && boardTilesCaption[2] == 'O' ||
            boardTilesCaption[3] == 'O' && boardTilesCaption[4] == 'O' && boardTilesCaption[5] == 'O' ||
            boardTilesCaption[6] == 'O' && boardTilesCaption[7] == 'O' && boardTilesCaption[8] == 'O' ||
            boardTilesCaption[0] == 'O' && boardTilesCaption[3] == 'O' && boardTilesCaption[6] == 'O' ||
            boardTilesCaption[1] == 'O' && boardTilesCaption[4] == 'O' && boardTilesCaption[7] == 'O' ||
            boardTilesCaption[2] == 'O' && boardTilesCaption[5] == 'O' && boardTilesCaption[8] == 'O' ||
            boardTilesCaption[0] == 'O' && boardTilesCaption[4] == 'O' && boardTilesCaption[8] == 'O' ||
            boardTilesCaption[2] == 'O' && boardTilesCaption[4] == 'O' && boardTilesCaption[6] == 'O') {
            console.log("O wins");
            playerOCnt++;
            playerOCount.innerHTML = playerOCnt;
            dialogMessage.innerHTML = "Player 'O' wins";
            gameDialog.showModal();
        }
        else {
            if (moveCount == 9) {
                console.log("Draw....");
                dialogMessage.innerHTML = "Draw....";
                gameDialog.showModal();
                boardTiles.forEach((tile) => tile.setAttribute("disabled", true));
            }
        }
    }
}

setNewGameBoard();

