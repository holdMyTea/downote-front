import { showErrorNotification, showSuccessNotification } from './notificationActions'
import request from '../helpers/request'

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const SAVE_LOGIN_TOKEN = 'RECEIVE_LOGIN_TOKEN'
export const RECEIVE_LOGIN_FAILURE = 'RECEIVE_LOGIN_FAILURE'

export const sendLoginRequest = (email) => ({
  type: SEND_LOGIN_REQUEST,
  email
})

export const saveLoginToken = (token) => ({
  type: SAVE_LOGIN_TOKEN,
  token
})

const receiveLoginFailure = (message) => ({
  type: SAVE_LOGIN_TOKEN,
  error: message
})

export const tryLoggingIn = (email, pass) => {
  return dispatch => {
    dispatch(sendLoginRequest(email))
    return request('http://localhost:8082/token', { email, pass }, 'post')
      .then(response => {
        if (response.ok) { // got 200
          dispatch(showSuccessNotification('Login successful'))
          dispatch(saveLoginToken(response.body.token))
        } else {
          dispatch(showErrorNotification(response.body.error))
          dispatch(receiveLoginFailure(response.body.error))
        }
      })
      .catch(error => { // only triggers in case of network error
        dispatch(showErrorNotification('No connection'))
        dispatch(receiveLoginFailure(error.message))
      })
  }
}
