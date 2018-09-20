export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if(handlers.hasOwnProperty(actions.type)) {
			return handlers[actions.type](state, action)
		} else {
			return state
		}
	}
}