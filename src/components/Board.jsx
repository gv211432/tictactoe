import React, { useState } from 'react';
import Square from './Square';

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(false);

  const handleSqureClick = position => {
    if (board[position] != null) return;
    console.log(position);
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
  const renderSquare = position => {
    return (
      <Square
        value={board[position]}
        onClick={() => handleSqureClick(position)}
      />
    );
  };
  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
