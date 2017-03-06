import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { reducer as formReducer} from 'redux-form'
import rsvpReducer from './reducers'

// Set up Redux
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const reducers = {
	form: formReducer,
	rsvp: rsvpReducer,
}

const reducer = combineReducers(reducers)

const store = createStore(
	reducer, applyMiddleware(...middleware)
)

export default store
