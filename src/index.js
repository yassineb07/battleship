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

const playerShips = [
  Ship('ship1', 1),
  Ship('ship2', 2),
  Ship('ship3', 3),
  Ship('ship4', 4),
];
const computerShips = [
  Ship('ship1', 1),
  Ship('ship2', 2),
  Ship('ship3', 3),
  Ship('ship4', 4),
];

const initComputerShips = () => {
  player2.placeShip(computerShips[0], [8, 7]);
  player2.placeShip(computerShips[1], [1, 3]);
  player2.placeShip(computerShips[2], [3, 3]);
  player2.placeShip(computerShips[3], [6, 3]);
};

const initGame = () => {
  initComputerShips();
  dom.clearBoard(player1BoardEl);
  dom.clearBoard(player2BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  dom.renderBoard(player2BoardEl, player2.getBoard());
  dom.enableBoard(player2BoardEl);
  dom.disableBoard(player1BoardEl);
  dom.showGameStatus('Game Started');
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

let placingShips = true;
const placeShips = (e) => {
  if (!placingShips) return;
  const coord = e.target.id.split(',').map(Number);
  player1.placeShip(playerShips[0], coord);
  if (!player1.getShips().includes(playerShips[0])) return;
  playerShips.shift();
  dom.clearBoard(player1BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  if (playerShips.length === 0) {
    placingShips = false;
    player1BoardEl.removeEventListener('click', placeShips);
    initGame();
  }
};

// start game

dom.renderBoard(player1BoardEl, player1.getBoard());
dom.renderBoard(player2BoardEl, player2.getBoard());
dom.showGameStatus('Place your ships');

player1BoardEl.addEventListener('click', placeShips);

player2BoardEl.addEventListener('click', (e) => {
  if (currentPlayer !== 1) return;
  const coord = e.target.id.split(',').map(Number);
  player2.receiveAttack(coord);
  dom.clearBoard(player2BoardEl);
  dom.renderBoard(player2BoardEl, player2.getBoard());
  if (player2.hasLost()) {
    dom.showGameStatus(`${player1.getName()} Wins`);
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
