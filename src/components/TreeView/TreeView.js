
import React, { Component } from 'react';

import { equalPaths, pathString, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';

function sortChildren(e1, e2) {
  if (e1.children && !e2.children) return -1;
  if (!e1.children && e2.children) return 1;
  return e1.name.localeCompare(e2.name); 
}

function invertIndexPathMap(indexPathMap) {
  return indexPathMap.reduce((pathIndexMap, path, idx) => Object.assign(pathIndexMap, { [pathString(path)]: idx }), {});
}

function buildIndexPathMap(pathPrefix, node, expandedNodes) {
  const path = [...pathPrefix, node.id];
  const pathMap = [path];
  if (node.childList && (pathString(path) in expandedNodes)) {
    for (const child of node.childList.sort(sortChildren)) {
      const childPathMap = buildIndexPathMap(path, child, expandedNodes);
      for (const childPath of childPathMap) {
        pathMap.push(childPath);
      }
    }
  }
  return pathMap;
}

export class TreeView extends Component {
  cache = {}

  state = {
    expandedNodes: {},
    sourcePath: null,
    destinationPath: null,
    selectedPath: null,
  };

  componentWillUpdate(_, state) {
    const { expandedNodes } = this.state;
    if (expandedNodes !== state.expandedNodes) {
      this.cache = {};
    }
  }

  get indexPathMap() {
    if (!this.cache.indexPathMap) {
      const { node } = this.props;
      const { expandedNodes } = this.state;
      this.cache.indexPathMap = buildIndexPathMap([], node, expandedNodes)
    }
    return this.cache.indexPathMap;
  }

  get pathIndexMap() {
    if (!this.cache.pathIndexMap) {
      this.cache.pathIndexMap = invertIndexPathMap(this.indexPathMap);
    }
    return this.cache.pathIndexMap;
  }

  shiftSelectedNode(direction) {
    const { selectedPath } = this.state;
    const { pathIndexMap, indexPathMap } = this;
    const nodeCount = indexPathMap.length;
    const currentIndex = pathIndexMap[pathString(selectedPath)];
    const nextIndex = (nodeCount + currentIndex + direction) % nodeCount;
    this.setState({ selectedPath: indexPathMap[nextIndex] });
  }

  onKeyDown = (evt) => {
    const { selectedPath } = this.state;
    evt.preventDefault();
    switch (evt.key) {
      case 'ArrowUp': return this.shiftSelectedNode(-1);
      case 'ArrowDown': return this.shiftSelectedNode(1);
      case 'Enter': this.toggleExpand(null, selectedPath);
    }
  }

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
    const newExpandedNodes = { ...expandedNodes };
    const path = pathString(nodePath);
    if (path in expandedNodes) {
      delete newExpandedNodes[path];
    } else {
      newExpandedNodes[path] = true;
    }
    this.setState({ expandedNodes: newExpandedNodes, selectedPath: nodePath });
  }

  isNodeExpanded = (_, nodePath) => {
    const { expandedNodes } = this.state;
    return pathString(nodePath) in expandedNodes;
  }

  render() {
    const { destinationPath, selectedPath } = this.state;

    return (
      <div className="TreeViewContainer" tabIndex="0" onKeyDown={this.onKeyDown}>
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
          sortChildren={sortChildren}
        />
      </div>
    );
  }
}
