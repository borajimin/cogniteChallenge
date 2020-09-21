import React, { Component } from "react";

export default class Circle extends Component {
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
