import React, { Component } from 'react';

export default layout = (defaultLayout) => {
  return (Wrapped) => {
    return class extends Component {

      static WrappedComponent = Wrapped.WrappedComponent ? Wrapped.WrappedComponent : Wrapped

      constructor(props) {
        super(props)

        this.name = this.constructor.WrappedComponent.name
      }

      shouldComponentUpdate(nextProps) {
        if(nextProps.layout && nextProps.layout !== this.props.layout) {
            return true
        }
        else {
          return false
        }
      }

      render() {
        const layout = {...defaultLayout, ...this.props.layout}
        return <Wrapped {...{...this.props, layout}} />
      }

    }
  }
}
