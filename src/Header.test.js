import React, {Component} from 'react'
import ShallowTestRenderer from 'react-test-renderer/shallow'

import {Header} from './Header'

describe('Header', () => {

  class TestComponent {render() {return null}}

  let renderer

  beforeEach(() => {
    renderer = new ShallowTestRenderer()
  })

  it('should render layout', () => {
    const layout = {
      Left: <TestComponent />,
      Middle: <TestComponent />,
      Right: <TestComponent />,
    }
    const rendered = renderer.render(<Header layout={layout} styles={{}} />)

    expect(rendered).toMatchSnapshot()
  })

})
