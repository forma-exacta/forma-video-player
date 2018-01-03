import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';

import VideoWrapper from './VideoWrapper'
import PlayerControls from './PlayerControls'
import Overlay from './Overlay'
import {connectVideo} from './connectVideo'
import {actions} from './state'
import styles from './styles'

const videoPropsToSet = [
  'source', 'rate', 'volume', 'muted', 'paused', 'resizeMode', 'repeat', 'playInBackground', 'name'
]
const propsToWatch = [
  'back', 'styles', 'theme'
]

export class Player extends Component {

  constructor(props) {
    super(props)

    this.setStateFromVideoProps()
  }

  setStateFromVideoProps = () => {

    videoPropsToSet.forEach((prop) => {
      (typeof this.props.videoProps[prop] != 'undefined') && this.props.actions[prop](this.props.videoProps[prop])
    })

  }

  componentWillReceiveProps(newProps) {
    propsToWatch.forEach((prop) => {
      if((typeof newProps[prop] != 'undefined') && newProps[prop] != this.props.player[prop]) {
        this.props.actions[prop](newProps[prop])
      }
    })
  }

  render() {

    return (
      <View style={{flex: 1, width: '100%'}}>
        <VideoWrapper videoProps={this.props.videoProps} />
        <Overlay
          fadeDuration={300}
          displayDuration={3000}
          forceVisible={this.props.player.paused || this.props.player.buffering}>
          <PlayerControls layout={this.props.layout} />
        </Overlay>
      </View>
    )
  }
}

Player.defaultStyles = {
  player: {
    flex: 1
  }
}

Player.propTypes = {
  videoProps: PropTypes.shape({
    name: PropTypes.string,
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  back: PropTypes.func,
  styles: PropTypes.object,
  theme: PropTypes.object,
  layout: PropTypes.shape({
    Header: PropTypes.object,
    Body: PropTypes.object,
    Footer: PropTypes.object
  })
}

export const Connected = connectVideo(['paused', 'buffering'].concat(videoPropsToSet).concat(propsToWatch),
  videoPropsToSet.concat(propsToWatch).reduce((result, prop) => {
    result[prop] = actions[prop]
    return result
  }, {})
)(Player)

export default Connected
