
import React from 'react';
import classnames from 'classnames';

import { Node } from '../Node';

import './Device.scss';

export const Device = ({ node }) => {
  return (
    <Node
      node={node}
      icon='drive'
      className={classnames({ 'connected': node.isConnected })}
    >
      <span className='connection-indicator'/>
    </Node>
  );
};
