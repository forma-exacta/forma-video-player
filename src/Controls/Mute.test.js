import React from 'react'
import configureStore from 'redux-mock-store'

import Mute from './Mute'
import CircularButton from './CircularButton'
import {defaultTheme} from '../defaultTheme'

describe('Mute', () => {

  const initialState = {player:{muted: false, styles: {}, theme: defaultTheme}}
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

    let newState = {...initialState}
    newState.player.muted = false

    makeMockStore(newState)
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(true)

    newState.player.muted = true

    makeMockStore(newState)
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(false)
  })


})
