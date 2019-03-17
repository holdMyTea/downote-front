import Cookies from 'universal-cookie'

import {
  SEND_LOGIN_REQUEST,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  RECEIVE_LOGIN_FAILURE
} from '../actions/loginActions'

export default (
  state = {
    token: new Cookies().get('token'),
    email: '',
    isLoginPending: false
  },
  action
) => {
  switch (action.type) {
    case SEND_LOGIN_REQUEST:
      return {
        email: action.email,
        isLoginPending: true
      }

    case SAVE_TOKEN:
      return {
        ...state,
        isLoginPending: false,
        token: action.token
      }

    case REMOVE_TOKEN:
      return {
        token: '',
        email: '',
        isLoginPending: false
      }

    case RECEIVE_LOGIN_FAILURE:
      return {
        ...state,
        isLoginPending: false,
        error: action.error
      }

    default: return state
  }
}
