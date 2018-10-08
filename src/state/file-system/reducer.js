
import fileSystemRaw from '../../test_data/file-system.json';
import { parseNodeTree } from '../../parser';
import { pathContainsPath } from '../../util/path';
import { MOVE_NODE } from '../actions';

const fileSystem = parseNodeTree(fileSystemRaw);

function findNode(state, path) {
  const [_, ...rest] = path;
  return rest.reduce((current, segment) => current.children[segment], state);
}

function removeNode(state, path) {
  const [_, child, ...rest] = path;

  const children = { ...state.children };
  if (rest.length === 0) {
    delete children[child];
  } else {
    children[child] = removeNode(children[child], [child, ...rest]);
  }
  return { ...state, children }
}

function addNode(state, path, node) {
  const [_, child, ...rest] = path;

  const children = { ...state.children };
  if (!child) {
    children[node.id] = node;
  }
  else if (rest.length === 0) {
    children[child] = { ...children[child], children: { ...children[child].children, [node.id]: node } };
  } else {
    children[child] = addNode(children[child], [child, ...rest], node);
  }
  return { ...state, children };
}

function moveNode(state, { source, destination }) {
  if (pathContainsPath(source, destination)) return state;

  const node = findNode(state, source);
  const existingNodeInDestination = findNode(state, [...destination, node.id])
  if (!!existingNodeInDestination) return state;
  
  const nextState = removeNode(state, source)
  return addNode(nextState, destination, { ...node });
}

export function fileSystemReducer(state = fileSystem, { type, payload }) {
  switch (type) {
    case MOVE_NODE: return moveNode(state, payload)
    default: return state;
  }
}
