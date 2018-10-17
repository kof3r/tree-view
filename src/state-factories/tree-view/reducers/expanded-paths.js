
import { createReducer } from 'util.lib/redux'
import { pathString } from 'util.lib/path';
import { _TOGGLE_EXPANDED_PATH } from '../actions';

function toggleExpandedNode(state, path) {
  const p = pathString(path);
  const nextState = { ...state };
  if (p in state) {
    delete nextState[p];
  } else {
    nextState[p] = true;
  }
  return nextState;
}

export function createExpandedPathsReducer(prefix, defaultState) {
  return createReducer(
    {
      [`${prefix}${_TOGGLE_EXPANDED_PATH}`]: toggleExpandedNode,
    },
    defaultState,
  );
}
