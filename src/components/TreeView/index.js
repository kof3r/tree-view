
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

export class TreeView extends Component {
  state = { expanded: false };
  get children() {
    const { node: { children = [] } } = this.props;
    return [...children].sort(sortChildren);
  }
  get hasChildren() {
    return !!this.props.node.children;
  }
  toggleExpand = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }
  renderChildren() {
    const { expanded } = this.state;
    if (!this.hasChildren || !expanded) return null;

    const { renderers } = this.props;

    return <ul className='children'>{this.children.map(child => <TreeView key={child.id} node={child} renderers={renderers} />)}</ul>;
  }
  get className() {
    return classnames(
      'TreeView',
      {
        'expandable': this.hasChildren,
      }
    )
  }
  renderArtefact() {
    const { node, renderers } = this.props;
    const { type, name } = node;
    return (type in renderers) ? renderers[type]({ artefact: node }) : <span>{name}</span>;
  }
  render() {
    const { expanded } = this.state;

    return (
      <li className={this.className}>
        <div className='name' onClick={this.toggleExpand}>
          {this.hasChildren && <IconExpand expanded={expanded}/>}
          {this.renderArtefact()}
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}
