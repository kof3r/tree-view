
import { pathString } from 'util.lib/path';

export const REMOVE_NODE = 'removeNode';
export const MOVE_NODE = 'moveNode';
export const TOGGLE_EXPANDED_PATH = 'toggleExpandedNode';
export const SELECT_PATH = 'selectPath';
export const SET_ROOT_NODE = 'setRootNode';

export function createTreeViewActions(prefix, selectors) {
  const { $indexPathMap, $pathIndexMap, $selectedPath, $root } = selectors;
  const pfx = action => `${prefix}:${action}`;

  const setRootNode = node => ({ type: pfx(SET_ROOT_NODE), payload: node });
  const moveNode = (source, destination) => ({ type: pfx(MOVE_NODE), payload: { source, destination } });
  const removeNode = path => ({ type: pfx(REMOVE_NODE), payload: path });
  const selectPath = path => ({ type: pfx(SELECT_PATH), payload: path });
  const toggleExpandedPath = path => {
    if (Array.isArray(path)) {
      return { type: pfx(TOGGLE_EXPANDED_PATH), payload: path };
    }
    return (dispatch, getState) => {
      const state = getState();
      const selectedPath = $selectedPath(state);
      if (selectedPath) {
        return dispatch({ type: pfx(TOGGLE_EXPANDED_PATH), payload: selectedPath })
      }
      const rootNode = $root(state);
      if (rootNode) {
        return dispatch({ type: pfx(TOGGLE_EXPANDED_PATH), payload: [rootNode.id] })
      }
    }
  }
  const shiftSelectedPath = direction => {
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

  return {
    setRootNode,
    moveNode,
    removeNode,
    selectPath,
    toggleExpandedPath,
    shiftSelectedPath,
  }
}
