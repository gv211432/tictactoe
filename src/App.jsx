import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner, isBoardSaturated } from './helpers';
import './styles/root.scss';

let ResetBtn = ({ resetFun }) => (
  <h3>
    <button
      onClick={() => {
        resetFun();
      }}
    >
      Click to reset
    </button>
  </h3>
);

export default () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(false);

  let winner = calculateWinner(board);
  let gameOver = isBoardSaturated(board);
  let toReset = () => {
    console.log('reset');
    setBoard(Array(9).fill(null));
    winner = null;
  };

  let message = winner
    ? `Winner is ${winner}`
    : `Next player is ${isXNext ? 'X' : 'O'}`;

  if (gameOver && winner == null) message = 'Game Over!!';

  const handleSqureClick = position => {
    if (board[position] != null) return;
    console.log(position);
    if (winner) return;
    setBoard(preBoard => {
      return preBoard.map((val, pos) => {
        if (pos == position) {
          setXNext(!isXNext);
          return isXNext ? 'X' : 'O';
        }
        return val;
      });
    });
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>
      {winner || isBoardSaturated(board) ? (
        <ResetBtn resetFun={toReset} />
      ) : (
        <h3>&nbsp;</h3>
      )}

      <Board board={board} handleSqureClick={handleSqureClick} />
    </div>
  );
};
