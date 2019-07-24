import { combineReducers } from 'redux'

import login from './loginReducers'
import notifications from './notificationReducers'
import home from './homeReducer'

export default combineReducers({
  login,
  notifications,
  home
})
