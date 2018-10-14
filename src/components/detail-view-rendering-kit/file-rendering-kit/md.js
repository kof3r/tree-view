
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

export class md extends PureComponent {
  setContentRef = ref => this.contentRef = ref;
  componentDidMount() {
    const { content } = this.props;

    ReactDOM.render(
      <ReactMarkdown source={content}/>,
      this.contentRef,
    );
  }
  render() {
    return (
      <div className='md' ref={this.setContentRef}/>
    );
  }
}
