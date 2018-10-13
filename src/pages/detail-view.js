
import { connect } from 'react-redux';
import { DetailView } from '../components';
import { $selectedNode } from '../state/file-system';

export const DetailViewPage = connect(
  state => ({ node: $selectedNode(state) }),
)(DetailView);
