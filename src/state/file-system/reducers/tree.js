
import { parseNodeTree } from '../../../parser';
import { pathContainsPath } from '../../../util/path';
import { ADD_NODE, MOVE_NODE, REMOVE_NODE, SET_ROOT_NODE, UPDATE_NODE_DATA } from '../../actions';
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

function addNode(tree, { path, node }) {
  const [_, child, ...rest] = path;

  const children = { ...tree.children };
  if (!child) {
    children[node.id] = node;
  } else {
    children[child] = addNode(children[child], { path: [child, ...rest], node });
  }
  return { ...tree, children };
}

function moveNode(tree, { source, destination }) {
  if (pathContainsPath(source, destination)) return tree;

  const node = findNode(tree, source);
  const existingNodeInDestination = findNode(tree, [...destination, node.id])
  if (!!existingNodeInDestination) return tree;
  
  const nextState = removeNode(tree, source)
  return addNode(nextState, { path: destination, node: { ...node } });
}

function updateNodeData(tree, { path, data }) {
  const node = findNode(tree, path);
  if (!node) return tree;
  const newNode = { ...node, data: { ...node.data, ...data } };
  path.pop()
  return addNode(tree, { path, node: newNode });
}

export default createReducer(
  {
    [ADD_NODE]: addNode,
    [MOVE_NODE]: moveNode,
    [REMOVE_NODE]: removeNode,
    [SET_ROOT_NODE]: setRootNode,
    [UPDATE_NODE_DATA]: updateNodeData,
  },
  null,
);
