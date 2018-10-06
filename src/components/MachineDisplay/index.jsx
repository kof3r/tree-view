
import React from 'react';
import { NodeDisplay } from '../NodeDisplay';
import { Progress } from '../Progress';

import './MachineDisplay.scss';

export const MachineDisplay = ({ node }) => (
  <NodeDisplay
    className='Machine'
    name={node.id}
    icon='display'
  />
);

export const DatabaseDisplay = ({ node }) => (
  <NodeDisplay
    className='Database'
    name={node.id}
    icon='database'
  />
);

export const DriveDisplay = ({ node }) => {
  let fill = 'high';
  if (node.fill < 0.8) {
    fill = 'medium';
  }
  if (node.fill < 0.5) {
    fill = 'low';
  }
  return (
    <NodeDisplay
      className='Drive'
      name={node.id}
      icon='drive'
    >
      <Progress progress={node.fill} className={fill}/>
    </NodeDisplay>
  );
}

export const PrinterDisplay = ({ node }) => (
  <NodeDisplay
    className='Printer'
    name={node.id}
    icon='printer'
  />
);
