import React from 'react'
import configureStore from 'redux-mock-store'

import Player from './Player'
import PlayerControls from './PlayerControls'
import Overlay from './Overlay'
import VideoWrapper from './VideoWrapper'

describe('Player', () => {

  const videoProps = {
    source: {
      uri: ''
    }
  }

  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  it('should render PlayerControls Component', () => {
    const player = shallow(<Player store={store} videoProps={videoProps} />).dive()

    expect(player.containsMatchingElement(<PlayerControls />)).toEqual(true)
  })

  it('should render PlayerControls in overlay', () => {
    const player = shallow(<Player store={store} videoProps={videoProps} />).dive()
    const overlay = player.find(Overlay)

    expect(overlay.containsMatchingElement(<PlayerControls />)).toEqual(true)
  })

  it('should render VideoWrapper Component', () => {
    const player = shallow(<Player store={store} videoProps={videoProps} />).dive()

    expect(player.containsMatchingElement(<VideoWrapper />)).toEqual(true)
  })

  it('should have paused state prop', () => {
    const player = shallow(<Player store={mockStore({paused: true})} videoProps={videoProps} />)

    expect(player.prop('player').paused).toEqual(true)
  })

})
