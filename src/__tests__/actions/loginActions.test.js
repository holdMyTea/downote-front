import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { logIn, SEND_LOGIN_REQUEST, SAVE_TOKEN, RECEIVE_LOGIN_FAILURE } from '../../actions/loginActions'
import { CREATE_NOTIFICATION, REMOVE_NOTIFICATION, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR } from '../../actions/notificationActions'

describe('Login actions', () => {
  it('Logs in with correct credentials', async () => {
    jest.useFakeTimers()

    const token = 'testToken'
    jest.spyOn(global, 'fetch').mockResolvedValue({ // mocking successful fetch
      json: () => ({ token }),
      ok: true,
      code: 200
    })

    const store = configureMockStore([thunk])({})
    const email = 'kappa@mail.com'
    await store.dispatch(logIn(email, '123123'))

    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: SEND_LOGIN_REQUEST, email }) // send request
    expect(actions[1]).toHaveProperty('type', CREATE_NOTIFICATION)
    expect(actions[1]).toHaveProperty('notificationType', NOTIFICATION_TYPE_SUCCESS) // after fetch display success notification
    expect(actions[2]).toEqual({ type: SAVE_TOKEN, token }) // saving token from fetch to store

    jest.runAllTimers()
    expect(actions[3]).toHaveProperty('type', REMOVE_NOTIFICATION) // remove notification after delay
  })

  it('doesn\'t log in with wrong credentials', async () => {
    jest.useFakeTimers()

    jest.spyOn(global, 'fetch').mockResolvedValue({ // mocking failed fetch
      json: () => ({ error: 'Wrong' }),
      ok: false,
      code: 401
    })

    const store = configureMockStore([thunk])({})
    const email = 'wrong@mail.com'
    await store.dispatch(logIn(email, 'wrong'))

    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: SEND_LOGIN_REQUEST, email }) // send request
    expect(actions[1]).toHaveProperty('type', CREATE_NOTIFICATION)
    expect(actions[1]).toHaveProperty('notificationType', NOTIFICATION_TYPE_ERROR) // show error notification
    expect(actions[2]).toHaveProperty('type', RECEIVE_LOGIN_FAILURE) // save error to store

    jest.runAllTimers()
    expect(actions[3]).toHaveProperty('type', REMOVE_NOTIFICATION) // remove notification
  })

  it('doesn\'t log in with no connection', async () => {
    jest.useFakeTimers()

    jest.spyOn(global, 'fetch').mockRejectedValue({
      error: 'Nope'
    })

    const store = configureMockStore([thunk])({})
    const email = 'whatev@mail.com'
    await store.dispatch(logIn(email, 'smth'))

    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: SEND_LOGIN_REQUEST, email }) // send request
    expect(actions[1]).toHaveProperty('type', CREATE_NOTIFICATION)
    expect(actions[1]).toHaveProperty('notificationType', NOTIFICATION_TYPE_ERROR) // show error notification
    expect(actions[2]).toHaveProperty('type', RECEIVE_LOGIN_FAILURE) // save error to store

    jest.runAllTimers()
    expect(actions[3]).toHaveProperty('type', REMOVE_NOTIFICATION) // remove notification
  })
})
