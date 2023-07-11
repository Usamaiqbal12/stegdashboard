import React from 'react';

function DropDown({ title, list = [], type }) {
  var cnt = 0;
  return (
    <div className="icon-1-notification">
      <div className="icon-1-nh">{title}</div>
      <div className="icon-1-nl">
        {list.map((v) => (
          <div key={cnt++} className="icon-1-nl-i">
            <p>{v.desc}</p>
            <p className={type === 'notification' ? 'p-nl' : 'p-cl'}>
              {type === 'notification' ? v.date : v.status}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export { DropDown };
