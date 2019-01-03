import { showErrorNotification } from './notificationActions'

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const RECEIVE_LOGIN_TOKEN = 'RECEIVE_LOGIN_TOKEN'
export const HANDLE_LOGIN_FAILURE = 'HANDLE_LOGIN_FAILURE'

export const sendLoginRequest = () => ({
  type: SEND_LOGIN_REQUEST
})

const receiveLoginResponse = (token) => ({
  type: RECEIVE_LOGIN_TOKEN,
  token: token
})

const handleLoginFailure = (message) => ({
  type: RECEIVE_LOGIN_TOKEN,
  token: message
})

// TODO: make valid messages
const notifyAboutError = (message) => {
  return dispatch => {
    dispatch(showErrorNotification('No connection', 'Failed to connect'))
    dispatch(handleLoginFailure(message))
  }
}

export const tryLoggingIn = (email, pass) => {
  return dispatch => {
    dispatch(sendLoginRequest())
    return fetch('http://localhost:8082/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pass })
    })
      .then(response => response.json())
      .then(response => dispatch(receiveLoginResponse(response.token)))
      .catch(error => dispatch(notifyAboutError(error.message)))
  }
}