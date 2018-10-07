
import React from 'react';
import { Node } from '../Node';

import './DirectoryDisplay.scss';

export const Directory = ({ node }) => (
  <Node
    className='Directory'
    node={node}
    icon='folder-open'
  />
);
