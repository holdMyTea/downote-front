import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { showErrorNotification, CREATE_NOTIFICATION, REMOVE_NOTIFICATION } from '../../actions/notificationActions'

it('Creates and removes notification', async () => {
  jest.useFakeTimers()

  const store = configureMockStore([thunk])({})
  const actions = store.getActions()

  const notificationHeader = 'Error'
  await store.dispatch(showErrorNotification(notificationHeader))

  expect(actions[0]).toHaveProperty('type', CREATE_NOTIFICATION)
  expect(actions[0]).toHaveProperty('header', notificationHeader)
  expect(setTimeout).toHaveBeenCalledTimes(1)

  const notificationId = actions[0].id

  jest.runAllTimers()

  expect(actions[1]).toHaveProperty('type', REMOVE_NOTIFICATION)
  expect(actions[1]).toHaveProperty('id', notificationId)
})
