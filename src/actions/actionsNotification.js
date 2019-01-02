export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const NOTIFICATION_TYPE_ERROR = 'notification-error'

const notificationTimeout = 1500

const createNotification = (id, header, text, notificationType) => ({
  type: CREATE_NOTIFICATION,
  id,
  header,
  text,
  notificationType
})

const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  id
})

const showNotification = (header, text, notificationType) => {
  return dispatch => {
    const notificationId = new Date().getTime()
    dispatch(createNotification(notificationId, header, text, notificationType))
    return setTimeout(() => {
      dispatch(removeNotification(notificationId))
    }, notificationTimeout)
  }
}

export const showErrorNotification = (header, text) =>
  showNotification(header, text, NOTIFICATION_TYPE_ERROR)
