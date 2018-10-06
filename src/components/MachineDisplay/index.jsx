
import React from 'react';
import { ArtefactDisplay } from '../ArtefactDisplay';
import { Progress } from '../Progress';

import './MachineDisplay.scss';

export const MachineDisplay = ({ artefact }) => (
  <ArtefactDisplay
    className='Machine'
    name={artefact.id}
    icon='display'
  />
);

export const DatabaseDisplay = ({ artefact }) => (
  <ArtefactDisplay
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
    <ArtefactDisplay
      className='Drive'
      name={artefact.id}
      icon='drive'
    >
      <Progress progress={artefact.fill} className={fill}/>
    </ArtefactDisplay>
  );
}

export const PrinterDisplay = ({ artefact }) => (
  <ArtefactDisplay
    className='Printer'
    name={artefact.id}
    icon='printer'
  />
);
