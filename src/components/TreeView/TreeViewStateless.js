
import React, { Component } from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';

import './TreeView.scss';

const IconExpand = ({ expanded }) => <Icon icon={`cheveron-${expanded ? 'down' : 'right'}`}/>

function sortChildren(e1, e2) {
  if (e1.children && !e2.children) return -1;
  if (!e1.children && e2.children) return 1;
  return e1.name.localeCompare(e2.name); 
}

export class TreeViewStateless extends Component {
  get children() {
    const { node: { children = [] } } = this.props;
    return [...children].sort(sortChildren);
  }
  get hasChildren() {
    return !!this.props.node.children;
  }
  get fullNodePath() {
    const { node, path } = this.props;
    return `${path}/${node.id}`;
  }
  get onNodeClick() {
    const { node, onNodeClick } = this.props;
    return () => onNodeClick(node, this.fullNodePath);
  }
  get isNodeExpanded() {
    const { node, isNodeExpanded } = this.props;
    return isNodeExpanded(node, this.fullNodePath);
  }
  renderChildren() {
    if (!this.hasChildren || !this.isNodeExpanded) return null;

    return (
      <ul className='children'>{this.children.map(child => <TreeViewStateless key={child.id} {...this.props} path={this.fullNodePath} node={child} />)}</ul>
    );
  }
  get className() {
    return classnames(
      'TreeView',
      {
        'expandable': this.hasChildren,
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
        <div className='node-container' onClick={this.onNodeClick}>
          {this.hasChildren && <IconExpand expanded={this.isNodeExpanded}/>}
          {this.renderNode()}
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}
