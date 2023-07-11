import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../newLogo.svg';
import { AlertTemplate } from '../../components';
import PopupAlert from '../../components/PopupAlert';
import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { apiReset } from '../../api/forgot';
import { validate } from '../../api/password';

const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        let [key, val] = param.split('=');
        params[key] = val ? decodeURIComponent(val.replace(/\+/g, ' ')) : '';
        return params;
      }, {}
    )
    : {}
};

function CreateNewPassword(props) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const alertRef = React.createRef();

  const parsed = getQueryStringParams(props.location.search);

  const goToDashboard = () => {
    history.push("/");
  }

  const success = (vals) => {
    alertRef.current.show({
      message: "Password created",
      callback: goToDashboard
    });
  }

  const failure = (e) => {
    setAlertMessage("API error");
  }

  const doSet = (e) => {
    if (password === "") {
      setAlertMessage("empty password");
      return;
    }

    const res = validate(password);
    if (! res[0]) {
      setAlertMessage(res[1]);
      return;
    }

    apiReset(parsed.email, password, parsed.token, success, failure);
  };

    return(
        <>
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
                        <p className="heading-1">Create New Password</p>
                        <p className="heading-2">Enter your new password</p>
                      </div>
                      <div className="form-floating">
                        <label htmlFor="newpassword">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="newpassword"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <Button name="Set Password" onclick={doSet} />
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
        </>
    )
}
export default CreateNewPassword;