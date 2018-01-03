import React from 'react'
import configureStore from 'redux-mock-store'

import Mute from './Mute'
import CircularButton from './CircularButton'
import {defaultTheme} from '../defaultTheme'

describe('Mute', () => {

  const initialState = {muted: false, styles: {}, theme: defaultTheme}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<Mute store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })

  it('should toggle mute on press', () => {
    let diveContainer

    makeMockStore({...initialState, muted:false})
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(true)

    makeMockStore({...initialState, muted:true})
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(false)
  })


})
