
import React, { PureComponent } from 'react';

export class Node extends PureComponent {
  renderNodeTitle() {
    const { node, resolveNodeTitleRenderer } = this.props;
    const NodeTitle = resolveNodeTitleRenderer(node)
    return <NodeTitle node={node}/>
  }
  render() {
    const { node } = this.props;

    if (!node) return null;

    return (
      <div className='DetailView'>
        {this.renderNodeTitle()}
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
