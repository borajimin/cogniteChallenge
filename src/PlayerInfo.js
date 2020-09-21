import React, { Component } from "react";

export default class PlayerInfo extends Component {
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
