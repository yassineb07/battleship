import './styles.css';
import Player from './player';
import Ship from './ship';
import GameBoard from './gameBoard';
import Dom from './dom';

const dom = Dom();
const player1BoardEl = document.getElementById('player1GameBoardEl');
const player2BoardEl = document.getElementById('player2GameBoardEl');
const resetBtn = document.getElementById('resetBtn');

const player1 = Player('player1', GameBoard());
const player2 = Player('computer', GameBoard());
let currentPlayer = 1;

const ships = [
  Ship('ship1', 1),
  Ship('ship2', 2),
  //Ship('ship3', 3),
  //Ship('ship4', 4),
];

const initShips = () => {
  player1.placeShip(ships[0], [0, 0]);
  player1.placeShip(ships[1], [1, 3]);
  //player1.placeShip(ships[2], [4, 4]);
  //player1.placeShip(ships[3], [8, 1]);

  player2.placeShip(ships[0], [8, 7]);
  player2.placeShip(ships[1], [1, 3]);
  //player2.placeShip(ships[2], [3, 3]);
  //player2.placeShip(ships[3], [6, 3]);
};

const initGame = () => {
  initShips();
  dom.renderBoard(player1BoardEl, player1.getBoard());
  dom.renderBoard(player2BoardEl, player2.getBoard());
  dom.enableBoard(player2BoardEl);
  dom.disableBoard(player1BoardEl);
};

const computerPlay = () => {
  let x, y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (player1.getHits().includes([x, y].toString()));

  player1.receiveAttack([x, y]);
  dom.clearBoard(player1BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  if (player1.hasLost()) {
    dom.displayWinner(player2.getName());
    dom.disableBoard(player1BoardEl);
    dom.disableBoard(player2BoardEl);
    return;
  }
  switchTurn();
};

const switchTurn = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer === 1) {
    dom.enableBoard(player2BoardEl);
    dom.disableBoard(player1BoardEl);
  } else {
    dom.enableBoard(player1BoardEl);
    dom.disableBoard(player2BoardEl);
  }
};

/* player1BoardEl.addEventListener('click', (e) => {
  if (currentPlayer !== 2) return;
  const coord = e.target.id.split(',').map(Number);
  player1.receiveAttack(coord);
  dom.clearBoard(player1BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  if (player1.hasLost()) {
    dom.displayWinner(player2.getName());
    dom.disableBoard(player1BoardEl);
    dom.disableBoard(player2BoardEl);
    return;
  }
  switchTurn();
}); */

player2BoardEl.addEventListener('click', (e) => {
  if (currentPlayer !== 1) return;
  const coord = e.target.id.split(',').map(Number);
  player2.receiveAttack(coord);
  dom.clearBoard(player2BoardEl);
  dom.renderBoard(player2BoardEl, player2.getBoard());
  if (player2.hasLost()) {
    dom.displayWinner(player1.getName());
    dom.disableBoard(player1BoardEl);
    dom.disableBoard(player2BoardEl);
    return;
  }
  switchTurn();
  setTimeout(computerPlay, 500);
});

resetBtn.addEventListener('click', () => {
  location.reload();
});

initGame();
