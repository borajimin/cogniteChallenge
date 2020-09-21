import React, { Component } from "react";
import "./styles.css";

const defaultColor = "black";
const players = ["yellow", "red", "blue", "green"];

/*
What I want to do

1. intro page that collects the game info i.e. num of players, num of connects :)
2. outro page that shows who won the game and asks the users if they want to play again. :)
3. build an ai to play with.
4. highlight the winning sequence.
5. style the board to look more like the board game.:)
6. Change the colors for hovering each columns and show possible positions.:)
7. use socket io to play cross browsers.
8. Player info :)
*/

class Circle extends Component {
  render() {
    const {
      color,
      playTurn,
      col,
      hovered,
      hoverColumn,
      unHoverColumn
    } = this.props;
    return (
      <div
        className={`CircleWrapper ${hovered && "hover"}`}
        onMouseEnter={() => hoverColumn(col)}
        onMouseLeave={() => unHoverColumn()}
        onClick={() => playTurn(col)}
      >
        <div className={`Circle ${color}`} />
      </div>
    );
  }
}

class PlayerInfo extends Component {
  render() {
    const { currentPlayer, hasWon, isTied, children } = this.props;
    let playerInfo = "Player Info: ";
    playerInfo = hasWon ? "Winner: " : playerInfo;
    playerInfo = isTied ? "No Winner ¯\\_(ツ)_/¯" : playerInfo;
    return (
      <div className={`PlayerInfoWrapper ${children && "modal"}`}>
        <h2>{playerInfo}</h2>
        {!isTied && <div className={`PlayerInfo ${currentPlayer}`} />}
        {children}
      </div>
    );
  }
}

class PlayAgain extends Component {
  render() {
    const { showIntro, currentPlayer, hasWon, isTied } = this.props;
    const playAgainButton = (
      <div className="PlayAgain" onClick={() => showIntro()}>
        <h2>Play Again</h2>
      </div>
    );
    return (
      <div className="PlayAgainWrapper modalBackground">
        <PlayerInfo
          currentPlayer={currentPlayer}
          hasWon={hasWon}
          isTied={isTied}
          children={playAgainButton}
        />
      </div>
    );
  }
}

class Intro extends Component {
  render() {
    const {
      setNumberOfConnect,
      setNumberOfPlayers,
      setBoardWidth,
      setBoardHeight,
      startGame
    } = this.props;

    return (
      <div className="IntroWrapper modalBackground">
        <div className="Intro modal">
          <div className="numberOfConnect">
            <h2>Number of Connects: </h2>
            <select
              name="numberOfConnect"
              onChange={(e) => setNumberOfConnect(e)}
            >
              <option autoFocus value={4}>
                4
              </option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </div>
          <div className="numberOfPlayers">
            <h2>Number of Players: </h2>
            <select
              name="numberOfPlayers"
              onChange={(e) => setNumberOfPlayers(e)}
            >
              <option autoFocus value={2}>
                2
              </option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <div className="boardWidth">
            <h2>Board Width: </h2>
            <select name="boardWidth" onChange={(e) => setBoardWidth(e)}>
              <option autoFocus value={7}>
                7
              </option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="boardWidth">
            <h2>Board Height: </h2>
            <select name="boardHeight" onChange={(e) => setBoardHeight(e)}>
              <option autoFocus value={6}>
                6
              </option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </select>
          </div>
          <div className="playGame" onClick={startGame}>
            <h2>Play Game</h2>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      board: new Array(6).fill(new Array(7).fill(defaultColor)),
      hoveredColumn: -1,
      hasWon: false,
      isTied: false,
      numberOfConnect: 4,
      numberOfPlayers: 2,
      boardWidth: 7,
      boardHeight: 6,
      introVisible: true
    };
  }

  getCurrentPlayer = () => {
    const { turn, numberOfPlayers } = this.state;
    return players[turn % numberOfPlayers];
  };

  hasHorizontalMatch = () => {
    const {
      state: { board, numberOfConnect },
      getCurrentPlayer
    } = this;
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

  hasVerticalMatch = () => {
    const {
      state: { board, numberOfConnect },
      getCurrentPlayer
    } = this;
    const currentPlayer = getCurrentPlayer();
    for (let col = 0; col < board[0].length; col++) {
      for (let row = 0; row < board.length; row++) {
        let count = 0;
        for (let i = 0; i < numberOfConnect; i++) {
          if (row + i < board.length && board[row + i][col] === currentPlayer) {
            count++;
          }
        }
        if (count === numberOfConnect) return true;
      }
    }
    return false;
  };

  hasLeftDiagonalMatch = () => {
    const {
      state: { board, numberOfConnect },
      getCurrentPlayer
    } = this;
    const currentPlayer = getCurrentPlayer();

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        let count = 0;
        for (let i = 0; i < numberOfConnect; i++) {
          if (
            row + i < board.length &&
            col + i < board[row].length &&
            board[row + i][col + i] === currentPlayer
          ) {
            count++;
          }
        }
        if (count === numberOfConnect) return true;
      }
    }
    return false;
  };

  hasRightDiagonalMatch = () => {
    const {
      state: { board, numberOfConnect },
      getCurrentPlayer
    } = this;
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

  isFull = () => {
    const { board } = this.state;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === defaultColor) {
          return false;
        }
      }
    }
    return true;
  };

  isTied = () => {
    this.setState({
      isTied: true
    });
  };

  hasWon = () => {
    this.setState({
      hasWon: true
    });
  };

  showIntro = () => {
    this.setState({
      turn: 0,
      hasWon: false,
      isTied: false,
      hoverColumn: -1,
      introVisible: true,
      numberOfConnect: 4,
      numberOfPlayers: 2,
      boardWidth: 7,
      boardHeight: 6
    });
  };

  hoverColumn = (col) => {
    this.setState({ hoveredColumn: col });
  };

  unHoverColumn = () => {
    this.setState({ hoverColumn: -1 });
  };

  setNumberOfConnect = (event) => {
    this.setState({ numberOfConnect: parseInt(event.target.value, 10) });
  };

  setNumberOfPlayers = (event) => {
    this.setState({ numberOfPlayers: parseInt(event.target.value, 10) });
  };

  setBoardWidth = (event) => {
    this.setState({ boardWidth: parseInt(event.target.value, 10) });
  };

  setBoardHeight = (event) => {
    this.setState({ boardHeight: parseInt(event.target.value, 10) });
  };

  startGame = () => {
    const { boardWidth, boardHeight } = this.state;
    this.setState({
      board: new Array(boardHeight).fill(
        new Array(boardWidth).fill(defaultColor)
      ),
      introVisible: false
    });
  };

  playTurn = (col) => {
    const {
      state: { board, turn },
      hasHorizontalMatch,
      hasVerticalMatch,
      hasLeftDiagonalMatch,
      hasRightDiagonalMatch,
      getCurrentPlayer,
      hasWon,
      isFull,
      isTied
    } = this;
    const currentPlayer = getCurrentPlayer();
    const newBoard = board.map((a) => [...a]);
    // Place the currentPlayer's chip on the correct column.
    let row = newBoard.length - 1;
    while (row > -1) {
      if (newBoard[row][col] === defaultColor) {
        newBoard[row][col] = currentPlayer;
        break;
      } else if (row === 0) {
        return;
      }
      row--;
    }
    this.setState(
      {
        board: newBoard
      },
      () => {
        if (
          hasHorizontalMatch() ||
          hasVerticalMatch() ||
          hasLeftDiagonalMatch() ||
          hasRightDiagonalMatch()
        ) {
          hasWon();
        } else if (isFull()) {
          isTied();
        } else {
          this.setState({ turn: turn + 1 });
        }
      }
    );
  };

  render() {
    const {
      state: { board, hoveredColumn, hasWon, isTied, introVisible },
      playTurn,
      hoverColumn,
      unHoverColumn,
      getCurrentPlayer,
      showIntro,
      setNumberOfConnect,
      setBoardHeight,
      setBoardWidth,
      setNumberOfPlayers,
      startGame
    } = this;
    const currentPlayer = getCurrentPlayer();

    return (
      <>
        {introVisible && (
          <Intro
            setNumberOfConnect={setNumberOfConnect}
            setNumberOfPlayers={setNumberOfPlayers}
            setBoardHeight={setBoardHeight}
            setBoardWidth={setBoardWidth}
            startGame={startGame}
          />
        )}
        {(hasWon || isTied) && (
          <PlayAgain
            showIntro={showIntro}
            currentPlayer={currentPlayer}
            hasWon={hasWon}
            isTied={isTied}
          />
        )}
        <PlayerInfo
          currentPlayer={currentPlayer}
          hasWon={hasWon}
          isTied={isTied}
        />
        <div className="Game">
          {board.map((row, i) => {
            return (
              <div className="row" key={i}>
                {row.map((item, j) => {
                  return (
                    <Circle
                      key={`${i},${j}`}
                      playTurn={playTurn}
                      hovered={hoveredColumn === j}
                      hoverColumn={hoverColumn}
                      unHoverColumn={unHoverColumn}
                      color={item}
                      col={j}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="leftFooter" />
          <div className="rightFooter" />
        </div>
      </>
    );
  }
}

export default Game;
