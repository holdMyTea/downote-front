import Cookies from 'universal-cookie'

import {
  SEND_LOGIN_REQUEST,
  SAVE_TOKEN,
  RECEIVE_LOGIN_FAILURE,
  SEND_LOGOUT_REQUEST,
  REMOVE_TOKEN
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

    case RECEIVE_LOGIN_FAILURE:
      return {
        ...state,
        isLoginPending: false,
        error: action.error
      }

    case SEND_LOGOUT_REQUEST:
      return {
        ...state,
        isLoginPending: true
      }

    case REMOVE_TOKEN:
      return {
        token: '',
        email: '',
        isLoginPending: false
      }

    default: return state
  }
}
