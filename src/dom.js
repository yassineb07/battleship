const Dom = () => {
  const createBoardCell = () => {
    const cell = document.createElement('div');
    cell.className = 'board-cell';
    return cell;
  };

  const clearBoard = (gameBoard) => {
    while (gameBoard.hasChildNodes()) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
  };

  const enableBoard = (boardEl) => {
    boardEl.style.pointerEvents = 'auto';
    boardEl.style.opacity = '1';
  };

  const disableBoard = (boardEl) => {
    boardEl.style.pointerEvents = 'none';
    boardEl.style.opacity = '0.5';
  };

  const renderBoard = (gameBoardEl, gameBoard) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const value = gameBoard[i][j];
        const cellEl = createBoardCell();
        cellEl.id = [i, j].toString();
        cellEl.setAttribute('data', value);
        gameBoardEl.appendChild(cellEl);
      }
    }
  };

  return { clearBoard, enableBoard, disableBoard, renderBoard };
};

export default Dom;
