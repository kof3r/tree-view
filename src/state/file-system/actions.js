
import { MOVE_NODE } from '../actions';

export function moveNode(source, destination) {
  return { type: MOVE_NODE, payload: { source, destination } };
}
