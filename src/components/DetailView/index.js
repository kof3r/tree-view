
import React, { PureComponent } from 'react';

import './DetailView.scss';

export class DetailView extends PureComponent {
  renderNode() {
    const { node, resolveNodeRenderer } = this.props;
    const Node = resolveNodeRenderer(node)
    return <Node node={node}/>
  }
  render() {
    const { node } = this.props;

    if (!node) return null;

    return (
      <div className='DetailView'>
        {this.renderNode()}
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
