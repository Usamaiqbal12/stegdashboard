import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Profile, Notification, Password } from '../../components';
import { Header } from '../../components/Header/Header';
import './index.scss';
import tabProfile from '../../assets/images/tabprofile.svg';
import tabProfileColored from '../../assets/images/tabprofilecolored.svg';
import tabNotification from '../../assets/images/tabnotification.svg';
import tabNotificationColored from '../../assets/images/tabnotificationcolored.svg';
import tabPassword from '../../assets/images/tabpassword.svg';
import tabPasswordColored from '../../assets/images/tabpasswordcolored.svg';

function Setting() {
  const [key, setKey] = useState('profile');
  return (
    <div className="setting">
      {/* <Header title="Settings" /> */}
      <div className="setting-heading">Settings</div>
      {/* <Tab.Container defaultActiveKey="first" id="top-tabs-example">
        <Row className="tab-div">
          <Col md={3} lg={4} className="tab-divs">
            <div className="tab-side-div">
              <p>General Setting</p>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <span>
                      <span className="icon-profile1 nav-icons"></span>

                      <span>Profile</span>
                    </span>
                    <Icon name="faChevronRight" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <span>
                      <span className="icon-notification  nav-icons"></span>

                      <span>Notification</span>
                    </span>
                    <Icon name="faChevronRight" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <hr />
              <p>Privacy</p>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <div className="link-inner">
                      <span className="icon-lock  nav-icons"></span>

                      <div>Change Password</div>
                    </div>
                    <Icon name="faChevronRight" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col md={9} lg={8} className="tab-divs">
            <div className="tab-content-div">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Profile />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Notification />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Password />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Col>
        </Row>
      </Tab.Container> */}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab
          eventKey="profile"
          title={
            <span>
              <span className="heading-right">Profile</span>
            </span>
          }
        >
          <Profile />
        </Tab>
        <Tab
          eventKey="notification"
          title={
            <span>
              <span className="heading-right"> Notification </span>
            </span>
          }
        >
          <Notification />
        </Tab>
        <Tab
          eventKey="password"
          title={
            <span>
              <span className="heading-right"> Change Password </span>
            </span>
          }
        >
          <Password />
        </Tab>
      </Tabs>
    </div>
  );
}

export { Setting };
