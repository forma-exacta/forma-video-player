import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup'
import {Title, Back} from './Controls'
import {makeStyles} from './util'
import {connectVideo} from './connectVideo'
import layout from './layout'
import styles from './styles'

export class Header extends Component {

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

Header.propTypes = {

  layout: PropTypes.shape({
    Left: PropTypes.object,
    Middle: PropTypes.object,
    Right: PropTypes.object
  }),

  styles: PropTypes.object

}

const Layout = layout({
  Left: <ControlGroup layout={[
    <Back />
  ]} />,
  Middle: <ControlGroup layout={[

  ]} />,
  Right: <ControlGroup layout={[
    <Title />
  ]} />
})(Header)

const Styled = styles((styles, theme) => ({
  container: {
    backgroundColor: styles.Header.backgroundColor || 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 50
  }
}))(Layout)

export default Styled

export const makeHeader = (left, middle, right) => {
  return (
    <Styled layout={{
      Left: <ControlGroup layout={left} />,
      Middle: <ControlGroup layout={middle} />,
      Right: <ControlGroup layout={right} />
    }} />
  )
}
