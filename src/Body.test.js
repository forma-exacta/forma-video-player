import React, {Component} from 'react'
import ShallowTestRenderer from 'react-test-renderer/shallow'

import {Body} from './Body'

describe('Body', () => {

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
    const rendered = renderer.render(<Body layout={layout} styles={{}} />)

    expect(rendered).toMatchSnapshot()
  })

})
