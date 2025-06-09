import './styles.css';
import Player from './player';
import Ship from './ship';
import GameBoard from './gameBoard';
import Dom from './dom';

const dom = Dom();
const player1BoardEl = document.getElementById('player1GameBoardEl');
const player2BoardEl = document.getElementById('player2GameBoardEl');
const resetBtn = document.getElementById('resetBtn');
const player1NameEl = document.getElementById('player1NameEl');
const player2NameEl = document.getElementById('player2NameEl');

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
  let x, y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    player2.placeShip(computerShips[0], [x, y]);
    if (!player2.getShips().includes(computerShips[0])) continue;
    computerShips.shift();
  } while (computerShips.length > 0);
};

const initGame = () => {
  initComputerShips();
  dom.clearBoard(player1BoardEl);
  dom.clearBoard(player2BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  dom.renderBoard(player2BoardEl, player2.getBoard());
  dom.renderShots(player1BoardEl, player1.getShots());
  dom.renderShots(player2BoardEl, player2.getShots());
  dom.enableBoard(player2BoardEl);
  dom.disableBoard(player1BoardEl);
  dom.showGameStatus('Game Started');
};

const computerPlay = () => {
  let x, y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (player1.getShots().some((obj) => obj.coord === [x, y].toString()));

  player1.receiveAttack([x, y]);
  dom.clearBoard(player1BoardEl);
  dom.renderBoard(player1BoardEl, player1.getBoard());
  dom.renderShots(player1BoardEl, player1.getShots());
  if (player1.hasLost()) {
    dom.showGameStatus(`${player2.getName()} Wins`);
    dom.disableBoard(player1BoardEl);
    dom.disableBoard(player2BoardEl);
    return;
  }
  switchTurn();
};

const switchTurn = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer === 1) {
    dom.hideCurrentPlayer(player2NameEl);
    dom.showCurrentPlayer(player1NameEl);
    dom.enableBoard(player2BoardEl);
    dom.disableBoard(player1BoardEl);
  } else {
    dom.hideCurrentPlayer(player1NameEl);
    dom.showCurrentPlayer(player2NameEl);
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
  dom.renderShots(player1BoardEl, player1.getShots());
  if (playerShips.length === 0) {
    placingShips = false;
    player1BoardEl.removeEventListener('click', placeShips);
    initGame();
  }
};

// start game

dom.renderBoard(player1BoardEl, player1.getBoard());
dom.renderBoard(player2BoardEl, player2.getBoard());
dom.renderShots(player1BoardEl, player1.getShots());
dom.renderShots(player2BoardEl, player2.getShots());
dom.showGameStatus('Place your ships');

player1BoardEl.addEventListener('click', placeShips);

player2BoardEl.addEventListener('click', (e) => {
  if (currentPlayer !== 1) return;
  const coord = e.target.id.split(',').map(Number);
  player2.receiveAttack(coord);
  dom.clearBoard(player2BoardEl);
  dom.renderBoard(player2BoardEl, player2.getBoard());
  dom.renderShots(player2BoardEl, player2.getShots());
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
