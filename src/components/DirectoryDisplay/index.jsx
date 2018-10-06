
import React from 'react';
import { NodeDisplay } from '../NodeDisplay';

import './DirectoryDisplay.scss';

export const DirectoryDisplay = ({ artefact }) => (
  <NodeDisplay
    className='Directory'
    name={artefact.id}
    icon='folder-open'
  />
);
