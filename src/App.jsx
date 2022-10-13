import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const App = () => {
  // const for new game
  const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

  /* the useState() function returns an array of two elements: 
     1. the original argument passed to it
     2. a function used to update the initial state
  */
  // initial state of game: history is an array of objects.
  /* each object contains two elements: 
       1. board (array of 9 elements) to keep track of values of square-grids that are clicked on
        2. next element (either a X or a O) 
    */
  // the state of an element/component can be changed using events (for eg. the onClick method in Square.js)
  const [history, setHistory] = useState(NEW_GAME); // initial state

  const [currentMove, setCurrentMove] = useState(0); // to keep track of steps/moves in the game

  const current = history[currentMove];

  // function used to determine the winner
  const { winner, winningSquares } = calculateWinner(current.board); // returns winner (X or O) if there is one, (else null) and array containing pattern of winning squares (else empty array)

  // function to handle when a square-grid is clicked on
  const handleSquareClick = position => {
    // if viewing the history don't let game to continue
    if (history[history.length - 1].board != current.board) return;

    // check if the clicked square-grid has been clicked on before to prevent overwriting its value
    // also, if we have a winner, don't let the user play anymore
    if (current.board[position] || winner) {
      return;
    }

    // assign a 'X' or 'O' to the square-grid which is clicked on
    // the setHistory() function receives the history array which it further updates
    setHistory(prevState => {
      // the history (sent to this function) array is being referred to as prevState
      // prevState is the array containing current values of all 9 square-grids at their respective indices
      // map the array elements: assign a value to the grid which is clicked on

      const last = prevState[prevState.length - 1]; // getting the last element of the prevState (history) array

      const newBoard = last.board.map((square, index) => {
        if (index === position) {
          // if the index of the array matches the position of the grid clicked on, return 'X'
          return last.isXNext ? 'X' : 'O'; // used to change the value of grid clicked on. Value written is 'X' or 'O' based on what isXNext returns
        }
        return square; // else return square (do nothing)
      });

      return prevState.concat({
        board: newBoard,
        isXNext: !last.isXNext,
      }); // concatenating to history array
    });

    // update current move
    // the setCurrentMove() function receives the currentMove as an argument
    setCurrentMove(prevState => prevState + 1); // updating state of currentMove
  };

  // function to move to the current step
  const moveTo = move => {
    setCurrentMove(move);
  };

  // function to start a new game
  const onNewGame = () => {
    // resetting
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  const noMovesLeft = current.board.every(el => el !== null);

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage
        winner={winner}
        current={current}
        history={history}
        noMovesLeft={noMovesLeft}
      />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner || noMovesLeft ? 'active' : ''}`}
      >
        Start new game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
