import React from 'react'
import CircularButton from './CircularButton'
import ShallowTestRenderer from 'react-test-renderer/shallow'

describe('CircularButton', () => {

  let renderer = new ShallowTestRenderer()
  
  it('should match snapshot', () => {
    const rendered = renderer.render(<CircularButton />)

    expect(rendered).toMatchSnapshot()
  })

})
