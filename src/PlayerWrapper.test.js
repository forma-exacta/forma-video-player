import React from 'react'
import {
  View
} from 'react-native';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import PlayerWrapper from './PlayerWrapper'
import Player from './Player'

describe('PlayerWrapper', () => {

  const videoProps = {
    source: {
      uri: ''
    }
  }
  const mockStore = configureStore()

  let store

  beforeEach(() => {
    store = mockStore({test:'test'})
  })

  it('should render Player Component', () => {
    const playerWrapper = shallow(<PlayerWrapper videoProps={videoProps} />)

    expect(playerWrapper.find(Player).length).toEqual(1)
  })

  describe('when parent does not have a redux provider', () => {

    it('should render a provider of its own', () => {
      const playerWrapper = shallow(<PlayerWrapper videoProps={videoProps} />)

      expect(playerWrapper.find(Provider).length).toEqual(1)
    })

  })

  describe('when integrateRedux is true', () => {

    it('should not render a provider of its own', () => {
      const playerWrapper = shallow(<PlayerWrapper integrateRedux={true} videoProps={videoProps} />, {context: {store: {}}})

      expect(playerWrapper.find(Provider).length).toEqual(0)
    })

  })

})
