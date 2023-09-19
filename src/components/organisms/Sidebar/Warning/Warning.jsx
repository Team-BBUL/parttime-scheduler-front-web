import React from 'react';
import './Warning.css';

function Warning()  {  
  return (
    <div className="WaringBox">
    <h2 >경고알림</h2>
    <ul>
      <li>배정되지 않은 근무가 있습니다</li>
    </ul>
  </div>
  )
}

export { Warning };