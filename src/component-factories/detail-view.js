
import React from 'react';
import { connect } from 'react-redux';
import { DetailView } from '../components';

export function createConnectedDetailView({ selectors, resolveNodeComponent }) {
  const { $selectedNode } = selectors;

  const mapStateToProps = state => ({ node: $selectedNode(state) });

  return connect(mapStateToProps)(props => (
    <DetailView
      {...props}
      resolveNodeRenderer={resolveNodeComponent}
    />
  ));
}
