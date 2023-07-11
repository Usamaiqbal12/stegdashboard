import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { Step1, Step2, Step3, Step4 } from './Steps';
import './Modal.scss';

function ProjectModal(props) {
  const { onHide } = props;
  const methods = useForm({
    mode: 'all',
  });
  const [state, setState] = useState({
    currentStep: 1,
  });

  // const { formState, getValues } = methods;
  // const { isValid } = formState;
  const onSubmit = (data) => {
    console.log(data);
    // console.log(data, 'data');
    // if(state.currentStep === 1 ){
    //   Object.values(getValues()).map(v=>v).join('')
    //   console.log(Object.values(getValues()).map(v=>v).join(''))
    //   return ;
    // }
    _next();
  };

  // console.log(formState, getValues());
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
  };

  // const disable = () => {
  //   if(state.currentStep === 1  ){
  //     Object.values(getValues()).map(v=>v).join('')
  //     return(Object.values(getValues()).map(v=>v).join(''))

  //   }
  // };

  // console.log(disable());

  const _next = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep + 1;
    setState({
      currentStep: currentStep,
    });
  };

  const _prev = () => {
    console.log("_prev");
    let currentStep = state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  const previousButton = () => {
    let currentStep = state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="prev-btn" type="button" onClick={_prev}>
          Back
        </button>
      );
    }
    return null;
  };

  const nextButton = () => {
    let currentStep = state.currentStep;
    if (currentStep < 4) {
      return (
        <button
          className="float-right next-btn"
          type="submit"
          // disabled={disable()}
        >
          Proceed
        </button>
      );
    }
    return null;
  };

  const finishButton = () => {
    let currentStep = state.currentStep;
    if (currentStep === 4) {
      return (
        <button
          className="float-right next-btn"
          type="submit"
          onClick={onHide}
          // disabled={isValid}
        >
          Finish
        </button>
      );
    }
    return null;
  };

  const progressBar = () => {
    let currentStep = state.currentStep;
    let width = '0%';
    if (currentStep === 1) {
      width = '25%';
    } else if (currentStep === 2) {
      width = '50%';
    } else if (currentStep === 3) {
      width = '75%';
    } else if (currentStep === 4) {
      width = '100%';
    }
    return width;
  };

  const stepDetail = () => {
    let currentStep = state.currentStep;

    let stepDetail = '';

    if (currentStep === 1) {
      stepDetail = 'Step1: Product Description';
    } else if (currentStep === 2) {
      stepDetail = 'Step2: Upload your work';
    } else if (currentStep === 3) {
      stepDetail = 'Step3: Encryption Area';
    } else if (currentStep === 4) {
      stepDetail = 'Step4: Encryption Details';
    }
    return stepDetail;
  };

  // const {register, handleSubmit} = useForm();
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="new-project-form">
        <div className="new-project-header">
          <p>
            Create New Project
            <span className="step-detail">{stepDetail()}</span>
          </p>
          <button onClick={onHide}>X</button>
        </div>
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: progressBar() }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        {/* <p>Step {this.state.currentStep} </p>  */}
        {/* onSubmit={handleSubmit} */}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
            {/* 
        render the form steps and pass required props in
      */}
            <div className="form-step-divs">
              <Step1
                enteredData={state.enteredData}
                currentStep={state.currentStep}
                handleChange={handleChange}
                email={state.email}
              />
              <Step2
                currentStep={state.currentStep}
                handleChange={handleChange}
                username={state.username}
              />
              <Step3
                currentStep={state.currentStep}
                handleChange={handleChange}
                password={state.password}
              />
              <Step4
                currentStep={state.currentStep}
                handleChange={handleChange}
                password={state.password}
              />
            </div>
            <div className="from-button-div">
              {previousButton()}
              {nextButton()}
              {finishButton()}
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}

export { ProjectModal };
