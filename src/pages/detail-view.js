
import React from 'react';
import { connect } from 'react-redux';
import { DetailView, resolveNodeRenderer, resolveNodeDetailViewRenderer } from '../components';
import { $selectedNode } from '../state/file-system';

export const DetailViewPage = connect(
  state => ({ node: $selectedNode(state) }),
)(props => <DetailView {...props} resolveNodeRenderer={resolveNodeDetailViewRenderer} resolveNodeTitleRenderer={resolveNodeRenderer}/>);
