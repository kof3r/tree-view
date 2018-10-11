
import React, { Component } from 'react';

import { equalPaths, pathContainsPath } from '../../util/path';

import { TreeViewStateless } from './TreeViewStateless';
import { ContextMenu } from './ContextMenu';

export class TreeView extends Component {
  state = {
    sourcePath: null,
    destinationPath: null,
    contextMenu: { node: null, position: {} },
  };
  setContainerRef = ref => this.containerRef = ref;
  closeNodeContextMenu = () => this.setState({ contextMenu: { node: null, position: {} } });
  componentWillMount() {
    document.addEventListener('click', this.closeNodeContextMenu);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeNodeContextMenu);
  }
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
  toggleExpand = (_, nodePath) => {
    this.props.toggleExpandedPath(nodePath);
  }
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
  openNodeContextMenu = (node, { top, left }) => this.setState({ contextMenu: { node, position: { top, left } } });
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
          onNodeClick={this.toggleExpand}
          onNodeDragEnter={this.setDragDestinationPath}
          onNodeDragStart={this.setDragSourcePath}
          onNodeDrop={this.moveNode}
          path={[]}
          selectedPath={selectedPath}
          onNodeContextMenu={this.openNodeContextMenu}
        />
        <ContextMenu open={!!contextMenu.node} node={contextMenu.node} position={contextMenu.position}/>
      </div>
    );
  }
}
