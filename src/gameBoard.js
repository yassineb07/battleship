function GameBoard() {
  const gameBoard = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  const ships = [];
  const shots = [];

  const getShips = () => {
    return ships;
  };

  const getShots = () => {
    return shots;
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
    if (shots.some((obj) => obj.coord === [x, y].toString())) return;
    if (isBoardCellEmpty([x, y])) {
      shots.push({ type: 'miss', coord: [x, y].toString() });
    } else {
      const shipId = getBoardCell([x, y]);
      const ship = ships.find((ship) => ship.id === shipId);
      ship.hit();
      shots.push({ type: 'hit', coord: [x, y].toString() });
    }
  };

  const hasLost = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    getShips,
    getShots,
    getBoard,
    hasLost,
    placeShip,
    receiveAttack,
  };
}

export default GameBoard;
