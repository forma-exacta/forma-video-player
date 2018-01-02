import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit'

import {connectVideo} from '../connectVideo'
import {actions} from '../state'
import CircularButton from './CircularButton'
import styles from '../styles'


class Play extends Component {

  constructor(props) {
    super(props);
  }

  togglePaused = () => {
    const {buffering, paused} = this.props.player

    if(buffering) {
      paused && this.props.actions.pause(false)
    }
    else {
      this.props.actions.pause(!paused)
    }
  }

  replay = () => {
    this.props.player.ref.seek(0)
    setTimeout(() => {
      this.props.actions.currentTime(0)
      this.props.actions.pause(false)
      this.props.actions.ended(false)
    })
  }

  onPress = () => {
    this.props.player.ended ? this.replay() : this.togglePaused()
  }

  renderIcon = () => {
    const {paused, ended, buffering} = this.props.player
    const {icon} = this.props.styles
    let iconName

    if(paused) {
      iconName = (ended ? 'replay' : 'play-arrow')
    }
    else if(buffering) {
      iconName = 'play-arrow'
    }
    else {
      iconName = 'pause'
    }

    return (<Icon name={iconName} size={icon.size} color={icon.color} />)
  }

  render() {
    const {paused, ended, buffering} = this.props.player
    const {container, button, underlayColor, icon} = this.props.styles


    return (
      <View style={container}>
        <CircularButton radius={50} onPress={this.onPress} style={button} underlayColor={underlayColor}>
          {this.renderIcon()}
        </CircularButton>
        <View style={{height: 30}}>
          <Spinner isVisible={buffering} size={30} type='ThreeBounce' color='#ffffff' />
        </View>
      </View>
    )
  }

}

export const Connected = connectVideo(['paused', 'ended', 'buffering', 'ref'], {
  pause: actions.paused,
  ended: actions.ended,
  currentTime: actions.currentTime
})(Play)

export const Styled = styles((styles, theme) => ({
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: styles.Play.buttonColor || 'transparent'
  },
  container: {
    backgroundColor: styles.Play.backgroundColor || theme.control.backgroundColor,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  underlayColor: styles.Play.underlayColor || theme.control.underlayColor,
  icon: {
    size: styles.Play.size || 50,
    color: styles.Play.iconColor || theme.control.iconColor
  }
}))(Connected)

export default Styled
