
import React from 'react';
import { ArtefactDisplay } from '../ArtefactDisplay';

import './DirectoryDisplay.scss';

export const DirectoryDisplay = ({ artefact }) => (
  <ArtefactDisplay
    className='Directory'
    name={artefact.id}
    icon='folder-open'
  />
);
