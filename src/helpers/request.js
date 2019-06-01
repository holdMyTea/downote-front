const request = (url, method = 'get', body) => {
  let code, ok
  return fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    mode: 'no-cors'
  }).then(response => {
    code = response.code
    ok = response.ok
    return response.json()
  }).then(body => ({
    body,
    ok,
    code
  }))
}

export default request
