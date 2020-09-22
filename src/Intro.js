import React, { Component } from "react";

export default class Intro extends Component {
  render() {
    const {
      setNumberOfConnect,
      setNumberOfPlayers,
      setBoardWidth,
      setBoardHeight,
      toggleUseAI,
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
          <div className="toggleUseAI" onClick={toggleUseAI}>
            Enable AI Players
          </div>
          <div className="playGame" onClick={startGame}>
            <h2>Play Game</h2>
          </div>
        </div>
      </div>
    );
  }
}
