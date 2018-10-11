
import { combineReducers } from 'redux';

import tree from './reducers/tree';
import expandedPaths from './reducers/expanded-paths';
import selectedPath from './reducers/selected-path';

export const treeViewReducer = combineReducers({
  tree,
  expandedPaths,
  selectedPath,
});
