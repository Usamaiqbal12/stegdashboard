import React from "react";
import tick from "../../assets/images/Fill.svg";
import "./TestButton.scss";

export function TestButton(props) {
  return (
    <button
      className="btn btn-info Tick-btun"
      onClick={props.onclick}
      // style={{ width: "57px", height: "36px" }}
    >
      {props.state === "on" ? (
        <span className="icon-lock tick-icon"></span>
      ) : (
        <img src={tick} alt="tick" className="tick-icon" />
      )}
      <span className="tick-text">Test</span>
    </button>
  );
}
