import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AlertTemplate } from '../../components';
import PopupAlert from '../../components/PopupAlert';
import logo from '../../newLogo.svg';
import newLogo from '../../newLogo.svg';
import { Button } from '../../components';
import { Link } from 'react-router-dom';
import apiRegister from '../../api/register';
import { validate } from '../../api/password';
import hand from '../../hand.png';
import './Register.scss';

function Register() {
  const history = useHistory();

  const [company, setCompany] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [box, setBox] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const alertRef = React.createRef();

  const goToSignin = () => {
    history.push('/signin');
  };

  const success = (vals) => {
    alertRef.current.show({
      message: 'Registration successful',
      callback: goToSignin,
    });
  };

  const failure = (e) => {
    console.log(e);
    setAlertMessage(e.message);
  };

  const register = (e) => {
    if (!box) {
      setAlertMessage('Must agree with terms');
      return;
    }

    if (password !== password2) {
      setAlertMessage('Passwords not equal');
      return;
    }

    if (
      company === '' ||
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      setAlertMessage('All fields are required');
      return;
    }

    const res = validate(password);
    if (!res[0]) {
      setAlertMessage(res[1]);
      return;
    }

    apiRegister(
      company,
      firstName,
      lastName,
      email,
      password,
      success,
      failure
    );
  };

  const changeBox = (e) => {
    setBox(!box);
  };

  return (
    <div>
      {alertMessage !== '' ? (
        <AlertTemplate options={{ type: 'error' }} message={alertMessage} />
      ) : null}
      <Container fluid>
        <Row style={{ textAlign: 'center', backgroundColor: '#f9fbfc' }}>
          <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <img src={newLogo} alt="logo" />
          </div>
        </Row>
        <Row className="color-div">
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className="bg-white">
            <div className="Register-form">
              <Container>
                <Row>
                  <Col md={12} lg={12}>
                    <div className="logo">
                      <img src={newLogo} alt="logo" />
                    </div>
                    <div className="form">
                      <div className="Heading">
                        <p className="heading-1">Welcome.</p>
                        <p className="heading-2">
                          Protect your brand with StegVision
                        </p>
                      </div>

                      <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                          <div className="form-floating">
                            <label htmlFor="firstname">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="First Name"
                            />
                          </div>
                        </Col>
                        <Col xl={12} md={12} lg={12} sm={12}>
                          <div className="form-floating">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastname"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Last Name"
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="form-floating">
                        <label htmlFor="company">Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="form-floating">
                        <label htmlFor="email">Email-Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-floating">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-floating">
                        <label htmlFor="cpassword">Confrim Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="cpassword"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="check-box">
                        <input
                          type="checkbox"
                          value={box}
                          onChange={changeBox}
                        />{' '}
                        I agree with the{' '}
                        <span className="text-color">Terms</span> &amp;{' '}
                        <span className="text-color">Privacy Policy</span>
                      </div>
                      <Button name="Register" onclick={register} />
                      <div className="account">
                        Have an account? <Link to="/signin">Sign in.</Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col md={7} lg={7} xl={6}>
            <div
              className="bg-white"
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={hand} alt="hand" style={{ alignSelf: 'center' }} />
            </div>
          </Col>
        </Row>
      </Container>
      <PopupAlert ref={alertRef} />
    </div>
  );
}

export default withRouter(Register);
