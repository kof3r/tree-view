
import React from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';

import './Node.scss';

export const NodeDisplay = ({ className, icon, name, children, ...props }) => {
  return (
    <span className={classnames('Node', className)} {...props}>
      <Icon icon={icon}/>
      <span className='name'>{name}</span>
      {children}
    </span>
  );
}
