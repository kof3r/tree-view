
import React from 'react';
import classnames from 'classnames';

import { Icon } from '../../Icon';

import './Node.scss';

export const Node = ({ className, icon, node, children, ...props }) => {
  return (
    <span className={classnames('Node', node.type, className)} {...props}>
      <Icon icon={icon}/>
      <span className='name'>{node.name}</span>
      {children}
    </span>
  );
}
