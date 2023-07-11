import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PopupAlert from '../PopupAlert';
import './SideBar.scss';
import { NavLink, Link } from 'react-router-dom';
// import { woIconLogo } from "../../assets/images";
import newLogo from '../../assets/images/newLogo.png';
import { apiLogout, apiGetLogin } from '../../api/login';
import { Icon } from '../../components';
import { NewProject } from '../../components/Button';
import projectFolder from '../../assets/images/foldergrey.svg';
import downArrow from '../../assets/images/projectdownarrow.svg';
import upArrow from '../../assets/images/projectuparrow.svg';
import home from '../../assets/images/homegrey.svg';
import homeIconOrange from '../../assets/images/dashboardnewIcon.svg';
import settingIcon from '../../assets/images/settinggrey.svg';
import settingColorIcon from '../../assets/images/settingorange.svg';
import circleGreen from '../../assets/images/circlegreen.svg';
import circleYellow from '../../assets/images/circleyellow.svg';

// import { useAlert, types } from 'react-alert';

const { tokenName } = window.runConfig;

export const SideBar = ({ url, pathname }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dropdown, setshowdropdown] = useState(false);
  const [key, setkey] = useState(null);

  const alertRef = React.createRef();

  const signout = (e) => {
    apiLogout();
    window.location.href = 'https://www.stegvision.com';
  };

  if (localStorage.getItem(tokenName) === null) {
    history.push('/');
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
      message: 'Coming soon',
    });
  };

  // console.log(dropdownlist);

  return (
    <div className="sidebar ">
      <div>
        <div className="sidebar-top">
          <div
            className="sidebar-logo"
            onClick={() => {
              history.push('/dashboard');
            }}
          ></div>
          <img style={{ width: 180 }} src={newLogo} alt="logo" />
        </div>

        <div className="sidebar-tabs middle active">
          <div className="sidebar-top-tabs">
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
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NewProject />
              </li>
              <li>
                <NavLink
                  to={`${url}/live`}
                  activeClassName="color-green"
                  isActive={(match, location) => {
                    match && setkey(3);
                    return match;
                  }}
                >
                  {/* {key === 3 ? (
                    <img src={circleGreen} alt="circleimg"></img>
                  ) : (
                    <span className="icon-whitecircle"></span>
                  )} */}
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
                  {/* {key === 4 ? (
                    <img src={circleYellow} alt="circleimg"></img>
                  ) : (
                    <span className="icon-whitecircle dots"></span>
                  )} */}
                  In Work
                </NavLink>
              </li>
              <li>
                <a href="" onClick={signout} style={{ padding: 0 }}>
                  {/* <Icon name="faPowerOff" className="signout-icon" /> */}
                  <Link to="" className="signout" onClick={signout}>
                    Log out
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <div className="user-short-detail-div">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0133 21.6867C14.46 21.6867 12.9067 21.44 11.4333 20.9467C10.8733 20.7533 10.4467 20.36 10.26 19.8467C10.0667 19.3333 10.1333 18.7667 10.44 18.26L11.2067 16.9867C11.3667 16.72 11.5133 16.1867 11.5133 15.8733V13.9467C11.5133 11.4667 13.5333 9.44666 16.0133 9.44666C18.4933 9.44666 20.5133 11.4667 20.5133 13.9467V15.8733C20.5133 16.18 20.66 16.72 20.82 16.9933L21.58 18.26C21.8667 18.74 21.92 19.32 21.7267 19.8467C21.5333 20.3733 21.1133 20.7733 20.5867 20.9467C19.12 21.44 17.5667 21.6867 16.0133 21.6867ZM16.0133 10.4467C14.0867 10.4467 12.5133 12.0133 12.5133 13.9467V15.8733C12.5133 16.36 12.3133 17.08 12.0667 17.5L11.3 18.7733C11.1533 19.02 11.1133 19.28 11.2 19.5C11.28 19.7267 11.48 19.9 11.7533 19.9933C14.54 20.9267 17.4933 20.9267 20.28 19.9933C20.52 19.9133 20.7067 19.7333 20.7933 19.4933C20.88 19.2533 20.86 18.9933 20.7267 18.7733L19.96 17.5C19.7067 17.0667 19.5133 16.3533 19.5133 15.8667V13.9467C19.5133 12.0133 17.9467 10.4467 16.0133 10.4467Z"
                fill="black"
              />
              <path
                d="M17.2533 10.6267C17.2067 10.6267 17.16 10.62 17.1133 10.6067C16.92 10.5533 16.7333 10.5133 16.5533 10.4867C15.9867 10.4133 15.44 10.4533 14.9267 10.6067C14.74 10.6667 14.54 10.6067 14.4133 10.4667C14.2867 10.3267 14.2467 10.1267 14.32 9.94665C14.5933 9.24665 15.26 8.78665 16.02 8.78665C16.78 8.78665 17.4467 9.23999 17.72 9.94665C17.7867 10.1267 17.7533 10.3267 17.6267 10.4667C17.5267 10.5733 17.3867 10.6267 17.2533 10.6267Z"
                fill="black"
              />
              <path
                d="M16.0134 23.2067C15.3534 23.2067 14.7134 22.94 14.2468 22.4733C13.7801 22.0067 13.5134 21.3667 13.5134 20.7067H14.5134C14.5134 21.1 14.6734 21.4867 14.9534 21.7667C15.2334 22.0467 15.6201 22.2067 16.0134 22.2067C16.8401 22.2067 17.5134 21.5333 17.5134 20.7067H18.5134C18.5134 22.0867 17.3934 23.2067 16.0134 23.2067Z"
                fill="black"
              />
            </svg>
            <div className="user-front-div">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </div>
          </div>
          <button className="btn-toggle ml-3 btn">
            <i className="icon-layers-black"></i>
          </button>
        </div>
        <PopupAlert ref={alertRef} />
      </div>
    </div>
  );
};
