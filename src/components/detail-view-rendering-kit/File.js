
import React, { Component } from 'react';
import { resolveNodeRenderer } from '..';
import * as fileRenderingKit from './file-rendering-kit';

export class File extends Component {
  state = { content: '' }
  loadContent() {
    const { node } = this.props;
    if (node.filePath) {
      fetch(node.filePath)
        .then(res => res.text())
        .then(text => this.setState({ content: text.toString() }))
    }
  }
  componentDidMount() {
    this.loadContent();
  }
  componentDidUpdate(nextProps) {
    if (this.props.node !== nextProps.node) {
      this.setState({ content: '' });
      this.loadContent();
    }
  }
  get content() {
    const { content } = this.state;
    if (content) return content;
    const { node } = this.props;
    if (node.content) return node.content;
    return '';
  }
  render() {
    const { node } = this.props;
    if (node.fileType in fileRenderingKit) {
      const Content = fileRenderingKit[node.fileType];
      return <Content content={this.content}/>
    }
    const Title = resolveNodeRenderer(node);
    return <Title node={node}/>
  }
}
