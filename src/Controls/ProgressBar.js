import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import Slider from 'react-native-slider'

import {connectVideo} from '../connectVideo'
import {actions} from '../state'
import styles from '../styles'

class ProgressBar extends Component {

  constructor(props) {
    super(props);
  }

  seek = (time) => {
    this.props.player.ref.seek(time)
    this.props.actions.currentTime(time)
    time < this.props.player.duration && this.props.actions.ended(false)
  }

  render() {
    const {currentTime, duration} = this.props.player
    const {bar} = this.props.styles

    return (
      <Slider
        ref={(ref) => {
          this.slider = ref
        }}
        maximumValue={duration || 0}
        onSlidingComplete={this.seek}
        value={currentTime || 0}
        thumbTintColor={bar.thumbTintColor}
        trackStyle={bar.trackStyle}
        thumbStyle={bar.thumbStyle}
        thumbTouchSize={{width: 40, height: 40}}
        minimumTrackTintColor={bar.minimumTrackTintColor}
        />
    )
  }

}

export const Connected = connectVideo(['currentTime', 'duration', 'ref', 'styles'], {
  currentTime: actions.currentTime,
  ended: actions.ended
})(ProgressBar);

export const Styled = styles((styles, theme) => ({
  bar: {
    thumbTintColor: styles.ProgressBar.thumbTintColor || '#f00',
    trackStyle: styles.ProgressBar.trackStyle || {backgroundColor: '#666677ff', borderRadius: 0},
    thumbStyle: styles.ProgressBar.thumbStyle || {width: 10, height: 10, borderWidth: 1, borderColor: 'red'},
    minimumTrackTintColor: styles.ProgressBar.minimumTrackTintColor || '#f00'
  }
}))(Connected)

export default Styled
