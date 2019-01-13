import { CREATE_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notificationActions'

const createNotificationObject = action => ({
  type: action.notificationType,
  id: action.id,
  header: action.header,
  description: action.description
})

export default (
  state = {
    queue: []
  },
  action
) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return {
        queue: [...state.queue, createNotificationObject(action)]
      }

    case REMOVE_NOTIFICATION:
      return {
        queue: state.queue.filter(e => e.id !== action.id)
      }

    default: return state
  }
}
