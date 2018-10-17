
import React, { PureComponent } from 'react';
import * as fileRenderingKit from './file-rendering-kit';

export class File extends PureComponent {
  state = { content: '' }
  get content() {
    const { content } = this.state;
    if (content) return content;
    const { node } = this.props;
    if (node.content) return node.content;
    if (node.filePath) {
      fetch(node.filePath)
        .then(res => res.text())
        .then(text => this.setState({ content: text.toString() }))
    }
    return '';
  }
  render() {
    const { resolveNodeTitleRenderer, node } = this.props;
    if (node.fileType in fileRenderingKit) {
      const Content = fileRenderingKit[node.fileType];
      return <Content content={this.content}/>
    }
    const Title = resolveNodeTitleRenderer(node);
    return <Title node={node}/>
  }
}
