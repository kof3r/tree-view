
import { createReducer } from 'util.lib/redux';

import { _SELECT_PATH } from '../actions';

function selectPath(_, payload) {
  return payload;
}

export function createSelectedPathReducer(prefix) {
  return createReducer(
    {
      [`${prefix}${_SELECT_PATH}`]: selectPath,
    },
    null,
  );
}
