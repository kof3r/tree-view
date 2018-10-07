
import React, { Component } from 'react';

import { TreeViewStateless } from './TreeViewStateless';

export class TreeView extends Component {
  state = { expandedNodes: {} };

  toggleExpand = (_, nodePath) => {
    const { expandedNodes } = this.state;
    if (nodePath in expandedNodes) {
      delete expandedNodes[nodePath];
    } else {
      expandedNodes[nodePath] = true;
    }
    this.setState({ expandedNodes });
  }

  isNodeExpanded = (_, nodePath) => {
    const { expandedNodes } = this.state;
    return nodePath in expandedNodes;
  }

  render() {
    return (
      <TreeViewStateless
        {...this.props}
        path=''
        onNodeClick={this.toggleExpand}
        isNodeExpanded={this.isNodeExpanded}
      />
    );
  }
}
