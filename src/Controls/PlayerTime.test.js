import React from 'react'
import configureStore from 'redux-mock-store'
import ShallowTestRenderer from 'react-test-renderer/shallow'

import PlayerTime from './PlayerTime'
import {defaultTheme} from '../state/player'

describe('PlayerTime', () => {

  const initialState = {currentTime: 0, duration: 10, styles: {}, theme: defaultTheme}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<PlayerTime store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })


})
