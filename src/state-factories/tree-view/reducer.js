
import { combineReducers } from 'redux';
import { createExpandedPathsReducer, createSelectedPathReducer, createTreeReducer } from './reducers';

export function createTreeViewReducer(prefix) {
  return combineReducers({
    expandedPaths: createExpandedPathsReducer(prefix, {}),
    tree: createTreeReducer(prefix),
    selectedPath: createSelectedPathReducer(prefix),
  });
}
