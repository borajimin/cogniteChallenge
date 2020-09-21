import React, { Component } from "react";
import PlayerInfo from "./PlayerInfo";

export default class PlayAgain extends Component {
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
