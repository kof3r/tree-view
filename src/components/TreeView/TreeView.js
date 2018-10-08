
import React, { Component } from 'react';

import { equalPaths, pathString, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';

export class TreeView extends Component {
  state = {
    expandedNodes: {},
    sourcePath: null,
    destinationPath: null,
  };

  setDragSourcePath = (path) => {
    this.setState({ sourcePath: path });
  }

  setDragDestinationPath = (path) => {
    const { destinationPath, sourcePath } = this.state;
    if (pathContainsPath(sourcePath, path)) {
      this.setState({ destinationPath: null });
    }
    else if (!destinationPath || !equalPaths(destinationPath, path)) {
      this.setState({ destinationPath: path });
    }
  }

  moveNode = (destinationPath) => {
    const { moveNode } = this.props;
    const { sourcePath } = this.state;
    this.setState({ sourcePath: null, destinationPath: null });
    moveNode(sourcePath, destinationPath);
  }

  toggleExpand = (_, nodePath) => {
    const { expandedNodes } = this.state;
    const path = pathString(nodePath);
    if (path in expandedNodes) {
      delete expandedNodes[path];
    } else {
      expandedNodes[path] = true;
    }
    this.setState({ expandedNodes });
  }

  isNodeExpanded = (_, nodePath) => {
    const { expandedNodes } = this.state;
    return pathString(nodePath) in expandedNodes;
  }

  render() {
    const { destinationPath } = this.state;

    return (
      <TreeViewStateless
        {...this.props}
        moveNode={this.moveNode}
        onDragStart={this.setDragSourcePath}
        onDragEnter={this.setDragDestinationPath}
        path={[]}
        onNodeClick={this.toggleExpand}
        isNodeExpanded={this.isNodeExpanded}
        highlightedPath={destinationPath}
      />
    );
  }
}
