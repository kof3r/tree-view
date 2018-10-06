
import React from 'react';

import { NodeDisplay } from '../NodeDisplay';

const GENERIC_FILE_ICON = 'file-empty';

const typeIcons = {
  'txt': 'file-text',
  'jpg': 'file-picture',
}

export const FileDisplay = ({ artefact }) => {
  const { name, fileType } = artefact;
  const icon = (fileType in typeIcons) ? typeIcons[fileType] : GENERIC_FILE_ICON

  return (
    <NodeDisplay
      className='File'
      name={name}
      icon={icon}
    />
  );
}
