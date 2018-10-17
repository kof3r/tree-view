
import React, { PureComponent } from 'react';
import showdown from 'showdown';

export class md extends PureComponent {
  state = {
    content: ''
  }
  setContentRef = ref => this.contentRef = ref;
  mdToHtmlConverter = new showdown.Converter()
  get htmlContent() {
    const { path } = this.props;
    const content = this.props.content || this.state.content;
    if (content) {
      return { __html: this.mdToHtmlConverter.makeHtml(content) };
    }
    fetch(path)
      .then(response => response.text())
      .then(text => this.setState({ content: text.toString() }));
    return { __html: '' };
  }
  render() {
    return (
      <div className='md' dangerouslySetInnerHTML={this.htmlContent}/>
    );
  }
}
