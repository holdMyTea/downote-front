export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const RECEIVE_LOGIN_RESPONSE = 'RECEIVE_LOGIN_RESPONSE'

export const sendLoginRequest = () => ({
  type: SEND_LOGIN_REQUEST
})

export const receiveLoginResponse = (response) => ({
  type: RECEIVE_LOGIN_RESPONSE,
  data: response
})

export const tryLoggingIn = ({ email, pass }) => {
  return dispatch => {
    dispatch(sendLoginRequest())
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(response => receiveLoginResponse(response))
  }
}
