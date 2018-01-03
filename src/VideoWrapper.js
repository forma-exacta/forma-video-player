import React, {Component} from 'react'
import Video from 'react-native-video'

import {connectVideo} from './connectVideo'
import {actions} from './state'
import {makeStyles} from './util'

export class VideoWrapper extends Component {

  loadStart = () => {
    this.props.actions.loading(true)
    this.props.videoProps.loadStart && this.props.videoProps.loadStart()
  }

  onLoad = ({duration}) => {
    this.props.actions.loading(false)
    this.props.actions.loaded(true)
    this.props.actions.duration(duration)
    this.props.actions.currentTime(0)
    this.props.videoProps.onLoad && this.props.videoProps.onLoad()
  }

  onProgress = (time) => {
    this.props.actions.progress(time)
    this.props.videoProps.onProgress && this.props.videoProps.onProgress(time)
  }

  onEnd = () => {
    this.props.videoProps.onEnd && this.props.videoProps.onEnd()

    if(this.props.player.repeat) {
      this.playerRef.seek(0)
      this.props.actions.currentTime(0)
    }
    else {
      this.props.actions.paused(true)
      this.props.actions.ended(true)
      this.props.actions.currentTime(this.props.player.duration)
    }
  }

  onError = (e) => {
    this.props.actions.error(e)
    this.props.actions.loading(false)
    this.props.videoProps.onError && this.props.videoProps.onError(e)
  }

  onBuffer = ({isBuffering}) => {
    this.props.actions.buffering(isBuffering)
    this.props.videoProps.onBuffer && this.props.videoProps.onBuffer(isBuffering)
  }

  onTimedMetadata = (metadata) => {
    this.props.actions.metadata(metadata)
    this.props.videoProps.onTimedMetadata && this.props.videoProps.onTimedMetadata(metadata)
  }

  setRef = (ref) => {
    this.playerRef = ref
    this.props.actions.ref(ref)
    this.props.videoProps.ref && this.props.videoProps.ref(ref)
  }

  render() {
    const {videoProps} = this.props
    const {source, rate, volume, muted, paused, resizeMode, repeat, playInBackground} = this.props.player

    return (
      <Video
        ref={this.setRef}
        source={source}
        rate={rate}
        volume={volume}
        muted={muted}
        paused={paused}
        resizeMode={resizeMode}
        repeat={repeat}
        playInBackground={playInBackground}
        onLoadStart={this.loadStart}
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        onEnd={this.onEnd}
        onError={this.onError}
        onBuffer={this.onBuffer}
        onTimedMetadata={this.onTimedMetadata}
        style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
      />
    )
  }


}

export default connectVideo(
  [
    'rate',
    'volume',
    'muted',
    'paused',
    'resizeMode',
    'repeat',
    'playInBackground',
    // 'playWhenInactive',
    // 'ignoreSilentSwitch',
    // 'progressUpdateInterval',
    'loading',
    'loaded',
    'progress',
    'error',
    'buffering',
    'metadata',
    'currentTime',
    'duration',
    'ended',
    'styles',
    'source'
  ],
  {
    loading: actions.loading,
    loaded: actions.loaded,
    error: actions.error,
    progress: actions.progress,
    buffering: actions.buffering,
    metadata: actions.metadata,
    paused: actions.paused,
    duration: actions.duration,
    currentTime: actions.currentTime,
    ref: actions.ref,
    ended: actions.ended
  }
)(VideoWrapper)
