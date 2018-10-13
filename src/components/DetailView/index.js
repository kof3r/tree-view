
import React, { PureComponent } from 'react';

import './DetailView.scss';

export class DetailView extends PureComponent {
  render() {
    const { node } = this.props;

    if (!node) return null;

    return (
      <div className='DetailView'>
        <h1>{node.name}</h1>
        <h2>data:</h2>
        <p>{JSON.stringify(node.data, null, 2)}</p>
      </div>
    );
  }
}
