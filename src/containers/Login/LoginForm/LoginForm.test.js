import React from 'react'
import renderer from 'react-test-renderer'

import LoginForm from './LoginForm'

test('Note renders correctly', () => {
  const component = renderer.create(
    <LoginForm
      email=''
      onSubmit={() => ({})}
    />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
