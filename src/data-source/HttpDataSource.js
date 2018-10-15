
import { DataSource } from './DataSource';

export class HttpDataSource extends DataSource {
  constructor(store, url) {
    super(store);

    this.url = url;
  }
  connect() {
    fetch(this.url)
      .then(response => response.json())
      .then(node => this.setRootNode(node));
  }
}
