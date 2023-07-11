import React from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Button";
import "./Notification.scss";

function Notification() {
  // const [disabled, setDisabled] = useState(false);
  // const [loginId, setLoginId] = useState(-1);

  /*
  const toggleDisableNotifications = () => {
    apiUpdateNotification(loginId, disabled);
    setDisabled(!disabled);
  };
  */

  /*
  const getSettings = (vals) => {
    setDisabled(!vals.get_notifications);
    setLoginId(vals.id);
  };

  useEffect(() => {
    apiGetLogin(getSettings);
  }, []);
  */

  const data = [
    {
      id: 1,
      title: "For when projects are approved",
    },
    {
      id: 2,
      title: " For each scan",
    },
    {
      id: 3,
      title: " Daily Updates",
    },
    {
      id: 4,
      title: " News & Announcements from StegVision",
    },
  ];

  const notificationdata = data.map((datanew) => {
    return (
      <Row className="form-check form-switch note-2">
        <Col sm={6}>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {datanew.title}
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input
              type="checkbox"
              onChange={console.log("required no-op")}
              // onClick={datanew.function}
              // checked={disabled}
            />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>
    );
  });

  return (
    <div className="notification">
      <h3 className="notification-h3">Notification Permissions</h3>

      {/* <hr className="mx-0 my-0" /> */}

      <Row className="form-check form-switch row-1">
        <Col sm={6}>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Turn off all notifications
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input
              type="checkbox"
              onChange={console.log("required no-op")}
              // onClick={toggleDisableNotifications}
              // checked={disabled}
            />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>

      {/* <hr className="mx-0 my-0" /> */}

      {/*
      <Row className="form-check form-switch note-2">
        <Col sm={6}>
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            For when projects are approved
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>

      <Row className="form-check form-switch note-2">
        <Col sm={6}>
          <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
            For each scan
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>

      <Row className="form-check form-switch note-2">
        <Col sm={6}>
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckCheckedDisabled"
          >
            Daily update
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>

      <Row className="form-check form-switch note-2">
        <Col sm={6}>
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckCheckedDisabled"
          >
            News &amp; Announcements from StegVision
          </label>
        </Col>
        <Col sm={6}>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>
      */}

      <div className="notification-second-part">{notificationdata}</div>
      <div className="n-btn">
        <Button name="Save Changes" />
      </div>
    </div>
  );
}
export { Notification };
