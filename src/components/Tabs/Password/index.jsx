import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../Button";
import { AlertTemplate } from "../../Alert";
import PopupAlert from "../../PopupAlert";
import { apiLogin, apiSetPassword } from "../../../api/login";
import { validate } from "../../../api/password";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import hide from "../../../assets/images/Hide.svg";
// import { faEye } from "@fortawesome/fontawesome-free-regular";
import "./Password.scss";

function Password() {
  const history = useHistory();

  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const alertRef = React.createRef();

  const goToDashboard = () => {
    history.push("/dashboard");
  };

  const success = () => {
    alertRef.current.show({
      message: "Password updated",
      callback: goToDashboard,
    });
  };

  const failure = (e) => {
    setAlertMessage("Setting new password failed: " + e);
  };

  const setNew = () => {
    apiSetPassword(newPassword, success, failure);
  };

  const invalidCurrent = () => {
    setAlertMessage("Invalid current password");
  };

  const change = (e) => {
    const { emailName } = window.runConfig;
    const email = localStorage.getItem(emailName);

    if (current === "" || newPassword === "" || confirm === "") {
      setAlertMessage("Passwords cannot be empty");
      return;
    }

    if (newPassword !== confirm) {
      setAlertMessage("Confirmation password not equal to new password");
      return;
    }

    if (newPassword === current) {
      setAlertMessage("New password equal to old password");
      return;
    }

    const res = validate(newPassword);
    if (!res[0]) {
      setAlertMessage(res[1]);
      return;
    }

    apiLogin(email, current, setNew, invalidCurrent);
  };

  return (
    <div className="password">
      {alertMessage !== "" ? (
        <AlertTemplate options={{ type: "error" }} message={alertMessage} />
      ) : null}
      <h3 className="password-h3">Change Password</h3>
      <div className="password-divs">
        <div className="password-input-div">
          <div className="form-floating">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Current Password"
            />
          </div>
          <div className="form-floating ">
            <label htmlFor="new-password">Enter New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <span
              className="field-eye-icon"
              onClick={() => setPassword(!showPassword)}
            >
              {showPassword === true ? (
                <FontAwesomeIcon icon={faEye} size="1.5x" />
              ) : (
                <img src={hide} alt="img" className="eye-icon"></img>
              )}
            </span>
            <span className="pass">Must be at least 8 characters</span>
          </div>
          <div className="form-floating extra-margin">
            <label htmlFor="c-new-password">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              id="c-new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm New Password"
            />
            <span
              className="field-eye-icon"
              onClick={() => setConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword === true ? (
                <FontAwesomeIcon icon={faEye} font-size={"2rem"} />
              ) : (
                <img src={hide} alt="img" className="eye-icon"></img>
              )}
            </span>
            <span className="pass">Both passwords must match</span>
          </div>
        </div>
        <div className="pass-list-div">
          <div className="pw-list">
            <p>Password must:</p>
            <div>
              <ul>
                <li>Be at least 8 characters long</li>
                <li>Have at least one uppercase </li>
                <li>Have at least one lowercase</li>
                <li>Have at least one number</li>
                <li>Must be different from previous one</li>
              </ul>
            </div>
          </div>
        </div>
        <PopupAlert ref={alertRef} />
      </div>

      <div className="n-btn">
        <Button name="Change Password" onclick={change} />
      </div>
    </div>
  );
}

export { Password };
