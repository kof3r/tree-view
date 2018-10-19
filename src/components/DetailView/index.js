
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './DetailView.scss';

export class DetailView extends PureComponent {
  renderNodeDetailView() {
    const { node, resolveNodeRenderer } = this.props;
    const NodeDetailView = resolveNodeRenderer(node)
    return <NodeDetailView node={node}/>;
  }
  get className() {
    return classnames('DetailView', this.props.node.type);
  }
  render() {
    const { node } = this.props;

    if (!node) return null;

    return (
      <div className={this.className}>
        {this.renderNodeDetailView()}
      </div>
    );
  }
}
