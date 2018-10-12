
import React, { Component } from 'react';
import classnames from 'classnames';

import './ContextMenu.scss';

export class ContextMenu extends Component {
  get className() {
    const { open } = this.props;
    return classnames(
      'ContextMenu',
      {
        'open': open,
      }
    );
  }
  get style() {
    const { position } = this.props;
    return position;
  }
  render() {
    const { node, onRemove, onRequestClose } = this.props;
    if (!node) return null;

    return (
      <div className={this.className} onClick={onRequestClose}>
        <div className='menu' style={this.style}>
          <div className='header'>{node.name}</div>
          <div className='options'>
            <div className='option'>add</div>
            <div className='option'>edit</div>
            <div className='option' onClick={onRemove}>remove</div>
          </div>
        </div>
      </div>
    );
  }
}
