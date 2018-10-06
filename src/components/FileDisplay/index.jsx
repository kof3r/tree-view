
import React from 'react';

import { NodeDisplay } from '../NodeDisplay';

const GENERIC_FILE_ICON = 'file-empty';

const typeIcons = {
  'txt': 'file-text',
  'jpg': 'file-picture',
}

export const FileDisplay = ({ node }) => {
  const { name, fileType } = node;
  const icon = (fileType in typeIcons) ? typeIcons[fileType] : GENERIC_FILE_ICON

  return (
    <NodeDisplay
      className='File'
      name={name}
      icon={icon}
    />
  );
}
