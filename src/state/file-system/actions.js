
import { MOVE_NODE, TOGGLE_EXPANDED_PATH, SELECT_PATH } from '../actions';
import { $indexPathMap, $pathIndexMap, $selectedPath, $root } from './selectors';
import { pathString } from 'util.lib/path';

export function moveNode(source, destination) {
  return { type: MOVE_NODE, payload: { source, destination } };
}

export function toggleExpandedPath(path) {
  return { type: TOGGLE_EXPANDED_PATH, payload: path };
}

export function selectPath(path) {
  return { type: SELECT_PATH, payload: path };
}

export function shiftSelectedPath(direction) {
  return (dispatch, getState) => {
    const state = getState();
    const selectedPath = $selectedPath(state);
    if (selectedPath) {
      const pathIndexMap = $pathIndexMap(state);
      const indexPathMap = $indexPathMap(state);
      const expandedNodeCount = indexPathMap.length;
      const currentIndex = pathIndexMap[pathString(selectedPath)];
      const nextIndex = (expandedNodeCount + currentIndex + direction) % expandedNodeCount;
      dispatch(selectPath(indexPathMap[nextIndex]));
    } else {
      const root = $root(state);
      dispatch(selectPath([root.id]));
    }
  }
}
