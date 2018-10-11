
import { createReducer } from 'util.lib/redux';

import { SELECT_PATH } from '../../actions';

function selectPath(_, payload) {
  return payload;
}

export default createReducer(
  {
    SELECT_PATH: selectPath,
  },
  null,
);
