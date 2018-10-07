
import { combineReducers } from 'redux';

import { fileSystemReducer } from './file-system';

export default combineReducers({
  fileSystem: fileSystemReducer,
});
