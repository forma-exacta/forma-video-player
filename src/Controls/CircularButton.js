import React, {Component} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  View,
  Text
} from 'react-native';

export default class CircularButton extends Component {

  render() {

    const underlayColor = this.props.underlayColor || '#fff';

    const dimensions = {
      width: this.props.radius * 2,
      height: this.props.radius * 2,
    };

    if(Platform.OS === 'ios') {
      return (
        <TouchableHighlight
          onPress={this.props.onPress}
          style={[styles.commonViewStyle, this.props.style, dimensions]}
          underlayColor={underlayColor}
        >
          {this.props.children}
        </TouchableHighlight>
      )
    }
    else {
      return (
        <View style={[styles.commonViewStyle, this.props.style, dimensions]}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(underlayColor, true)}
            onPress={this.props.onPress}
          >
            <View style={[styles.commonViewStyle, dimensions]}>
              {this.props.children}
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  commonViewStyle: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
