export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const RECEIVE_LOGIN_TOKEN = 'RECEIVE_LOGIN_TOKEN'
export const HANDLE_LOGIN_FAILURE = 'HANDLE_LOGIN_FAILURE'

export const sendLoginRequest = () => ({
  type: SEND_LOGIN_REQUEST
})

export const receiveLoginResponse = (response) => ({
  type: RECEIVE_LOGIN_TOKEN,
  token: response.token
})

export const handleLoginFailure = (error) => ({
  type: HANDLE_LOGIN_FAILURE,
  error
})

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
      .then(response => dispatch(receiveLoginResponse(response)))
      .catch(error => dispatch(handleLoginFailure(error.message)))
  }
}
