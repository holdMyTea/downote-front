import Types from 'prop-types'

const noteType = Types.shape({
  id: Types.oneOfType([ Types.number, Types.string ]).isRequired,
  header: Types.string,
  text: Types.string,
  image: Types.bool,
  order: Types.number.isRequired
})

const columnType = Types.arrayOf(noteType)

const columnsType = Types.shape({
  1: columnType,
  2: columnType,
  3: columnType // and so on
})

export {
  noteType,
  columnType,
  columnsType
}
