const makePlaceholder = i => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(i)

// TODO: add ID key for each note here
const initialState = {
  notes: [
    {
      header: 'A paragraph long note',
      text: makePlaceholder(5),
      order: 0
    },
    {
      header: 'A rather long note',
      text: makePlaceholder(12),
      order: 1
    },
    {
      header: 'A short note but with a pic',
      text: makePlaceholder(2),
      image: true,
      order: 2
    },
    {
      text: 'No header here, but still should be rendered ok',
      order: 3
    },
    {
      header: 'Just a header here, must be smth short but important',
      order: 4
    }
  ]
}

export default (
  state = initialState,
  action
) => {
  switch (action) {
    default: return state
  }
}
