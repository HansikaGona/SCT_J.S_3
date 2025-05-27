const board = document.getElementById("game-board");
const status = document.getElementById("status");

let currentPlayer = "X";
let gameState = Array(9).fill(null);
let gameActive = true;

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes(null)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  board.innerHTML = "";
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

resetGame();
