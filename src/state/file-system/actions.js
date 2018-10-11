
import { MOVE_NODE, TOGGLE_EXPANDED_PATH, SELECT_PATH } from '../actions';

export function moveNode(source, destination) {
  return { type: MOVE_NODE, payload: { source, destination } };
}

export function toggleExpandedPath(path) {
  return { type: TOGGLE_EXPANDED_PATH, payload: path };
}

export function selectPath(path) {
  return { type: SELECT_PATH, payload: path };
}
