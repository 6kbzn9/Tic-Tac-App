import React, { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./helpers";
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
import "/src/index.scss";

const App = () => {
  const NEW_GAME = [
    {
      board: Array(9).fill(null),
      isXNext: true,
    },
  ];
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((val, pos) => {
        if (pos === position) {
          return last.isXNext ? "X" : "O";
        }
        return val;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove((prev) => prev + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };
  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        Tic <span className="text-green">Tac</span> Toe
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        onclick={handleSquareClick}
        board={current.board}
        winningSquares={winningSquares}
      />
      <button
        className={`btn-reset ${winner ? "active" : ""}`}
        type="button"
        onClick={onNewGame}
      >
        Starte New Game
      </button>
      <h2 styles={{ fontWeight: "normal" }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
