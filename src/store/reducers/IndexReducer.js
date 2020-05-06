import {combineReducers} from 'redux'
import UserReducer from './UserReducer'
import PostReducer from './PostReducer'
const IndexReducer = combineReducers({
    users:UserReducer,
    posts:PostReducer,
})
export default IndexReducer