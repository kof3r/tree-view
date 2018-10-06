
import React from 'react';
import classnames from 'classnames';

import './Progress.scss'

export const Progress = ({ className, progress = 0 }) => (
  <span className={classnames('Progress', className)}>
    <span className='filler' style={{ right: `${(1 - progress) * 100}%` }}/>
    <span className='amount'>{progress * 100}</span>
  </span>
);
