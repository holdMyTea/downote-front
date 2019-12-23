const request = (url, method = 'get', body) => {
  console.log(process.env.REACT_APP_API)
  let code, ok
  return fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined
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
