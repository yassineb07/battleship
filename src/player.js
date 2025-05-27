const Player = (name, game) => {
  const getName = () => {
    return name;
  };
  return Object.assign({}, { getName }, game);
};

export default Player;
