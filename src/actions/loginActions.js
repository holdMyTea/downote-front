import { showErrorNotification, showSuccessNotification } from './notificationActions'
import request from '../helpers/request'

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const RECEIVE_LOGIN_FAILURE = 'RECEIVE_LOGIN_FAILURE'

export const sendLoginRequest = (email) => ({
  type: SEND_LOGIN_REQUEST,
  email
})

export const saveToken = (token) => ({ type: SAVE_TOKEN, token })

export const removeToken = () => ({ type: REMOVE_TOKEN })

const receiveLoginFailure = (message) => ({
  type: RECEIVE_LOGIN_FAILURE,
  error: message
})

export const logIn = (email, pass) => {
  return dispatch => {
    dispatch(sendLoginRequest(email))
    return request('http://localhost:8082/token', 'post', { email, pass })
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

export const logOut = () => {
  return dispatch => {
    // TODO: add something to lock the screen while logging out
    return request('http://localhost:8082/token', 'delete')
      .then(() => {
        dispatch(showSuccessNotification('Logout successful'))
        dispatch(removeToken())
      })
      .catch(error => { // only triggers in case of network error
        dispatch(showErrorNotification('No connection'))
        dispatch(receiveLoginFailure(error.message))
      })
  }
}
