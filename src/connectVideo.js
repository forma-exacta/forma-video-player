import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// A simplified syntax for connecting to the redux state for the video player
export const connectVideo = (
  videoState = [],
  videoActions = {},
  mergeProps,
  options
) => {

  return (WrappedComponent) => {
    return connect(
      (state) => ({player: videoState.reduce((result, key) => ({...result, [key]: state[key]}), {})}),
      (dispatch) => ({actions: bindActionCreators(videoActions, dispatch)}),
      mergeProps,
      options
    )(WrappedComponent)
  }
}
