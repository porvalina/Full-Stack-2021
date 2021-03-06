import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {anecdoteReducer, setAnecdotes} from './reducers/anecdoteReducer'
import {notificationReducer} from './reducers/NotificationReducer'
import {filterReducer} from './reducers/FilterReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  })
export const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

store.dispatch(setAnecdotes())
