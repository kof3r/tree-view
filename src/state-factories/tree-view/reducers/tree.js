
import { parseNodeTree } from '../../../parser';
import { pathContainsPath } from 'util.lib/path';
import { _MOVE_NODE, _REMOVE_NODE, _SET_ROOT_NODE } from '../actions';
import { createReducer } from 'util.lib/redux';

function findNode(tree, path) {
  const [_, ...rest] = path;
  return rest.reduce((current, segment) => current.children[segment], tree);
}

function setRootNode(_, node) {
  return parseNodeTree(node);
}

function removeNode(tree, path) {
  const [_, child, ...rest] = path;

  const children = { ...tree.children };
  if (rest.length === 0) {
    delete children[child];
  } else {
    children[child] = removeNode(children[child], [child, ...rest]);
  }
  return { ...tree, children }
}

function addNode(tree, path, node) {
  const [_, child, ...rest] = path;

  const children = { ...tree.children };
  if (!child) {
    children[node.id] = node;
  } else {
    children[child] = addNode(children[child], [child, ...rest], node);
  }
  return { ...tree, children };
}

function moveNode(tree, { source, destination }) {
  if (pathContainsPath(source, destination)) return tree;

  const node = findNode(tree, source);
  const existingNodeInDestination = findNode(tree, [...destination, node.id])
  if (!!existingNodeInDestination) return tree;
  
  const nextState = removeNode(tree, source)
  return addNode(nextState, destination, { ...node });
}

export function createTreeReducer(prefix, defaultState) {
  return createReducer(
    {
      [`${prefix}${_MOVE_NODE}`]: moveNode,
      [`${prefix}${_REMOVE_NODE}`]: removeNode,
      [`${prefix}${_SET_ROOT_NODE}`]: setRootNode,
    },
    defaultState,
  );
}
