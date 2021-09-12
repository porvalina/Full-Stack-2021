const initialState = {
  notification: '', 
  timeoutID: null,
}

export const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NOTIFICATION':
        if (state.timeoutID) {
          clearTimeout(state.timeoutID)
        }

        return action.data
      default: 
        return state
    }
  }

export const setNotification = (notification, timeout = 5) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch(createNotification(notification, timeoutID))
  }
}

export const createNotification = (notification, timeoutID) => {
  return {
    type: 'NOTIFICATION',
    data: {
      notification,
      timeoutID
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'NOTIFICATION',
    data: {
      notification: '',
      timeoutID: null
    }
  }
}