
import { combineReducers } from 'redux';

import tree from './reducers/tree';
import expandedPaths from './reducers/expanded-paths';

export const treeViewReducer = combineReducers({
  tree,
  expandedPaths,
});
