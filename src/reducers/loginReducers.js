import { SEND_LOGIN_REQUEST, RECEIVE_LOGIN_TOKEN, HANDLE_LOGIN_FAILURE } from '../actions/actionsLogin'

export default (
  state = {
    isLoginPending: false
  },
  action
) => {
  switch (action.type) {
    case SEND_LOGIN_REQUEST:
      return { isLoginPending: true }

    case RECEIVE_LOGIN_TOKEN:
      return {
        isLoginPending: false,
        token: action.token
      }

    case HANDLE_LOGIN_FAILURE:
      return {
        isLoginPending: false,
        error: action.error
      }

    default: return state
  }
}
