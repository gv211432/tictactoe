import React from 'react';

const StatusMessage = ({ winner, current, history, noMovesLeft }) => {
  return (
    <div className="status-message">
      {winner && (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          {history[history.length - 1].board != current.board ? (
            <span style={{ color: '#e15555', fontWeight: 'bold' }}>
              History{' '}
            </span>
          ) : null}
          Next player:
          <span className={current.isXNext ? 'text-green' : 'text-orange'}>
            {current.isXNext ? ' X' : ' O'}
          </span>
        </>
      )}
      {!winner && noMovesLeft && (
        <>
          <span className="text-green" style={{ fontWeight: 'bold' }}>
            X
          </span>{' '}
          and
          <span className="text-orange" style={{ fontWeight: 'bold' }}>
            {' '}
            O
          </span>{' '}
          tied
        </>
      )}
    </div>
  );
};

export default StatusMessage;
