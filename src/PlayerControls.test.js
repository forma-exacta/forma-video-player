import React, {Component} from 'react'
import ShallowTestRenderer from 'react-test-renderer/shallow'

import {PlayerControls} from './PlayerControls'

describe('PlayerControls', () => {

  class TestComponent {render() {return null}}

  let renderer

  beforeEach(() => {
    renderer = new ShallowTestRenderer()
  })

  it('should render layout', () => {
    const layout = {
      Header: <TestComponent />,
      Body: <TestComponent />,
      Footer: <TestComponent />,
    }
    const rendered = renderer.render(<PlayerControls layout={layout} styles={{}} />)

    expect(rendered).toMatchSnapshot()
  })

})
