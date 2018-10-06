
import React from 'react';
import { NodeDisplay } from '../NodeDisplay';

import './DirectoryDisplay.scss';

export const DirectoryDisplay = ({ node }) => (
  <NodeDisplay
    className='Directory'
    name={node.id}
    icon='folder-open'
  />
);
