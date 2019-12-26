import { showErrorNotification, showSuccessNotification } from './notificationActions'
import request from '../helpers/request'

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
const sendLoginRequest = (email) => ({
  type: SEND_LOGIN_REQUEST,
  email
})

export const SAVE_TOKEN = 'SAVE_TOKEN'
const saveToken = (token) => ({ type: SAVE_TOKEN, token })

export const RECEIVE_LOGIN_FAILURE = 'RECEIVE_LOGIN_FAILURE'
const receiveLoginFailure = (message) => ({
  type: RECEIVE_LOGIN_FAILURE,
  error: message
})

export const logIn = (email, pass) => {
  return dispatch => {
    dispatch(sendLoginRequest(email))
    return request('/token', 'post', { email, pass })
      .then(response => {
        if (response.ok) { // got 200
          dispatch(showSuccessNotification('Login successful'))
          dispatch(saveToken(response.body.token))
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

export const SEND_LOGOUT_REQUEST = 'SEND_LOGOUT_REQUEST'
const sendLogoutRequest = () => ({ type: SEND_LOGOUT_REQUEST })

export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const removeToken = () => ({ type: REMOVE_TOKEN })

export const logOut = () => {
  return dispatch => {
    dispatch(sendLogoutRequest())

    return request('/token', 'delete')
      .then(() => {
        dispatch(showSuccessNotification('Logout successful'))
        dispatch(removeToken())
      })
      .catch(error => { // only triggers in case of network error
        dispatch(showErrorNotification('No connection'))
        dispatch(removeToken())
        dispatch(receiveLoginFailure(error.message))
      })
  }
}
