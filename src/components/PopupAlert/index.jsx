import React, { Component } from "react";
import Dialog from "react-bootstrap-dialog";

class PopupAlert extends Component {
  show(args) {
    const cBody = (
      <p
        style={{
          fontSize: "15px",
          margin: "5px"
        }}
      >
        {args.message}
      </p>
    );

    const actions = [
      Dialog.Action("OK", args.callback, "btn-warning")
    ]

    if (args.cancel_callback) {
      actions.push(Dialog.Action("Cancel", args.cancel_callback, "btn-danger"))
    }

    this.dialog.show({
      body: cBody,
      actions,
      onHide: () => {}
    });
  }

  render() {
    return (
      <Dialog
        ref={component => {
          this.dialog = component;
        }}
      />
    );
  }
}

export default PopupAlert;