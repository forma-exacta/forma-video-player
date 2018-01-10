import React, {Component} from 'react'
import configureStore from 'redux-mock-store'
import ShallowTestRenderer from 'react-test-renderer/shallow'
import TestRenderer from 'react-test-renderer'
import {Provider} from 'react-redux'

import {connectVideo} from './connectVideo'
import * as util from './util'

describe('connectVideo', () => {

  class TestComponent extends Component {render() {return null}}
  const mockState = {player:{test: true, styles:{}}}
  const mockStore = configureStore()
  let store, renderer

  beforeEach(() => {
    store = mockStore(mockState)
    renderer = new ShallowTestRenderer()
  })

  it('should have redux props', () => {
    const Comp = connectVideo(['test'], {})(TestComponent)

    const rendered = renderer.render(
      <Comp store={store}/>
    )

    expect(rendered.props.player).toMatchSnapshot()
  })

  it('should connect with redux dispatch', () => {
    const actionBody = {type:'test', payload:'test-payload'}
    const mockActionCreator = () => actionBody

    const Comp = connectVideo([], {mockActionCreator})(TestComponent)

    const rendered = renderer.render(
      <Comp store={store}/>
    )

    const actions = rendered.props.actions

    expect(actions).toMatchSnapshot()
    actions.mockActionCreator()
    expect(store.getActions()).toEqual([actionBody])
  })
})
