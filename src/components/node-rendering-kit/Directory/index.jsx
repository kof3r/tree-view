
import React from 'react';
import { Node } from '../Node';

import './DirectoryDisplay.scss';

export const Directory = ({ node }) => (
  <Node
    node={node}
    icon='folder-open'
  />
);
