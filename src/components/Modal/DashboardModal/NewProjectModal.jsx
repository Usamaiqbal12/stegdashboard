import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './NewProjectModal.scss';
import { createProjectLeft } from '../../../assets/images';
import Form from 'react-bootstrap/Form';
import { Button } from '../../Button';
import { useHistory } from 'react-router-dom';
import TickIcon from './TickIcon';
import UnTickIcon from './UnTickIcon';
import { useState } from 'react';
import singleFactorIcon from '../../../assets/images/singleFactorIcon.svg';
import twoFactorIcon from '../../../assets/images/twoFactorIcon.svg';
import ownershipIcon from '../../../assets/images/ownershipIcon.svg';
function NewProjectModal(props) {
  const { onHide } = props;
  const history = useHistory();
  const [singleFactorAuth, setSingleFactorAuth] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [ownerShip, setOwnerShip] = useState(false);

  const handleCheckedClick = (type) => {
    if (type === 'single_factor') {
      setSingleFactorAuth(!singleFactorAuth);
    } else if (type === 'two_factor') {
      setTwoFactor(!twoFactor);
    } else if (type === 'owner_ship') {
      setOwnerShip(!ownerShip);
    }
  };
  const toCreateProject = (e) => {
    onHide();
    history.push('/dashboard/createProject');
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-left">
          <img
            src={createProjectLeft}
            alt="imgmodal"
            style={{ width: '100%', background: '#fff9f4' }}
          ></img>
        </div>
        <div className="modal-right">
          <h3>Project Type</h3>
          {/* <Form.Group className="mb-3  btn-group" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Single Factor Authentication" />
            <Form.Check type="checkbox" label=" 2 Factor Authentication " />
            <Form.Check type="checkbox" label="3 Factor Authentication " />
            <Form.Check type="checkbox" label="4 Factor Authentication " />
          </Form.Group> */}
          <div className="check-box-contianer">
            <div
              className={`item ${singleFactorAuth ? 'active-item' : ''}`}
              onClick={() => handleCheckedClick('single_factor')}
            >
              <img src={singleFactorIcon} alt="singlefactor" />
              <div className="sub-item">
                Single Factor Authentication{' '}
                {singleFactorAuth ? <TickIcon /> : <UnTickIcon />}
              </div>
            </div>

            <div
              className={`item ${twoFactor ? 'active-item' : ''}`}
              onClick={() => handleCheckedClick('two_factor')}
            >
              <img src={twoFactorIcon} alt="twoFactor" />

              <div className="sub-item">
                2 Factor Authentication{' '}
                {twoFactor ? <TickIcon /> : <UnTickIcon />}
              </div>
            </div>
            <div
              className={`item ${ownerShip ? 'active-item' : ''}`}
              onClick={() => handleCheckedClick('owner_ship')}
            >
              <img src={ownershipIcon} alt="ownership" />

              <div className="sub-item">
                Chain of Ownership {ownerShip ? <TickIcon /> : <UnTickIcon />}
              </div>
            </div>
          </div>
          <div className="modal-btn-div">
            <Button name="Continue" onclick={toCreateProject}></Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { NewProjectModal };
