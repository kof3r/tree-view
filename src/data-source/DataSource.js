
import { setRootNode } from '../state/file-system';

export class DataSource {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  setRootNode(node) {
    this.dispatch(setRootNode(node));
  }
  connect() {
    throw new Error('not implemented')
  }
}
