import React from 'React'
import {shallow} from "enzyme"
import configureStore from 'redux-mock-store'

import styles from './styles'

describe('styles', () => {

  class BaseComponent { render() {return null}}

  const mockStore = configureStore()

  it('should connect style and theme', () => {
    const store = mockStore({
      styles: 'test',
      theme: 'test'
    })
    const Wrapped = styles(() => {})(BaseComponent)
    const shallowStyle = shallow(<Wrapped />, {context: {store}})

    expect(shallowStyle.props().player.styles).toEqual('test')
    expect(shallowStyle.props().player.theme).toEqual('test')
  })

  it('should call function with style and theme', () => {
    const initialState = {
      styles: {
        BaseComponent: {
          test: 'test'
        }
      },
      theme: 'testTheme'
    }
    const store = mockStore(initialState)
    const func = jest.fn()
    const Wrapped = styles(func)(BaseComponent)
    const shallowStyle = shallow(<Wrapped />, {context: {store}}).dive()

    expect(func.mock.calls.length).toBe(1)
    expect(func.mock.calls[0][0]).toEqual(initialState.styles)
    expect(func.mock.calls[0][1]).toEqual(initialState.theme)
  })

})
