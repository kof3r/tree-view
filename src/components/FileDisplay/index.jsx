
import React from 'react';

import { ArtefactDisplay } from '../ArtefactDisplay';

const GENERIC_FILE_ICON = 'file-empty';

const typeIcons = {
  'txt': 'file-text',
  'jpg': 'file-picture',
}

export const FileDisplay = ({ artefact }) => {
  const { name, fileType } = artefact;
  const icon = fileType in typeIcons ? typeIcons[fileType] : GENERIC_FILE_ICON

  return (
    <ArtefactDisplay
      className='File'
      name={name}
      icon={icon}
    />
  );
}
