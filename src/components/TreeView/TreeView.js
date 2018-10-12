
import React, { Component } from 'react';

import { equalPaths, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';
import { ContextMenu } from '../ContextMenu';

export class TreeView extends Component {
  state = {
    sourcePath: null,
    destinationPath: null,
    contextMenu: { node: null, path: null, position: {} },
  };
  setContainerRef = ref => this.containerRef = ref;
  closeNodeContextMenu = () => this.setState({ contextMenu: { node: null, path: null, position: {} } });
  onKeyDown = (evt) => {
    const { selectedPath, selectPath, shiftSelectedPath } = this.props;
    evt.preventDefault();
    switch (evt.key) {
      case 'ArrowUp': return shiftSelectedPath(-1);
      case 'ArrowDown': return shiftSelectedPath(1);
      case 'Enter': return this.toggleExpand(null, selectedPath);
      case 'Escape': return selectPath(null);
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
  toggleExpand = (_, nodePath) => this.props.toggleExpandedPath(nodePath)
  selectPath = (_, path) => this.props.selectPath(path);
  isNodeExpanded = (_, nodePath) => this.props.isPathExpanded(nodePath);
  onMouseEnter = () => {
    const { containerRef } = this;
    const { selectedPath } = this.props;
    if (containerRef) {
      containerRef.focus();
    }
    if (!selectedPath) {
      this.setRootNodeAsSelected();
    }
  }
  setRootNodeAsSelected = () => this.props.selectPath([this.props.node.id]);
  openNodeContextMenu = (node, path, position) => this.setState({ contextMenu: { node, path, position } });
  contextRemoveNode = () => {
    const { path } = this.state.contextMenu;
    const { removeNode } = this.props;
    removeNode(path);
  }
  render() {
    const { node, renderingKit, selectedPath } = this.props;
    const { destinationPath, contextMenu } = this.state;

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
          onNodeClick={this.selectPath}
          onNodeDoubleClick={this.toggleExpand}
          onNodeDragEnter={this.setDragDestinationPath}
          onNodeDragStart={this.setDragSourcePath}
          onNodeDrop={this.moveNode}
          path={[]}
          selectedPath={selectedPath}
          onNodeContextMenu={this.openNodeContextMenu}
        />
        <ContextMenu
          open={!!contextMenu.node}
          node={contextMenu.node}
          position={contextMenu.position}
          onRemove={this.contextRemoveNode}
          onRequestClose={this.closeNodeContextMenu}
        />
      </div>
    );
  }
}
