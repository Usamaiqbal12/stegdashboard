import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PopupAlert from "../PopupAlert";
import "./SideBar.scss";
import { NavLink, Link } from "react-router-dom";
// import { woIconLogo } from "../../assets/images";
import newLogo from "../../assets/images/newLogo.png";
import { apiLogout, apiGetLogin } from "../../api/login";
import { Icon } from "../../components";
import { NewProject } from "../../components/Button";
import projectFolder from "../../assets/images/foldergrey.svg";
import downArrow from "../../assets/images/projectdownarrow.svg";
import upArrow from "../../assets/images/projectuparrow.svg";
import home from "../../assets/images/homegrey.svg";
import homeIconOrange from "../../assets/images/dashboardnewIcon.svg";
import settingIcon from "../../assets/images/settinggrey.svg";
import settingColorIcon from "../../assets/images/settingorange.svg";
import circleGreen from "../../assets/images/circlegreen.svg";
import circleYellow from "../../assets/images/circleyellow.svg";

// import { useAlert, types } from 'react-alert';

const { tokenName } = window.runConfig;

export const SideBar = ({ url, pathname }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dropdown, setshowdropdown] = useState(false);
  const [key, setkey] = useState(null);

  const alertRef = React.createRef();

  const signout = (e) => {
    apiLogout();
    window.location.href = "https://www.stegvision.com";
  };

  if (localStorage.getItem(tokenName) === null) {
    history.push("/");
  }

  const setLogin = (vals) => {
    setFirstName(vals.first_name);
    setLastName(vals.last_name);
  };

  useEffect(() => {
    apiGetLogin(setLogin);
  }, []);

  /*
  const dropdownlist = useRef(null);
  useEffect(() => {
    // console.log(do)
  });
  */

  const handleHelp = (e) => {
    e.preventDefault();

    alertRef.current.show({
      message: "Coming soon",
    });
  };

  // console.log(dropdownlist);

  return (
    <div className="sidebar ">
      <div>
        <div className="sidebar-top">
          <div className="sidebar-border">
            <div
              className="sidebar-logo"
              onClick={() => {
                history.push("/dashboard");
              }}
            ></div>
            <img style={{ width: 180 }} src={newLogo} alt="logo" />
          </div>
        </div>

        <div className="sidebar-tabs middle">
          <div className="sidebar-top-tabs">
            <div className="button-div">
              <NewProject />
            </div>
            <ul className="parent-tabs">
              <li>
                <NavLink
                  to={url}
                  exact={true}
                  isActive={(match, location) => {
                    match && setkey(1);
                    return match;
                  }}
                >
                  <img alt="..." src={key === 1 ? homeIconOrange : home}></img>
                  Dashboard
                </NavLink>
              </li>
              <li className={dropdown ? "dropdown" : ""}>
                <Link
                  to="/dashboard"
                  onClick={() => setshowdropdown(!dropdown)}
                >
                  {" "}
                  <img src={projectFolder} alt="iconfolder"></img>
                  Projects
                  {dropdown ? (
                    <img src={upArrow} alt="img" className="img-arrow"></img>
                  ) : (
                    <img src={downArrow} alt="img" className="img-arrow"></img>
                  )}
                </Link>
                <ul style={{ display: dropdown === false ? "none" : "block" }}>
                  <li>
                    <NavLink
                      to={`${url}/live`}
                      activeClassName="color-green"
                      isActive={(match, location) => {
                        match && setkey(3);
                        return match;
                      }}
                    >
                      {key === 3 ? (
                        <img src={circleGreen} alt="circleimg"></img>
                      ) : (
                        <span className="icon-whitecircle"></span>
                      )}
                      Live Projects
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/processing`}
                      activeClassName="color-yellow"
                      isActive={(match, location) => {
                        match && setkey(4);
                        return match;
                      }}
                    >
                      {key === 4 ? (
                        <img src={circleYellow} alt="circleimg"></img>
                      ) : (
                        <span className="icon-whitecircle dots"></span>
                      )}
                      Processing Projects
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to={`${url}/setting`}
                  exact={true}
                  isActive={(match, location) => {
                    match && setkey(2);
                    return match;
                  }}
                >
                  {key === 2 ? (
                    <img src={settingColorIcon} alt="homeimg"></img>
                  ) : (
                    <img src={settingIcon} alt="iconfolder"></img>
                  )}
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="user-short-detail-div">
          <div className="user-front-div">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
          <div className="user-short-detail">
            <p className="user-name">
              {firstName} {lastName}
            </p>
            <p className="join-date">Member since 2022</p>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-footer-inner-div">
            <span onClick={signout}>
              <Icon name="faPowerOff" className="signout-icon" />
              <Link to="" className="signout" onClick={signout}>
                Sign out
              </Link>
            </span>
            <span>
              <Link className="help" to="/help" onClick={handleHelp}>
                Help?
              </Link>
            </span>
          </div>
        </div>
        <PopupAlert ref={alertRef} />
      </div>
    </div>
  );
};
