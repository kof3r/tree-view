
import { createPrefixedReducer } from 'util.lib/redux';

import { SELECT_PATH } from '../actions';

function selectPath(_, payload) {
  return payload;
}

export function createSelectedPathReducer(prefix) {
  return createPrefixedReducer(
    prefix,
    {
      [SELECT_PATH]: selectPath,
    },
    null,
  );
}
