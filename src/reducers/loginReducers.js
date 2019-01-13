import { SEND_LOGIN_REQUEST, RECEIVE_LOGIN_TOKEN, RECEIVE_LOGIN_FAILURE } from '../actions/loginActions'

export default (
  state = {
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

    case RECEIVE_LOGIN_TOKEN:
      return {
        ...state,
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
