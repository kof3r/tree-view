
import { createReducer } from 'util.lib/redux'
import { pathString } from 'util.lib/path';
import { TOGGLE_EXPANDED_PATH } from '../../actions';

export default createReducer({
  [TOGGLE_EXPANDED_PATH]: toggleExpandedNode,
}, {});

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
