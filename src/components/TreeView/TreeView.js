
import React, { Component } from 'react';

import { equalPaths, pathString, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';

export class TreeView extends Component {
  state = {
    expandedNodes: {},
    sourcePath: null,
    destinationPath: null,
    selectedPath: null,
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
    this.setState({ expandedNodes, selectedPath: nodePath });
  }

  isNodeExpanded = (_, nodePath) => {
    const { expandedNodes } = this.state;
    return pathString(nodePath) in expandedNodes;
  }

  render() {
    const { destinationPath, selectedPath } = this.state;

    return (
      <TreeViewStateless
        {...this.props}
        highlightedPath={destinationPath}
        isNodeExpanded={this.isNodeExpanded}
        onNodeClick={this.toggleExpand}
        onNodeDragEnter={this.setDragDestinationPath}
        onNodeDragStart={this.setDragSourcePath}
        onNodeDrop={this.moveNode}
        path={[]}
        selectedPath={selectedPath}
      />
    );
  }
}
