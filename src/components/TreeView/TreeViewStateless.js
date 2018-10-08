
import React, { Component } from 'react';
import classnames from 'classnames';

import { pathString } from '../../util/path';
import { Icon } from '../Icon';

import './TreeView.scss';

const IconExpand = ({ expanded }) => <Icon icon={`cheveron-${expanded ? 'down' : 'right'}`}/>

function sortChildren(e1, e2) {
  if (e1.children && !e2.children) return -1;
  if (!e1.children && e2.children) return 1;
  return e1.name.localeCompare(e2.name); 
}

export class TreeViewStateless extends Component {
  onDragStart = () => {
    const { onDragStart } = this.props;
    onDragStart(this.nodePath);
  }
  onDragOver = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }
  onDrop = () => {
    const { moveNode } = this.props;
    const fullPath = this.nodePath;
    if (!this.hasChildren) {
      fullPath.pop();
    }
    moveNode(fullPath);
  }
  onDragEnter = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const { onDragEnter } = this.props;
    if (onDragEnter) {
      const path = this.nodePath;
      if (!this.hasChildren) {
        path.pop();
      }
      onDragEnter(path);
    }
  }
  get children() {
    const { node: { childList = [] } } = this.props;
    return [...childList].sort(sortChildren);
  }
  get hasChildren() {
    return this.props.node.hasChildren;
  }
  get nodePath() {
    const { node, path } = this.props;
    return [...path, node.id];
  }
  get onNodeClick() {
    const { node, onNodeClick } = this.props;
    return () => onNodeClick(node, this.nodePath);
  }
  get isNodeExpanded() {
    const { node, isNodeExpanded } = this.props;
    return isNodeExpanded(node, this.nodePath);
  }
  renderChildren() {
    if (!this.hasChildren || !this.isNodeExpanded) return null;

    return (
      <ul className='children'>{this.children.map(child => <TreeViewStateless key={child.id} {...this.props} path={this.nodePath} node={child} />)}</ul>
    );
  }
  get className() {
    const { className, highlightedPath } = this.props;
    return classnames(
      'TreeView',
      className,
      {
        'expandable': this.hasChildren,
        'highlighted': highlightedPath && (pathString(highlightedPath) === pathString(this.nodePath))
      }
    )
  }
  renderNode() {
    const { node, renderingKit } = this.props;
    const { type, name } = node;
    return (type in renderingKit) ? renderingKit[type]({ node }) : <span>{name}</span>;
  }
  render() {
    return (
      <li className={this.className}>
        <div draggable className='node-container' onClick={this.onNodeClick} onDragEnter={this.onDragEnter} onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop}>
          {this.hasChildren && <IconExpand expanded={this.isNodeExpanded}/>}
          {this.renderNode()}
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}
