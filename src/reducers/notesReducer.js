import {
  MOVE_NOTE_OVER_COLUMN,
  MOVE_NOTE_OVER_NOTE,
  CREATE_NOTE,
  RECEIVE_CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  REQUEST_NOTES,
  RECEIVE_NOTES,
  START_SYNC,
  COMPLETE_SYNC
} from '../actions/notesActions'

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} [header]
 * @property {string} [text]
 * @property {boolean} [image] - temporal abstraction for an attached image
 * @property {number} order - integer to determine order of a note for render
 */

/**
 * @typedef {Object} NotesStore
 * @property {Note[]} 0 - notes of the first column
 * @property {Note[]} 1 - notes of the second column
 * and so on
 */

/**
 * Creates initial state from the array of notes,
 * used in tests
 * @param {Note[]} notes - array of notes
 * @param {number} [columnCount=3] - number of notes columns
 */
export const prepareInitialState = (notes, columnCount = 3) => ({
  columnCount,
  isLoading: false,
  columns: spreadNotesToObject(notes, columnCount),
  syncArray: []
})

/**
 * Converts a flat array of Notes into an object with Note arrays
 * according to their `order` property.
 * @param {Note[]} notes - array of initial notes
 * @param {number} columnCount - number of notes columns
 * @returns {NotesStore} columns object for store
 */
const spreadNotesToObject = (notes, columnCount) => {
  const result = {}
  for (let i = 0; i < columnCount; i++) {
    result[i] = notes
      .filter(note => note.order % columnCount === i)
      .sort((a, b) => a.order - b.order)
  }
  return result
}

/**
 * Updates props in state.columns with action.newColumns,
 * and returns the former.
 * @param {NotesStore} stateColumns - `state.columns`
 * @param {NotesStore} actionColumns - `action.newColumns`
 * @returns {NotesStore} stateColumns updated with actionColumns
 */
const updateColumns = (stateColumns, actionColumns) => {
  for (const [k, v] of Object.entries(actionColumns)) {
    stateColumns[k] = v
  }
  return stateColumns
}

export const reducer = (
  state = prepareInitialState([], 3),
  action
) => {
  switch (action.type) {
    case REQUEST_NOTES:
      return { ...state, isLoading: true }

    case RECEIVE_NOTES:
      return prepareInitialState(action.notes, state.columnCount)

    case START_SYNC:
      return {
        ...state,
        syncArray: [...state.syncArray, action.syncId]
      }

    case COMPLETE_SYNC:
      return {
        ...state,
        syncArray: state.syncArray.filter(id => id !== action.syncId)
      }

    case CREATE_NOTE:
    case RECEIVE_CREATE_NOTE:
    case EDIT_NOTE:
    case DELETE_NOTE:
    case MOVE_NOTE_OVER_COLUMN:
    case MOVE_NOTE_OVER_NOTE:
      return {
        ...state,
        columns: updateColumns(state.columns, action.newColumns)
      }

    default: return state
  }
}
