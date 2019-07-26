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
    text: 'No header here, but still should be rendered ok',
    order: 3
  },
  {
    id: 'fiwjf934ufi3340f9kk3',
    header: 'Just a header here, must be smth short but important',
    order: 4
  }
]

const spreadNotesToColumns = (notes, columnCount) =>
  Array(columnCount).fill(0).map((column, columnIndex) => (
    notes.filter((note, index) => index % columnCount === columnIndex)
  ))

export default (
  state = {
    notes: initialNotes,
    columnCount: 3,
    columns: spreadNotesToColumns(initialNotes, 3)
  },
  action
) => {
  switch (action) {
    default: return state
  }
}
