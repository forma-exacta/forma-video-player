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

export class Player extends Component {

  componentWillReceiveProps(newProps) {
    if(newProps.videoProps.name && newProps.videoProps.name != this.props.player.name) {
      this.props.actions.name(newProps.videoProps.name)
    }

    if(newProps.back && newProps.back != this.props.player.back) {
      this.props.actions.back(newProps.back)
    }

    if(newProps.styles && newProps.styles != this.props.player.styles) {
      this.props.actions.styles(newProps.styles)
    }

    if(newProps.theme && newProps.theme != this.props.player.theme) {
      this.props.actions.theme(newProps.theme)
    }
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <VideoWrapper videoProps={this.props.videoProps} />
        <Overlay
          fadeDuration={300}
          displayDuration={1500}
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

export const Connected = connectVideo(['paused', 'buffering', 'styles', 'theme', 'name', 'back'], {
  name: actions.name,
  back: actions.back,
  styles: actions.styles,
  theme: actions.theme
})(Player)

export default Connected
