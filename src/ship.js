function Ship(id, length) {
  if (length <= 0 || !Number.isSafeInteger(length)) return;
  let hitCount = 0;

  const getHitCount = () => {
    return hitCount;
  };

  const hit = () => {
    hitCount++;
  };

  const isSunk = () => {
    return length <= hitCount;
  };

  return { id, length, getHitCount, hit, isSunk };
}

export { Ship };
