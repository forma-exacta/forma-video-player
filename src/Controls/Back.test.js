import React from 'react'
import {TouchableHighlight} from 'react-native'
import ShallowTestRenderer from 'react-test-renderer/shallow'
import configureStore from 'redux-mock-store'

import Back from './Back'
import {defaultTheme} from '../defaultTheme'

describe('Back', () => {

  const initialState = {styles: {}, theme: defaultTheme}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<Back store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })

  it('should use "back" function from state', () => {
    const mockBack = jest.fn()
    const store = mockStore({...initialState, back: mockBack})

    const rendered = shallow(<Back store={store} />).dive().dive().dive()
    rendered.find(TouchableHighlight).first().props().onPress()
    expect(mockBack.mock.calls.length).toBe(1)
  })

})
