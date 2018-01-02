import React, { Component } from 'react';

import {connectVideo} from './connectVideo'

export default styles = (styleMethod) => {
  return (Wrapped) => {
    return connectVideo(['styles', 'theme'])(class extends Component {

      static WrappedComponent = Wrapped.WrappedComponent ? Wrapped.WrappedComponent : Wrapped

      constructor(props) {
        super(props)

        this.name = this.constructor.WrappedComponent.name
      }

      render() {
        const styles = styleMethod({[this.name]: {}, ...this.props.player.styles}, this.props.player.theme)
        return <Wrapped {...{...this.props, styles}} />
      }

    })
  }
}
