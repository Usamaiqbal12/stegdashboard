import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/fonts.css';
import './index.scss';
import './assets/images/icomoon/style.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { positions, Provider } from 'react-alert';
import { AlertTemplate } from './components';
// import AlertTemplate from 'react-alert-template-basic'; // basice template

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
};

ReactDOM.render(
  <Provider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
