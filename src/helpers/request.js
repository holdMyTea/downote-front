const baseURL = `http://${process.env.API_HOST}:${process.env.API_PORT}`
/**
 * A fetch wrapper for making a request with credentials,
 * and parsing JSON response.
 * @param {string} endpoint - endpoint of API
 * @param {string} [method='get'] - method of the request
 * @param {object} [body] - body of the request
 * @returns {Promise}
 */
const request = (endpoint, method = 'get', body) => {
  let code, ok
  return fetch(`${baseURL}${endpoint}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined
  }).then(response => {
    code = response.status
    ok = response.ok
    return response.json()
  }).then(body => ({
    body,
    ok,
    code
  }))
}

export default request
