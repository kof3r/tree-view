
import { combineReducers } from 'redux';

import { treeViewReducer } from './file-system';

export default combineReducers({
  fileSystem: treeViewReducer,
});
