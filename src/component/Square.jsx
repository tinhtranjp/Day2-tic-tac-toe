function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "bg-green-400" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
