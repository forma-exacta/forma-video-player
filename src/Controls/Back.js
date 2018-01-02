import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {connectVideo} from '../connectVideo'
import styles from '../styles'


export class Back extends Component {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.player.back()
  }

  render() {

    const {container, button, underlayColor, icon} = this.props.styles

    if(!this.props.player.back) {
      return null
    }

    return (
      <View style={container}>
        {
          Platform.OS === 'ios' ? (
              <TouchableHighlight onPress={this.goBack} style={button} underlayColor={underlayColor}>
                <Icon name="arrow-back" size={icon.size} color={icon.color} />
              </TouchableHighlight>
            ) : (
              <TouchableNativeFeedback onPress={this.goBack} background={TouchableNativeFeedback.Ripple(underlayColor)}>
                <View style={button}>
                  <Icon name="arrow-back" size={icon.size} color={icon.color} />
                </View>
              </TouchableNativeFeedback>
            )
        }
      </View>
    )

  }

}

export const Connected = connectVideo(['back'])(Back)

export const Styled = styles((styles, theme) => ({
  button: {
    minWidth: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: styles.Back.backgroundColor || theme.control.backgroundColor
  },
  underlayColor: styles.Back.underlayColor || theme.control.underlayColor,
  icon: {
    size: styles.Back.size || theme.control.size,
    color: styles.Back.iconColor || theme.control.iconColor
  }
}))(Connected)

export default Styled
