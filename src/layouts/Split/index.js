
import React, { Component } from 'react';
import classnames from 'classnames';

import './Split.scss';

export class SplitLayout extends Component {
  state = { dragging: false, leftWidth: 300 };
  onMouseMove = (evt) => {
    if (!this.state.dragging) return;

    this.setState({ leftWidth: evt.pageX });
  }
  startDrag = () => this.setState({ dragging: true });
  stopDrag = () => this.setState({ dragging: false });
  get styleLeft() {
    return { width: this.state.leftWidth };
  }
  get styleDragger() {
    return { left: this.state.leftWidth };
  }
  get className() {
    return classnames('Layout', 'Split');
  }
  render() {
    const { left = null, right  } = this.props;
    return (
      <div className={this.className} onMouseMove={this.onMouseMove}>
        <div className='container left' style={this.styleLeft}>{left}</div>
        <div className='container right'>{right}</div>
        <div className='dragger' style={this.styleDragger} onMouseDown={this.startDrag} onMouseUp={this.stopDrag}/>
      </div>
    );
  }
}
