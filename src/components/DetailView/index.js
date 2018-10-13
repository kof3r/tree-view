
import React, { PureComponent } from 'react';
import { nodeRenderingKit } from '../node-rendering-kit';

import './DetailView.scss';

export class DetailView extends PureComponent {
  render() {
    const { node } = this.props;

    if (!node) return null;

    const Node = node.type in nodeRenderingKit ? nodeRenderingKit[node.type] : ({ node }) => <span>{node.name}</span>;

    return (
      <div className='DetailView'>
        <Node node={node}/>
        <table>
          <thead>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(node.data).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{node.data[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
