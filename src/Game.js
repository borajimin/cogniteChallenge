import React, { useState, useEffect } from "react";
import "./styles.css";

function Circle({ playTurn, col, color }) {
  return <div className={`Circle ${color}`} onClick={() => playTurn(col)} />;
}

function Game() {
  const [turn, setTurn] = useState(0);
  const [board, setBoard] = useState(
    new Array(6).fill(new Array(7).fill("black"))
  );
  const players = ["yellow", "red"];
  const numberOfConnect = 4;

  const getCurrentPlayer = () => {
    return players[turn % 2];
  };

  useEffect(() => {
    const hasHorizontalMatch = () => {
      const currentPlayer = getCurrentPlayer();
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          let count = 0;
          for (let i = 0; i < numberOfConnect; i++) {
            if (
              col + i < board[row].length &&
              board[row][col + i] === currentPlayer
            ) {
              count++;
            }
          }
          if (count === numberOfConnect) return true;
        }
      }
      return false;
    };

    const hasVerticalMatch = () => {
      const currentPlayer = getCurrentPlayer();
      for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length; row++) {
          let count = 0;
          for (let i = 0; i < numberOfConnect; i++) {
            if (
              row + i < board.length &&
              board[row + i][col] === currentPlayer
            ) {
              count++;
            }
          }
          if (count === numberOfConnect) return true;
        }
      }
      return false;
    };

    const hasLeftDiagonalMatch = () => {
      const currentPlayer = getCurrentPlayer();
      let row = 0;
      while (board.length - row > numberOfConnect) {
        let col = 0;
        while (board[row].length - col > numberOfConnect) {
          let count = 1;
          for (let i = 0; i < numberOfConnect; i++) {
            if (board[row + i][col + i] === currentPlayer) count++;
          }
          if (count === numberOfConnect) return true;
          col++;
        }
        row++;
      }
      return false;
    };

    const hasRightDiagonalMatch = () => {
      const currentPlayer = getCurrentPlayer();
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          let count = 0;
          for (let i = 0; i < numberOfConnect; i++) {
            if (row + i < board.length && col - i >= 0) {
              if (board[row + i][col - i] === currentPlayer) count++;
            }
          }
          if (count === numberOfConnect) return true;
        }
      }

      return false;
    };

    const hasWon = () => {
      //show the winner and restart the game
      const currentPlayer = getCurrentPlayer();

      console.log(currentPlayer, "is the winner!");
      setBoard(new Array(6).fill(new Array(7).fill("black")));
      setTurn(0);
    };

    if (
      hasHorizontalMatch() ||
      hasVerticalMatch() ||
      hasLeftDiagonalMatch() ||
      hasRightDiagonalMatch()
    ) {
      hasWon();
    } else {
      setTurn(turn + 1);
    }
  }, [board]);

  const playTurn = (col) => {
    const currentPlayer = getCurrentPlayer();
    const newBoard = board.map((a) => [...a]);
    let row = newBoard.length - 1;
    while (row > -1) {
      if (newBoard[row][col] === "black") {
        newBoard[row][col] = currentPlayer;
        break;
      }
      row--;
    }
    setBoard(newBoard);
  };

  return (
    <div className="Game">
      {board.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((item, j) => {
              return (
                <Circle
                  key={`${board[i][j]},${j}`}
                  playTurn={playTurn}
                  color={item}
                  col={j}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Game;
