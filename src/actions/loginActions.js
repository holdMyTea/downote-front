import { showErrorNotification, showSuccessNotification } from './notificationActions'
import request from '../helpers/request'

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const RECEIVE_LOGIN_TOKEN = 'RECEIVE_LOGIN_TOKEN'
export const RECEIVE_LOGIN_FAILURE = 'RECEIVE_LOGIN_FAILURE'

export const sendLoginRequest = (email) => ({
  type: SEND_LOGIN_REQUEST,
  email
})

const receiveLoginResponse = () => ({
  type: RECEIVE_LOGIN_TOKEN
})

const receiveLoginFailure = (message) => ({
  type: RECEIVE_LOGIN_TOKEN,
  token: message
})

export const tryLoggingIn = (email, pass) => {
  return dispatch => {
    dispatch(sendLoginRequest(email))
    return request('http://localhost:8082/login', { email, pass }, 'post')
      .then(response => {
        if (response.ok) {
          dispatch(showSuccessNotification('Login successful'))
          dispatch(receiveLoginResponse())
        } else {
          dispatch(showErrorNotification(response.body.error))
          dispatch(receiveLoginFailure(response.body.error))
        }
      })
      .catch(error => { // only triggers in case of network error
        dispatch(showErrorNotification('No connection', 'Failed to connect'))
        dispatch(receiveLoginFailure(error.message))
      })
  }
}
