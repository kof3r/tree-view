
import React, { Component } from 'react';
import classnames from 'classnames';

import { equalPaths } from '../../util/path';
import { Icon } from '../Icon';

import './TreeView.scss';

const IconExpand = ({ expanded }) => <Icon className='expander' icon={`cheveron-${expanded ? 'down' : 'right'}`}/>;
const DefaultNode = ({ node }) => <span>{node.name}</span>;

export class TreeViewStateless extends Component {
  onNodeDragStart = () => {
    const { onNodeDragStart } = this.props;
    if (onNodeDragStart) {
      onNodeDragStart(this.nodePath);
    }
  }
  onDragOver = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }
  onNodeDrop = () => {
    const { onNodeDrop } = this.props;
    if (onNodeDrop) {
      const fullPath = this.nodePath;
      if (!this.hasChildren) {
        fullPath.pop();
      }
      onNodeDrop(fullPath);
    }
  }
  onNodeDragEnter = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const { onNodeDragEnter } = this.props;
    if (onNodeDragEnter) {
      const path = this.nodePath;
      if (!this.hasChildren) {
        path.pop();
      }
      onNodeDragEnter(path);
    }
  }
  onContextMenu = (evt) => {
    const { onNodeContextMenu, node } = this.props;
    if (onNodeContextMenu) {
      evt.preventDefault();
      onNodeContextMenu(node, { left: evt.pageX, top: evt.pageY });
    }
  }
  get children() {
    const { node: { childList = [] }, sortChildren } = this.props;
    const children = [...childList];
    if (sortChildren) {
      children.sort(sortChildren);
    }
    return children;
  }
  get hasChildren() {
    return this.props.node.hasChildren;
  }
  get nodePath() {
    const { node, path } = this.props;
    return [...path, node.id];
  }
  onNodeClick = () => {
    const { node, onNodeClick } = this.props;
    onNodeClick(node, this.nodePath);
  }
  get isNodeExpanded() {
    const { node, isNodeExpanded } = this.props;
    return isNodeExpanded(node, this.nodePath);
  }
  equalPath(path) {
    return equalPaths(this.nodePath, path);
  }
  renderChildren() {
    if (!this.hasChildren || !this.isNodeExpanded) return null;

    return (
      <ul className='children'>{this.children.map(child => <TreeViewStateless key={child.id} {...this.props} path={this.nodePath} node={child} />)}</ul>
    );
  }
  get className() {
    const { className, highlightedPath, selectedPath } = this.props;
    return classnames(
      'TreeView',
      className,
      {
        'expandable': this.hasChildren,
        'highlighted': highlightedPath && this.equalPath(highlightedPath),
        'selected': selectedPath && this.equalPath(selectedPath),
      }
    )
  }
  renderNode() {
    const { node, renderingKit } = this.props;
    const { type } = node;
    const Node = (type in renderingKit) ? renderingKit[type] : DefaultNode;
    return <Node node={node}/>;
  }
  render() {
    return (
      <li className={this.className}>
        <div
          className='node-container'
          draggable
          onClick={this.onNodeClick}
          onDragEnter={this.onNodeDragEnter}
          onDragStart={this.onNodeDragStart}
          onDragOver={this.onDragOver}
          onDrop={this.onNodeDrop}
          onContextMenu={this.onContextMenu}
        >
          {this.hasChildren && <IconExpand expanded={this.isNodeExpanded}/>}
          {this.renderNode()}
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}
