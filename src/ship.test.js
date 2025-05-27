import Ship from './ship';

// length prop tests
describe('length prop tests', () => {
  test('length prop valid', () => {
    const ship = Ship('ship', 3);
    expect(ship).toHaveLength(3);
  });

  test('length prop = 0', () => {
    const ship0 = Ship('ship0', 0);
    expect(ship0).toBeUndefined();
  });

  test('length prop negative ', () => {
    const shipN = Ship('shipN', -1);
    expect(shipN).toBeUndefined();
  });
});

// hit method tests
describe('hit tests', () => {
  const ship = Ship('ship', 3);

  test('No hits', () => {
    expect(ship.getHitCount()).toBe(0);
  });

  test('After somme hits', () => {
    ship.hit();
    ship.hit();
    expect(ship.getHitCount()).toBe(2);
  });
});

// isSunk method tests

describe('isSunk tests', () => {
  const ship = Ship('ship', 3);

  test('No hits', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('After somme hits ', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('Hits equals length ', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('Extra hits ', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
