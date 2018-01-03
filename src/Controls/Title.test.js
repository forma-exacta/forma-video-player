import React from 'react'
import configureStore from 'redux-mock-store'

import Title from './Title'
import {defaultTheme} from '../defaultTheme'

describe('Title', () => {

  const initialState = {name: 'test', styles: {}, theme: defaultTheme}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<Title store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })

})
