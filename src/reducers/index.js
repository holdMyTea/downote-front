import { combineReducers } from 'redux'

import login from './loginReducers'
import notifications from './notificationReducers'

export default combineReducers({
  login,
  notifications
})
