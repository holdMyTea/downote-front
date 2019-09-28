import { combineReducers } from 'redux'

import login from './loginReducers'
import notifications from './notificationReducers'
import { reducer as home } from './homeReducer'

export default combineReducers({
  login,
  notifications,
  home
})
