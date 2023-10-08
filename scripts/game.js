function resetGameStatus() {
  activePlayer = 0;
  currentround = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none' ; 


  let gameBoardIndex = 0;
  for(let i=0 ; i<3 ;i++){
    for(let j=0 ; j<3;j++){
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent='';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
  
}

function startNewName() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both player!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {

  if (event.target.tagName !=='LI' || gameIsOver){
    return;
  }
  
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty Field");
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const WinnerId = checkForGameOver();

  if (WinnerId != 0) {
    endGame(WinnerId);
  }

  currentround = currentround + 1;
  switchPlayer();
}

function checkForGameOver() {
  // Checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking the columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagnol : top left to Bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagnol : Bottom left to top right.
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentround === 9) {
    return -1;
  }
  return 0;
}

function endGame(WinnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";


  if (WinnerId > 0) {
    const winnerName = players[WinnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
