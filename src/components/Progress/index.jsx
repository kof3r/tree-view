
import React from 'react';
import classnames from 'classnames';

import './Progress.scss'

export const Progress = ({ className, progress = 0 }) => (
  <span className={classnames('Progress', className)}>
    <span className='filler'>
      {Array.from(Array(Math.floor(progress * 10))).map((_, idx) => <span key={idx} className='tick'/>)}
    </span>
    <span className='amount'>{progress * 100}</span>
  </span>
);
