import React, { Component } from 'react';

export default layout = (defaultLayout) => {
  return (Wrapped) => {
    return class extends Component {

      static WrappedComponent = Wrapped.WrappedComponent ? Wrapped.WrappedComponent : Wrapped

      constructor(props) {
        super(props)

        this.name = this.constructor.WrappedComponent.name
      }

      render() {
        const layout = {...defaultLayout, ...this.props.layout}
        return <Wrapped {...{...this.props, layout}} />
      }

    }
  }
}
