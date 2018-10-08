
import { NODE_PATH_DELIMITER as delimiter } from '../constants';

export function pathString(path) {
  return path.join(delimiter)
}

export function pathContainsPath(path1, path2) {
  return pathString(path2).startsWith(pathString(path1));
}

export function equalPaths(p1, p2) {
  return pathString(p1) === pathString(p2);
}
