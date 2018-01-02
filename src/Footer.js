import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup'
import {makeStyles} from './util'
import {Mute, PlayerTime} from './Controls'
import {connectVideo} from './connectVideo'
import layout from './layout'
import styles from './styles'

export class Footer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {Left, Middle, Right} = this.props.layout

    return (
      <View style={this.props.styles.container}>
        {React.cloneElement(Left, {defaultStyles: {justifyContent: 'flex-start'}})}
        {React.cloneElement(Middle, {defaultStyles: {justifyContent: 'center'}})}
        {React.cloneElement(Right, {defaultStyles: {justifyContent: 'flex-end'}})}
      </View>
    )
  }

}

Footer.propTypes = {

  layout: PropTypes.shape({
    Left: PropTypes.object,
    Middle: PropTypes.object,
    Right: PropTypes.object
  }),

  styles: PropTypes.object

}

const Connected = connectVideo(['styles'])(Footer)

const Layout = layout({
  Left: <ControlGroup layout={[
    <PlayerTime />
  ]} />,
  Middle: <ControlGroup layout={[

  ]} />,
  Right: <ControlGroup layout={[
    <Mute />
  ]} />
})(Connected)

const Styled = styles((styles, theme) => ({
  container: {
    backgroundColor: styles.Footer.backgroundColor || 'transparent',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    position: 'absolute',
    height: 50,
    right: 0,
    left: 0,
    bottom: 0
  }
}))(Layout)

export default Styled
