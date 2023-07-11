import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../newLogo.svg';
import newLogo from '../../newLogo.svg';
import { Button } from '../../components';
// import { useAlert, types } from 'react-alert';
import { AlertTemplate } from '../../components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { apiLogin } from '../../api/login';
import hand from '../../hand.png';
import './Sign-in.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();

  const loginSuccess = () => {
    history.push({
      pathname: '/dashboard',
    });
  };

  const loginFailure = (error) => {
    setAlertMessage(error);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    /*
    alert.show('Alert Message', {
      type: types.ERROR,
      timeout: 2500,
    });
    */
    apiLogin(`${email}`, `${password}`, loginSuccess, loginFailure);
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
            <div className="SignIn-form">
              <Container>
                <Row>
                  <Col md={12} lg={12}>
                    <div className="image">
                      <img src={newLogo} alt="logo" />
                    </div>
                    <div className="form">
                      <div className="Heading">
                        <p className="heading-1">Welcome Back,</p>
                        <p className="heading-2">Sign into View Projects</p>
                      </div>
                      <div className="form-floating">
                        <label htmlFor="signin-id">Email address</label>
                        <input
                          type="email"
                          value={email}
                          className="form-control"
                          id="signin-id"
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-floating">
                        <label htmlFor="signin-pw">Enter Password</label>
                        <input
                          type="password"
                          value={password}
                          className="form-control"
                          id="sgnin-pw"
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <span className="pass">
                        <Link to="/forgetpassword">Forgot Password?</Link>
                      </span>
                      <Button name="Sign-in" onclick={handleLogin} />
                      <div className="account">
                        Don't have an account?{' '}
                        <Link to="/register">Sign Up.</Link>
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
    </div>
  );
}

export default SignIn;
