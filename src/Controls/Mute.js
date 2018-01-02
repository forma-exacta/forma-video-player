import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CircularButton from './CircularButton'
import {connectVideo} from '../connectVideo'
import {actions} from '../state'
import styles from '../styles'

class Mute extends Component {

  constructor(props) {
    super(props);
  }

  toggleMute = () => {
    this.props.actions.mute(!this.props.player.muted)
  }

  render() {
    const {muted} = this.props.player
    const {container, button, underlayColor, icon} = this.props.styles

    return (
      <View style={container}>
        <CircularButton radius={styles.muteSize} onPress={this.toggleMute} style={button} underlayColor={underlayColor}>
          {
            muted ? (
              <Icon name="volume-off" size={icon.size} color={icon.color} />
            ) : (
              <Icon name="volume-up" size={icon.size} color={icon.color} />
            )
          }
        </CircularButton>
      </View>
    )
  }

}

export const Connected = connectVideo(['muted'], {mute: actions.muted})(Mute)

export const Styled = styles((styles, theme) => ({
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: styles.Mute.buttonColor || 'transparent'
  },
  container: {
    backgroundColor: styles.Mute.backgroundColor || theme.control.backgroundColor
  },
  underlayColor: styles.Mute.underlayColor || theme.control.underlayColor,
  icon: {
    size: styles.Mute.size || theme.control.size,
    color: styles.Mute.iconColor || theme.control.iconColor
  }
}))(Connected)

export default Styled
