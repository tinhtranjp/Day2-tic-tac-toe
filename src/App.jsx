import Board from "./component/Board";
import { useRef, useState } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), time: 0 },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, time: time },
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setTime(history[nextMove].time);
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let timerId = useRef();
  function handleStart() {
    if (time === 0) {
      timerId.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
  }
  return (
    <>
      <h1 className="text-green-500 text-center mt-28 mb-4">Tic Tac Toe</h1>
      <p className="text-center mb-12">Time: {time < 10 ? `0${time}` : time}</p>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            onStartTime={handleStart}
            timerId={timerId.current}
          />
        </div>
        <div className="game-info">
          <ol className="list-decimal  ml-12">{moves}</ol>
        </div>
      </div>
    </>
  );
}
