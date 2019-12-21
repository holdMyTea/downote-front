import { combineReducers } from 'redux'

import login from './loginReducers'
import notifications from './notificationReducers'
import { reducer as notes } from './notesReducer'

export default combineReducers({
  login,
  notifications,
  notes
})
