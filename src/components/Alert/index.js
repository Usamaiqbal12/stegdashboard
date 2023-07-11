import React from 'react';
import './alert.scss';

export const AlertTemplate = ({ style, options, message, close }) => (
  <div style={
    options.type === 'info' ? {backgroundColor:'#2196F3'} :
    (options.type === 'success' ? {backgroundColor:'#4CAF50'}
    :{backgroundColor:'#f44336'})
    
    } className="alertBox">
    <span className="alertType">{options.type === 'info' && 'Info! '}</span>
    <span className="alertType">{options.type === 'success' && 'Success! '}</span>
    <span className="alertType">{options.type === 'error' && 'Danger! '}</span>
    <span className="alertMessage">{message}</span>
    {/* <button onClick={close}>X</button> */}
  </div>
);
