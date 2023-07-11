import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from '../../Button';
import { AlertTemplate } from '../../Alert';
import PopupAlert from '../../PopupAlert';
import {
  apiGetLogin,
  apiUpdateLogin,
  apiDisableAccount,
} from '../../../api/login';
import { useHistory } from 'react-router-dom';
import './Profile.scss';

function Profile() {
  const [loginId, setLoginId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();
  const alertRef = React.createRef();

  const setLogin = (vals) => {
    setLoginId(vals.id);
    setFirstName(vals.first_name);
    setLastName(vals.last_name);
    setEmail(vals.email);
    setCompanyName(vals.client);
  };

  useEffect(() => {
    apiGetLogin(setLogin);
  }, []);

  const success = () => {
    history.push('/dashboard');
  };

  const failure = (e) => {
    console.log(e);
    setAlertMessage(e.message);
  };

  const handleSave = (e) => {
    e.preventDefault();
    apiUpdateLogin(loginId, companyName, email, success, failure);
  };

  const goLanding = () => {
    history.push('/');
  };

  const disableSuccess = () => {
    alertRef.current.show({
      message: 'Account deleted',
      callback: goLanding,
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    alertRef.current.show({
      message: 'This will delete your account, are you sure?',
      cancel_callback: () => {},
      callback: () => {
        apiDisableAccount(loginId, disableSuccess, failure);
      },
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-heading">Profile info</div>
      <div className="profile">
        {alertMessage !== '' ? (
          <AlertTemplate options={{ type: 'error' }} message={alertMessage} />
        ) : null}
        {/* <h3 className="profile-h3">Profiles</h3> */}
        <Row className="profile-input">
          <Col xl={6} lg={12} md={12} sm={12} className="p-i-div">
            <div className="form-floating">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Company Name"
              />
            </div>
          </Col>
          <Col xl={6} md={12} lg={12} sm={12} className="p-i-div">
            <div className="form-floating p-input">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </Col>
        </Row>
        <Row className="profile-input">
          <Col xl={6} lg={12} md={12} sm={12} className="p-i-div">
            <div className="form-floating">
              <label htmlFor="company-name">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
              />
            </div>
          </Col>
          <Col xl={6} md={12} lg={12} sm={12} className="p-i-div">
            <div className="form-floating p-input">
              <label htmlFor="email-address">Email Address</label>
              <input
                type="text"
                className="form-control"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
            </div>
          </Col>
        </Row>

        {/* <Row className="profile-input3">
        <Col xl={4} lg={12} md={12} sm={12}>
          <p>Language</p>
        </Col>
        <Col xl={3}></Col>
        <Col xl={5} md={12} lg={12} sm={12}>
          <div className="form-floating p-input">
         

            <select id="normal-select-1" placeholder-text="Default Language">
              <option value="1" class="select-dropdown__list-item">
                Item 1
              </option>
              <option value="2" class="select-dropdown__list-item">
                Item 2
              </option>
              <option value="3" class="select-dropdown__list-item">
                Item 3
              </option>
              <option value="4" class="select-dropdown__list-item">
                Item 4
              </option>
            </select>
          </div>
        </Col>
      </Row>
      <hr /> */}
        <div className="delete-row">
          <Row className="profile-delete">
            <Col xl={7} lg={12} md={12} sm={12}>
              <p className="dp-1">Delete Account</p>
              <p className="dp-2">
                {' '}
                By deleting your account, you will lose all your data
              </p>
            </Col>
            <Col xl={5} lg={12} md={12} sm={12}>
              <button
                className="p-delete-btn float-sm-none float-lg-end"
                onClick={handleDelete}
              >
                {' '}
                Delete Account
              </button>
            </Col>
          </Row>
        </div>
        <Row className="profile-save">
          <Col sm={12}>
            <Button name="Save Changes" onclick={handleSave} />
          </Col>
        </Row>
        <PopupAlert ref={alertRef} />
      </div>
    </div>
  );
}
export { Profile };
