import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SideIcons.scss';
import { DropDown } from './DropDown';

function SideIcon({ icon, onChange, show, ...rest }) {
  // const [showDiv, setShowDiv] = React.useState(false);
  const onClick = () => {
    onChange(!show);
    // setShowDiv(!showDiv)
  };
  return (
    <div className="icon">
      <div className="icon-1" onClick={onClick}>
        <FontAwesomeIcon
          style={{ color: show ? '#0060f0' : '#BABABA' }}
          icon={icon}
        />
      </div>
      {show && (
        <div className="icon-list-dd">
          <DropDown {...rest} />
        </div>
      )}
    </div>
  );
}

export { SideIcon };
