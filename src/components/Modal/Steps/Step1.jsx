import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

function Step1({ currentStep }) {
  const {
    register,
    // formState: { isDirty },
  } = useFormContext();
  // console.log(method, 'step1')

  if (currentStep !== 1) { return null; }

  return (
    <div className="step1">
      <Row className="step1-div1">
        <Col md={6}>
          <div className="form-floating">
            <label htmlFor="projectname">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="projectname"
              name="projectname"
              ref={register({ required: true })}
              placeholder="Project Name"
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="form-floating">
            <label htmlFor="productlink">Product Link (optional)</label>
            <input
              type="text"
              className="form-control"
              id="productlink"
              name="productlink"
              ref={register({ required: true })}
              defaultValue="Smitwoodybuzzlightyear.com"
              placeholder="Product Link (optional)"
            />
          </div>
        </Col>
      </Row>
      <Row className="step1-div2">
        <Col md={12}>
          <div class="form-floating">
            <label htmlfor="description">Description</label>
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="description"
              name="description"
              ref={register({ required: true })}
              defaultValue="Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label."
              style={{ height: 100 }}
            ></textarea>
          </div>
        </Col>
      </Row>

      <Row className="step1-div2">
        <Col md={6}>
          <Row>
            <Col md={6}>
              <div class="form-floating">
                <label htmlFor="material">Select Material</label>
                <select
                  class="form-select"
                  id="material"
                  name="material"
                  ref={register({ required: true })}
                  aria-label="Floating label select example"
                >
                  <option value="">Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div class="form-floating">
                <label htmlFor="printtype">Select Print Type</label>
                <select
                  class="form-select"
                  id="printtype"
                  name="printtype"
                  ref={register({ required: true })}
                  aria-label="Floating label select example"
                >
                  <option value="">Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

// function areEqual(prevProps, nextProps) {
// return
//   (prevProps.formState.isDirty === nextProps.formState.isDirty)
// }

// export default  React.memo(Step1, areEqual)   ;

export { Step1 };
