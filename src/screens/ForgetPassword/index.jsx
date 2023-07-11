import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../newLogo.svg';
import { AlertTemplate } from '../../components';
import PopupAlert from '../../components/PopupAlert';
import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { apiForgot } from "../../api/forgot";


function ForgetPassword(){
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const history = useHistory();

  const alertRef = React.createRef();

  const goToLanding = () => {
    history.push("/");
  };

  const success = (vals) => {
    alertRef.current.show({
      message: "Password recovery email sent",
      callback: goToLanding
    });
  }

  const failure = (e) => {
    console.log(e);

    alertRef.current.show({
      message: "API error"
    });
  }

  const change = (e) => {
    e.preventDefault();

    if (email === "") {
      setAlertMessage("Email is required");
      return;
    }

    apiForgot(email, success, failure);
  };

  return(
    <div>
      {alertMessage !== "" ? (
        <AlertTemplate options={{type: 'error'}} message={alertMessage} />
      ) : null}
      <Container fluid>
        <Row className="color-div">
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className="bg-white">
            <div className="SignIn-form">
              <Container>
                <Row>
                  <Col md={12} lg={12}>
                    <div className="image">
                      <img src={logo} alt="logo" />
                    </div>
                    <div className="form">
                      <div className="Heading">
                        <p className="heading-1">Forget Password</p>
                        <p className="heading-2">Email to create New Password</p>
                      </div>
                      <div className="form-floating">
                        <label htmlFor="signin-id">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="signin-id"
                          placeholder="Email Address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <Button name="Change Password" onclick={change} />
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
          <Col md={7} lg={7} xl={6} className="hide-div"></Col>
        </Row>
      </Container>
      <PopupAlert ref={alertRef} />
    </div>
  )
}
export default ForgetPassword;