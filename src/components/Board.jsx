import React from 'react';
import Square from './Square';

export default function Board({ board, handleSquareClick, winningSquares }) {
  const renderSquare = position => {
    // boolean const to check if the array consist of winningSquares
    const isWinningSquare = winningSquares.includes(position);

    return (
      <Square
        value={board[position]}
        updateStateFunction={() => {
          handleSquareClick(position);
        }}
        isWinningSquare={isWinningSquare}
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
