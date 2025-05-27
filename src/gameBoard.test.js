import { GameBoard } from './gameBoard';
import { Ship } from './ship';

const game = GameBoard();

//  placeShip method tests
describe('placeShip method tests', () => {
  const ship1 = Ship('ship1', 2);
  const ship2 = Ship('ship2', 4);
  const ship3 = Ship('ship3', 3);

  test('basic placement', () => {
    game.placeShip(ship1, [5, 5]);
    game.placeShip(ship2, [6, 4]);
    expect(game.getBoard()[5][5]).toBe('ship1');
    expect(game.getBoard()[5][6]).toBe('ship1');
    expect(game.getBoard()[6][4]).toBe('ship2');
    expect(game.getBoard()[6][5]).toBe('ship2');
    expect(game.getBoard()[6][6]).toBe('ship2');
    expect(game.getBoard()[6][7]).toBe('ship2');
  });

  test('overlapping placement', () => {
    game.placeShip(ship3, [6, 7]);
    expect(game.getBoard()[6][7]).toBe('ship2');
    expect(game.getBoard()[6][8]).toBe(null);
    expect(game.getBoard()[6][9]).toBe(null);
  });

  test('out of range placement', () => {
    game.placeShip(ship2, [9, 9]);
    expect(game.getBoard()[9][9]).toBe(null);
  });
});

//  receiveAttack method tests
describe('receiveAttack method tests', () => {
  test('Missed ship', () => {
    game.receiveAttack([0, 0]);
    game.receiveAttack([3, 2]);
    game.receiveAttack([9, 8]);
    expect(game.getBoard()[0][0]).toBe('missed');
    expect(game.getBoard()[3][2]).toBe('missed');
    expect(game.getBoard()[9][8]).toBe('missed');
  });

  test('Hit ship', () => {
    expect(game.getShips()[0].getHitCount()).toBe(0);
    expect(game.getShips()[1].getHitCount()).toBe(0);
    game.receiveAttack([5, 5]);
    game.receiveAttack([6, 6]);
    expect(game.getShips()[0].getHitCount()).toBe(1);
    expect(game.getShips()[1].getHitCount()).toBe(1);
    game.receiveAttack([6, 7]);
    expect(game.getShips()[1].getHitCount()).toBe(2);
  });
});

//  isGameOver method tests
describe('isGameOver method tests', () => {
  test('is game over', () => {
    expect(game.getShips()).toHaveLength(2);

    game.receiveAttack([5, 6]);
    game.receiveAttack([6, 4]);
    game.receiveAttack([6, 5]);
    expect(game.hasLost()).toBe(true);
  });
});
