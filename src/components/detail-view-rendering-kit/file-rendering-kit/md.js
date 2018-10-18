
import React, { PureComponent } from 'react';
import showdown from 'showdown';

export class md extends PureComponent {
  state = {
    content: ''
  }
  setContentRef = ref => this.contentRef = ref;
  mdToHtmlConverter = new showdown.Converter()
  get htmlContent() {
    const { content = '' } = this.props;
    return { __html: this.mdToHtmlConverter.makeHtml(content) };
  }
  render() {
    return (
      <div className='md' dangerouslySetInnerHTML={this.htmlContent}/>
    );
  }
}
