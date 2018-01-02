import React, {Component} from 'react'
import {shallow} from "enzyme";

import layout from './layout'

describe('layout', () => {

  class BaseComponent { render() {return null}}
  class TestComponent1 { render() {return null}}
  class TestComponent2 { render() {return null}}

  const makeLayout = () => {
    return layout(defaultLayout)(BaseComponent)
  }

  const defaultLayout = {
    TestComponent1: <TestComponent1 />,
    TestComponent2: <TestComponent2 />
  }

  const Wrapped = makeLayout()

  describe('when "layout" prop is empty', () => {

    it('should use default layout', () => {
      const props = {}
      const shallowLayout = shallow(<Wrapped {...props}/>)
      expect(shallowLayout.props().layout).toEqual(defaultLayout)
    })

  })

  describe('when "layout" prop is defined', () => {

    it('should use passed layout', () => {

      const props = {
        layout: {
          TestComponent1: <TestComponent2 />,
          TestComponent2: <TestComponent1 />
        }
      }
      const shallowLayout = shallow(<Wrapped {...props}/>)

      expect(shallowLayout.props().layout).toEqual(props.layout)

    })

    it('should shallow merge passed layout', () => {

      const props = {
        layout: {
          TestComponent1: <TestComponent2 />,
        }
      }
      const shallowLayout = shallow(<Wrapped {...props}/>)

      expect(shallowLayout.props().layout).toEqual({
        TestComponent1: <TestComponent2 />,
        TestComponent2: <TestComponent2 />,
      })

    })

  })

})
