
import React from 'react';
import { Node } from '../Node';
import { Progress } from '../../Progress';

import './MachineDisplay.scss';

export const MachineCluster = ({ node }) => (
  <Node
    className='MachineCluster'
    node={node}
    icon='cubes'
  />
);

export const Machine = ({ node }) => (
  <Node
    className='Machine'
    node={node}
    icon='display'
  />
);

export const Database = ({ node }) => (
  <Node
    className='Database'
    node={node}
    icon='database'
  />
);

export const Drive = ({ node }) => {
  let fill = 'high';
  if (node.fill < 0.8) {
    fill = 'medium';
  }
  if (node.fill < 0.5) {
    fill = 'low';
  }
  return (
    <Node
      className='Drive'
      node={node}
      icon='drive'
    >
      <Progress progress={node.fill} className={fill}/>
    </Node>
  );
}

export const Printer = ({ node }) => (
  <Node
    className='Printer'
    node={node}
    icon='printer'
  />
);
