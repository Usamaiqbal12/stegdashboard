import React, { useEffect } from "react";
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
// import { SideIcon } from './SideIcons';
import tabNotification from "../../assets/images/tabnotification.svg";
import refreshIcon from "../../assets/images/refreshsideicon.svg";
import "./Header.scss";

function Header(props) {
  // const [showDiv, setShowDiv] = React.useState(null);
  /*
  const onClick = (item) => {
    setShowDiv(showDiv === item ? null : item);
  };
  */
  useEffect(() => {
    document.addEventListener("click", clickDocument);
    return () => {
      document.removeEventListener("click", clickDocument);
    };
  });
  const clickDocument = (e) => {
    let icons = document.getElementsByClassName("icon-list-dd");
    let icon = document.getElementsByClassName("icon-1");
    if (icons.length > 0 && !icons[0].contains(e.target)) {
      // not svg of path tag ;
      let noPath = e.target.tagName !== "svg" && e.target.tagName !== "path";
      if (
        noPath &&
        !icon[0].contains(e.target) &&
        !icon[1].contains(e.target)
      ) {
        // setShowDiv('');
      }
    }
  };
  /*
  const NOTIFICATION = [
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
    {
      desc: 'Your project “Buzz” was approved! Go take a look.',
      date: '9:20PM Dec 4 2020',
    },
  ];
  const CHANGELOG = [
    {
      desc: 'December 2 2020',
      status: '-Fixed Bug',
    },
    {
      desc: 'December 2 2020',
      status: '-Fixed Bug',
    },
    {
      desc: 'December 2 2020',
      status: '-Fixed Bug',
    },
    {
      desc: 'December 2 2020',
      status: '-Fixed Bug',
    },
    {
      desc: 'December 2 2020',
      status: '-Fixed Bug',
    },
  ];
  */
  return (
    <div className="header">
      <div>
        <h3>{props.title}</h3>
      </div>
      {/*
      XXX We don't support these features (yet)
      <div className="icons">
        <div className="icon-1-div">
          <SideIcon
            icon={faBell}
            onChange={(isShow) => onClick(isShow ? 'bell' : '')}
            show={showDiv === 'bell'}
            type="notification"
            title="Notifications"
            list={NOTIFICATION}
          />
        </div>
        <div className="icon-2-div">
          <SideIcon
            icon={faUndoAlt}
            onChange={(isShow) => onClick(isShow ? 'arrow' : '')}
            show={showDiv === 'arrow'}
            title="Change Log"
            list={CHANGELOG}
          />
        </div>
      </div>
      */}
      <div className="header-right-part">
        <div className="side-icons">
          <img src={tabNotification} alt="img"></img>
          <div className="notification-circle"></div>
        </div>
        <div className="side-icons">
          {" "}
          <img src={refreshIcon} alt="img"></img>
        </div>
      </div>
    </div>
  );
}

export { Header };
