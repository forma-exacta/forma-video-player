import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import {connectVideo} from '../connectVideo'
import styles from '../styles'


export class PlayerTime extends Component {

  constructor(props) {
    super(props);
  }

  renderTime = (timeInSeconds) => {
    const {text} = this.props.styles
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60) - (hours * 60);
    let seconds = timeInSeconds - (minutes * 60);

    if(seconds < 10) {
      seconds = `0${seconds}`;
    }

    return (
      <Text
        style={{color: text.color, fontSize: text.size}}
        >
        {hours?`${hours}:`:null}
        {minutes}:{seconds}
      </Text>
    )
  }

  render() {
    const {currentTime, duration} = this.props.player
    const {container, text} = this.props.styles

    return (
      <View style={container}>
        {this.renderTime(Math.floor(currentTime || 0))}
        <Text style={{color: text.color, fontSize: text.size, marginHorizontal: 2}}>/</Text>
        {this.renderTime(Math.floor(duration))}
      </View>
    )
  }

}

export const Connected = connectVideo(['currentTime', 'duration'])(PlayerTime)

export const Styled = styles((styles, theme) => ({
  container: {
    backgroundColor: styles.PlayerTime.backgroundColor || theme.control.backgroundColor,
    margin: 5,
    flexDirection: 'row'
  },
  text: {
    size: styles.PlayerTime.fontSize || theme.control.fontSize,
    color: styles.PlayerTime.textColor || theme.control.textColor
  }
}))(Connected)

export default Styled
