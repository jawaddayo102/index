// script.js - Tic Tac Toe (two players)
// The board is an array of 9 items. Index numbers go like this:
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8

// All 8 ways to win: 3 rows, 3 columns and 2 diagonals
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

// ---------- Page elements ----------
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');
const newGameBtn = document.getElementById('newGameBtn');
const resetScoresBtn = document.getElementById('resetScoresBtn');

// ---------- Game state ----------
let board = Array(9).fill('');  // '' = empty, otherwise 'X' or 'O'
let currentPlayer = 'X';
let gameOver = false;
let winningLine = [];           // the 3 winning squares, if someone won
const scores = { X: 0, O: 0, draw: 0 };

// ---------- Create the 9 squares (only once) ----------
const cells = [];
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('button');
  cell.className = 'cell';
  cell.type = 'button';
  cell.addEventListener('click', () => playMove(i));
  boardElement.append(cell);
  cells.push(cell);
}

// ---------- Find out if someone has won ----------
function findWinningLine() {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return [];
}

// ---------- A player clicked a square ----------
function playMove(index) {
  if (gameOver || board[index] !== '') return; // ignore clicks on used squares

  board[index] = currentPlayer;
  winningLine = findWinningLine();

  if (winningLine.length > 0) {
    gameOver = true;
    scores[currentPlayer]++;
    statusElement.textContent = 'Player ' + currentPlayer + ' wins!';
  } else if (board.every((square) => square !== '')) {
    gameOver = true;
    scores.draw++;
    statusElement.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = "Player " + currentPlayer + "'s turn";
  }
  render();
}

// ---------- Draw everything on the page ----------
function render() {
  cells.forEach((cell, i) => {
    const value = board[i];
    cell.textContent = value;
    cell.className = 'cell' + (value ? ' ' + value.toLowerCase() : '') +
      (winningLine.includes(i) ? ' win' : '');
    cell.disabled = gameOver || value !== '';
    const row = Math.floor(i / 3) + 1;
    const column = (i % 3) + 1;
    cell.setAttribute('aria-label', 'Row ' + row + ', column ' + column + ': ' + (value || 'empty'));
  });
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

// ---------- Buttons ----------
function newGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  winningLine = [];
  statusElement.textContent = "Player X's turn";
  render();
}

function resetScores() {
  scores.X = 0;
  scores.O = 0;
  scores.draw = 0;
  newGame();
}

newGameBtn.addEventListener('click', newGame);
resetScoresBtn.addEventListener('click', resetScores);

// ---------- Start ----------
newGame();
