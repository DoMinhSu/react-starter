import { createStore,applyMiddleware,compose } from 'redux'
import IndexReducer from './reducers/IndexReducer'
import thunk from 'redux-thunk'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    IndexReducer,
    composeEnhancer(applyMiddleware(thunk)),
)
export default store
