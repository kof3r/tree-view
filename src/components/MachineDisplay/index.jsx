
import React from 'react';
import { NodeDisplay } from '../NodeDisplay';
import { Progress } from '../Progress';

import './MachineDisplay.scss';

export const MachineDisplay = ({ artefact }) => (
  <NodeDisplay
    className='Machine'
    name={artefact.id}
    icon='display'
  />
);

export const DatabaseDisplay = ({ artefact }) => (
  <NodeDisplay
    className='Database'
    name={artefact.id}
    icon='database'
  />
);

export const DriveDisplay = ({ artefact }) => {
  let fill = 'high';
  if (artefact.fill < 0.8) {
    fill = 'medium';
  }
  if (artefact.fill < 0.5) {
    fill = 'low';
  }
  return (
    <NodeDisplay
      className='Drive'
      name={artefact.id}
      icon='drive'
    >
      <Progress progress={artefact.fill} className={fill}/>
    </NodeDisplay>
  );
}

export const PrinterDisplay = ({ artefact }) => (
  <NodeDisplay
    className='Printer'
    name={artefact.id}
    icon='printer'
  />
);
