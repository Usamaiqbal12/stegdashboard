import React from 'react';
import './Button.scss';

function Button({ name, onclick }) {
  return <button onClick={onclick} className="common-btn">{name}</button>;
}

export { Button };
