import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { logIn, SEND_LOGIN_REQUEST, SAVE_TOKEN } from './loginActions'
import { CREATE_NOTIFICATION } from './notificationActions'

describe('Login actions', () => {
  it('Logs in', async () => {
    const token = 'testToken'
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => ({ token }),
      ok: true,
      code: 200
    })

    const store = configureMockStore([thunk])({})
    const email = 'kappa@mail.com'
    await store.dispatch(logIn(email, '123123'))

    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: SEND_LOGIN_REQUEST, email })
    expect(actions[1]).toHaveProperty('type', CREATE_NOTIFICATION)
    expect(actions[2]).toEqual({ type: SAVE_TOKEN, token })
  })
})
