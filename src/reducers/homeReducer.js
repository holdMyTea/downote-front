import { MOVE_NOTE_OVER_COLUMN, MOVE_NOTE_OVER_NOTE } from '../actions/notesActions'

const makePlaceholder = i => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(i)

const initialNotes = [
  {
    id: 'dvouieur092kdq',
    header: 'A paragraph long note',
    text: makePlaceholder(5),
    order: 0
  },
  {
    id: 'gi34u09fjidc9w',
    header: 'A rather long note',
    text: makePlaceholder(12),
    order: 1
  },
  {
    id: 'g3ijf893hf98uwehfd98w',
    header: 'A short note but with a pic',
    text: makePlaceholder(2),
    image: true,
    order: 2
  },
  {
    id: 'pojef023iwwldjfwpo',
    text: 'No header in the note, but still should be rendered ok',
    order: 3
  },
  {
    id: 'fiwjf934ufi3340f9kk3',
    header: 'Just a header here, must be smth short but important',
    order: 4
  }
]

/**
 * Spread a single notes array into an array of arrays
 * @param {Object[]} notes - array to unflatten
 * @param {number} columnCount - number of resulting sub-arrays
 */
const spreadNotesToColumns = (notes, columnCount) =>
  Array(columnCount).fill(0).map((column, columnIndex) => (
    notes.filter((note, index) => index % columnCount === columnIndex)
  ))

/**
 * Updates the order property of all notes in array
 * @param {Object[]} column - array to check
 * @param {number} columnIndex - index of supplied column
 * @param {number} columnCount - total number of columns
 */
const updateOrderInColumn = (column, columnIndex, columnCount) => column.map(
  (note, index) => {
    note.order = index * columnCount + columnIndex
    return note
  }
)

export default (
  state = {
    notes: initialNotes,
    columnCount: 3,
    columns: spreadNotesToColumns(initialNotes, 3)
  },
  action
) => {
  switch (action.type) {
    case MOVE_NOTE_OVER_COLUMN: {
      const newColumns = [ ...state.columns ]
      // finding the dragged note
      const note = newColumns[action.oldColumnIndex].find(n => n.id === action.noteId)
      // removing the node from the oldColumn and updating order in it
      newColumns[action.oldColumnIndex] = updateOrderInColumn(
        newColumns[action.oldColumnIndex].filter(
          n => n.id !== action.noteId
        ),
        action.oldColumnIndex,
        state.columnCount
      )
      // updating the order of the note before inserting it
      note.order = newColumns[action.newColumnIndex].length * state.columnCount + action.newColumnIndex
      // inserting the note into the new column
      newColumns[action.newColumnIndex].push(note)
      return { ...state, columns: newColumns }
    }

    case MOVE_NOTE_OVER_NOTE: {
      const newColumns = [ ...state.columns ]
      // finding the dragged note
      const note = newColumns[action.oldColumnIndex].find(n => n.id === action.noteId)
      // removing the node from the oldColumn and updating order in it
      newColumns[action.oldColumnIndex] = updateOrderInColumn(
        newColumns[action.oldColumnIndex].filter(
          n => n.id !== action.noteId
        ),
        action.oldColumnIndex,
        state.columnCount
      )
      // inserting the note into the newColumn
      newColumns[action.newColumnIndex].splice(
        newColumns[action.newColumnIndex].findIndex(note => note.id === action.targetNoteId),
        0,
        note
      )
      // updating the order of the newColumn
      newColumns[action.newColumnIndex] = updateOrderInColumn(
        newColumns[action.newColumnIndex],
        action.newColumnIndex,
        state.columnCount
      )
      return { ...state, columns: newColumns }
    }

    default: return state
  }
}
