
import React, { PureComponent } from 'react';
import * as fileRenderingKit from './file-rendering-kit';

export class File extends PureComponent {
  render() {
    const { resolveNodeTitleRenderer, node } = this.props;
    if (node.fileType in fileRenderingKit) {
      const Content = fileRenderingKit[node.fileType];
      return <Content content={node.content}/>
    }
    const Title = resolveNodeTitleRenderer(node);
    return <Title node={node}/>
  }
}
