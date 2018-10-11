
import React, { Component } from 'react';

import { equalPaths, pathString, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';
import { ContextMenu } from './ContextMenu';

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
  setContainerRef = ref => this.containerRef = ref;

  cache = {
    indexPathMap: null,
    pathIndexMap: null,
  }

  state = {
    sourcePath: null,
    destinationPath: null,
    selectedPath: null,
    contextMenu: { node: null, position: {} },
  };

  closeNodeContextMenu = () => this.setState({ contextMenu: { node: null, position: {} } });

  componentWillMount() {
    document.addEventListener('click', this.closeNodeContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNodeContextMenu);
  }

  componentWillUpdate(props) {
    if (this.props.expandedNodes !== props.expandedNodes) {
      this.clearPathIndexCache();
    }
  }

  clearPathIndexCache() {
    this.cache.indexPathMap = null;
    this.cache.pathIndexMap = null;
  }

  get indexPathMap() {
    if (!this.cache.indexPathMap) {
      const { node, expandedNodes } = this.props;
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
    if (selectedPath) {
      const nodeCount = indexPathMap.length;
      const currentIndex = pathIndexMap[pathString(selectedPath)];
      const nextIndex = (nodeCount + currentIndex + direction) % nodeCount;
      this.setState({ selectedPath: indexPathMap[nextIndex] });
    } else {
      this.setState({ selectedPath: indexPathMap[0] });
    }
  }

  onKeyDown = (evt) => {
    const { selectedPath } = this.state;
    evt.preventDefault();
    switch (evt.key) {
      case 'ArrowUp': return this.shiftSelectedNode(-1);
      case 'ArrowDown': return this.shiftSelectedNode(1);
      case 'Enter': return this.toggleExpand(null, selectedPath);
      case 'Escape': return this.setState({ selectedPath: null });
    }
  }

  setDragSourcePath = (path) => this.setState({ sourcePath: path });

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
    this.props.toggleExpandedPath(nodePath);
  }

  isNodeExpanded = (_, nodePath) => this.props.isPathExpanded(nodePath);

  onMouseEnter = () => {
    const { containerRef } = this;
    const { selectedPath } = this.state;
    if (containerRef) {
      containerRef.focus();
    }
    if (!selectedPath) {
      this.setRootNodeAsSelected();
    }
  }

  setRootNodeAsSelected = () => this.setState({ selectedPath: this.indexPathMap[0] });

  openNodeContextMenu = (node, { top, left }) => this.setState({ contextMenu: { node, position: { top, left } } });

  render() {
    const { node, renderingKit } = this.props;
    const { destinationPath, selectedPath, contextMenu } = this.state;

    return (
      <div
        className="TreeViewContainer"
        ref={this.setContainerRef}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        onMouseEnter={this.onMouseEnter}
        onFocus={this.setRootNodeAsSelected}
      >
        <TreeViewStateless
          renderingKit={renderingKit}
          node={node}
          highlightedPath={destinationPath}
          isNodeExpanded={this.isNodeExpanded}
          onNodeClick={this.toggleExpand}
          onNodeDragEnter={this.setDragDestinationPath}
          onNodeDragStart={this.setDragSourcePath}
          onNodeDrop={this.moveNode}
          path={[]}
          selectedPath={selectedPath}
          sortChildren={sortChildren}
          onNodeContextMenu={this.openNodeContextMenu}
        />
        <ContextMenu open={!!contextMenu.node} node={contextMenu.node} position={contextMenu.position}/>
      </div>
    );
  }
}
