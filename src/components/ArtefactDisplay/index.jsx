
import React from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';

import './Artefact.scss';

export const ArtefactDisplay = ({ className, icon, name, children, ...props }) => {
  return (
    <span className={classnames('Artefact', className)} {...props}>
      <Icon icon={icon}/>
      <span className='name'>{name}</span>
      {children}
    </span>
  );
}
