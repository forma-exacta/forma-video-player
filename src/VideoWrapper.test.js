import React from 'react'
import VideoWrapper from './VideoWrapper'
import configureStore from 'redux-mock-store'

describe('VideoWrapper', () => {

  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  describe('when videoProps are passed', () => {
    let videoWrapper, loadStart, onLoad, onProgress, onEnd, onError, onBuffer, onTimedMetadata, ref

    beforeEach(() => {
      loadStart = jest.fn()
      onLoad = jest.fn()
      onProgress = jest.fn()
      onEnd = jest.fn()
      onError = jest.fn()
      onBuffer = jest.fn()
      onTimedMetadata = jest.fn()

      const videoProps = {source: {uri: ''}, loadStart, onLoad, onProgress, onEnd, onError, onBuffer, onTimedMetadata, ref: (r) => ref = r}
      videoWrapper = shallow(<VideoWrapper videoProps={videoProps} store={store} />).dive()
      videoWrapper.instance().playerRef = {seek: () => {}}
    })

    it('should call passed loadStart', () => {
      videoWrapper.instance().loadStart()
      expect(loadStart.mock.calls.length).toBe(1)
    })

    it('should call passed onLoad', () => {
      videoWrapper.instance().onLoad({duration: null})
      expect(onLoad.mock.calls.length).toBe(1)
    })

    it('should call passed onProgress', () => {
      videoWrapper.instance().onProgress()
      expect(onProgress.mock.calls.length).toBe(1)
    })

    it('should call passed onEnd', () => {
      videoWrapper.instance().onEnd()
      expect(onEnd.mock.calls.length).toBe(1)
    })

    it('should call passed onError', () => {
      videoWrapper.instance().onError()
      expect(onError.mock.calls.length).toBe(1)
    })

    it('should call passed onBuffer', () => {
      videoWrapper.instance().onBuffer({isBuffering: true})
      expect(onBuffer.mock.calls.length).toBe(1)
    })

    it('should call passed onTimedMetadata', () => {
      videoWrapper.instance().onTimedMetadata()
      expect(onTimedMetadata.mock.calls.length).toBe(1)
    })

    it('should set ref', () => {
      videoWrapper.instance().setRef('reftest')
      expect(ref).toEqual('reftest')
    })
  })


})
