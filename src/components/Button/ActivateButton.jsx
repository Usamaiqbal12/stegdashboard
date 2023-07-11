import React from "react";
import "./ActivateButton.scss";

export function ActivateButton(props) {
  const cls =
    props.state === "active"
      ? "btn btn-danger deactivation-btun"
      : "btn btn-success activation-btun";

  return (
    <button className={cls} onClick={props.onclick}>
      {props.label}
    </button>
  );
}
