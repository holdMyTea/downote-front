export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

const NOTIFICATION_TYPE_ERROR = 'notification-error'
const NOTIFICATION_TYPE_SUCCESS = 'notification-success'

const notificationTimeout = 2000

const createNotification = (notificationType, id, header, description) => ({
  type: CREATE_NOTIFICATION,
  notificationType,
  id,
  header,
  description
})

const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  id
})

const showNotification = (notificationType, header, description) => {
  return dispatch => {
    const notificationId = new Date().getTime()
    dispatch(createNotification(notificationType, notificationId, header, description))
    return setTimeout(
      () => dispatch(removeNotification(notificationId)),
      notificationTimeout
    )
  }
}

export const showErrorNotification = (header, description) =>
  showNotification(NOTIFICATION_TYPE_ERROR, header, description)

export const showSuccessNotification = (header, description) =>
  showNotification(NOTIFICATION_TYPE_SUCCESS, header, description)
