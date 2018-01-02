import React, {Component} from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';

const timer = require('react-native-timer');

export default class Overlay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(props.forceVisible ? 1 : 0),
      animating: false,
      fadeDuration: props.fadeDuration || 1000,
      displayDuration: props.displayDuration || 3000,
      visible: props.forceVisible ? true : false
    }
  }

  tapped() {
    if(!this.state.animating && !this.props.forceVisible) {

      if(!this.state.visible) {
        this.setState({animating: true});
      }

      if(timer.timeoutExists(this, 'hideOverlay')) {
        timer.clearTimeout(this, 'hideOverlay');
      }

      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: this.state.fadeDuration,
        },
      ).start(() => {
        this.setState({animating: false, visible: true}, () => timer.setTimeout(
          this, 'hideOverlay', () => {
            if(this.props.forceVisible === false) {
              this.setState({animating: true})
              Animated.timing(
                this.state.fadeAnim,
                {
                  toValue: 0,
                  duration: this.state.fadeDuration
                }
              ).start(() => {
                this.setState({visible: false, animating: false})
              })
            }
          }, this.state.displayDuration
        ));
      });
    }
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt) => {
        this.tapped()
        return false
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.forceVisible === true && this.props.forceVisible === false) {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: this.state.fadeDuration
        }
      ).start(() => {
        this.setState({visible: true})
      })
    }
    else if(nextProps.forceVisible === false && this.props.forceVisible === true) {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: this.state.fadeDuration
        }
      ).start(() => {
        this.setState({visible: false})
      })
    }
  }

  render() {
    const {
      children,
      style
    } = this.props;

    return (
      <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} {...this._panResponder.panHandlers}>
        <Animated.View style={[{flex: 1}, {opacity: this.state.fadeAnim}]}>
          <View style={{flex: 1}} pointerEvents={this.state.visible ? 'auto' : 'none'}>
            {children}
          </View>
        </Animated.View>
      </View>
    )
  }

}
