const cells = Array.from(document.querySelectorAll("[data-cell]"));
const status = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function updateStatus(message) {
  status.textContent = message;
}

function checkWinner(player) {
  return winningLines.some((line) => line.every((index) => board[index] === player));
}

function handleMove(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.cell);

  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    gameOver = true;
    updateStatus(`Player ${currentPlayer} wins`);
    return;
  }

  if (board.every(Boolean)) {
    gameOver = true;
    updateStatus("It's a draw");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  updateStatus("Player X's turn");
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleMove);
});

resetButton.addEventListener("click", resetGame);
