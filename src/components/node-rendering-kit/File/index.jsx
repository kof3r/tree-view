
import React from 'react';

import { Node } from '../Node';

const GENERIC_FILE_ICON = 'file-empty';

const typeIcons = {
  'txt': 'file-text',
  'jpg': 'file-picture',
  'md': 'file-text'
}

export const File = ({ node }) => {
  const { fileType } = node;
  const icon = (fileType in typeIcons) ? typeIcons[fileType] : GENERIC_FILE_ICON

  return (
    <Node
      node={node}
      icon={icon}
    />
  );
}
