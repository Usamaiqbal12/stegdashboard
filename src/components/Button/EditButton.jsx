import React from "react";
import fill from "../../assets/images/Edit.svg";
import "./EditButton.scss";

export function EditButton(props) {
  return (
    <button className="btn btn-warning pencil-btun" onClick={props.onclick}>
      <img src={fill} alt="img" className="edit-icon"></img>
      <span className="edit-text">Edit</span>
    </button>
  );
}
