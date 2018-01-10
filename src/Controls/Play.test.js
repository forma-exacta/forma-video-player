import React from 'react'
import configureStore from 'redux-mock-store'

import Play from './Play'
import CircularButton from './CircularButton'
import {defaultTheme} from '../defaultTheme'

describe('Play', () => {

  const initialState = {player:{paused: false, styles: {}, theme: defaultTheme}}
  const mockStore = configureStore()
  let store, container

  const makeMockStore = (state) => {
    store = mockStore(state)
    container = shallow(<Play store={store} />)
  }

  beforeEach(() => {
    makeMockStore(initialState)
  })

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot()
  })

  it('should toggle play on press', () => {
    let diveContainer

    let newState = {...initialState}
    newState.player.paused = false

    makeMockStore(newState)
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(true)

    newState.player.paused = true

    makeMockStore(newState)
    diveContainer = container.dive().dive().dive()
    diveContainer.find(CircularButton).first().props().onPress()
    expect(store.getActions()[0].payload).toEqual(false)
  })


})
