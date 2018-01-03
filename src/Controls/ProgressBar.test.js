import React from 'react'
import configureStore from 'redux-mock-store'

import ProgressBar from './ProgressBar'
import {defaultTheme} from '../defaultTheme'

describe('ProgressBar', () => {

  const initialState = {currentTime: 0, duration: 10, styles: {}, theme: defaultTheme}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<ProgressBar store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })

})
