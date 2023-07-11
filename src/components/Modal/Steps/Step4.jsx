import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

function Step4(props) {
  const {
    register,
    // formState: { isDirty },
  } = useFormContext();

  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <div className="step4">
      <p className="step4-heading">
        <span>Encryption Details</span>
        <br />
        We will find the most suitable areas for encryption on your product.
      </p>

      <Row className="step4-divs">
        <Col md={8}>
          <div class="form-floating  step4-div-1">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="encryptdescription"
              name="encryptdescription"
              ref={register}
              defaultValue="*short paragraph to explain what it means*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sollicitudin quam. Quisque eget arcu non felis fringilla fringilla. "
            ></textarea>
            <label htmlfor="encryptdescription" className="text-label">
              Description
            </label>
          </div>
        </Col>
        <Col md={4}>
          <div class="form-floating">
            <select
              class="form-select"
              id="uniqueencrypt"
              name="uniqueencrypt"
              ref={register}
              aria-label="Floating label select example"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <label htmlFor="uniqueencrypt">
              Quantity of Unique Encryptions
            </label>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export { Step4 };
