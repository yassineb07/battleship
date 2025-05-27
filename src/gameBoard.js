function GameBoard() {
  const gameBoard = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  const ships = [];
  const hits = [];

  const getShips = () => {
    return ships;
  };

  const getHits = () => {
    return hits;
  };

  const getBoard = () => {
    return gameBoard;
  };

  const getBoardCell = ([x, y]) => {
    return gameBoard[x][y];
  };

  const setBoardCell = ([x, y], value) => {
    gameBoard[x][y] = value;
  };

  const isBoardCellEmpty = ([x, y]) => {
    // return true if board cell is empty
    return gameBoard[x][y] === null;
  };

  const isInRange = ([x, y]) => {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  };

  const calculatePlacement = (shipLength, [x, y]) => {
    // return an array of cells to be occupied by the ship
    const coords = [];
    for (let i = 0; i < shipLength; i++) {
      coords.push([x, y]);
      y++;
    }
    return coords;
  };

  const placeShip = (ship, [x, y]) => {
    const shipCoords = calculatePlacement(ship.length, [x, y]);
    if (!shipCoords.every(isInRange)) return;
    if (!shipCoords.every(isBoardCellEmpty)) return;
    shipCoords.forEach((coord) => {
      setBoardCell([coord[0], coord[1]], ship.id);
    });
    ships.push(ship);
  };

  const receiveAttack = ([x, y]) => {
    if (hits.includes([x, y].toString())) return;
    if (isBoardCellEmpty([x, y])) {
      setBoardCell([x, y], 'missed');
    } else if (
      !(isBoardCellEmpty([x, y]) && getBoardCell([x, y]) === 'missed')
    ) {
      const shipId = getBoardCell([x, y]);
      const ship = ships.find((ship) => ship.id === shipId);
      ship.hit();
    }
    hits.push([x, y].toString());
  };

  const hasLost = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    getShips,
    getHits,
    getBoard,
    hasLost,
    placeShip,
    receiveAttack,
  };
}

export { GameBoard };
