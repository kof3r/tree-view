
import React from 'react';
import { Node } from '../Node';
import { Progress } from '../../Progress';

import './MachineDisplay.scss';

export const MachineCluster = ({ node }) => (
  <Node
    className='MachineCluster'
    name={node.id}
    icon='cubes'
  />
);

export const Machine = ({ node }) => (
  <Node
    className='Machine'
    name={node.id}
    icon='display'
  />
);

export const Database = ({ node }) => (
  <Node
    className='Database'
    name={node.id}
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
      name={node.id}
      icon='drive'
    >
      <Progress progress={node.fill} className={fill}/>
    </Node>
  );
}

export const Printer = ({ node }) => (
  <Node
    className='Printer'
    name={node.id}
    icon='printer'
  />
);
