import Square from "./Square";
import { useEffect } from "react";

function Board({ xIsNext, squares, onPlay, onStartTime, timerId }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (squares.every((sq) => sq === null)) {
      onStartTime();
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner || squares.every((sq) => sq)) {
      clearInterval(timerId);
    }
  }, [squares]);

  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const isWinningSquare = (index) => {
    return winner && winner.winningSquares.includes(index);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winningSquares: [a, b, c],
        };
      }
    }
    return null;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isWinning={isWinningSquare(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinning={isWinningSquare(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinning={isWinningSquare(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinning={isWinningSquare(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinning={isWinningSquare(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinning={isWinningSquare(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinning={isWinningSquare(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinning={isWinningSquare(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinning={isWinningSquare(8)}
        />
      </div>
    </>
  );
}

export default Board;
