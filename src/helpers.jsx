// mathches with the predifined patter for winners
let calculateWinner = squares => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// check if board is empty or not, returns true if board id full
let isBoardSaturated = board => {
  for (let b in board) {
    if (board[b] == null) return false;
  }
  return true;
};

export { isBoardSaturated, calculateWinner };
