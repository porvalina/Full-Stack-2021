import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer } from './reducers/NotificationReducer'
import { blogsReducer } from './reducers/BlogsReducer'
import { userReducer } from './reducers/UserReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
})
export const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))