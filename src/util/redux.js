
export function createReducer(actionHandlers = {}, defaultState = null) {
  return function reducer(state = defaultState, { type, payload }) {
    return (type in actionHandlers) ? actionHandlers[type](state, payload) : state;
  }
}
