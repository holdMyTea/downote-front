import { SEND_LOGIN_REQUEST, RECEIVE_LOGIN_RESPONSE } from '../actions/actionsLogin'

export default (
  state = {
    isLoginPending: false
  },
  action
) => {
  switch (action) {
    case SEND_LOGIN_REQUEST:
      return { isLoginPending: true }

    case RECEIVE_LOGIN_RESPONSE:
      return { isLoginPending: false }
  }
}
