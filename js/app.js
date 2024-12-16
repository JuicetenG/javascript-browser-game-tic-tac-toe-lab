/*-------------------------------- Constants --------------------------------*/
const player1 = 'X';
const player2 = 'O';
const board = ['','','','','','','','',''];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]  
];

/*---------------------------- Variables (state) ----------------------------*/
let currentPlayer = player1;
let winner = false;
let tie = false;


/*------------------------ Cached Element References ------------------------*/
const messageElement = document.querySelector('#message');
const boardElement = document.querySelector('.board');
const squareElements = document.querySelectorAll('.sqr');
const resetButton = document.querySelector('.reset');

/*-------------------------------- Functions --------------------------------*/
resetGame();

function game(e) {
  if(e.target.innerText !== '' || winner) return; 

  e.target.innerText = currentPlayer;
  board[e.target.id] = currentPlayer;
  checkWinner();
  checkTie();
  switchPlayer();
  updateDisplay();
}

function updateDisplay() {
  if(!winner && !tie) {
    messageElement.innerText = `Player Turn: ${currentPlayer}`;
  } else if (!winner && tie) {
    messageElement.innerText = 'Tie Game!';
  } else messageElement.innerText = `Winner is ${currentPlayer}!`;
}

function switchPlayer() {
  if(winner) return;
  if (currentPlayer === player1) currentPlayer = player2;
  else currentPlayer = player1;
}

function resetGame() {
  resetBoard();
  resetScreen();
  currentPlayer = player1;
  winner = false;
  tie = false;
  updateDisplay();
}

function resetScreen() {
  squareElements.forEach((square) => {
    square.innerText = '';
  });
}

function resetBoard() {
  for(let i = 0; i < board.length; i++) {
    board[i] = '';
  }
}

function checkWinner() {
  winningCombos.forEach((combo) => {
    let [a, b, c] = combo;
    if((board[a] === board[b] && board[a] === board[c]) 
       && (board[a] !== '' && board[b] !== '' && board[c] !== '')) {
      winner = true;
    }
  });
}

function checkTie() {
  if(winner) return;
  if(!board.includes('')) tie = true;
}

/*----------------------------- Event Listeners -----------------------------*/
boardElement.addEventListener('click', game);
resetButton.addEventListener('click', resetGame);




