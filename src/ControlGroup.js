import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';

import {connectVideo} from './connectVideo'
import {makeStyles} from './util'

export class ControlGroup extends Component {

  constructor(props) {
    super(props)
  }

  _renderControls = () => {
    const styles = {...ControlGroup.defaultStyles, ...this.props.defaultStyles}

    if(this.props.layout) {

      return (
        <View style={styles}>
          {this.props.layout.map((Control, i) => React.cloneElement(Control, {key: `${Control.type.displayName}-${i}`}))}
        </View>
      )
    }
    else {
      return null
    }
  }

  render() {
    return this._renderControls()
  }

}

ControlGroup.defaultStyles = {
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 1
}

ControlGroup.propTypes = {

  layout: PropTypes.array

}

export default connectVideo(['styles'])(ControlGroup)
