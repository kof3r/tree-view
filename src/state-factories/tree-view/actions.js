
import { createTreeViewSelectors } from './selectors';
import { pathString } from 'util.lib/path';

export const _REMOVE_NODE = '_REMOVE_NODE';
export const _MOVE_NODE = '_MOVE_NODE';
export const _TOGGLE_EXPANDED_PATH = '_TOGGLE_EXPANDED_NODE';
export const _SELECT_PATH = '_SELECT_PATH';
export const _SET_ROOT_NODE = '_SET_ROOT_NODE';

export function createTreeViewActions(prefix, selectors) {
  const { $indexPathMap, $pathIndexMap, $selectedPath, $root } = selectors;
  const pfx = action => `${prefix}${action}`;

  const setRootNode = node => ({ type: pfx(_SET_ROOT_NODE), payload: node });
  const moveNode = (source, destination) => ({ type: pfx(_MOVE_NODE), payload: { source, destination } });
  const removeNode = path => ({ type: pfx(_REMOVE_NODE), payload: path });
  const selectPath = path => ({ type: pfx(_SELECT_PATH), payload: path });
  const toggleExpandedPath = path => {
    if (Array.isArray(path)) {
      return { type: pfx(_TOGGLE_EXPANDED_PATH), payload: path };
    }
    return (dispatch, getState) => {
      const state = getState();
      const selectedPath = $selectedPath(state);
      if (selectedPath) {
        return dispatch({ type: pfx(_TOGGLE_EXPANDED_PATH), payload: selectedPath })
      }
      const rootNode = $root(state);
      if (rootNode) {
        return dispatch({ type: pfx(_TOGGLE_EXPANDED_PATH), payload: [rootNode.id] })
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
