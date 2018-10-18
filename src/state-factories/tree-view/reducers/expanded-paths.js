
import { createPrefixedReducer, withShallowStateCopy } from 'util.lib/redux'
import { pathString } from 'util.lib/path';
import { TOGGLE_EXPANDED_PATH } from '../actions';

function toggleExpandedNode(state, path) {
  const p = pathString(path);
  if (p in state) delete state[p];
  else state[p] = true;
  return state;
}

export function createExpandedPathsReducer(prefix, defaultState) {
  return createPrefixedReducer(
    prefix,
    {
      [TOGGLE_EXPANDED_PATH]: withShallowStateCopy(toggleExpandedNode),
    },
    defaultState,
  );
}
