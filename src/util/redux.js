
export function createReducer(actionHandlers = {}, defaultState = null) {
  return function reducer(state = defaultState, { type, payload }) {
    return (type in actionHandlers) ? actionHandlers[type](state, payload) : state;
  }
}

export function createAction(type) {
  return payload => ({ type, payload });
}

export function createStaticSelector(path) {
  const segments = Array.isArray(path) ? path : path.split('.');
  return state => segments.reduce((s, segment) => s[segment], state);
}
