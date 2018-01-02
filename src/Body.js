import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup'
import {makeStyles} from './util'
import {Play} from './Controls'
import {connectVideo} from './connectVideo'
import layout from './layout'
import styles from './styles'

export class Body extends Component {

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

Body.propTypes = {

  layout: PropTypes.shape({
    Left: PropTypes.object,
    Middle: PropTypes.object,
    Right: PropTypes.object
  }),

  styles: PropTypes.object

}

const Connected = connectVideo(['styles'])(Body)

const Layout = layout({
  Left: <ControlGroup layout={[

  ]} />,
  Middle: <ControlGroup layout={[
    <Play />
  ]} />,
  Right: <ControlGroup layout={[

  ]} />
})(Connected)

const Styled = styles((styles, theme) => ({
  container: {
    backgroundColor: styles.Body.backgroundColor || 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}))(Layout)

export default Styled
