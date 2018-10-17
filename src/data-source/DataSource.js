
import { fileSystemActions } from '../state/file-system';

const { setRootNode } = fileSystemActions;

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
