import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import {ProgressBar} from './Controls'
import layout from './layout'
import styles from './styles'

export class PlayerControls extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {Header, Body, Footer} = this.props.layout
    const {container, progressBar} = this.props.styles

    return (
      <View style={container}>
        {Header}
        {Body}
        {Footer}
        <View style={progressBar}>
          <ProgressBar />
        </View>
      </View>
    )
  }

}

PlayerControls.defaultStyles = {
  playerControls: {
    flex: 1
  },
  progressBar: {position: 'absolute', bottom: 30, left: 10, right: 10, height: 40}
}

export const LayoutWrapped = layout({
  Header: <Header />,
  Body: <Body />,
  Footer: <Footer />
})(PlayerControls)

export const Styled = styles((styles, theme) => ({
  container: {
    flex: 1
  },
  progressBar: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    height: 40
  }
}))(LayoutWrapped)

export default Styled
