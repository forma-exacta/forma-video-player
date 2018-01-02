import React from 'react'
import createReactClass from 'create-react-class'
import {merge, pick} from 'lodash'
import {State} from 'replate'

const ReactComponentPrototype = React.Component.prototype
const ReactClassComponentPrototype = (Object.getPrototypeOf(Object.getPrototypeOf(new (createReactClass({ render () {} }))())))

export const isReactComponent = (Class) => {
  return Class ? (ReactComponentPrototype.isPrototypeOf(Class.prototype) || ReactClassComponentPrototype.isPrototypeOf(Class.prototype)) : false
}

export const makeStyles = (defaultStyles = {}, styles = {}) => {
  return merge(defaultStyles, pick(styles, Object.keys(defaultStyles)))
}

export const makeState = (name, values) => {
  return new State(name, {}, values.reduce((result, valueConfig) => ({
      ...result,
      [valueConfig.name]: new State(valueConfig.name, valueConfig.initial, {
        [valueConfig.name]: (state, action) => action.payload
      })
    }), {}
  ))
}
